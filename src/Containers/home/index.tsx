import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
import { useState } from "react";
import { Autocomplete } from "../../Components/AutoComplete";
import type { HistoryCommands } from "../../Components/HistoryList";
import HistoryList from "../../Components/HistoryList";
import { CommandsOptions, parseQuery } from "../../utils";

export default function Index() {
  const [historyCommands, setHistory] = useState<HistoryCommands[]>([]);
  const [error, setError] = useState("");

  const clearError = () => {
    setError("");
  };

  const handleQuery = (query: string) => {
    const { cmd, params } = parseQuery(query);

    if (cmd) {
      try {
        const result =
          CommandsOptions.find((command) => command.value == cmd)?.callback(
            params
          ) || [];
        setHistory((prevHistory) => [
          ...prevHistory,
          {
            query,
            result,
          },
        ]);
        clearError();
      } catch (error) {
        console.error(error);
        setError("Something went wrong");
      }
    }
  };

  return (
    <Container maxW="5xl" height="100vh" border="1px solid black">
      <Flex width="100%" height="100%">
        <Box position="relative" width="100%" marginTop="auto" px={8} py={4}>
          <HistoryList historyCommands={historyCommands} />
          {historyCommands.length > 0 && (
            <Tooltip placement="top" label="Clear History">
              <Button
                background="red.100"
                bottom="20"
                right="0px"
                size="sm"
                position="absolute"
                onClick={() => setHistory([])}
              >
                <DeleteIcon />
              </Button>
            </Tooltip>
          )}
          <Divider margin="10px 20px" />
          <Autocomplete
            options={CommandsOptions.map((cmd) => ({
              label: cmd.label,
              value: cmd.value,
              description: cmd.description,
            }))}
            error={error}
            clearError={clearError}
            handleSubmission={handleQuery}
            notFoundText="Command not found"
            placeholder="Start Typing with /help"
          />
        </Box>
      </Flex>
    </Container>
  );
}
