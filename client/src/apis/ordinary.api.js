import axios from "axios";
import { LOCAL_URL } from "../constants/api.const";

export const eulerMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "ordinary/eulerMethod", { input }
  );
  return response;
};

export const heunMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "ordinary/heunMethod", { input }
  );
  return response;
}

export const midPointMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "ordinary/midPoint", { input }
  );
  return response;
}

export const ralstonMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "ordinary/ralston", { input }
  );
  return response;
}

export const thirdOrderMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "ordinary/thirdOrder", { input }
  );
  return response;
}

export const fourthOrderMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "ordinary/fourthOrder", { input }
  );
  return response;
}