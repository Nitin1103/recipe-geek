import axios from "axios";
import { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export const CreateRecipe = () => {
    const userID = useGetUserID();
    const [cookies, _] = useCookies(["access_token"]);
    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecipe({
            ...recipe,
            [name]: value,
        });
    }

    const handleIngredientChange = (event, index) => {
        const ingredients = [...recipe.ingredients];
        ingredients[index] = event.target.value;
        setRecipe({
            ...recipe,
            ingredients,
        });
    }
    const addIngredient = () => {
        setRecipe({
            ...recipe,
            ingredients: [...recipe.ingredients, ""]
        });
    }
    // console.log(recipe);
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/recipes", recipe, { headers: { authorization: cookies.access_token } });
            alert('Recipe Created');
            console.log(response);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className="create-recipe">
            <h2>Create A Recipe</h2>
            <form onSubmit={onSubmit}>
                <label htmlFor="name" >Name</label>
                <input type="text" id="name" name='name' onChange={handleChange} required />
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredient, index) => (
                    <input type="text" key={index} name="ingredients" value={ingredient} onChange={(event) => handleIngredientChange(event, index)} />
                ))}


                <button onClick={addIngredient} type="button">Add Ingredient</button>
                <label htmlFor="instructions" >Instructions</label>
                <textarea name="instructions" id="instructions" cols="30" rows="10" onChange={handleChange} required></textarea>
                <label htmlFor="imageUrl">Image URL</label>
                <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} required />
                <label htmlFor="cookingTime">Cooking Time(minutes)</label>
                <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} required />
                <button type="submit">Create Recipe</button>
            </form>
        </div>
    )
}