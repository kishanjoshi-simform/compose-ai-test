import type { ResultType } from "../..";
import { grabNumbersFromsentence } from "../..";
import type { ParamsType } from "../../types";

export const FindMin = (params?: ParamsType): Array<ResultType> => {
  if (params) {
    const numbers = grabNumbersFromsentence(params);
    return [Math.min(...numbers)].map((n) => String(n));
  }
  return ["No Params Found", "Usage: /min <your list of numbers>"];
};
