import type { Option } from "../Components/AutoComplete";
import { Addition } from "./Callbacks/Addition";
import { FindMax } from "./Callbacks/FindMax";
import { FindMin } from "./Callbacks/FindMin";
import { Helper } from "./Callbacks/Helper";
import { UpperCase } from "./Callbacks/Uppercase";
import type { ParamsType, Query } from "./types";

export type ResultType = string;
export interface CommandOptionTypes {
  // value of command
  value: string;
  
  // label of command
  label: string;

  // callback function for command
  callback: (params?: ParamsType) => Array<ResultType>;
  
  // description of command poping up on tooltip
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

// check if there is anycommand exist in the sentence
export const checkPartialExistCommand = (value: string): boolean => {
  return value.startsWith("/");
};

// check if there is any specific command exist in the sentence
export const checkCommandExist = (value: string): boolean => {
  const initialString = value.split(" ");
  return (
    CommandsOptions.findIndex((cmd) => initialString[0] == cmd.value) != -1
  );
};

// get all the partially written commands list
export const filterCommands = (options: Option[], value: string): Option[] => {
  return options.filter((option) =>
    option.value.startsWith(value.split(" ")[0] || "")
  );
};

// get specific command from sentence
export const getCommand = (query: string): string => {
  for (const command of CommandsOptions) {
    if (query.startsWith(command.value)) {
      return command.value;
    }
  }
  return "";
};

// get params from sentence for the commands
export const getParams = (query: string, cmd: string): ParamsType => {
  const values = query.split(cmd);

  if (values[1]) {
    return values[1];
  }
  return "";
};

// convert sentence into command and params pair
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

// convert string of numbers into array of number
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
