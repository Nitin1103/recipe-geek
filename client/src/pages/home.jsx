import React, { useEffect, useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from "axios";
import { useCookies } from "react-cookie";

export const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        const fetchSavedRecipes = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
                );
                setSavedRecipes(response.data.savedRecipes);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRecipes();
        if (cookies.access_token) fetchSavedRecipes();
    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes", {
                recipeID,
                userID,
            }, { headers: { authorization: cookies.access_token } });
            setSavedRecipes(response.data.savedRecipes);
        } catch (err) {
            console.log(err);
        }
    };

    const isRecipeSaved = (id) => savedRecipes.includes(id);

    return (
        <div className="home">
            <div className="feed">
                <h1 className="heading">RecipeGeek</h1>
                {!cookies.access_token && (
                    <h3 className="loginMsg"><a href="/auth">Login</a>now to save your favourite recipes</h3>
                )}
                <ul>
                    {recipes.map((recipe) => (
                        <li key={recipe._id}>
                            <div className="recipe-name">
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
                            <div className="dish-img">
                                <img src={recipe.imageUrl} alt={recipe.name} />
                            </div>
                            <p>Cooking Time: {recipe.cookingTime} minutes</p>
                            {cookies.access_token && (
                                <button id="save-btn"
                                    onClick={() => saveRecipe(recipe._id)}
                                    disabled={isRecipeSaved(recipe._id)}
                                >
                                    {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    );
};
// console.log("test");