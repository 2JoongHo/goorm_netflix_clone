import React, { useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import "./MovieModal.css";

function MovieModal({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  videos,
  setModalOpen,
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  const ref = useRef();
  useOnClickOutside(ref, () => setModalOpen(false));

  const trailerKey = videos?.results?.find((v) => v.type === "Trailer")?.key;

  return (
    <div className="presentation">
      <div className="wrapper-modal">
        <div className="modal" ref={ref}>
          {!isPlaying ? (
            <>
              <span className="modal-close" onClick={() => setModalOpen(false)}>
                ✕
              </span>

              <img
                className="modal_poster-img"
                src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
                alt="modal poster"
              />

              <div className="modal_content">
                <p className="modal_details">
                  <span className="modal_user_perc">100% for you</span>
                  {release_date ? " " + release_date : " " + first_air_date}
                </p>

                <h2 className="modal_title">{title ? title : name}</h2>

                <p className="modal_overview">⭐ 평점: {vote_average}</p>

                <p className="modal_overview">{overview}</p>

                {trailerKey && (
                  <button
                    className="modal_play"
                    onClick={() => setIsPlaying(true)}
                  >
                    ▶ Play
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="modal_video">
              <span className="modal-close" onClick={() => setIsPlaying(false)}>
                ✕
              </span>

              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=1`}
                title="YouTube trailer"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieModal;
