import React, { useState, ChangeEvent, useEffect } from 'react';
import './Modal.styles.css'
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateMovie: (newMovie: NewMovie) => void;
}

interface NewMovie {
  title: string;
  poster_image: string;
  score: number;
  genre: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onCreateMovie }) => {
  const [newMovie, setNewMovie] = useState<NewMovie>({
    title: '',
    poster_image: '',
    score: 0,
    genre: '',
  });

  useEffect(() => {
    if (isOpen) {
      setNewMovie({
        title: '',
        poster_image: '',
        score: 0,
        genre: '',
      });
    }
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  const handleCreateMovie = () => {
    onCreateMovie(newMovie);
    onClose();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="modal-movie">
        <input type="text" name="title" placeholder='Title' value={newMovie.title} onChange={handleInputChange} />
        <input type="text" name="poster_image" placeholder='Poster' value={newMovie.poster_image} onChange={handleInputChange} />
        <input type="text" name="genre" placeholder='Genre' value={newMovie.genre} onChange={handleInputChange} />
        <input
          type="text"
          placeholder="Rate (1-10)"
          value={newMovie.score === 0 ? '' : String(newMovie.score)}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (/^(10|[1-9])$/.test(inputValue)) {
              setNewMovie({ ...newMovie, score: parseInt(inputValue, 10) });
            }
          }}
        />

        <button className="create-button" onClick={handleCreateMovie}>
          Add movie
        </button>
        <button className="close-button" onClick={onClose}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};

export default Modal;
