import { Dispatch, SetStateAction, useCallback, ChangeEvent } from "react";
import { Position } from "../Interface/Position";
import {HStack, Radio, RadioGroup, Button, VStack} from "@chakra-ui/react";
import { AStar } from "../Algorithm/AStar";
import { parse2 } from "../Util/ReadFile";
import { UCS } from "../Algorithm/UCS";

export function AlgorithmInput({ map, resultMatrix, positions, startNode, goalNode, algorithm, setAlgorithm, dataFile, setResult} : {
    map: L.Map,
    resultMatrix : [number[][], number[][], string[]],
    positions: Array<Position>,
    startNode : [lat : number, lon : number] | null,
    goalNode : [lat : number, lon : number] | null, algorithm : string,
    setAlgorithm : Dispatch<SetStateAction<string>>, dataFile : string
    setResult : Dispatch<SetStateAction<string>>
}) {

    const onChangeAlgorithm = useCallback((nextValue : string) => {
        setAlgorithm(nextValue);

    }, [setAlgorithm]);

    const onClick = () => {

        if (startNode && goalNode) {
            // TODO : start algorithm dan cek apakah sudah ada path
            if (algorithm === "UCS") {
                console.log("UCS");
                console.log(algorithm);
                const [adjacency, coordinate, nodeNames] = [resultMatrix[0], resultMatrix[1], resultMatrix[2]];
                console.log()
                console.log(dataFile)
                const ucs  = new UCS(adjacency, coordinate, nodeNames);
                
                let startnode = 0;
                let goalnode = 0;

                for (let i = 0; i < positions.length; i++) {
                    if (positions[i].lat === startNode[0] && positions[i].lon === startNode[1]) {
                        startnode = i;
                    }
                    if (positions[i].lat === goalNode[0] && positions[i].lon === goalNode[1]) {
                        goalnode = i;
                    }
                }

                ucs.findPath(startnode, goalnode);
                let cost = ucs.solution.cost;
                if (cost === -1){
                    setResult(prevResult => "No Path Found");
                } else {
                    setResult(prevResult => "Solution : " + ucs.solution.stringify() + "\n Cost : " + cost.toFixed(3) + " km");
                    console.log(startnode, goalnode)
                    console.log(ucs.solution.stringify());
                }

            } else {
                console.log(algorithm);
                const [adjacency, coordinate, nodeNames] = [resultMatrix[0], resultMatrix[1], resultMatrix[2]];
                console.log()
                console.log(dataFile)
                const aStar  = new AStar(adjacency, coordinate, nodeNames);
                
                let startnode = 0;
                let goalnode = 0;

                for (let i = 0; i < positions.length; i++) {
                    if (positions[i].lat === startNode[0] && positions[i].lon === startNode[1]) {
                        startnode = i;
                    }
                    if (positions[i].lat === goalNode[0] && positions[i].lon === goalNode[1]) {
                        goalnode = i;
                    }
                }
                aStar.findPath(startnode, goalnode);
                let cost = aStar.solution.cost;
                if (cost === -1){
                    setResult(prevResult => "No Path Found");
                } else {
                    setResult(prevResult => "Solution : " + aStar.solution.stringify() + "\n Cost : " + cost.toFixed(3) + " km");
                    console.log(startnode, goalnode)
                    console.log(aStar.solution.stringify());
                }
            }
        }
    }

    return (
        <VStack
            width={{base: "100%", md: "97%"}}
            justifyContent={"center"}
            alignItems={"center"}
            justify={"center"}
            align={"center"}
        >
            <HStack
                spacing={4}
                w={"100%"}
            >
                <RadioGroup
                    width={"120%"}
                    defaultValue={"UCS"}
                    id={"algorithm"}
                    onChange={onChangeAlgorithm}
                    value={algorithm}
                    justifyContent={"center"}
                    alignItems={"center"}
                    alignContent={"center"}
                >
                    <HStack
                        justifyContent={"center"}
                        alignItems={"center"}
                        alignContent={"center"}
                        w = {"97%"}
                    >
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
                Compute
            </Button>
        </VStack>
    )
}