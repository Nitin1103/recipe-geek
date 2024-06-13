import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/${userID}`
                );
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
                // Handle error here
                // Display an error message or perform any other necessary actions
            }
        };
        fetchSavedRecipes();
    }, []);

    const handleDeleteRecipe = async (recipeId) => {
        try {
            await axios.delete(`http://localhost:3001/recipes/${recipeId}`);
            // Use functional update to ensure you're working with the latest state
            setSavedRecipes(prevRecipes => prevRecipes.filter(recipe => recipe._id !== recipeId));
        } catch (err) {
            console.log(err);
            // Handle error here
            // Display an error message or perform any other necessary actions
        }
    };


    return (
        <div className="saved-recipes">
            <h1>Saved Recipes</h1>
            <ul>
                {savedRecipes.map((recipe) => (
                    <li key={recipe._id}>
                        <div>
                            <h2>{recipe.name}</h2>
                        </div>
                        <div className="ingredients">
                            <h3>Ingredients:</h3>
                            <ul id="ing-list">
                                {recipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="instructions">
                            <h3>Instructions:</h3>
                            <p>{recipe.instructions}</p>
                        </div>
                        <p>{recipe.description}</p>
                        <img src={recipe.imageUrl} alt={recipe.name} />
                        <p>Cooking Time: {recipe.cookingTime} minutes</p>
                        <button onClick={() => handleDeleteRecipe(recipe._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};