import React, { useContext, useEffect, useState } from "react";
import { currBook } from './Books.jsx'
import BackButton from "./BackButton";
import { getBookRecommendation } from "../../dataCenter.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Card from "./Card.jsx";
import Loading from "../Songs/Loading.jsx";
import LikeButton from "./LikeButton.jsx";

function BigCard(){
    const { selectedBook, setSelectedBook } = useContext(currBook);
    const [recommendationData, setRecommendationData] = useState(null);
    const sliderSetting = {
        dots: true,
        dotsClass: "slick-dots custom-dots",
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1524,
                settings: {
                    slidesToShow: 4,
                },
                },
            {
            breakpoint: 1224,
            settings: {
                slidesToShow: 3,
            },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                },
                },
            {
            breakpoint: 650,
            settings: {
                slidesToShow: 1,
            },
            },
        ],
        };
    useEffect(() => {
        const recommendation = () => {
            getBookRecommendation(selectedBook._id)
            .then(data => setRecommendationData(data))
            .catch(err => console.log("Error on Big-Card: " + err));
        };
        
        if (selectedBook && selectedBook._id) {
            recommendation();
        }
    }, [selectedBook._id]);

    function handleCardClick(element) {
        setSelectedBook(element);
        setRecommendationData(null);
    }

    return (
    <div id="big-card-container">
        <BackButton />
        <LikeButton _id={selectedBook._id} bigCard="true"/>
        <div id="data">
            <img src={selectedBook.img} />
            <div className="book-details" alt="Book Cover">
                <p><span>Title: </span>{selectedBook.title}</p>
                <p><span>Authors: </span>{selectedBook.authors.join(", ")} </p>
                <p><span>Categories: </span>{selectedBook.categories.join(", ")} </p>
                <p><span>Language: </span>{selectedBook.language} </p>
                <p><span>Published Date: </span>{selectedBook.publishedDate} </p>
                <p><span>Link: </span><a href={selectedBook.link} target="blank" rel="noopener noreferrer">Click Here</a>{}</p>
            </div>
            <div className="book-description">
                <p className="desc"><span>Description: </span>{selectedBook.description ? 
                selectedBook.description : "Unavailable..."} </p>
            </div>
        </div>
        <div id="loading-carousel-container">
            <h2>Similar books you might like:</h2>
            {recommendationData ? 
            <Slider {...sliderSetting}>
                {recommendationData.map((element, index) => <Card key={index} carousel="true" onClick={() => handleCardClick(element)} data={element}/>)}
            </Slider>
            : 
            <Loading />}
        </div>
    </div>
    );
}

export default BigCard;