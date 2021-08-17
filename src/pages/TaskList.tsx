import { TaskItemStruct, TaskFilterStruct, PostTaskUpdateStruct } from '../_types';
import TaskItem from './TaskItem';
import TaskAdder from './TaskAdder';
import { tmpUserId } from '../_constParams';
import axios from 'axios';
import { useState } from 'react';

type Props = {
  tasks: TaskItemStruct[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItemStruct[]>>;
  taskFilter: TaskFilterStruct;
  setTaskFilter: React.Dispatch<React.SetStateAction<TaskFilterStruct>>;
};

const TaskList: React.FC<Props> = ({ tasks, setTasks, taskFilter, setTaskFilter }) => {
  const [postResult, setPostResult] = useState();

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

  const onTaskFinish = (task_id: string, is_finished: boolean) => {
    const newTask = tasks.map((task) => {
      if (task.id === task_id) {
        const postData: PostTaskUpdateStruct = {
          task_id: task.id,
          name: task.name,
          description: task.description,
          is_done: !is_finished,
          user_id: tmpUserId,
          status: 'exist',
        };

        AxiosUpdateTask(postData);
        if (postResult === false) return;

        task.is_finished = !is_finished;
      }
      return task;
    });

    setTasks(newTask);
  };

  const onTaskRename = (task_id: string, name: string) => {
    const newTask = tasks.map((task) => {
      if (task.id === task_id) {
        const postData: PostTaskUpdateStruct = {
          task_id: task.id,
          name: name,
          description: task.description,
          is_done: task.is_finished,
          user_id: tmpUserId,
          status: 'exist',
        };

        AxiosUpdateTask(postData);
        if (postResult === false) return;
        task.name = name;
      }
      return task;
    });

    setTasks(newTask);
  };

  const onTaskRemove = (task_id: string, is_removed: boolean) => {
    const newTask = tasks.map((task) => {
      if (task.id === task_id) {
        const postData: PostTaskUpdateStruct = {
          task_id: task.id,
          name: task.name,
          description: task.description,
          is_done: task.is_finished,
          user_id: tmpUserId,
          status: 'remove',
        };

        AxiosUpdateTask(postData);
        if (postResult === false) return;

        task.is_removed = !is_removed;
      }
      return task;
    });

    setTasks(newTask);
  };

  const onTaskRemovePerm = (task_id: string) => {
    tasks.map((task) => {
      if (task.id === task_id) {
        const postData: PostTaskUpdateStruct = {
          task_id: task.id,
          name: task.name,
          description: task.description,
          is_done: task.is_finished,
          user_id: tmpUserId,
          status: 'eliminated',
        };

        AxiosUpdateTask(postData);
        if (postResult === false) return;
      }
    });
    const newTasks = tasks.filter((task) => task.id !== task_id);
    setTasks(newTasks);
  };

  const onTaskRemovePermAll = () => {
    tasks.map((task) => {
      if (task.is_removed) {
        const postData: PostTaskUpdateStruct = {
          task_id: task.id,
          name: task.name,
          description: task.description,
          is_done: task.is_finished,
          user_id: tmpUserId,
          status: 'eliminated',
        };

        AxiosUpdateTask(postData);
        if (postResult === false) return;
      }
    });
    const newTasks = tasks.filter((task) => !task.is_removed);
    setTasks(newTasks);
  };

  const AxiosUpdateTask = (postData: PostTaskUpdateStruct) => {
    let result: boolean;

    const requestOptions = {
      data: postData,
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    };

    axios
      .post('http://localhost:8080/task/create', requestOptions)
      .then((response) => {
        console.log(response.data.result);
        setPostResult(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    return result;
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
        {FilteredTasks.map((task) => {
          return (
            <li key={task.id}>
              <TaskItem
                task={task}
                onTaskFinish={onTaskFinish}
                onTaskRename={onTaskRename}
                onTaskRemove={onTaskRemove}
                onTaskRemovePerm={onTaskRemovePerm}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default TaskList;
