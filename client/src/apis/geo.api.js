import axios from "axios";
import { LOCAL_URL } from "../constants/api.const";

export const geometricFunction = async (shape, input) => {
  const response = await axios.post(
    LOCAL_URL + "geometric/" + shape, { input }
  );
  return response;
};
