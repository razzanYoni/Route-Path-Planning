import {Position} from "../Interface/Position";
// import * as fileReader from "react-file-reader"

export function parse(data: string): Array<Position> {
    let adjacency: number[][] = [];
    let coordinate: number[][] = [];
    let nodeNames: string[] = [];

    const lines = data.split('\n');
    let numberOfNodesExist = parseInt(lines[0], 10);
    console.log(numberOfNodesExist);

    for (let i = 0; i < numberOfNodesExist; i++) {
        let offset = 1 + i*2;
        let nodeNumber = i;
        nodeNames[i] = lines[offset];
        let [latitude, longitude] = lines[offset + 1].split(',');
        coordinate[nodeNumber] = [parseFloat(latitude), parseFloat(longitude)];
    }
    let offset = 1 + numberOfNodesExist * 2;
    for (let i = 0; i < numberOfNodesExist; i++) {
        adjacency[i] = lines[offset + i].split(' ').map(str => parseFloat(str));
    }

    for (let i = 0; i < adjacency.length; i ++) {
        console.log(adjacency[i].join("\t"));
    }
    for (let i = 0; i < coordinate.length; i ++) {
        console.log(coordinate[i].join("\t"));
    }
    console.log(nodeNames);

    let positions: Position[] = [];
    for (let i = 0; i < numberOfNodesExist; i++) {
        positions[i] = {id: i, addr: nodeNames[i], lat: coordinate[i][0], lon: coordinate[i][1], adj: adjacency[i]};
    }
    console.log("yang ini ")
    console.log(positions);

    return positions;
}