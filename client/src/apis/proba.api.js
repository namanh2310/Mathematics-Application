import axios from "axios";
import { LOCAL_URL } from "../constants/api.const";

export const basicProbaMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "probability/proba-compute", { input }
  );
  return response;
};

export const proIndependMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "probability/proba-independent", { input }
  );
  return response;
};

export const normalDisMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "probability/normal-distribution", { input }
  );
  return response;
}

export const statisticMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "probability/statistic", { input }
  );
  return response;
}

export const sampleSizeMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "probability/sample-size", { input }
  );
  return response;
}

export const confidenceIntervalMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "probability/confidence-interval", { input }
  );
  return response;
}

export const zScoreMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "probability/z-score", { input }
  );
  return response;
}