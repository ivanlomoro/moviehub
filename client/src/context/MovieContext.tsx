import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { createMovie as createMovieAPI, getAllMoviesByUserId as getAllMoviesByUserIdAPI } from '../services/movie.service';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface Movie {
    title: string;
    poster_image: string;
    score: number;
    genre: string;
    id:string;
}

interface User {
    id: string;
    name: string;
    email: string;
    createAt?: Date | string;
    updateAt?: Date | string;
}

interface MovieContextProps {
    movies: Movie[];
    fetchMovies: () => void;
    createMovie: (newMovie: Omit<Movie, 'userId'> & { registerUser: User }) => Promise<void>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

interface MovieProviderProps {
    children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [registerUser, setRegisterUser] = useState<User>();
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const createOrLoginUser = async () => {
            if (isAuthenticated && user) {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                try {
                    const response = await fetch(`${apiUrl}/user`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: user.name,
                            email: user.email,
                        }),
                    });

                    if (response.status === 201 || response.status === 409) {
                        console.log('Created or existing user');
                        const user = await response.json();

                        setRegisterUser(user);
                        console.log("User:", user);
                    } else {
                        console.error('Error creating or verifying user');
                    }
                } catch (error) {
                    console.error('Network error creating or verifying user', error);
                }
            }
        };

        createOrLoginUser();
    }, [isAuthenticated, user, navigate]);

    const fetchData = async () => {
        if (registerUser) {
            const moviesData = await getAllMoviesByUserIdAPI(registerUser.id);
            setMovies(moviesData);
            console.log("Fetching movies completed");
        }
    };

    const createMovie = async (newMovie: Omit<Movie, 'userId'> & { registerUser: User }): Promise<void> => {
        if (registerUser) {
            await createMovieAPI({ ...newMovie, userId: registerUser.id });
            fetchData();
        }
    };

    const contextValue: MovieContextProps = {
        movies,
        fetchMovies: fetchData,
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
