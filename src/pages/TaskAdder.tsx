import React, { useState } from 'react';
import { TaskItemStruct } from './_declarations';

type Props = {
  tasks: TaskItemStruct[];
  setTasks: React.Dispatch<React.SetStateAction<TaskItemStruct[]>>;
};

const TaskAdder: React.FC<Props> = ({ tasks, setTasks }) => {
  const [inputText, setInputText] = useState('');

  const onSubmitNewTask = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (!inputText) return;

    const newTask: TaskItemStruct = {
      id: new Date().getTime(),
      name: inputText,
      is_finished: false,
      is_removed: false,
    };

    setTasks([newTask, ...tasks]);
    setInputText('');
  };

  return (
    <>
      {/* 後にPOST方式でのデータ送信プロパティ追加 */}
      <form onSubmit={(e) => onSubmitNewTask(e)}>
        <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} />
        <button type="submit" onSubmit={(e) => onSubmitNewTask(e)}>
          追加
        </button>
      </form>
    </>
  );
};

export default TaskAdder;
