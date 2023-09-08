export type Item = {
  id: number;
  name: string;
  quantity: number;
  location: string;
  notes: string;
};

export type ItemCreation = Omit<Item, "id">;
