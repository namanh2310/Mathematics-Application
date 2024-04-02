import axios from "axios";
import { LOCAL_URL } from "../constants/api.const";

export const fundamentalCaluclus = async (data) => {
  const response = await axios.post(
    LOCAL_URL + "calculus/fundamental", { data }
  );
  return response;
};

export const linearAlgebra = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "calculus/linear-algebra", { input }
  );
  return response;
};