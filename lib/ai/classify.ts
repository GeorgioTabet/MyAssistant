/**
 * Sends a captured note to Claude and gets back the layer it belongs to.
 * This is the core mechanic — the AI routing behind the home-screen input.
 *
 * Calls the Anthropic Messages API directly with fetch (per CLAUDE.md). React
 * Native's fetch is not a browser, so no CORS / browser-access header is needed.
 */

import type { LayerId } from '@/constants/layers';

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-4-5'; // fast + cheap — ideal for a 4-way classification

const LAYER_IDS: LayerId[] = ['work', 'health', 'people', 'finance'];

const SYSTEM_PROMPT = `You are a classifier for a personal assistant app. The app sorts everything the user captures into one of four "layers":

- work: tasks, projects, deadlines, meetings, professional matters
- health: fitness, food, sleep, medical appointments, wellbeing
- people: relationships, family, friends, social plans, messages to send
- finance: spending, bills, budgets, savings, money matters

Given a short note from the user, reply with EXACTLY one word — the layer id that fits best: work, health, people, or finance. No punctuation, no explanation, just the single lowercase word.`;

/** Thrown when classification fails — the message is safe to show the user. */
export class ClassificationError extends Error {}

export async function classifyText(text: string, apiKey: string): Promise<LayerId> {
  let response: Response;
  try {
    response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 16,
        // The system prompt is identical on every call, so it's marked
        // cacheable. Note: Haiku only caches prefixes of ~4096+ tokens, and
        // this prompt is far shorter — so caching is a no-op until the prompt
        // grows. The marker is correct and harmless to leave in place.
        system: [
          { type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
        ],
        messages: [{ role: 'user', content: text }],
      }),
    });
  } catch {
    throw new ClassificationError(
      'Could not reach Claude. Check your internet connection and try again.'
    );
  }

  if (!response.ok) {
    if (response.status === 401) {
      throw new ClassificationError('Your API key was rejected. Check it in Settings.');
    }
    if (response.status === 429) {
      throw new ClassificationError('Claude is rate limiting requests. Try again in a moment.');
    }
    throw new ClassificationError(`Claude returned an error (${response.status}). Try again.`);
  }

  const data = await response.json();
  const raw: string = data?.content?.[0]?.text ?? '';
  const layer = raw.trim().toLowerCase();

  if (!LAYER_IDS.includes(layer as LayerId)) {
    throw new ClassificationError("Couldn't sort that note — try rephrasing it.");
  }
  return layer as LayerId;
}
