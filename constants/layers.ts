/**
 * The four active layers. This is the single source of truth — screens,
 * components, and (later) the AI classifier all read layer info from here.
 * A fifth group of layers is planned but not built yet.
 */

import { IconSymbolName } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';

const c = Colors.dark;

export type LayerId = 'work' | 'health' | 'people' | 'finance';

export type Layer = {
  id: LayerId;
  label: string;
  color: string;
  icon: IconSymbolName;
  description: string;
};

export const LAYERS: Record<LayerId, Layer> = {
  work: {
    id: 'work',
    label: 'Work',
    color: c.work,
    icon: 'briefcase.fill',
    description: 'Tasks, projects, and deadlines.',
  },
  health: {
    id: 'health',
    label: 'Health',
    color: c.health,
    icon: 'heart.fill',
    description: 'Fitness, food, sleep, and wellbeing.',
  },
  people: {
    id: 'people',
    label: 'People',
    color: c.people,
    icon: 'person.2.fill',
    description: 'Relationships, messages, and plans.',
  },
  finance: {
    id: 'finance',
    label: 'Finance',
    color: c.finance,
    icon: 'dollarsign.circle.fill',
    description: 'Spending, bills, and budgets.',
  },
};

/** Layers as an ordered array, for rendering lists. */
export const LAYER_LIST: Layer[] = [
  LAYERS.work,
  LAYERS.health,
  LAYERS.people,
  LAYERS.finance,
];
