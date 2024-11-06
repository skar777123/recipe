import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import axios from "axios";

export const findRecipes = createAsyncThunk("findRecipe", async () => {
  const response = await fetch("https://yumcipe.onrender.com/recipe");
  return response.json();
});

export const userRecipes = createAsyncThunk("userRecipes", async () => {
  const response = await fetch("https://yumcipe.onrender.com/userRecipe", {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });

  return response.json();
});

export const Login = createAsyncThunk("login", async (value) => {
  const response = await axios
    .post("https://yumcipe.onrender.com/login", {
      email: value.email,
      password: value.password,
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
  return response;
});
export const Register = createAsyncThunk("register", async (value) => {
  const response = await axios
    .post("https://yumcipe.onrender.com/register", {
      email: value.email,
      password: value.password,
      name: value.name,
    })
    .then((res) => res.data)
    .catch((err) => console.error(err));
  return response;
});

export const AddRecipe = createAsyncThunk("addRecipe", async (value) => {
  const response = await axios
    .post(
      "https://yumcipe.onrender.com/createRecipe",
      {
        recipeName: value.name,
        ingredients: value.ingredients,
        instructions: value.instructions,
        userId: localStorage.getItem("user"),
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((res) => res.data)
    .catch((err) => console.error(err));
  return response;
});

const fecthed = createSlice({
  name: "data",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(findRecipes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(findRecipes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(findRecipes.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
    builder.addCase(userRecipes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userRecipes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(userRecipes.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
    builder.addCase(Login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(Login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(Login.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
    builder.addCase(Register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(Register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(Register.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
    builder.addCase(AddRecipe.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(AddRecipe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(AddRecipe.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default fecthed.reducer;
