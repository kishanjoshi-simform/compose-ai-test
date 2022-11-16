import type { ResultType } from "../..";
import { grabNumbersFromsentence } from "../..";
import type { ParamsType } from "../../types";

export const FindMax = (params?: ParamsType): Array<ResultType> => {
  if (params) {
    const numbers = grabNumbersFromsentence(params);
    return [Math.max(...numbers)].map((n) => String(n));
  }
  return ["No Params Found", "Usage: /max <your list of numbers>"];
};
