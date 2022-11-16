import { ArrowForwardIcon, SmallCloseIcon, InfoIcon } from "@chakra-ui/icons";
import type { InputProps } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import {
  Box,
  Button,
  Flex,
  Input,
  List,
  ListItem,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { checkPartialExistCommand, filterCommands } from "../../utils";

export type Option = {
  [key: string]: unknown;
  label: string;
  value: string;
  description?: string;
};

export interface AutocompleteProps extends InputProps {
  message?: string;
  bgHoverColor?: string;
  notFoundText?: string;
  /** Options to be displayed in the autocomplete */
  options: Option[];
  /** Input placeholder */
  placeholder?: string;
  /** Render prop to customize the badges */
  renderBadge?: (option: Option) => React.ReactNode;
  /** Render prop to customize the check icon */
  renderCheckIcon?: (option: Option) => React.ReactNode;
  /** Render prop to customize the create icon */
  renderCreateIcon?: (text?: string) => React.ReactNode;
  handleSubmission: (text: string) => void;
  clearError: () => void;
  error?: string;
}

export const Autocomplete = ({
  options,
  bgHoverColor,
  notFoundText = "Not found",
  message = "Start typing with /help",
  handleSubmission,
  error,
  clearError,
  ...rest
}: AutocompleteProps) => {
  const [partialResult, setPartialResult] = useState<Option[]>();
  const [displayOptions, setDisplayOptions] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");

  const onSubmit = () => {
    if (checkPartialExistCommand(inputValue)) {
      handleSubmission(inputValue);
    }
    setInputValue("");
    setDisplayOptions(false);
  };

  const filterOptions = (value: string) => {
    setInputValue(value);
    if (checkPartialExistCommand(value)) {
      setDisplayOptions(true);
      setPartialResult(filterCommands(options, value));
    } else {
      setDisplayOptions(false);
    }
  };

  const selectOptionFromList = (option: Option) => {
    setDisplayOptions(false);
    autoCompleteOptionSelection(option);
  };

  const autoCompleteOptionSelection = (option: Option) => {
    setInputValue((value) => {
      if (!value.includes(option.value)) {
        return value + option.value.split(value)?.[1];
      }
      return value;
    });
  };

  return (
    <>
      {displayOptions && (
        <List
          position="absolute"
          margin="0px 0px 0px 30px"
          bottom="60px"
          width="40%"
          background="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
        >
          {partialResult?.map((option) => (
            <Tooltip
              placement="top-start"
              key={option.value}
              label={option.description}
            >
              <ListItem
                _hover={{ bg: bgHoverColor || "gray.100" }}
                my={1}
                p={2}
                cursor="pointer"
                onClick={() => selectOptionFromList(option)}
              >
                <Flex align="center">{option.label}</Flex>
              </ListItem>
            </Tooltip>
          ))}
          {!partialResult?.length && (
            <ListItem my={1} p={2} data-testid="not-found">
              <Flex align="center">{notFoundText}</Flex>
            </ListItem>
          )}
        </List>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <Box data-testid="simple-autocomplete">
          <Flex justifyContent="center" alignItems="center">
            <Tooltip label={message}>
              <InfoIcon marginRight="10px" />
            </Tooltip>

            <Input
              onChange={(e) => filterOptions(e.currentTarget.value)}
              value={inputValue}
              {...rest}
            />
            <Tooltip label="Send">
              <Button
                size="sm"
                type="submit"
                marginLeft="10px"
                background="green.100"
              >
                <ArrowForwardIcon />
              </Button>
            </Tooltip>
          </Flex>
          {error && (
            <Flex alignItems="center" margin="5px 0px 0px 25px">
              <Text textColor="red.500">{error}</Text>
              <SmallCloseIcon
                cursor="pointer"
                onClick={clearError}
                margin="0px 0px 0px 10px"
              />
            </Flex>
          )}
        </Box>
      </form>
    </>
  );
};
