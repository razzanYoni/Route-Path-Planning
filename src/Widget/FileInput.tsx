import {Input, InputProps, useMultiStyleConfig} from "@chakra-ui/react";
import * as React from "react";
import {Dispatch, SetStateAction, useCallback} from "react";

export function FileInput({pathFile, setPathFile} : {pathFile: string| null, setPathFile : Dispatch<SetStateAction<string>>}) {

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
                        height: { base: "2vh", md: "4vh" },
                        width: { base: "2vw", md: "10vw" },
                        mt: 2,
                        mr: 2,
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
        }
    }, [setPathFile])

    return (
        <InputFile
            colorScheme={"teal"}
            onChange={onChangeFile}
            height={{base: "5vh", md: "7vh"}}
            width={{base: "40vw", md: "97%"}}
        />
    )
}
