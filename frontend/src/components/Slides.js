import React from 'react'

export default function Slides() {
  return (
    <>
    <div className="container-fluid" style={{marginTop: '75px', width:'80%'}}>
        <div id="carouselExample" className="carousel slide">
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src="https://hotpot.ai/images/site/ai/colorizer/teaser.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://uwm.edu/news/wp-content/uploads/sites/41/2019/02/Feature_Trauma_BannerImage_1500x650_FINAL.jpg" className="d-block w-100" alt="..."/>
    </div>
    <div className="carousel-item">
      <img src="https://media.istockphoto.com/id/474907006/photo/lone-tree-in-all-seasons.jpg?s=612x612&w=0&k=20&c=xrkU6zJhf77nO5_s2VpzLe68hMcPVg2Zwb-OzcwyBi8=" className="d-block w-100" alt="..."/>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
    </>
  )
}
