import * as React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerFooter,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  UseDisclosureReturn,
  DrawerProps,
} from "@chakra-ui/react";
import { Item } from "api/types";

export type ItemPanelProps = {
  disclosure: UseDisclosureReturn;
  variant: "create" | "edit";
  finalFocusRef: DrawerProps["finalFocusRef"];
  item: Item | null;
  onSave: (item: Item) => void;
};

type FormData = Omit<Item, "id">;

export function ItemPanel({
  disclosure,
  finalFocusRef,
  variant,
  item,
  onSave,
}: ItemPanelProps) {
  const { isOpen, onClose } = disclosure;
  const { register, handleSubmit, reset, setValue } = useForm<FormData>({
    defaultValues: {
      name: "",
      quantity: 0,
      location: "",
      notes: "",
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      reset();
      if (item) {
        setValue("name", item.name);
        setValue("quantity", item.quantity);
        setValue("location", item.location);
        setValue("notes", item.notes);
      }
    }
  }, [isOpen]);

  function handleSave(values: FormData) {
    onSave({
      id: item?.id ?? -1,
      ...values,
    });
  }

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={finalFocusRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          {variant === "create" ? "Create a new item" : "Edit your item"}
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                {...register("name", {
                  required: true,
                })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input type="number" {...register("quantity")} />
            </FormControl>

            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                {...register("location", { required: true })}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Notes</FormLabel>
              <Textarea {...register("notes")} />
            </FormControl>
          </Stack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(handleSave)}>
            Save
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
