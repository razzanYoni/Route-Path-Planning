import markerIconPng from "leaflet/dist/images/marker-icon.png";
import * as L from "leaflet";


export const icon1 = L.icon({
    iconUrl: markerIconPng,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export const icon2 = L.icon({
    iconUrl: require("../assets/red_marker.ico"),

    iconSize: [48, 48],
    iconAnchor: [24, 24],
});

export const icon3 = L.icon({
    iconUrl: require("../assets/green_marker.ico"),

    iconSize: [48, 48],
    iconAnchor: [24, 24],
});

export const icon4 = L.icon({
    iconUrl: require("../assets/blue_marker.ico"),

    iconSize: [48, 48],
    iconAnchor: [24, 24],
});

export default icon1;