import axios from 'axios';
import {LOCAL_URL} from '../constants/api.const';

export const AIScannerApp = async ({regenerate_status, img}) => {
  console.log(regenerate_status);
  console.log('############3', img);
  const response = await axios.post(LOCAL_URL + 'ai-scanner/for-app', {
    regenerate_status,
    img,
  });
  return response;
};
