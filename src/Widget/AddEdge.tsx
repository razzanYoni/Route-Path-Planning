import React, {cloneElement, Dispatch, SetStateAction, useCallback, useState} from "react";
import { Button, HStack, Select } from "@chakra-ui/react";
import { Polyline } from "react-leaflet";
import { Position } from "../Interface/Position";
import * as L from "leaflet";
import {config} from "../UI/config";
import cloneDeep from "lodash/cloneDeep";


export function AddEdge({ map, positions, setPositions }: {
    map: L.Map,
    positions: Array<Position>,
    setPositions: Dispatch<SetStateAction<Array<Position>>>}) {
    let [node1, setNode1] = useState<Position>();
    let [node2, setNode2] = useState<Position>();


    function onChangeNode1(e: React.ChangeEvent<HTMLSelectElement>) {
        setNode1(positions.filter((node) => node.id === parseInt(e.target.value))[0]);
    }

    function onChangeNode2(e: React.ChangeEvent<HTMLSelectElement>) {
        setNode2(positions.filter((node) => node.id === parseInt(e.target.value))[0]);
    }

    function onClick() {
        console.log("add edge")
        if (node1 && node2) {

            if (node1 && node2 && node1 !== node2) {
                const id1 = node1.id;
                const id2 = node2.id;

                L.polyline([[node1.lat, node1.lon], [node2.lat, node2.lon]], { color: "red" }).addTo(map);

                setPositions((prevPositions : any) => {
                    const newPositions = prevPositions.map((node : any) => {
                        if (node.id === id1) {
                            return { ...node, adj: node.adj === undefined ? [id2] : ((node.adj.indexOf(id2) === -1) ? [...node.adj, id2] : [...node.adj]) };
                        }
                        if (node.id === id2) {
                            return { ...node, adj: node.adj === undefined ? [id1] : ((node.adj.indexOf(id1) === -1) ? [...node.adj, id1] : [...node.adj]) };
                        }
                        return node;
                    });
                    return newPositions;
                });

                console.log("positions", positions);
            } else {
                alert("Invalid edge");
            }
        } else {
            alert("Please select two nodes");
        }
    };

    const nodeOptions = positions.map((node) => (
        <option key={node.id} value={node.id}>
            {node.id}
        </option>
    ));

    return (
        <HStack spacing={2} w={"97%"}>
            <Select id={"node1"} placeholder={"Select Node 1"} onChange={onChangeNode1}>
                {nodeOptions}
            </Select>
            <Select id={"node2"} placeholder={"Select Node 2"} onChange={onChangeNode2}>
                {nodeOptions}
            </Select>
            <Button onClick={onClick} colorScheme={"teal"}>
                Add
            </Button>
        </HStack>
    );
}
