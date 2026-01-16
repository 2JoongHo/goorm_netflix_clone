import React, { useEffect, useRef, useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "../api/axios";
import MovieModal from "./MovieModal/MovieModal";
import "./Row.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Row({ title, id, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  const [activeId, setActiveId] = useState(null);
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    };
    fetchMovieData();
  }, [fetchUrl]);

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };

  const handleMouseEnter = (movieId) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setActiveId(movieId);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setActiveId(null);
      leaveTimerRef.current = null;
    }, 450);
  };

  return (
    <section className="row" id={id}>
      <h2>{title}</h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        spaceBetween={12}
        breakpoints={{
          1378: { slidesPerView: 6, slidesPerGroup: 6 },
          998: { slidesPerView: 5, slidesPerGroup: 5 },
          625: { slidesPerView: 4, slidesPerGroup: 4 },
          0: { slidesPerView: 3, slidesPerGroup: 3 },
        }}
      >
        {movies.map((movie) => {
          const path = isLargeRow ? movie.poster_path : movie.backdrop_path;
          if (!path) return null;

          return (
            <SwiperSlide
              key={movie.id}
              className={`row_slide ${activeId === movie.id ? "is-active" : ""}`}
            >
              <img
                className={`row_poster_item ${
                  isLargeRow ? "row_poster_item_Large" : ""
                }`}
                src={`https://image.tmdb.org/t/p/original/${path}`}
                alt={movie.name || movie.title}
                onClick={() => handleClick(movie)}
                onMouseEnter={() => handleMouseEnter(movie.id)}
                onMouseLeave={handleMouseLeave}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {modalOpen && (
        <MovieModal {...movieSelected} setModalOpen={setModalOpen} />
      )}
    </section>
  );
}
