import axios from "axios";
import { LOCAL_URL } from "../constants/api.const";

export const trapezoidalMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "diff-int/trapezoidal", { input }
  );
  return response;
};

export const trapzoidalMAMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "diff-int/trapezoidalMA", { input }
  );
  return response;
};

export const simpson13Method = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "diff-int/simpson13", { input }
  );
  return response;
};

export const simpson13MAMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "diff-int/simpson13ma", { input }
  );
  return response;
}

export const simpson38Method = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "diff-int/simpson38", { input }
  );
  return response;
}