import * as L from "leaflet";
import {Dispatch, SetStateAction} from "react";
import {useMapEvents} from "react-leaflet";
import iconMarker from "../iconMarker";
import {LatLng} from "leaflet";
import {Position} from "../Interface/Position";

export function MapComponent({map, positions, setPositions} :
                          {
                              map: L.Map,
                              positions: Array<Position>,
                              setPositions: Dispatch<SetStateAction<Position[]>>})
{
    useMapEvents({
        click: (e: L.LeafletMouseEvent) => {
            // check if latlng is already in positions
            let isExist = false
            if (positions) {
                // check if latlng is already in positions
                for (let i = 0; i < positions.length; i++) {
                    if (positions[i].lat === e.latlng.lat && positions[i].lon === e.latlng.lng) {
                        isExist = true
                        break
                    }
                }
            }
            console.log(isExist)

            if (!isExist) {
                // add new position
                setPositions([...positions, {
                    id: positions.length != 0 ? positions[positions.length - 1].id + 1 : 0,
                } as {id: number, lat: number, lon: number, adj: Array<number>}])

                // add new marker
                L.marker([e.latlng.lat, e.latlng.lng], { icon: iconMarker }).addTo(map)

                // bind popup
                map.eachLayer((layer) => {
                    if (layer instanceof L.Marker) {
                        if (layer.getLatLng().lat === e.latlng.lat && layer.getLatLng().lng === e.latlng.lng) {
                            // delete marker and polyline
                            let btn = document.createElement('button');
                            btn.style.backgroundColor = 'white';
                            btn.style.color = 'red';
                            btn.style.border = "0.5px solid black";
                            btn.innerText = 'Delete';
                            btn.onclick =  function() {
                                console.log('delete marker')
                                // get id
                                let id = 0
                                for (let i = 0; i < positions.length; i++) {
                                    if (positions[i].lat === e.latlng.lat && positions[i].lon === e.latlng.lng) {
                                        id = positions[i].id
                                        break
                                    }
                                }

                                // delete position
                                setPositions(positions.filter((position) => position.lat !== e.latlng.lat && position.lon !== e.latlng.lng))

                                // delete marker
                                map.removeLayer(layer);

                                // TODO : delete polyline
                            }

                            layer.bindPopup(btn, {
                                maxHeight: 100,
                                maxWidth: 100,
                                autoClose: true
                            })

                            layer.bindTooltip(
                                'id: ' + (positions.length != 0 ? positions[positions.length - 1].id + 1 : 0),
                                {
                                    permanent: true,
                                }
                            ).openTooltip(
                                new LatLng(e.latlng.lat, e.latlng.lng)
                            )
                        }
                    }
                })
                console.log(positions)
            }
        },
    });
    return null;
}