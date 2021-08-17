import { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import TaskList from './TaskList';
import axios from 'axios';
import { TaskItemStruct, TaskFilterStruct, PostTaskReadStruct } from '../_types';
import { styleSceneTodoApp } from '../_styles';
import { tmpUserId } from '../_constParams';

const App: NextPage = () => {
  const styles = styleSceneTodoApp();

  const [tasks, setTasks] = useState<TaskItemStruct[]>([]);
  const [taskFilter, setTaskFilter] = useState<TaskFilterStruct>('unfinished');

  const postData: PostTaskReadStruct = {
    user_id: tmpUserId,
  };

  const requestOptions = {
    data: postData,
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
  };

  axios
    .post('http://localhost:8080/task/read', requestOptions)
    .then((response) => console.log(response))
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <Head>
        <title>Todo with Yandere chan!</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      </Head>
      <div className={styles.Background}>
        {/*
          <Grid justifyContent="flex-start" alignContent="flex-start" direction="column">
            <Tooltip title="Add" aria-label="add">
              <Fab>
                <Add />
              </Fab>
            </Tooltip>
          </Grid>
          <Grid justifyContent="center" alignContent="center">
          */}
        <TaskList
          tasks={tasks}
          setTasks={setTasks}
          taskFilter={taskFilter}
          setTaskFilter={setTaskFilter}
        />
        {/*</Grid>*/}
      </div>
    </>
  );
};

export default App;
