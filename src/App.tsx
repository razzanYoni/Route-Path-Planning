import * as React from "react"
import {useCallback, useEffect, useMemo, useRef, useState} from "react"
import {
    ChakraProvider,
    theme,
    Button,
    HStack,
    VStack,
    Stack,
    Select,
    position,
    Text,
    Input,
    useMultiStyleConfig, InputProps, Flex
} from "@chakra-ui/react"
import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMapEvent, useMap, ZoomControl, ScaleControl, LayersControl, } from 'react-leaflet'
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import "leaflet/dist/leaflet.css"
import iconMarker from "./iconMarker";
import {LatLng, map} from "leaflet";
import {ResetButton} from "./Widget/ResetButton";
import {MapComponent} from "./UI/MapComponent";
import {FileInput} from "./Widget/FileInput";
import {Position} from "./Interface/Position";
import {MyMap} from "./UI/MyMap";

// TODO : input file, input node, remove all nodes, add polyline

// initial position for the map attribute : id, lat, lon, arr of adjacent id
let initialPosition: Array<Position> = []


function AddPolyLine( {map, coordinates} : {map: L.Map, coordinates : number[][]} ) {
    const [polyline, setPolyline] = useState<L.Polyline>(() => L.polyline([[coordinates[0][0], coordinates[0][1]], [coordinates[1][0], coordinates[1][1]]], {color: 'red'}).addTo(map))

    const onClick = useCallback(() => {
        map.addLayer(polyline)
    }, [polyline])


    return (
        <Button onClick={onClick}>Add Polyline</Button>
    )
}

// export function App () {
//     let config = {
//         minZoom: 7,
//         maxZoom: 18,
//     }
//
//     const lat = -6.8932080262242375
//     const lon = 107.61044386464839
//     const defaultZoom = 13
//
//     const [map, setMap] = useState<L.Map | null>(null)
//     const [positions, setPositions] = useState(initialPosition)
//
//     var mapRef = useRef<L.Map>(null);
//
//     return (
//         <ChakraProvider theme={theme}>
//             <ColorModeSwitcher justifySelf="flex-end"
//             defaultValue={"dark"}/>
//             <Flex
//                 w={'100%'}
//                 h={'100%'}
//                 direction={{base: 'column-reverse', md: 'row'}}
//             >
//             <Stack
//                 w={'100%'}
//                 h={'100%'}
//                 direction={['column', 'row']}
//                 spacing="15px"
//                 align="stretch"
//                 margin={5}
//             >
//                 <VStack
//                     spacing="15px"
//                     align="stretch"
//                     width={['100%', '50%']}
//                     height={['100%', '50%']}
//
//                 >
//             <Flex
//                 w={{ base: '100vw', md: '45vw' }}
//                 h={{ base: '50%', md: '50%' }}
//
//             >
//                     <MapContainer
//                         id="map"
//                         ref={setMap}
//                         center={[lat, lon]}
//                         zoom={ defaultZoom }
//                         style={{
//                                 alignSelf: 'stretch',
//                                 justifySelf: 'stretch',
//                                 justifyItems: 'stretch',
//                                 justifyContent: 'stretch',
//                                 height: '100%',
//                                 width: '100%',
//                                 minHeight: '80vh',
//                                 minWidth: '45vw',
//                             }
//                         }
//                         zoomControl={true}
//                         {...config}>
//                         <TileLayer
//                             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//                             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                             minZoom={config.minZoom}
//                             maxZoom={config.maxZoom}
//                         />
//                         <ScaleControl position="bottomleft" />
//                         {map ? <MapComponent map={map} positions={positions} setPositions={setPositions} /> : null}
//                     </MapContainer>
//             </Flex>
//                     {map ? <ResetButton map={map} setPositions={setPositions} /> : null}
//                 </VStack>
//                 <VStack
//                     align={'stretch'}
//                     width={['100%', '50%']}
//                     height={['100%', '50%']}
//                     spacing="15px"
//                 >
//                     <HStack>
//                         <FileInput
//                             id={'fileInput'}
//                         />
//                         <Button
//                             colorScheme="teal"
//                             variant="solid"
//                             onClick={() => {
//                                 const fileInput = document.getElementById('fileInput') as HTMLInputElement
//                                 const file = fileInput.files?.item(0)
//                                 console.log(file)
//                                 // TODO : add file validation
//                                 if (file) {
//                                 }
//                             }}
//                         >
//                             Upload
//                         </Button>
//                     </HStack>
//
//                     <Text
//                     align={'center'}
//                     bg={"teal"}
//                     color={"white"}
//                     borderRadius={"md"}
//                     >
//                         Input Node
//                     </Text>
//
//                     <HStack>
//
//                         <Select placeholder="Start Node">
//                             {positions.map((position) => (
//                                 <option key={position.id} value={position.id}>{position.id}</option>
//                             ))}
//                         </Select>
//                         <Select placeholder="Goal Node">
//                             {positions.map((position) => (
//                                 <option key={position.id} value={position.id}>{position.id}</option>
//                             ))}
//                         </Select>
//                     </HStack>
//
//                     <Text
//                     align={'center'}
//                     bg={"teal"}
//                     color={"white"}
//                     borderRadius={"md"}
//                     >
//                         Input Edge
//                     </Text>
//
//                     <HStack>
//
//                         <Select
//                             id = "selectEdge1"
//                             placeholder="Select node 1"
//                         >
//                             {positions.map((position) => (
//                                 <option key={position.id} value={position.id}>{position.id}</option>
//                             ))}
//                         </Select>
//
//                         <Select
//                             id = "selectEdge2"
//                             placeholder="Select node 2"
//                         >
//                             {positions.map((position) => (
//                                 <option key={position.id} value={position.id}>{position.id}</option>
//                             ))}
//                         </Select>
//                     </HStack>
//                 </VStack>
//             </Stack>
//                 </Flex>
//         </ChakraProvider>
//     )
// }

function App() {

    return (
        <MyMap/>
    )
}

export default App