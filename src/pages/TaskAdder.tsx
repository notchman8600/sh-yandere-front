import axios from 'axios';
import React, { useState } from 'react';
import { PostTaskCreateStruct, TaskItemStruct } from '../_types';
import { tmpUserId } from '../_constParams';

type Props = {
  tasks: TaskItemStruct[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItemStruct[]>>;
};

const TaskAdder: React.FC<Props> = ({ tasks, setTasks }) => {
  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [taskId, setTaskId] = useState('');

  const onSubmitNewTask = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (!(inputName && inputDesc)) return;

    const postData: PostTaskCreateStruct = {
      name: inputName,
      description: inputDesc,
      is_done: false,
      user_id: tmpUserId,
      status: 'exist',
    };

    const requestOptions = {
      data: postData,
      headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
    };

    axios
      .post('http://localhost:8080/task/create', requestOptions)
      .then((response) => {
        setTaskId(response.data.task_id);
      })
      .catch((error) => {
        console.log(error);
      });

    const newTask: TaskItemStruct = {
      id: taskId,
      name: inputName,
      description: inputDesc,
      is_done: false,
      status: postData.status,
    };

    console.log(newTask);

    setTasks([newTask, ...tasks]);
    setInputName('');
    setInputDesc('');
  };

  return (
    <>
      <form onSubmit={(e) => onSubmitNewTask(e)}>
        <input
          type='text'
          value={inputName}
          placeholder='タスク名'
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type='text'
          value={inputDesc}
          placeholder='詳細'
          onChange={(e) => setInputDesc(e.target.value)}
        />
        <button type='submit' onSubmit={(e) => onSubmitNewTask(e)}>
          追加
        </button>
      </form>
    </>
  );
};

export default TaskAdder;
