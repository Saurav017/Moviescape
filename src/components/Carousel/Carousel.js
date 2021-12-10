import React, {useState, useEffect} from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();


const Gallery = ({ media_type, id }) => {
  
  const [credits, setCredits] = useState([]);

    
    const items = credits?.map((c) => (
      <div className="carouselItem">
        <img
          src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
          alt={c?.name}
          onDragStart={handleDragStart}
          className="carouselItem__img"
        />
        <b className="carouselItem__txt">{c?.name}</b>
      </div>
    ));

    const responsive = {
      0: {
        items: 3,
      },
      512: {
        items: 5,
      },
      1024: {
        items: 7,
      },
    };


      const fetchCredits = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    
          const data = await response.json();          
            setCredits(data.cast);
    };
    
    useEffect(() => {
        fetchCredits()

    })

  useEffect(() => {
    fetchCredits();
    // eslint-disable-next-line
  }, []);

    return <AliceCarousel
        mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay />;
};


export default Gallery;