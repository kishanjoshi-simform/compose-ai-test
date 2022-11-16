import type { ResultType } from "../..";
import { CommandsOptions } from "../..";
import type { ParamsType } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Helper = (params?: ParamsType): Array<ResultType> => {
  const result = ["List of commands:"];
  result.push(
    ...CommandsOptions.map(
      (command) => ` ${command.value}: Usage:-> ${command.description}`
    )
  );
  return result;
};
