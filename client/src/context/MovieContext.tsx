import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { createMovie as createMovieAPI, getAllMoviesByUserId as getAllMoviesByUserIdAPI } from '../services/movie.service';

interface Movie {
    title: string;
    poster_image: string;
    score: number;
    genre: string;
}

interface MovieContextProps {
    movies: Movie[];
    fetchMovies: () => void;
    createMovie: (newMovie: Omit<Movie, 'userId'>) => Promise<void>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

interface MovieProviderProps {
    children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const userId = '65524c31a2830e1a48b127f9';

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        const moviesData = await getAllMoviesByUserIdAPI(userId);
        setMovies(moviesData);
    };

    const createMovie = async (newMovie: Omit<Movie, 'userId'>) => {
        await createMovieAPI({ ...newMovie, userId });
        fetchMovies();
    };

    const contextValue: MovieContextProps = {
        movies,
        fetchMovies,
        createMovie,
    };

    return <MovieContext.Provider value={contextValue}>{children}</MovieContext.Provider>;
};

export const useMovieContext = (): MovieContextProps => {
    const context = useContext(MovieContext);
    if (!context) {
        throw new Error('useMovieContext debe ser utilizado dentro de un MovieProvider');
    }
    return context;
};
