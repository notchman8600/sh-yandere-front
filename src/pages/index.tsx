import { NextPage } from 'next';
import Head from 'next/head';
import { Button, Grid } from '@material-ui/core';

const App: NextPage = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Todo with Yandere chan!</title>
      </Head>
      <div>
        <Grid container justifyContent="center">
          <Button variant="contained" color="primary">
            Hello World!
          </Button>
        </Grid>
      </div>
    </>
  );
};

export default App;
