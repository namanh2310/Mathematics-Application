import axios from "axios";
import { LOCAL_URL } from "../constants/api.const";

export const goldenSectionMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "optimize/goldensection", { input }
  );
  return response;
};

export const newtonRaphsonMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "optimize/newtonmethod", { input }
  );
  return response;
};

export const biSectionMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "optimize/bisection", { input }
  );
  return response;
}

export const interpolationMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "optimize/interpolation", { input }
  );
  return response;
}