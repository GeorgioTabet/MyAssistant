/**
 * TEMPORARY placeholder data for the UI shell.
 *
 * Once persistence lands, the `Item` type and the real data source move to
 * `lib/db/` and this file is deleted. Nothing here is saved or real.
 */

import type { LayerId } from '@/constants/layers';

export type Item = {
  id: string;
  text: string;
  layer: LayerId;
  /** ISO timestamp of when the item was captured. */
  createdAt: string;
};

export const SAMPLE_ITEMS: Item[] = [
  {
    id: '1',
    text: 'Finish the Q2 planning doc before the team sync',
    layer: 'work',
    createdAt: '2026-05-14T09:12:00Z',
  },
  {
    id: '2',
    text: 'Book a dentist appointment for next week',
    layer: 'health',
    createdAt: '2026-05-14T08:40:00Z',
  },
  {
    id: '3',
    text: "Call Mum, it's her birthday on Sunday",
    layer: 'people',
    createdAt: '2026-05-13T19:05:00Z',
  },
  {
    id: '4',
    text: 'Electricity bill due on the 20th — £84',
    layer: 'finance',
    createdAt: '2026-05-13T17:30:00Z',
  },
  {
    id: '5',
    text: 'Review the pull request from Sam',
    layer: 'work',
    createdAt: '2026-05-13T14:22:00Z',
  },
  {
    id: '6',
    text: 'Go for a 5k run on Saturday morning',
    layer: 'health',
    createdAt: '2026-05-12T20:15:00Z',
  },
  {
    id: '7',
    text: 'Reply to the wedding invite from Alex and Jo',
    layer: 'people',
    createdAt: '2026-05-12T11:48:00Z',
  },
  {
    id: '8',
    text: 'Move £200 into savings after payday',
    layer: 'finance',
    createdAt: '2026-05-11T16:00:00Z',
  },
];

/** Sample items belonging to a single layer, newest first. */
export function sampleItemsForLayer(layer: LayerId): Item[] {
  return SAMPLE_ITEMS.filter((item) => item.layer === layer);
}
