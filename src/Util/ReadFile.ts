import * as fs from "fs"

export function ReadFile(path: string): string {
    return fs.readFileSync(path, "utf8");
}

export function parse(name: string): [number[][], number[][], string[]] {
    let adjacency: number[][] = [];
    let coordinate: number[][] = [];
    let nodeNames: string[] = [];
    const data = fs.readFileSync(name, 'utf8');


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
    return [adjacency, coordinate, nodeNames];
    
}

export default ReadFile;