import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css';
import MovieModal from "./MovieModal/MovieModal";

export default function Banner() {
    const [movie, setMovie] = useState([null]);

    const [isClicked, setIsClicked] = useState(false);

    const [infoOpen, setInfoOpen] = useState(false);

    const videoKey = movie.videos?.results?.[0]?.key;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        // 현재 상영중인 영화 정보를 가져오기(여러 영화)
        const request = await axios.get(requests.fetchNowPlaying);
        
        // 여러 영화 중 영화 하나의 ID를 랜덤으로 가져오기
        const movieId = request.data.results[
            Math.floor(Math.random() * request.data.results.length)
        ].id;

        // 특정 영화의 상세 정보 가져오기
        const {data: movieDetail} = await axios.get(`/movie/${movieId}`, {
            params: {append_to_response: "videos"},
        });
        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    console.log("movie", movie);
    if (!isClicked) {
        return (
          <>
            <header
              className="banner"
              style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                backgroundPosition: "top center",
                backgroundSize: "cover",
              }}
            >
              <div className="banner_contents">
                <h1 className="banner_title">
                  {movie.title || movie.name || movie.original_name}
                </h1>
      
                <div className="banner_buttons">
                  <button
                    className="banner_button play"
                    onClick={() => videoKey && setIsClicked(true)}
                  >
                    ▶ Play
                  </button>
      
                  <button
                    className="banner_button info"
                    onClick={() => setInfoOpen(true)}
                  >
                    ⓘ More Information
                  </button>
                </div>
      
                <h1 className="banner_description">
                  {truncate(movie.overview, 100)}
                </h1>
              </div>
      
              <div className="banner_fadeBottom"></div>
            </header>
      
            {infoOpen && (
              <MovieModal {...movie} setModalOpen={setInfoOpen} />
            )}
          </>
        );
      

    } else {
        return (
            <Container>
                <HomeContainer>
                <button className="banner_video_close" onClick={() => setIsClicked(false)}>
                    x
                </button>
                <iframe
                    src={`https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&loop=1&mute=1&playlist=${videoKey}`}
                    title="YouTube video player"
                    frameBorder="0" 
                    allow="autoplay; fullscreen" 
                    allowFullScreen
                    style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                    }}
                    ></iframe>
                </HomeContainer>
            </Container>
        )
    }
}

// const Iframe = styled.iframe`
//     width: 100%;
//     height: 100%;
//     z-index: -1;
//     opacity: 0.65;
//     border: none;
    
//     &::after {
//         content: "";
//         position: absolute;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//     }`

const Container = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5000;
`

const HomeContainer = styled.div`
    position: relative;
    width: 90vw;
    max-width: 1200px;
    aspect-ratio: 16 / 9;
    background-color: black;
`