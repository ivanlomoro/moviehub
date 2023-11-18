import React from 'react';
import './MovieCard.styles.css'
import { FaTrash } from "react-icons/fa";

interface MovieCardProps {
    title: string;
    genre: string;
    score: number;
    posterImage: string;
    id?: string;
    onDelete: () => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, genre, score, posterImage, onDelete }) => {
    return (
        <div className="movie-card">
            <img src={posterImage} alt={title} className="movie-card__image" />
            <div className="movie-card__info">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__genre">Género: {genre}</p>
                <p className="movie-card__score">Puntuación: {score}</p>
                <button className="delete-button-trash" onClick={onDelete}>
                    <FaTrash className="delete-icon-trash" />
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
