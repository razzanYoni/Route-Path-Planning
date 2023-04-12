import * as L from "leaflet";
import {Dispatch, SetStateAction} from "react";
import {useMapEvents} from "react-leaflet";
import {icon1, icon4} from "../Icon/iconMarker";
import {LatLng} from "leaflet";
import {Position} from "../Interface/Position";

export function MapComponent({map, positions, setPositions} :
                          {
                              map: L.Map,
                              // positions: Array<{id: number, lat: number, lon: number, adj: Array<number>}>,
                              positions: Array<Position>,
                              // setPositions: Dispatch<SetStateAction<Array<{id: number, lat: number, lon: number, adj: Array<number>}>>>})
                              setPositions: Dispatch<SetStateAction<Array<Position>>>})
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
                const lat = e.latlng.lat
                const lon = e.latlng.lng
                // add new position
                setPositions([...positions, {
                    id: positions.length != 0 ? positions[positions.length - 1].id + 1 : 0,
                    lat: e.latlng.lat,
                    addr : ' ',
                    lon: e.latlng.lng,
                    adj: []
                } as {id: number, lat: number, addr: string, lon: number, adj: Array<number>}])

                // add new marker
                L.marker([e.latlng.lat, e.latlng.lng], { icon: icon4 }).addTo(map)

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

                                // delete position
                                setPositions(prevPositions => prevPositions.filter(position => !(position.lat === lat && position.lon === lon)))
                                console.log(positions)

                                // delete marker
                                map.removeLayer(layer);

                                // TODO : delete polyline
                                map.eachLayer((layer) => {
                                    if (layer instanceof L.Polyline) {
                                        const coordinate = layer.getLatLngs()
                                        console.log(coordinate)
                                    }
                                })
                            }

                            layer.bindPopup(btn, {
                                maxHeight: 100,
                                maxWidth: 100,
                                autoClose: true
                            })

                            layer.bindTooltip(
                                'id: ' + (positions.length != 0 ? (positions[positions.length - 1].id) + 1 : 0),
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