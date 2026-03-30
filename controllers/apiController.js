import recipeModel from "../models/recipeModel.js";

// ✅ GET ALL CUISINES
export const getCuisines = async (req, res) => {
  try {
    const cuisines = await recipeModel.aggregate([
      {
        $group: {
          _id: "$cuisine",
          image: { $first: "$image" }, 
          recipeName: { $first: "$name" }
        }
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          image: 1,
          recipeName: 1
        }
      }
    ]);

    return res.status(200).json({
      message: "Cuisines Fetched Successfully",
      cuisines,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some error occurred",
      error: error.message,
      success: false,
    });
  }
};

// ✅ GET RANDOM RECIPE
export const quickRecipe = async (req, res) => {
  try {
    const randomMeal = await recipeModel.aggregate([{ $sample: { size: 1 } }]);

    return res.status(200).json({
      recipe: randomMeal[0] || null,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching random recipe",
      error: error.message,
      success: false,
    });
  }
};

// ✅ GET MEALS BY CUISINE
export const mealByCuisines = async (req, res) => {
  try {
    const { cusinename } = req.params;

    const recipes = await recipeModel.find({
      cuisine: cusinename
    });
    return res.status(200).json({
      message: "Recipes fetched successfully",
      count: recipes.length,
      recipes,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching recipes",
      error: error.message,
      success: false,
    });
  }
};

// ✅ GET SINGLE RECIPE BY ID
export const getRecipe = async (req, res) => {
  try {
    const { foodId } = req.params;

    const recipeDetail = await recipeModel.find({ recipeNo: Number(foodId) });

    if (!recipeDetail) {
      return res.status(404).json({
        message: "Recipe not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Recipe details fetched successfully",
      success: true,
      recipeDetail:recipeDetail[0],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error finding recipe details",
      error: error.message,
      success: false,
    });
  }
};
