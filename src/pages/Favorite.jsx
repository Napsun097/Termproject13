import React, { useState, useEffect } from "react";
import axios from "axios";
import FavoriteCard from "../Components/FavoriteCard";
import "../style/favorite.css";

const Favorite = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:1337/api/favorites?populate[course][populate]=image")
            .then(response => {
                console.log("Favorites fetched:", response.data); // Debugging log

                // ✅ Ensure we correctly extract data from Strapi's structure
                if (response.data && response.data.data) {
                    setFavorites(response.data.data); // Set entire favorites list
                }
            })
            .catch(error => {
                console.error("Error fetching favorite courses!", error);
            });
    }, []);

    const handleRemoveFavorite = (favoriteId) => {
        axios.delete(`http://localhost:1337/api/favorites/${favoriteId}`)
            .then(() => {
                setFavorites(favorites.filter(fav => fav.id !== favoriteId));
            })
            .catch(error => {
                console.error("Error removing favorite!", error);
            });
    };

    return (
        <div className="Favorite-page">
            <h1 className="favorite-head-text">Favorite Courses</h1>

            <div className="course-list">
                {favorites.length > 0 ? (
                    favorites.map(fav => (
                        <FavoriteCard
                            key={fav.id}
                            favorite={fav} // ✅ Correctly extract attributes
                            onRemoveFavorite={() => handleRemoveFavorite(fav.id)}
                        />
                    ))
                ) : (
                    <p className="no-favorites">No favorite courses found.</p>
                )}
            </div>
        </div>
    );
};

export default Favorite;
