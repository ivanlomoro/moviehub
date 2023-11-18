import { useEffect, useState } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import MovieCard from '../MovieCard/MovieCard';
import "./HomeComponent.styles.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Modal from '../Modal/Modal';
import { FaCirclePlus } from "react-icons/fa6";

const HomeComponent: React.FC = () => {
    const { movies, createMovie, fetchMovies } = useMovieContext();
    const [, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchMovies();
            setLoading(false);
        };

        if (movies.length === 0) {
            loadData();
        }
    }, [fetchMovies, movies]);

    return (
        <div>
            <div className="title-and-button-container">
                <h1 className='title-home'>{movies.length > 0 ? 'Your added movies ' : 'No movies added '}</h1>
                <div>
                    <button className="icon-button" onClick={openModal}>
                        <FaCirclePlus className="add-icon" />
                    </button>
                    <Modal isOpen={isModalOpen} onClose={closeModal} onCreateMovie={createMovie} />
                </div>
            </div>
            <div className='container-swiper'>
                <Swiper
                    effect={'coverflow'}
                    spaceBetween={10}
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    grabCursor={true}
                    centeredSlides={true}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                >
                    {movies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <MovieCard
                                title={movie.title}
                                genre={movie.genre}
                                score={movie.score}
                                posterImage={movie.poster_image}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default HomeComponent;
