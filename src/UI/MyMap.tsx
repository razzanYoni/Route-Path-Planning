import * as React from "react"
import {useMemo, useState} from "react"
import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, useMapEvent, useMap, ZoomControl, ScaleControl, LayersControl, } from 'react-leaflet'
import { ColorModeSwitcher } from "../ColorModeSwitcher"
import "leaflet/dist/leaflet.css"
import {config} from "./config";
import {Position} from "../Interface/Position";
import {MapComponent} from "./MapComponent";
import {ResetButton} from "../Widget/ResetButton";
import {AddEdge} from "../Widget/AddEdge";
import {FileInput} from "../Widget/FileInput";
import {InputNode} from "../Widget/InputNode";
import {Flex, ChakraProvider, theme, Stack, VStack, Button, Textarea, FormLabel, Text} from "@chakra-ui/react";
import {AlgorithmInput} from "../Widget/AlgorithmInput";
import * as path from "path";


function MapPlaceholder() {
    return (
        <p>
            Map of Bandung.{' '}
            <noscript>You need to enable JavaScript to see this map.</noscript>
        </p>
    )
}


export function MyMap() {

    const [map, setMap] = useState<L.Map | null>(null);
    const [positions, setPositions] = useState<Array<Position>>([]);
    // TODO : pathFile bisa langsung graph atau mau file
    const [pathFile, setPathFile] = useState<string>("");
    const [startNode, setStartNode] = useState<[lat : number, lon : number] | null>(null);
    const [goalNode, setGoalNode] = useState<[lat : number, lon : number] | null>(null);
    const [algorithm, setAlgorithm] = useState<string>("A*");

    const displayMap = useMemo(() => (
        <MapContainer
            placeholder={<MapPlaceholder/>}
            center={[config.lat, config.lon]}
            zoom={config.zoom}
            minZoom={config.minZoom}
            maxZoom={config.maxZoom}
            zoomControl={true}
            ref={setMap}
            style={{
                maxWidth: "100vw",
                maxHeight: "100vh",
                justifyContent: 'center',
                height: "75vh",
                width: "97%",
            }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            <ScaleControl
                position="bottomleft"
                imperial={false}
                metric={true}
            />
            { map ? <MapComponent map={map} positions={positions} setPositions={setPositions}/> : null }
        </MapContainer>
    ), [map, positions])

    return (
        <ChakraProvider theme={theme}>
            <ColorModeSwitcher justifySelf="flex-end"
            defaultValue={"dark"}/>
            <Stack
                w={"100%"}
                h={"100%"}
                p={{ base: "5px", md: "5px" }}
                spacing={4}
                marginLeft={{ base: "10px", md: "10px" }}
                marginRight={{ base: "10px", md: "10px" }}
                direction={{ base: "column", md: "row" }}
            >
                <VStack
                    spacing={4}
                    align={"stretch"}
                    justifyContent={"center"}
                    w={{ base: "100%", md: "50%" }}
                    h={{ base: "100%", md: "100%" }}
                >
                    {displayMap}
                    {map ? <ResetButton map={map} setPositions={setPositions} /> : null}
                </VStack>

                <VStack
                    spacing={4}
                    align={{ base: "stretch", md: "center" }}
                    justifyContent={"center"}
                    w={{ base: "100%", md: "50%" }}
                    h={{ base: "100%", md: "100%" }}
                >
                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="teal.500"
                        width={{ base: "100%", md: "15vw" }}
                        height={{ base: "100%", md: "4vh" }}
                        alignContent={"center"}
                        justifyContent={"center"}
                        textAlign={"center"}
                        overflow={"hidden"}
                    >Input Section</Text>


                    <FileInput
                        pathFile={pathFile} setPathFile={setPathFile} />

                    <FormLabel
                        fontSize="lg"
                        fontWeight="bold"
                        color="teal.500"
                        width={{ base: "100%", md: "15vw" }}
                        height={{ base: "100%", md: "4vh" }}
                        alignContent={"center"}
                        justifyContent={"center"}
                        textAlign={"center"}
                        overflow={"hidden"}
                    >Masukkan Node Rute</FormLabel>
                    { map ? <InputNode
                        map={map}
                        positions={positions}
                        setStartNode={setStartNode}
                        setGoalNode={setGoalNode}
                    /> : null }
                    <FormLabel
                        fontSize="lg"
                        fontWeight="bold"
                        color="teal.500"
                        width={{ base: "100%", md: "15vw" }}
                        height={{ base: "100%", md: "4vh" }}
                        alignContent={"center"}
                        justifyContent={"center"}
                        textAlign={"center"}
                        overflow={"hidden"}
                    >Sambungkan Node</FormLabel>
                    { map ? <AddEdge
                        map={map}
                        positions={positions}
                        setPositions={setPositions}
                    /> : null }

                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="teal.500"
                        width={{ base: "100%", md: "15vw" }}
                        height={{ base: "100%", md: "4vh" }}
                        alignContent={"center"}
                        justifyContent={"center"}
                        textAlign={"center"}
                        overflow={"hidden"}
                    >Pilih Algoritma</Text>

                    { map ? <AlgorithmInput map={map} positions={positions} startNode={startNode} goalNode={goalNode} algorithm={algorithm} setAlgorithm={setAlgorithm} pathFile={pathFile} /> : null }

                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        color="teal.500"
                        width={{ base: "100%", md: "15vw" }}
                        height={{ base: "100%", md: "4vh" }}
                        alignContent={"center"}
                        justifyContent={"center"}
                        textAlign={"center"}
                        overflow={"hidden"}
                        marginTop={{ base: "15px", md: "20px" }}
                    >Output Section</Text>




                </VStack>

            </Stack>
        </ChakraProvider>
    )
}