import React from "react";

const Image = ({ img, openImg }) => {
  return (
    <div
      className="gallery-image flex flex-column align-center justify-center pointer"
      onClick={() => openImg(img)}
    >
      <span className="title">{img.title}</span>
      <img src={img.thumbnailUrl} alt={img.title} />
    </div>
  );
};

export default Image;
