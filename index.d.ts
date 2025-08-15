// Type definitions for git-fairy
// Minimal public surface

export interface CommitEntry {
  date: string;
  message: string;
  mood?: string;
}

export interface NarrateOptions {
  style?: 'fairy' | 'compact' | 'markdown' | 'json' | string;
  limit?: number;
  markdown?: boolean;
  json?: boolean;
}

export function narrate(commits: CommitEntry[], opts?: NarrateOptions): string;
export function getMood(message: string): string;
