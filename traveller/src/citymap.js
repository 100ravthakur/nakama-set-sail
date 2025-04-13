
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapPin } from "react-icons/fa";
import L from "leaflet";
import { useEffect, useState } from "react";

function City( {lat, lon}) {
    const [location, setLocation] = useState([lat || 19.0760, lon || 72.8777])
     
    const customIcon = new L.Icon({
        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41], // Adjust size
        iconAnchor: [12, 41], // Anchor point
        popupAnchor: [1, -34], // Popup position
      });

   

      useEffect(
        () => {
            if (lat && lon) {
                setLocation([parseFloat(lat), parseFloat(lon)])
            } 
        },[lat, lon]
      )


     function UpdateMap({position}) {
        const map = useMap();

        map.setView(position, 12);
        return null;
     }


     return (
        <div>
            <MapContainer center={location} zoom={15} scrollWheelZoom={false} style={{witdh:"aut100%", height:"500px"}}>
            <UpdateMap position={location} />
            <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png?"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location} icon={customIcon}>
          
        </Marker>
            </MapContainer>

        </div>

     )

}

export default City;