import {
  Divider,
  List,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import type { ResultType } from "../../utils";

export interface HistoryCommands {
  query: string;
  result: Array<ResultType>;
}

export interface HistoryListProps {
  historyCommands: HistoryCommands[];
}

export default function History({ historyCommands = [] }: HistoryListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(scrollToBottom, [historyCommands]);

  return (
    <UnorderedList
      maxHeight="700px"
      overflowY="auto"
      spacing={3}
      listStyleType="none"
      position="relative"
      margin="10px 25px"
    >
      {historyCommands.length > 0 ? (
        historyCommands.map((hist, index) => (
          <List rounded="md" cursor="pointer" key={index}>
            <Tooltip
              hasArrow
              placement="left"
              label="Query"
              key={`result-${index}`}
            >
              <ListItem padding="4px" background="gray.50">
                {hist.query}
              </ListItem>
            </Tooltip>
            <Divider />
            {hist.result.map((result, key) => (
              <Tooltip
                hasArrow
                placement="left"
                label="Result"
                key={`result-${key}`}
              >
                <ListItem padding="4px" background="gray.100">
                  {result}
                </ListItem>
              </Tooltip>
            ))}
          </List>
        ))
      ) : (
        <List>
          <Text textAlign="center" color="gray.300">
            No History
          </Text>
        </List>
      )}
      <div ref={messagesEndRef} />
    </UnorderedList>
  );
}
