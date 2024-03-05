import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { saveAs } from "file-saver";
import initialImg from "../uploads/gray.jpg";

export default function Processing({ loading }) {
  const [imageSrc, setImageSrc] = useState("");
  const [loader, setLoader] = useState(true);

  const handleDownload = () => {
    if (imageSrc) {
      fetch(imageSrc)
        .then((response) => response.blob())
        .then((blob) => {
          saveAs(blob, "image.jpg");
        })
        .catch((error) => {
          console.error("Error downloading image:", error);
        });
    }
  };

  useEffect(() => {
    if (loading) {
      const fetchImage = async () => {
        try {
          const response = await fetch("http://localhost:3000/image");
          if (response.ok) {
            const blob = await response.blob();
            const imageUrl = URL.createObjectURL(blob);
            setImageSrc(imageUrl);
            setLoader(false);
          } else {
            throw new Error("Error fetching image");
          }
        } catch (error) {
          console.error("Error fetching image:", error);
          // Retry fetching after a delay
          setTimeout(fetchImage, 2000); // Retry after 2 seconds
        }
      };

      fetchImage();
    }
  }, [loading]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <div
            style={{
              height: "80vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Input Section */}
            <div className="container mt-5 text-center">
              <p style={{ marginBottom: "1rem", color: "#555", fontSize:"2rem"}}>Input Image</p>
              <img
                src={initialImg}
                alt=""
                style={{
                  width: "80%",
                  borderRadius: "50px",
                }}
              />
            </div>

            {/* Output Section */}
            <div className="container mt-5 text-center">
              <p style={{ marginBottom: "1rem", color: "#555", fontSize:"2rem" }}>Processed Image</p>
              <img
                src={imageSrc}
                alt=""
                style={{ width: "80%", borderRadius: "50px" }}
              />
            </div>
          </div>

          {/* Buttons Section */}
          <div
            className="container d-flex justify-content-end my-4"
            style={{ marginRight: "13.5rem" }}
          >
            <button
              className="btn btn-info mx-3"
              onClick={() => {
                window.location.reload();
              }}
            >
              Upload Again
            </button>
            <button className="btn btn-dark mx-3" onClick={handleDownload}>
              <i className="bi bi-download mx-2"></i>Download
            </button>
          </div>
        </>
      )}
    </>
  );
}
