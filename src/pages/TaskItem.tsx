import React from 'react';
import { TaskItemStruct } from '../_declarations';

type Props = {
  task: TaskItemStruct;
  onTaskFinish: (id: string, is_finished: boolean) => void;
  onTaskRename: (id: string, name: string) => void;
  onTaskRemove: (id: string, is_removed: boolean) => void;
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
    <li>
      <input
        type="checkbox"
        checked={task.is_finished}
        disabled={task.is_removed}
        onChange={() => onTaskFinish(task.id, task.is_finished)}
      />
      <input
        type="text"
        value={task.name}
        disabled={task.is_finished || task.is_removed}
        onChange={(e) => onTaskRename(task.id, e.target.value)}
      />
      <button onClick={() => onTaskRemove(task.id, task.is_removed)}>
        {task.is_removed ? '復元' : '削除'}
      </button>
      <button hidden={!task.is_removed} onClick={() => onTaskRemovePerm(task.id)}>
        抹消
      </button>
    </li>
  );
};

export default TaskItem;
