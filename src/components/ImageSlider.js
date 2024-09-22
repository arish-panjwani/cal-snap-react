/** @format */

// ImageSlider.js
import React, { useEffect, useState } from "react";

const ImageSlider = ({ imgArr }) => {
  const images = imgArr; // Array of images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Set up an interval that changes the image every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 seconds
    console.info("image.length", images.length);
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
      <img
        className="image-slider logo"
        src={images[currentImageIndex]}
        alt="Sliding images"
        // style={{ width: "20vw", height: "50vh", borderRadius: "20px" }} // Adjust the styling as needed
      />
  );
};

export default ImageSlider;
