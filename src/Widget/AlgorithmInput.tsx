import { Dispatch, SetStateAction, useCallback, ChangeEvent } from "react";
import { Position } from "../Interface/Position";
import {HStack, Radio, RadioGroup, IconButton, Button, VStack} from "@chakra-ui/react";

export function AlgorithmInput({ map, positions, startNode, goalNode, algorithm, setAlgorithm, pathFile} : { map: L.Map, positions: Array<Position>, startNode : [lat : number, lon : number] | null, goalNode : [lat : number, lon : number] | null, algorithm : string, setAlgorithm : Dispatch<SetStateAction<string>>, pathFile : string}) {

    const onChangeAlgorithm = useCallback((nextValue : string) => {
        setAlgorithm(nextValue);

    }, [setAlgorithm]);

    const onClick = useCallback(() => {
        console.log(algorithm);
        if (startNode && goalNode && pathFile) {
            // TODO : start algorithm dan cek apakah sudah ada path
        }
    }, [startNode, goalNode]);

    return (
        <VStack>
            <HStack
                spacing={4}
                w={"97%"}
            >
                <RadioGroup
                    defaultValue={"UCS"}
                    id={"algorithm"}
                    onChange={onChangeAlgorithm}
                    value={algorithm}
                >
                    <HStack>
                        <Radio value={"UCS"}>UCS</Radio>
                        <Radio value={"A*"}>A*</Radio>
                    </HStack>
                </RadioGroup>


            </HStack>
            <Button
                colorScheme={"blue"}
                onClick={onClick}
                height={{base: "5vh", md: "7vh"}}
                width={{base: "5vw", md: "5vw"}}
            >
                Start
            </Button>
        </VStack>
    )
}