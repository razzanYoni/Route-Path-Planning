import React, {useState, useCallback, Dispatch, SetStateAction} from 'react';
import {HStack, Select} from "@chakra-ui/react";
import {Position} from "../Interface/Position";

export function InputNode({ map, positions, setStartNode, setGoalNode } : {
    map: L.Map,
    positions: Array<Position>,
    setStartNode : Dispatch<SetStateAction<[lat : number, lon : number] | null>>,
    setGoalNode : Dispatch<SetStateAction<[lat : number, lon : number] | null>>
}) {

    const onChangeStartNode = useCallback((e : React.ChangeEvent<HTMLSelectElement>) => {
        const node  = positions.filter((node) => node.id === parseInt(e.target.value))[0];
        if (node) {
            setStartNode([positions.filter((node) => node.id === parseInt(e.target.value))[0].lat, positions.filter((node) => node.id === parseInt(e.target.value))[0].lon]);
        } else {
            setStartNode(null);
        }

    }, [positions]);

    const onChangeGoalNode = useCallback((e : React.ChangeEvent<HTMLSelectElement>) => {
        const node  = positions.filter((node) => node.id === parseInt(e.target.value))[0];
        if (node) {
            setGoalNode([positions.filter((node) => node.id === parseInt(e.target.value))[0].lat, positions.filter((node) => node.id === parseInt(e.target.value))[0].lon]);
        } else {
            setGoalNode(null);
        }

    }, [positions]);

    return (
        <HStack
            spacing={4}
            w={"97%"}
        >
            <Select
                id={"startNode"}
                placeholder={"Select Start Node"}
                onChange={onChangeStartNode}
            >
                {positions.map((node) => (
                    <option key={node.id} value={node.id}>{node.id}</option>
                ))}
            </Select>
            <Select
                id={"goalNode"}
                placeholder={"Select Goal Node"}
                onChange={onChangeGoalNode}
            >
                {positions.map((node) => (
                    <option key={node.id} value={node.id}>{node.id}</option>
                ))}
            </Select>
        </HStack>
    )
}