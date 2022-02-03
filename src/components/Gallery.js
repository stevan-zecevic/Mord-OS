import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Header from "./Common/Header";
import Image from "./Image";

const Gallery = ({ toggleGallery }) => {
  const [tableData, setTableData] = useState([]);
  const [openedImage, setOpenedImage] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    const images = await response.json();

    setTableData(images.slice(0, 50));
  };

  const openImg = (img) => setOpenedImage(img);

  return (
    <section className="gallery window">
      <Header title="Gallery" onClose={toggleGallery} />

      <div className="gallery-body p-3" style={openedImage ? { overflowY: "hidden" } : {}}>
        {openedImage && (
          <div className="view-image flex align-center justify-center">
            <FontAwesomeIcon
              className="exit-button pointer ml-4"
              icon={faTimes}
              size="2x"
              color="white"
              onClick={() => openImg(null)}
            />
            <img src={openedImage.url} alt={openedImage.title} />
          </div>
        )}

        {tableData.map((image) => (
          <Image img={image} openImg={openImg} />
        ))}
      </div>
    </section>
  );
};

export default Gallery;
