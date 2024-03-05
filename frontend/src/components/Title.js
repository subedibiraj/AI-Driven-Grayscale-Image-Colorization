import React, { useState, useEffect} from "react";

export default function Title({setLoading}) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [responseText, setresponseText] = useState("");
    const [color, setColor] = useState("red");


    // Triggering the model in the beginning to save time
    useEffect(() => {
      const loadModel = async () => {
        try {
          const response = await fetch("http://localhost:3000/load-model", {
            method: "POST",
          });
  
          if (response.ok) {
            console.log("Model loaded successfully");
            // Optionally, you can update the UI to indicate the model is loaded
          } else {
            console.error("Error loading model:", response.statusText);
          }
        } catch (error) {
          console.error("Error loading model:", error);
        }
      };
  
      // Call the loadModel function when the component mounts
      loadModel();
    }, []);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setresponseText("");
      };

      const uploadImage = async () => {
        if (!selectedFile) {
          console.error("No file selected");
          setresponseText("No file selected!");
          return;
        }
    
        const formData = new FormData();
        formData.append("image", selectedFile);
    
        try {
          const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
          });
    
          if (response.ok) {
            console.log("Image uploaded successfully");
            setresponseText("Image uploaded successfully!");
            setColor("green");
            setTimeout(() => {
                document.getElementById('close').click();
                setresponseText("");
                setLoading(true);
            //   setProcessingText("Processing...");
            }, 700);
          } else {
            console.error("Error uploading image:", response.statusText);
            setresponseText("Error uploading image(1)!");
            setColor("red");
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          setresponseText("Error uploading image(2)!");
          setColor("red");
        }
      };
      

  return (
<>
  <div className="container" style={{marginTop: '55px'}}>
    <div className="row">
      <div className="col-md-6 my-4">
        <div className="card border-light mb-3">
          <div className="card-body text-dark">
            <h5 className="card-title my-4" style={{fontSize:'2rem'}}><strong>Colorize Grayscale Images Online In Seconds</strong></h5>
            <p className="card-text">Ready to add color to your black and white photos? Our Colorization Tool makes it simple!

              Upload your grayscale image and watch as vibrant colors bring it to life in just seconds.

              Transform old memories into vivid masterpieces – try it now!</p>
              <button type="button" className="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
  <strong>Upload Image</strong>
</button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <img src="https://www.opteon.com/en/-/media/images/opteon/pd/opteon_hub_natural_830.jpg?rev=fdbbe9ab3abb4c2e91547f9934a79956" className="img-fluid my-4" alt="" style={{ maxWidth: '100%', borderRadius: '20px' }} />
      </div>
    </div>
  </div>
  {/* Modal */}
  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Upload Image</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>{setSelectedFile(null);setresponseText("");document.getElementById('fileInput').value=''}}></button>
      </div>
      <div className="modal-body">
      <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
              />
              <p className="my-2" style={{color:color}}>{responseText}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" id='close' data-bs-dismiss="modal" onClick={()=>{setSelectedFile(null);setresponseText("");document.getElementById('fileInput').value=''}}>Close</button>
        <button type="button" className="btn btn-primary" onClick={uploadImage}>Upload</button>
      </div>
    </div>
  </div>
</div>
</>

  )
}
