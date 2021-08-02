export type TaskItemStruct = {
  id: number;
  name: string;
  is_finished: boolean;
  is_removed: boolean;
};

export type TaskFilterStruct = 'unfinished' | 'finished' | 'all' | 'removed';
