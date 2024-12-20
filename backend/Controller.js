import { User, Recipe } from "./Schema.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res
      .header(
        "Access-Control-Allow-Origin",
        "*"
      )
      .status(200)
      .json({
        message: "User created successfully",
        user: user,
      });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user.password === password) {
      const tokenData = {
        userId: user._id,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET);
      res
        .header(
          "Access-Control-Allow-Origin",
          "*"
        )
        .status(200)
        .cookie("token", token, {
          maxAge: 15 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: "strict",
          secure: "development",
        })
        .json({
          message: "User logged in successfully",
          token: token,
          user: user,
        });
    } else {
      res.status(400).json({
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const createRecipe = async (req, res) => {
  const { recipeName, instructions, ingredients } = req.body;
  const { _id } = req.user;
  try {
    const create = await Recipe.create({
      recipeName,
      instructions,
      ingredients,
    });
    await User.findByIdAndUpdate(_id, { $push: { recipes: create._id } });
    res
      .header(
        "Access-Control-Allow-Origin",
        "*"
      )
      .status(201)
      .json({
        message: "Recipe created successfully",
        create,
      });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const deleteRecipe = async (req, res) => {
  const { id } = req.body;
  try {
    const deleteRecipe = await Recipe.findByIdAndDelete({ _id: id });
    res
      .header(
        "Access-Control-Allow-Origin",
        "*"
      )
      .status(200)
      .json({
        message: "Recipe deleted successfully",
        deleteRecipe,
      });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const findRecipe = async (req, res) => {
  try {
    const findRecipe = await Recipe.find();
    res
      .header(
        "Access-Control-Allow-Origin",
        "*"
      )
      .status(200)
      .json({ findRecipe });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const usersRecipe = async (req, res) => {
  const id = req.user._id;
  try {
    const user = await User.findById(id);
    const recipes = await user.recipes.map((recipes) => recipes._id);
    const usersRecipe = await Recipe.find({ _id: { $in: recipes } });
    res
      .header(
        "Access-Control-Allow-Origin",
        "*"
      )
      .status(200)
      .json({
        message: "Recipes found",
        usersRecipe,
        user,
      });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const updateRecipe = async (req, res) => {
  const { id, recipeName, instructions, ingredients, exceptions } = req.body;
  try {
    const updateRecipe = await Recipe.findByIdAndUpdate(id, {
      recipeName,
      instructions,
      ingredients,
      exceptions,
    });
    res
      .header(
        "Access-Control-Allow-Origin",
        "*"
      )
      .status(200)
      .json({
        message: "Recipe updated successfully",
        updateRecipe,
      });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const contactUs = async (req, res) => {
  const { subject, email, message } = req.body;
  try {
    const contactUs = await ContactUs.create({ subject, email, message });
    res
      .header(
        "Access-Control-Allow-Origin",
        "*"
      )
      .status(200)
      .json({
        message: "Message sent successfully",
        contactUs,
      });
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};

export const likes = async (req, res) => {
  const id = req.user._id;
  try {
    const recipeId = req.body._id;
    const recipe = await Recipe.findById(recipeId);
    if (recipe.likes.includes(id)) {
      const liked = await Recipe.findByIdAndUpdate(recipeId, {
        $pull: { likes: id },
      });
      res
        .header(
          "Access-Control-Allow-Origin",
          "*"
        )
        .status(200)
        .json({
          message: "Recipe disliked successfully",
          liked,
        });
    } else {
      const liked = await Recipe.findByIdAndUpdate(recipeId, {
        $push: { likes: id },
      });
      res
        .header(
          "Access-Control-Allow-Origin",
          "*"
        )
        .status(200)
        .json({
          message: "Recipe liked successfully",
          liked,
        });
    }
  } catch (error) {
    res.status(400).json({
      message: "Error",
      error: error.message,
    });
  }
};
