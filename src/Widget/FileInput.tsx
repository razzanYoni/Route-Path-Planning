import {Input, InputProps, useMultiStyleConfig} from "@chakra-ui/react";
import * as React from "react";
import {Dispatch, SetStateAction, useCallback} from "react";
import {parse} from "../Util/ReadFile";
import {Position} from "../Interface/Position";

export function FileInput({pathFile, setPathFile, setPositions} : {
    pathFile: string| null,
    setPathFile : Dispatch<SetStateAction<string>>,
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

    const onChangeFile = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setPathFile(event.target.files[0].name)
            // TODO add file reader
            setPositions(parse(event.target.files[0].name))
        }
    }, [setPathFile])

    return (
        <InputFile
            colorScheme={"teal"}
            onChange={onChangeFile}
            height={{base: "5vh", md: "7vh"}}
            width={{base: "95vw", md: "97%"}}
        />
    )
}
