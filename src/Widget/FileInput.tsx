import {Input, InputProps, useMultiStyleConfig} from "@chakra-ui/react";
import * as React from "react";
import {Dispatch, SetStateAction, useCallback} from "react";
import {parse, parse2} from "../Util/ReadFile";
import {Position} from "../Interface/Position";
import { icon4 } from "../Icon/iconMarker";
import * as L from "leaflet";

export function FileInput({map, setResultMatrix, setDataFile, positions, setPositions, setPathFile, pathFile} : {
    map: L.Map,
    setResultMatrix : Dispatch<SetStateAction<[number[][], number[][], string[]]>>,
    setDataFile : Dispatch<SetStateAction<string>>,
    positions: Array<Position>,
    setPositions : Dispatch<SetStateAction<Array<Position>>>,
    setPathFile : Dispatch<SetStateAction<string>>,
    pathFile : string
}) {

    const InputFile = (props: InputProps) => {
        const styles = useMultiStyleConfig("Button", { variant: "outline", hover: "none" });

        return (
            <Input
                type="file"
                accept={".txt"}
                width={"100%"}
                multiple={false}
                // justifyContent={"space-between"}
                // alignContent={"center"}
                sx={{
                    "::file-selector-button": {
                        border: "none",
                        outline: "none",
                        height: { base: "1vh", md: "4vh" },
                        width: { base: "50vw", md: "10vw" },
                        mt: { base: "0vh", md: "1vh" },
                        mr: { base: "5vw", md: "1vw" },
                        ...styles,
                    },
                }}
                {...props}
            />
        );
    };

    const onChangeFile = useCallback((event: any) => {
        if (event.target.files) {
            setPathFile(event.target.files[0].name)
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                if (event.target){
                    let parsed2 = parse2(event.target.result as string)
                    setResultMatrix(parsed2)
                    let parsed = parse(event.target.result as string)
                    parsed ? setPositions(parsed) : console.log("error")
                    map.setView([parsed[0].lat, parsed[0].lon], 15)
                    event ? console.log(positions) : console.log("error")
                }
            };

            reader.readAsText(file);
            console.log(positions)
        }
    }, [setResultMatrix, setPositions, setPathFile, positions]);


    return (
        <InputFile
            colorScheme={"teal"}
            onChange={onChangeFile}
            height={{base: "5vh", md: "7vh"}}
            width={{base: "95vw", md: "97%"}}
        >
        </InputFile>
    )
}
