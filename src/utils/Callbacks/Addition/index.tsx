import type { ResultType } from "../..";
import { grabNumbersFromsentence } from "../..";
import type { ParamsType } from "../../types";

export const Addition = (params?: ParamsType): Array<ResultType> => {
  let sum = 0;
  if (params) {
    const numbers = grabNumbersFromsentence(params);
    sum = numbers.reduce((a, b) => a + b, 0);
  }
  return [String(sum)];
};
