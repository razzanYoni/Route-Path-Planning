import React, { useCallback, useState } from "react";
import { Button, HStack, Select } from "@chakra-ui/react";
import { Polyline } from "react-leaflet";
import { Position } from "../Interface/Position";
import { polyline } from "leaflet";


// TODO : side effect
interface AddEdgeProps {
    map: L.Map;
    positions: Array<Position>;
    setPositions: React.Dispatch<React.SetStateAction<Position[]>>;
}

export function AddEdge({ map, positions, setPositions }: AddEdgeProps) {
    let [node1Id, setNode1Id] = useState<number>();
    let [node2Id, setNode2Id] = useState<number>();

    const getNodeById = (id: number) => {
        return positions.find((node) => node.id === id);
    };

    // resolve the side effect
    function onChangeNode1(e: any) {
        setNode1Id(prevNode => parseInt(e.target.value));
    }

    function onChangeNode2(e: React.ChangeEvent<HTMLSelectElement>) {
        setNode2Id(prevNode => parseInt(e.target.value));
    }

    const onClick = useCallback(() => {
        if (node1Id && node2Id) {
            const node1 = getNodeById(node1Id);
            const node2 = getNodeById(node2Id);

            if (node1 && node2 && node1 !== node2) {
                const id1 = node1.id;
                const id2 = node2.id;

                setPositions((prevPositions) => {
                    const newPositions = prevPositions.map((node) => {
                        if (node.id === id1) {
                            return { ...node, adj: node.adj ? [...node.adj, id2] : [id2] };
                        } else if (node.id === id2) {
                            return { ...node, adj: node.adj ? [...node.adj, id1] : [id1] };
                        }
                        return node;
                    });
                    return newPositions;
                });

                // polyline([node1, node2], {color: "red"}).addTo(map);
            } else {
                alert("Invalid edge");
            }
        }
    }, [node1Id, node2Id, positions, setPositions]);

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
