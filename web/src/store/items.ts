import {
  createAsyncThunk,
  createSlice,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { Item, ItemCreation } from "api/types";
import * as apiClient from "api/client";
import { RootState } from "store/store";

type State = {
  items: {
    data: Item[];
    isLoading: boolean;
  };
};

const initialState: State = {
  items: {
    data: [],
    isLoading: false,
  },
};

const { reducer, actions } = createSlice({
  name: "items",
  initialState,
  reducers: {
    searchItems(state, action: PayloadAction<string>) {
      state.items.data = action.payload
        ? state.items.data.filter((item) =>
            item.name.toLowerCase().includes(action.payload)
          )
        : state.items.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadItems.pending, (state) => {
        state.items.isLoading = true;
      })
      .addCase(loadItems.fulfilled, (state, action) => {
        state.items.isLoading = false;
        state.items.data = action.payload;
      })
      .addCase(loadItems.rejected, (state) => {
        state.items.isLoading = false;
      });

    builder.addCase(deleteItem.fulfilled, (state, action) => {
      state.items.data = state.items.data.filter(
        (item) => item.id !== action.meta.arg.id
      );
    });

    builder.addCase(createItem.fulfilled, (state, action) => {
      state.items.data.push(action.payload);
    });

    builder.addCase(updateItem.fulfilled, (state, action) => {
      state.items.data = state.items.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    });
  },
});

export const { searchItems } = actions;

export const selectState = (state: RootState) => state.items;

export const selectItems = createSelector(
  selectState,
  (state) => state.items.data
);

export const selectItemsLoading = createSelector(
  selectState,
  (state) => state.items.isLoading
);

export const loadItems = createAsyncThunk("loadItems", () =>
  apiClient.fetchItems().then((res) => res.data)
);

export const deleteItem = createAsyncThunk("deleteItem", (item: Item) =>
  apiClient.deleteItem(item.id)
);

export const createItem = createAsyncThunk(
  "createItem",
  (item: ItemCreation) => {
    return apiClient.createItem(item).then((res) => res.data);
  }
);

export const updateItem = createAsyncThunk("updateItem", (item: Item) => {
  return apiClient.updateItem(item).then((res) => res.data);
});

export { reducer };
