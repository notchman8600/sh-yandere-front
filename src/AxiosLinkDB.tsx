import axios from 'axios';
import { PostTaskCreateStruct } from './_types';

export const AxiosPostCreate = (postData: PostTaskCreateStruct): any => {
  const requestOptions = {
    data: postData,
    headers: { 'Content-Type': 'application/json', Origin: 'http://localhost' },
  };
  axios
    .post('http://localhost:8080/task/create', requestOptions)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('接続失敗');
      console.log(error.status);
      return;
    });
};
