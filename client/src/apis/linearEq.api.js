import axios from "axios";
import { LOCAL_URL } from "../constants/api.const";

export const naivegeGEMethod = async (input) => {
  const response = await axios.post(
    LOCAL_URL + "linear-equation/naivege", { input }
  );
  return response;
};
