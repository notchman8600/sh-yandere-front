import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import TaskList from './TaskList';
import { TaskItemStruct, TaskFilterStruct } from '../_declarations';

const App: NextPage = () => {
  const [tasks, setTasks] = useState<TaskItemStruct[]>([]);
  const [taskFilter, setTaskFilter] = useState<TaskFilterStruct>('unfinished');

  return (
    <>
      <Head>
        <title>Todo with Yandere chan!</title>
        <meta charSet="utf-8" />
      </Head>
      <div>
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          taskFilter={taskFilter}
          setTaskFilter={setTaskFilter}
        />
      </div>
    </>
  );
};

export default App;
