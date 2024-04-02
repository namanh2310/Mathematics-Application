import axios from "axios";
import { LOCAL_URL } from "../constants/api.const";

export const linearRegressionMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "curve-fitting/linear-regression", { input }
  );
  return response;
};

export const secOrderLRMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "curve-fitting/second-orderLR", { input }
  );
  return response;
};

export const multiOrderLRMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "curve-fitting/multi-orderLR", { input }
  );
  return response;
}