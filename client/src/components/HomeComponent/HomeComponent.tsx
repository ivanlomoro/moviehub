import { useState } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import MovieCard from '../MovieCard/MovieCard';
import "./HomeComponent.styles.css"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import Modal from '../Modal/Modal';


const HomeComponent: React.FC = () => {
    const { movies, createMovie } = useMovieContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <h1>Home</h1>

            <div>
                <button onClick={openModal}>Abrir Modal</button>
                <Modal isOpen={isModalOpen} onClose={closeModal} onCreateMovie={createMovie} />
            </div>


            <div className='container-swiper'>
                <h2>{movies.length > 0 ? 'Your added movies' : 'No movies added'}</h2>
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
