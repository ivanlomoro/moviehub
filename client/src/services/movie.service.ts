const BASE_URL = 'http://localhost:8080/movie';

export interface Movie {
    title: string;
    poster_image: string;
    score: number;
    genre: string;
    userId: string;
}

export const getAllMovies = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error getting movies', error);
        return [];
    }
};

export const createMovie = async (newMovie: Movie) => {
    try {
        const response = await fetch(`${BASE_URL}/${newMovie.userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        });

        if (!response.ok) {
            throw new Error(`Error creating movie: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error creating movie', error);
    }
};

export const getAllMoviesByUserId = async (userId: string) => {
    try {
        const response = await fetch(`${BASE_URL}/user/${userId}`);
        const data = await response.json();
        console.log("Data",data);
        return data;
    } catch (error) {
        console.error(`Error getting user's movies ${userId}`, error);
        return [];
    }
};
