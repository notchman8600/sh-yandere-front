export type TaskItemStruct = {
  id: string;
  name: string;
  description: string;
  is_done: boolean;
  status: TaskStatusStruct;
};

export type TaskFilterStruct = 'unfinished' | 'finished' | 'all' | 'removed';

export type PostTaskCreateStruct = {
  name: string;
  description: string;
  is_done: boolean;
  user_id: string;
  status: TaskStatusStruct;
};

export type PostTaskUpdateStruct = {
  task_id: string;
  name: string;
  description: string;
  is_done: boolean;
  user_id: string;
  status: TaskStatusStruct;
};

export type PostTaskReadStruct = {
  user_id: string;
};

export type TaskStatusStruct = 'exist' | 'remove' | 'eliminated';
