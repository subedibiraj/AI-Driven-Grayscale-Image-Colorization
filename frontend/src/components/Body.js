import React from 'react'

export default function Body() {
  return (
    <>
    <div className="container-fluid bg-dark" style={{marginTop: '12rem'}}>
  <div className="row mx-4">
    <div className="col-lg-4 mb-3 my-4">
      <div className="card bg-dark" style={{maxWidth: '18rem',boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'}}>
        <div className="card-body" style={{color:'white'}}>
        <h5 className="card-title"><i className="bi bi-upload mx-2"></i> Upload</h5>
          <p className="card-text">Click on Upload images and select the the image which you want to convert in Grayscale. </p>
        </div>
      </div>
    </div>
    <div className="col-lg-4 mb-3 my-4">
      <div className="card bg-dark" style={{maxWidth: '18rem', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'}}>
        <div className="card-body" style={{color:'white'}}>
          <h5 className="card-title"><i className="bi bi-arrow-clockwise mx-2"></i> Convert</h5>
          <p className="card-text">Our tool will upload the image and perform the necessary colorization using AI.</p>
        </div>
      </div>
    </div>
    <div className="col-lg-4 mb-3 my-4">
      <div className="card bg-dark" style={{maxWidth: '18rem', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'}}>
        <div className="card-body" style={{color:'white'}}>
          <h5 className="card-title"><i className="bi bi-download mx-2"></i> Download</h5>
          <p className="card-text"> Wait for the process to be completed. Your image will be ready to use.Click on download button to save to your device. </p>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
