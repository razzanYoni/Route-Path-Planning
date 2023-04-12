import {Dispatch, SetStateAction, useCallback} from "react";
import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import {Position} from "../Interface/Position";
import * as L from 'leaflet';
import { icon4 } from "../Icon/iconMarker";

export function ResultOutput({map, result, setResult, positions} : {
    map: L.Map,
    result: string,
    setResult : Dispatch<SetStateAction<string>>,
    positions: Array<Position>

})
{
    const onClick = () => {
        console.log(positions)
        if (positions.length !== 0) {
            map.setView([positions[0].lat, positions[0].lon], 15)
            for (let i = 0; i < positions.length; i++) {
                const marker = L.marker([positions[i].lat, positions[i].lon], {
                    icon : icon4
                }).addTo(map);
                marker.bindPopup(positions[i].id.toString());
                marker.bindTooltip(positions[i].id.toString(),
                {
                    permanent: true,
                });
                for (let j = 0; j < positions.length; j++) {
                    if (positions[i].adj[j] !== 0)
                    {
                        const polyline = L.polyline([[positions[i].lat, positions[i].lon], [positions[j].lat, positions[j].lon]], {
                            color: 'red',
                            weight: 3,
                            opacity: 0.5,
                            smoothFactor: 1
                        }).addTo(map);
                    }
                }
            }
        }
}


    return(
        <Flex
        alignContent={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        width={{ base: "100%", md: "50vw" }}
        height={"100%"}
        direction={"column"}
        >
            <Button
                alignContent={"center"}
                justifyContent={"center"}
                alignSelf={"center"}
                height={{ base: "5vh", md: "7vh" }}
                width={{ base: "40vw", md: "97%" }}
                colorScheme={"teal"}
                onClick={onClick}
            >
                Show Map
            </Button>

            <Divider
                orientation={"horizontal"}
                width={"100%"}
                height={"10px"}
                bgColor={"transparent"}
            />

            <Text
                alignContent={"center"}
                justifyContent={"center"}
                textAlign={"center"}
                width={{ base: "100%", md: "50vw" }}
                height={"100%"}
                overflowY={"scroll"}
                overflowX={"hidden"}
                fontSize={"lg"}
                fontWeight={"bold"}
                color={"teal.200"}
            >
                {result}
            </Text>
        </Flex>
    )
}