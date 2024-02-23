import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MainURL, Authorization } from "../../constant";
import { original } from "immer";

export const fetchGetMyProducts: any = createAsyncThunk(
  "myProductsSlice/fetchGetMyProducts",
  async () => {
    const res = await fetch(`${MainURL}api/myProducts/`, {
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data;
  }
);

export const fetchAddProduct: any = createAsyncThunk(
  "myProductsSlice/fetchAddProduct",
  async (dataInfo: any = {}) => {
    const formData = new FormData();

    formData.append("title", dataInfo.title);
    formData.append("price", dataInfo.price);
    formData.append("category", dataInfo.category);
    formData.append("description", dataInfo.description);

    formData.append("image", dataInfo.image);

    const res = await fetch(`${MainURL}api/myProducts`, {
      method: "POST",
      headers: {
        Authorization,
      },
      body: formData,
    });
    const data = await res.json();
    return data.data;
  }
);

export const fetchUpdateProduct: any = createAsyncThunk(
  "myProductsSlice/fetchUpdateProduct",
  async (newData: any = {}) => {
    const formData = new FormData();

    newData.title !== undefined && formData.append("title", newData.title);
    newData.price !== undefined && formData.append("price", newData.price);
    newData.category !== undefined &&
      formData.append("category", newData.category);
    newData.description !== undefined &&
      formData.append("description", newData.description);

    newData.image !== undefined && formData.append("image", newData.image);

    const res = await fetch(`${MainURL}api/myProducts/${newData.productId}`, {
      method: "PATCH",
      headers: {
        Authorization,
      },
      body: formData,
    });
    const data = await res.json();
    return data.data;
  }
);

export const fetchDeleteProduct: any = createAsyncThunk(
  "myProductsSlice/fetchDeleteProduct",
  async (productId: string) => {
    const res = await fetch(`${MainURL}api/myProducts/${productId}`, {
      method: "Delete",
      headers: {
        Authorization,
      },
    });
    const data = await res.json();
    return data.data;
  }
);

export interface MyProductsSlice {
  myProducts: any[];
}

const initialState: MyProductsSlice = {
  myProducts: [],
};

export const myProductsSlice = createSlice({
  name: "myProductsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchGetMyProducts.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.myProducts = action.payload?.myProducts;
      }
    );

    builder.addCase(
      fetchAddProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.myProducts.push(action.payload);
      }
    );

    builder.addCase(
      fetchUpdateProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        original(state.myProducts)?.map((item: any, index: number) => {
          if (item._id === action.payload?._id) {
            state.myProducts[index] = action.payload;
          }
        });
      }
    );

    builder.addCase(
      fetchDeleteProduct.fulfilled,
      (state, action: PayloadAction<any>) => {
        original(state.myProducts)?.map((item: any, index: number) => {
          if (item._id === action.payload?._id) {
            state.myProducts.splice(index, 1);
          }
        });
      }
    );
  },
});


export default myProductsSlice.reducer;
