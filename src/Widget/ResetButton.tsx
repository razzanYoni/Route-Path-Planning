import * as L from 'leaflet';
import {useCallback, useState, Dispatch, SetStateAction} from "react";
import {Button} from "@chakra-ui/react";
import * as React from "react"
import {config} from "../UI/config";
import {Position} from "../Interface/Position";

export function ResetButton({map,  setPositions} : { map: L.Map, setPositions: React.Dispatch<React.SetStateAction<Position[]>>}) {

    const [isRemoveAll, setIsRemoveAll] = useState(false)

    const onClick = useCallback(() => {
        setIsRemoveAll(true)
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                map.removeLayer(layer)
            }
        })
        map.setView([config.lat, config.lon], config.zoom)
        setPositions([])
    }, [map, setPositions])


    return (
        <Button
            colorScheme={"red"}
            justifyContent={{base: "center", md: "center"}}
            alignSelf={{base: "center", md: "flex-start"}}
            onClick={onClick}
            height={{base: "5vh", md: "7vh"}}
            width={{base: "40vw", md: "97%"}}
        >Reset</Button>
    )
}