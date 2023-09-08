import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Button,
  Box,
  Center,
  FormLabel,
  Text,
  Input,
  Stack,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { Item } from "api/types";

import ItemList from "./ItemsList";
import { useAppDispatch } from "../store/store";
import {
  loadItems,
  createItem,
  updateItem,
  deleteItem,
  searchItems,
  selectItems,
  selectItemsLoading,
} from "../store/items";
import { ItemPanel } from "./ItemPanel";
import { ItemDeleteConfirmationDialog } from "./ItemDeleteConfirmationDialog";

function Main() {
  const dispatch = useAppDispatch();
  const items = useSelector(selectItems);
  const itemsLoading = useSelector(selectItemsLoading);

  const [itemToDelete, setItemToDelete] = useState<Item | null>(null);
  const [itemEditing, setItemEditing] = useState<Item | null>(null);
  const [panelVariant, setPanelVariant] = useState<"create" | "edit">("create");
  const [keyword, setKeyword] = useState("");
  const deleteConfirmationDisclosure = useDisclosure();
  const itemPanelDisclosure = useDisclosure();

  useEffect(() => {
    dispatch(loadItems());
  }, [dispatch]);

  function handleDeleteItem(item: Item) {
    setItemToDelete(item);
    deleteConfirmationDisclosure.onOpen();
  }

  function handleConfirmDeleteItem() {
    if (!itemToDelete) return;
    dispatch(deleteItem(itemToDelete));
    deleteConfirmationDisclosure.onClose();
  }

  function handleEditItem(item: Item) {
    setItemEditing(item);
    setPanelVariant("edit");
    itemPanelDisclosure.onOpen();
  }

  function handleSaveItem(item: Item) {
    if (item.id < 0) {
      dispatch(createItem(item));
    } else {
      dispatch(updateItem(item));
    }

    itemPanelDisclosure.onClose();
  }

  function handleCreate() {
    setPanelVariant("create");
    itemPanelDisclosure.onOpen();
  }

  function handleSearch() {
    dispatch(searchItems(keyword));
  }

  return (
    <Box className="Main" p={3}>
      <Center>
        <Text fontSize="2xl">Simplified ERP-like Item Management System</Text>
      </Center>
      <div style={{ marginTop: "20px" }}>
        {itemsLoading ? (
          <Center width="100%" p={5}>
            <Spinner />
          </Center>
        ) : (
          <Stack spacing={2}>
            <Stack direction="row">
              <Button onClick={handleCreate} mr={3}>
                Create
              </Button>

              <Stack direction="row" alignItems="center" ml="auto">
                <FormLabel>Keyword</FormLabel>

                <Input
                  name="keyword"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />

                <Button onClick={handleSearch}>Search</Button>
              </Stack>
            </Stack>

            <ItemList
              items={items}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
            />
          </Stack>
        )}
      </div>

      <ItemPanel
        variant={panelVariant}
        finalFocusRef={undefined}
        item={itemEditing}
        disclosure={itemPanelDisclosure}
        onSave={handleSaveItem}
      />

      <ItemDeleteConfirmationDialog
        isOpen={deleteConfirmationDisclosure.isOpen}
        onClose={deleteConfirmationDisclosure.onClose}
        onConfirm={() => handleConfirmDeleteItem()}
      />
    </Box>
  );
}

export default Main;
