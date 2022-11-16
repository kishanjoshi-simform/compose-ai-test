import type { ResultType } from "../..";
import type { ParamsType } from "../../types";

export const UpperCase = (params?: ParamsType): Array<ResultType> => {
  if (params) {
    return [params.toUpperCase()];
  }
  return ["No Sentence Found", "Usage: /uppercase <your sentence>"];
};
