import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from '../api/axios';
import requests from '../api/requests';
import './Banner.css';

export default function Banner() {
    const [movie, setMovie] = useState([]);

    const [isClicked, setIsClicked] = useState(false);

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
        const {data: movieDetail} = await axios.get(`movie/${movieId}`, {
            params: {append_to_response: "videos"},
        });
        setMovie(movieDetail);
    };

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }


    console.log("movie", movie);
    if(!isClicked) {
        return <header
            className = "banner"
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
                backgroundPosition: "top center",
                backgroundSize: "cover"
            }}
        >
        <div className="banner_contents">
            <h1 className="banner_title">
                {movie.title || movie.name || movie.original_name}
            </h1>

            <div className="banner_buttons">
                <button className="banner_button play" onClick={() => setIsClicked(true)}>Play</button>
                <button className="banner_button info">More Information</button>
            </div>

            <h1 className="banner_description">{truncate(movie.overview, 100)}</h1>
        </div>
        <div className="banner_fadeBottom"></div>
      </header>
    } else {
        return (
            <Container>
                <HomeContainer>
                <iframe
                    width="640"
                    height="360"
                    src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mote=1&playlist=&{movie.videos.results[0].key}`}
                    title="YouTube video player"
                    frameBorder="0" 
                    allow="autoplay; fullscreen;" 
                    allowFullscreen
                    ></iframe>
                </HomeContainer>
            </Container>
        )
    }

}

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.65;
    border: none;
    
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }`

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
`

const HomeContainer = styled.div`
    width: 100%;
    height: 100%;
`