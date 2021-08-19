import React from 'react';
import { TaskItemStruct, TaskStatusStruct } from '../_types';

type Props = {
  task: TaskItemStruct;
  onTaskFinish: (id: string, is_done: boolean) => void;
  onTaskRename: (id: string, name: string) => void;
  onTaskRemove: (id: string, status: TaskStatusStruct) => void;
  onTaskRemovePerm: (id: string) => void;
};

const TaskItem: React.FC<Props> = ({
  task,
  onTaskFinish,
  onTaskRename,
  onTaskRemove,
  onTaskRemovePerm,
}) => {
  return (
    <>
      <input
        type="checkbox"
        checked={task.is_done}
        disabled={task.status === 'remove'}
        onChange={() => onTaskFinish(task.id, task.is_done)}
      />
      <input
        type="text"
        value={task.name}
        disabled={task.is_done || task.status === 'remove'}
        onChange={(e) => onTaskRename(task.id, e.target.value)}
      />
      <button onClick={() => onTaskRemove(task.id, task.status)}>
        {task.status === 'remove' ? '復元' : '削除'}
      </button>
      <button hidden={task.status === 'remove'} onClick={() => onTaskRemovePerm(task.id)}>
        抹消
      </button>
    </>
  );
};

export default TaskItem;
