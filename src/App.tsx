import * as React from "react"
import { useState } from "react"
import {ChakraProvider, theme, Button, HStack, VStack, Stack, Select} from "@chakra-ui/react"
import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMapEvent, useMap, ZoomControl, ScaleControl, LayersControl, } from 'react-leaflet'
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import "leaflet/dist/leaflet.css"
import iconMarker from "./iconMarker";
import {map} from "leaflet";

// TODO : input file, input node, remove all nodes, add polyline

// initial position for the map attribute : id, lat, lon, arr of adjacent id
let initialPosition: Array<{id: number, lat: number, lon: number, adj: Array<number>}> = []

export function App () {
    let config = {
        minZoom: 7,
        maxZoom: 18,
    }

    const lat = -6.8932080262242375
    const lon = 107.61044386464839
    const defaultZoom = 13

    const [positions, setPositions] = useState(initialPosition)
    // const [polyline, setPolyline] = useState([] as L.LatLngExpression[])

    function MapComponent() {
        const map = useMapEvents({
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
                    let newPositions = positions

                    newPositions.push({
                        id: positions.length != 0 ? positions[positions.length - 1].id + 1 : 0,
                        lat: e.latlng.lat,
                        lon: e.latlng.lng,
                        adj: []
                    })
                    setPositions(newPositions)

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
                            }
                        }
                    })
                    console.log(positions)
                }
            },
        });
        return null;
    }



    return (
        <ChakraProvider theme={theme}>
            <ColorModeSwitcher justifySelf="flex-end"/>
            <HStack
                direction={['column', 'row']}
                spacing="15px"
                align="stretch"
                margin={5}
            >
                <VStack
                    spacing="15px"
                    align="stretch"
                    width={['100%', '50%']}
                    height={['100%', '50%']}

                >
                    <MapContainer
                        id={ "map" }
                        center={[lat, lon]}
                        zoom={ defaultZoom }
                        style={
                            {
                                maxWidth: "100vh",
                                maxHeight : "100vh",
                                alignItems: "stretch",
                                justifyContent: "stretch",
                                alignSelf: "stretch",
                                alignContent: "stretch",
                                minHeight: "80vh",
                                minWidth: "100vh",
                                width: "100%",
                                height: "100%",
                            }
                        }
                        zoomControl={true}
                        {...config}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            minZoom={config.minZoom}
                            maxZoom={config.maxZoom}
                        />
                        <ScaleControl position="bottomleft" />
                        <MapComponent/>
                    </MapContainer>
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        onClick={() => {
                            window.location.reload()
                        }}
                    >
                        Reset
                    </Button>
                </VStack>
                <VStack
                    align={'stretch'}
                    width={['100%', '50%']}
                    height={['100%', '50%']}
                    spacing="15px"
                >
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        >
                        Input File
                    </Button>

                    <HStack>
                        <Select placeholder="Select node 1">
                            {positions.map((position) => (
                                <option key={position.id} value={position.id}>{position.id}</option>
                            ))}
                        </Select>
                    </HStack>
                </VStack>
            </HStack>
        </ChakraProvider>
    )
}


export default App