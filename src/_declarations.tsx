export type TaskItemStruct = {
  id: string;
  name: string;
  description: string;
  is_finished: boolean;
  is_removed: boolean;
};

export type TaskFilterStruct = 'unfinished' | 'finished' | 'all' | 'removed';

export const TaskStatusStruct = Object.freeze({
  exist: 'exist',
  removed: 'removed',
  eliminated: 'eliminated',
});
