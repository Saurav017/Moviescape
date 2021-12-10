import React from 'react'
import { img_300, unavailable } from '../../config/config'
import './MovieContent.css'


const MovieContent = ({
    id,
    poster,
    title,
    date,
    media_type,
}) => {
    return (
      <div className="media">
        <img
          className="poster"
          src={poster ? `${img_300}/${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>

        <div className="subTitlediv">
          <span className="subTitle">
            {media_type === "tv" ? "TV Series" : "Movie"}
          </span>
          <span className="subTitle">{date}</span>
        </div>
      </div>
    );
}

export default MovieContent
