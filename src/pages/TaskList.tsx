import { TaskItemStruct, TaskFilterStruct } from '../_declarations';
import TaskItem from './TaskItem';
import TaskAdder from './TaskAdder';

type Props = {
  tasks: TaskItemStruct[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItemStruct[]>>;
  taskFilter: TaskFilterStruct;
  setTaskFilter: React.Dispatch<React.SetStateAction<TaskFilterStruct>>;
};

const TaskList: React.FC<Props> = ({ tasks, setTasks, taskFilter, setTaskFilter }) => {
  const FilteredTasks = tasks.filter((task) => {
    switch (taskFilter) {
      case 'unfinished':
        return !task.is_finished && !task.is_removed;
      case 'finished':
        return task.is_finished && !task.is_removed;
      case 'all':
        return !task.is_removed;
      case 'removed':
        return task.is_removed;
    }
  });

  const onTaskFinish = (id: string, is_finished: boolean) => {
    const newTask = tasks.map((task) => {
      if (task.id === id) {
        task.is_finished = !is_finished;
      }
      return task;
    });

    setTasks(newTask);
  };

  const onTaskRename = (id: string, name: string) => {
    const newTask = tasks.map((task) => {
      if (task.id === id) {
        task.name = name;
      }
      return task;
    });

    setTasks(newTask);
  };

  const onTaskRemove = (id: string, is_removed: boolean) => {
    const newTask = tasks.map((task) => {
      if (task.id === id) {
        task.is_removed = !is_removed;
      }
      return task;
    });

    setTasks(newTask);
  };

  const onTaskRemovePerm = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  };

  const onTaskRemovePermAll = () => {
    const newTasks = tasks.filter((task) => !task.is_removed);
    setTasks(newTasks);
  };

  return (
    <>
      <select
        defaultValue="unfinished"
        onChange={(e) => setTaskFilter(e.target.value as TaskFilterStruct)}
      >
        <option value="unfinished">未処理</option>
        <option value="finished">処理済み</option>
        <option value="all">全表示</option>
        <option value="removed">削除済み</option>
      </select>
      {taskFilter === 'removed' ? (
        <button onClick={() => onTaskRemovePermAll()}>全て抹消</button>
      ) : (
        <TaskAdder tasks={tasks} setTasks={setTasks} />
      )}
      <ul style={{ listStyle: 'none' }}>
        {FilteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onTaskFinish={onTaskFinish}
            onTaskRename={onTaskRename}
            onTaskRemove={onTaskRemove}
            onTaskRemovePerm={onTaskRemovePerm}
          />
        ))}
      </ul>
    </>
  );
};

export default TaskList;
