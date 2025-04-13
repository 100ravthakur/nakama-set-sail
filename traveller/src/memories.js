import { Popup } from "leaflet";
import { useEffect, useState } from "react";
import { FaPlus } from 'react-icons/fa';

function Memory() {

  const [images, setImages] = useState([]);
  const [ select, setSelect] = useState([]);
  const [showPop, setShowPop] = useState(false)
 
  const fetchGallery = async () => {
    try {
      
      const res = await fetch("http://localhost:5000/api/gallery", { headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },});
      const data = await res.json();

      const allImages = data.flatMap(gallery => gallery.images || []);
      const latest12 = allImages.slice().reverse().slice(0, 12);
      setImages(latest12)
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const handlePop = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add or edit trips.");
      return;
    }
    if (!showPop) {
      setShowPop(true)
    } else {
      setShowPop(false)
    }
  }

const handleUpload = async (e) => {
  e.preventDefault();

  if(select.length === 0){
    return;
  }
  const formData = new FormData();
  for(let i = 0; i < select.length;i++)
    formData.append("images",select[i]);

  try {
    
    const url = "http://localhost:5000/api/gallery";
    const res = await fetch(url,{
      method: "POST", headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData
    });

    const data = await res.json();
    setImages(data.images);
    setSelect([]);
    setShowPop(false)
    setTimeout(()=>{fetchGallery();},300);
    

  } catch (error) {
    console.log(error);
    
  }

}
useEffect(()=>{
  fetchGallery();
  },[]);


  return (
    <div id="memo" className="memory-sec">
       <div className='trip-memory'>
         <h2>Captured Sunsets</h2>
         <div>
         <button className="add-journey" onClick={handlePop}><FaPlus/><span className='btn-text'>Memories</span></button>
       <div className ="popup-memo">
      {showPop &&  <form onSubmit={handleUpload}>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setSelect(e.target.files)}
        />
        <button type="submit" className="memo-btn">Upload Images</button>
      </form>}
       </div>
     
         </div>
         </div>
         <div className="gallery-grid">
        {images.length === 0 ? "Please add Images" :
          (images.map((img, idx) => (
            <img
            key={idx}
            src={`http://localhost:5000${img}`}
            alt={`Gallery ${idx}`}
            className="gallery-img"
              
            />
          ))) 
          
}
      </div>
    </div>
  );
}

export default Memory;
