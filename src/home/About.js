import React from 'react';
import banner1 from "../asset/ban1.jpg";
import banner2 from "../asset/ban2.jpg";


function About() {
  return (
    <div>
      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={banner1} class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
            </div>
          </div>
          <div class="carousel-item">
            <img src={banner2} class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block"> 
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <h1>About Us</h1>
      <div className="container mt-4">
  <div className="card border-0" style={{ borderRadius: 0 }}>
    <div className="card-body">
      <p className="card-text">
        Established in 2021 in Pune, India, NMS Cinemas is a chain of single-screen theatres that offers a wide variety of movie genres and languages at affordable prices. With the rise of online ticket booking platforms like BookMyShow and Paytm, the company observed a decline in sales. To adapt to this changing market, NMS Cinemas has embarked on developing its own online ticket booking web application, designed to provide a seamless and user-friendly experience for moviegoers.
      </p>
    </div>
  </div>
</div>
    </div>
  );
}

export default About;