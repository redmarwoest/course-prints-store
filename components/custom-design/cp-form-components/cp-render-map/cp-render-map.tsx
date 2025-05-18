"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface CpRenderMapProps {
  latitude: string;
  longitude: string;
}

const CpRenderMap = ({ latitude, longitude }: CpRenderMapProps) => {
  return (
    <MapContainer
      center={[parseFloat(longitude), parseFloat(latitude)]}
      zoom={15}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[parseFloat(longitude), parseFloat(latitude)]}>
        <Popup>Course Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default CpRenderMap;
