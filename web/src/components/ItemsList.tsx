import React from "react";
import {
  Button,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
} from "@chakra-ui/react";
import { Item } from "api/types";

type ItemListProps = {
  items: Item[];
  onEditItem: (item: Item) => void;
  onDeleteItem: (item: Item) => void;
};

function ItemList({ items, onEditItem, onDeleteItem }: ItemListProps) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Name</Th>
          <Th>Quantity</Th>
          <Th>Location</Th>
          <Th>Notes</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {!items || items.length <= 0 ? (
          <Tr>
            <Td colSpan={6} align="center">
              <b>There are no records to display</b>
            </Td>
          </Tr>
        ) : (
          items.map((item) => (
            <Tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.quantity}</Td>
              <Td>{item.location}</Td>
              <Td>{item.notes}</Td>
              <Td align="center">
                <Stack spacing={2} direction="row">
                  <Button onClick={() => onEditItem(item)}>Edit</Button>
                  <Button onClick={() => onDeleteItem(item)}>Delete</Button>
                </Stack>
              </Td>
            </Tr>
          ))
        )}
      </Tbody>
    </Table>
  );
}

export default ItemList;
