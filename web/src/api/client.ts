import axios from "axios";

import { Item, ItemCreation } from "./types";

const apiClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

apiClient.interceptors.response.use((res) => {
  if (res.status >= 200 && res.status <= 300) {
    return res;
  }
  return res;
});

export function fetchItems() {
  return apiClient.get<Item[]>("/items/");
}

export function createItem(data: ItemCreation) {
  return apiClient.post<Item>("/items/", data);
}

export function deleteItem(itemId: number) {
  return apiClient.delete(`/items/${itemId}/`);
}

export function updateItem(item: Item) {
  return apiClient.put<Item>(`/items/${item.id}/`, item);
}
