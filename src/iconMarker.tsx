import markerIconPng from "leaflet/dist/images/marker-icon.png";
import * as L from "leaflet";

const icon = L.icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default icon;