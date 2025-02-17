import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Fetch the favorite courses from the database when the component mounts
    axios.get('/api/favorites')
      .then(response => {
        setFavorites(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the favorite courses!', error);
      });
  }, []);

  const handleFavoriteClick = (courseId) => {
    // Add the course to the favorite database
    axios.post('/api/favorites', { courseId })
      .then(response => {
        // Update the favorites state to include the new favorite course
        setFavorites([...favorites, response.data]);
      })
      .catch(error => {
        console.error('There was an error adding the course to favorites!', error);
      });
  };

  return (
    <div>
      <h1>Favorite Courses</h1>
      <ul>
        {favorites.map(course => (
          <li key={course.id}>
            {course.name}
            <button onClick={() => handleFavoriteClick(course.id)}>Favorite</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorite;