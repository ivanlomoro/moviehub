import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { createMovie as createMovieAPI, getAllMoviesByUserId as getAllMoviesByUserIdAPI } from '../services/movie.service';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface Movie {
    title: string;
    poster_image: string;
    score: number;
    genre: string;
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
    /*     const userId = '65524c31a2830e1a48b127f9'; */
    const [registerUser, setRegisterUser] = useState<User>();
    console.log("registerUser:", registerUser)
    const { user, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        fetchMovies();
        const createOrLoginUser = async () => {
            if (isAuthenticated && user) {
                try {
                    const response = await fetch('http://localhost:8080/user', {
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
                        console.log('Usuario creado o existente');
                        const user = await response.json();

                        setRegisterUser(user)
                        console.log("User:", user)
                        fetchMovies();
                    } else {
                        console.error('Error al crear o verificar usuario');
                    }
                } catch (error) {
                    console.error('Error de red al crear o verificar usuario', error);
                }
            }
        };

        createOrLoginUser();
    }, [isAuthenticated, user, navigate]);

    const fetchMovies = async () => {
        if (registerUser) {
            const moviesData = await getAllMoviesByUserIdAPI(registerUser.id);
            setMovies(moviesData);
        }
    };

    const createMovie = async (newMovie: Omit<Movie, 'userId'> & { registerUser: User }): Promise<void> => {
        if (registerUser) {
            await createMovieAPI({ ...newMovie, userId: registerUser.id });
            fetchMovies();
        }
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
