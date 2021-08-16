export type TaskItemStruct = {
  id: string;
  name: string;
  description: string;
  is_finished: boolean;
  is_removed: boolean;
};

export type TaskFilterStruct = 'unfinished' | 'finished' | 'all' | 'removed';

export type PostTaskCreateStruct = {
  name: string;
  description: string;
  is_done: boolean;
  user_id: string;
  status: TaskStatusStruct;
};

export type PostTaskCreateReturns = {
  task_id: string;
  result: boolean;
};

export type PostTaskUpdateStruct = {
  task_id: string;
  name: string;
  description: string;
  is_done: boolean;
  user_id: string;
  status: TaskStatusStruct;
};

export type TaskStatusStruct = 'exist' | 'remove' | 'eliminated';
