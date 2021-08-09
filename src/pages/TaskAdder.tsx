import axios from 'axios';
import React, { useState } from 'react';
import { TaskItemStruct, TaskStatusStruct } from '../_declarations';

type Props = {
  tasks: TaskItemStruct[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItemStruct[]>>;
};

const newUserId: string = new Date().getTime().toString();

const TaskAdder: React.FC<Props> = ({ tasks, setTasks }) => {
  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');

  const onSubmitNewTask = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (!(inputName && inputDesc)) return;

    /*const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', origin: 'http://localhost' },
      body: JSON.stringify({
        name: inputName,
        description: inputDesc,
        is_done: false,
        user_id: newUserId,
        status: TaskStatusStruct.exist,
      }),
    };*/

    const requestOptions = {
      data: {
        name: inputName,
        description: inputDesc,
        is_done: false,
        user_id: newUserId,
        status: TaskStatusStruct.exist,
      },
      headers: { 'Content-Type': 'application/json', origin: 'http://localhost' },
    };

    axios
      .post('localhost/task/create', requestOptions)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //fetch('http://localhost:8080/task/create', requestOptions).then((response) => response.json());
    //.then((data) => setPostId(data));

    const newTask: TaskItemStruct = {
      id: '5353',
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
      {/* 後にPOST方式でのデータ送信プロパティ追加 */}
      <form onSubmit={(e) => onSubmitNewTask(e)}>
        <input
          type="text"
          value={inputName}
          placeholder="タスク名"
          onChange={(e) => setInputName(e.target.value)}
        />
        <input
          type="text"
          value={inputDesc}
          placeholder="詳細"
          onChange={(e) => setInputDesc(e.target.value)}
        />
        <button type="submit" onSubmit={(e) => onSubmitNewTask(e)}>
          追加
        </button>
      </form>
    </>
  );
};

export default TaskAdder;
