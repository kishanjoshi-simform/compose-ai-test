import type { Option } from "../Components/AutoComplete";
import { Addition } from "./Callbacks/Addition";
import { FindMax } from "./Callbacks/FindMax";
import { FindMin } from "./Callbacks/FindMin";
import { Helper } from "./Callbacks/Helper";
import { UpperCase } from "./Callbacks/Uppercase";
import type { ParamsType, Query } from "./types";

export type ResultType = string;
export interface CommandOptionTypes {
  value: string;
  label: string;
  callback: (params?: ParamsType) => Array<ResultType>;
  description: string;
}

export const CommandsOptions: CommandOptionTypes[] = [
  {
    value: "/add",
    label: "/add",
    callback: Addition,
    description: "/add number1 number2 ...numberN",
  },
  {
    value: "/uppercase",
    label: "/uppercase",
    callback: UpperCase,
    description: "/uppercase your sentence",
  },
  {
    value: "/help",
    label: "/help",
    callback: Helper,
    description: "just type /help for help",
  },
  {
    value: "/min",
    label: "/min",
    callback: FindMin,
    description: "/min number1 number2 number3 number4 ...numberN",
  },
  {
    value: "/max",
    label: "/max",
    callback: FindMax,
    description: "/max number1 number2 number3 number4 ...numberN",
  },
];

export const checkPartialExistCommand = (value: string): boolean => {
  return value.startsWith("/");
};

export const checkCommandExist = (value: string): boolean => {
  const initialString = value.split(" ");
  return (
    CommandsOptions.findIndex((cmd) => initialString[0] == cmd.value) != -1
  );
};

export const filterCommands = (options: Option[], value: string): Option[] => {
  return options.filter((option) =>
    option.value.startsWith(value.split(" ")[0] || "")
  );
};

export const getCommand = (query: string): string => {
  for (const command of CommandsOptions) {
    if (query.startsWith(command.value)) {
      return command.value;
    }
  }
  return "";
};

export const getParams = (query: string, cmd: string): ParamsType => {
  const values = query.split(cmd);

  if (values[1]) {
    return values[1];
  }
  return "";
};

export const parseQuery = (query: string): Query => {
  if (checkCommandExist(query)) {
    const cmd = getCommand(query);
    const params = getParams(query, cmd);
    return {
      cmd,
      params,
    };
  }
  return {
    cmd: null,
    params: null,
  };
};

export const grabNumbersFromsentence = (params: string): Array<number> => {
  if (params && params.length > 0) {
    const ignoreKeywords = [" ", "", null];
    return params
      .split(" ")
      .filter((val) => !ignoreKeywords.includes(val))
      .map((n) => Number(n));
  }
  return [];
};
