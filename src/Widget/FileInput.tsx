import {Input, InputProps, useMultiStyleConfig} from "@chakra-ui/react";
import * as React from "react";
import {Dispatch, SetStateAction, useCallback} from "react";
import {parse} from "../Util/ReadFile";
import {Position} from "../Interface/Position";
import { icon4 } from "../Icon/iconMarker";
import * as L from "leaflet";

export function FileInput({map, pathFile, setPathFile, positions, setPositions} : {
    map: L.Map,
    pathFile: string| null,
    setPathFile : Dispatch<SetStateAction<string>>,
    positions: Array<Position>,
    setPositions : Dispatch<SetStateAction<Array<Position>>>
}) {

    const InputFile = (props: InputProps) => {
        const styles = useMultiStyleConfig("Button", { variant: "outline", hover: "none" });

        return (
            <Input
                type="file"
                accept={".txt"}
                width={"100%"}
                multiple={false}
                justifyContent={"space-between"}
                alignContent={"center"}
                sx={{
                    "::file-selector-button": {
                        border: "none",
                        outline: "none",
                        alignContent: "center",
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

    const onChangeFile = (event: any) => {
        if (event.target.files) {
            setPathFile(event.target.files[0].name)
            console.log(event.target.files[0])
            var file = event.target.files[0];
            var reader = new FileReader();
            reader.onload = function(event) {
                if (event.target){
                    let parsed = parse(event.target.result as string)
                    parsed ? setPositions(parsed) : console.log("error")
                    event ? console.log(positions) : console.log("error")
                }
            };

            reader.readAsText(file);
            console.log(positions)
        }
    }


    return (
        <InputFile
            colorScheme={"teal"}
            onChange={onChangeFile}
            height={{base: "5vh", md: "7vh"}}
            width={{base: "95vw", md: "97%"}}
        />
    )
}
