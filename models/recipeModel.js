import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    unit: {
      type: String,
      default: null,
      trim: true,
    },
    quantity: {
      type: String,
      default: null,
    },
  },
  { _id: false }
);

const recipeSchema = new mongoose.Schema(
  {
    

    name: {
      type: String,
      required: true,
      trim: true,
    },

    diet: {
      type: String,
      enum: ["VEG", "NON_VEG", "VEGAN", "JAIN", "EGGETARIAN"],
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
      trim: true,
      index: true, 
    },

    category: {
      type: String,
      trim: true,
    },

    tags: [
      {
        type: String,
        lowercase: true,
        trim: true,
      },
    ],

    ingredients: [ingredientSchema],

    instructions: [
      {
        type: String,
        trim: true,
      },
    ],

    
    image: {
      type: String, 
      default: null,
    },

    youtube: {
      type: String,
      default: null,
    },

    time: {
      type: Number, 
      default: 0,
    },
  },
  { timestamps: true }
);



recipeSchema.index({ name: "text", "ingredients.itemName": "text" });
recipeSchema.index({ cuisine: 1 });
recipeSchema.index({ diet: 1 });
recipeSchema.index({ tags: 1 });

export default mongoose.model("Recipe", recipeSchema);