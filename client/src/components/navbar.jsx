import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Navbar = () => {
    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const userID = window.localStorage.getItem("userID");

    const logout = () => {
        setCookies("access_token", "", { path: "/" });
        window.localStorage.removeItem("userID");
        navigate("/auth");
    }
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/create-recipe">Create Recipe</Link>

            {!cookies.access_token ? <Link to="/auth">Login/Sign Up</Link> :
                <>
                    <Link to="/saved-recipes">Saved Recipes</Link>
                    <button id='logout-btn' onClick={logout}>Logout</button>
                </>}
        </div>
    )
}