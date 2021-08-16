import React, { useState } from 'react';
import axios from 'axios';
import { PostTaskCreateReturns, PostTaskCreateStruct, TaskItemStruct } from '../_types';
import { AxiosPostCreate } from '../AxiosLinkDB';

type Props = {
  tasks: TaskItemStruct[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItemStruct[]>>;
};

const newUserId = '123456789-987654321';

const TaskAdder: React.FC<Props> = ({ tasks, setTasks }) => {
  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [resPostCreate, setResPostCreate] = useState([]);

  const onSubmitNewTask = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (!(inputName && inputDesc)) return;

    const postData: PostTaskCreateStruct = {
      name: inputName,
      description: inputDesc,
      is_done: false,
      user_id: newUserId,
      status: 'exist',
    };

    const responses = AxiosPostCreate(postData);

    console.log(responses);

    if (!responses['result'] || responses === null) return;

    const newTask: TaskItemStruct = {
      id: responses.task_id,
      name: inputName,
      description: inputDesc,
      is_finished: false,
      is_removed: false,
    };

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
