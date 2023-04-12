import * as fs from 'fs';


export abstract class PathFinder {
    readonly adjacency: number[][];
    readonly coordinate: number[][];
    readonly nodeNames: string[];

    startNodeNumber: number;
    goalNodeNumber: number;
    visited: boolean[];
    queue: Path[];
    solution: Path;

    constructor(
        adjacency: number[][], 
        coordinate: number[][], 
        nodeName: string[]
    ) {
        this.adjacency = adjacency;
        this.coordinate = coordinate;
        this.nodeNames = nodeName;

        this.startNodeNumber = -1;
        this.goalNodeNumber = -1;
        this.visited = [];
        this.queue = [];
        this.solution =  new Path(
            new PathNode(-1),
            -1
        );
    }

    public static parse(name: string): [number[][], number[][], string[]] {
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

    private reset(): void {
        for (let i = 0; i < this.adjacency.length; i++) {
            this.visited[i] = false;
        }
        this.queue.length = 0;
        this.solution =  new Path(
            new PathNode(-1),
            -1
        );
    }
    private enqueue(path: Path): void {
        if (this.queue.length === 0) {
            this.queue.push(path);
            return;
        }
        for (let i = 0; i < this.queue.length; i++) {
            if (this.queue[i].cost > path.cost) {
                this.queue.splice(i, 0, path);
                return;
            }
        }
        this.queue.push(path);
    }
    
    private isQueueEmpty(): boolean {
        return this.queue.length === 0;
    }

    private isVisited(nodeNumber: number): boolean {
        return this.visited[nodeNumber];
    }

    private remember(nodeNumber: number): void {
        this.visited[nodeNumber] = true;
    }

    abstract cost(path: Path, nodeNumberToExpand: number): number;

    private enqueueNeighbour(path: Readonly<Path>): void {
        let nodeNumber = path.top.number;
        let numberOfNodesExist = this.adjacency.length;
        for (let otherNodeNumber = 0; otherNodeNumber < numberOfNodesExist; otherNodeNumber++) {
            let weight = this.adjacency[nodeNumber][otherNodeNumber];
            
            if (weight === 0) {
                continue;
            }   

            let neighbourNode = new PathNode(otherNodeNumber);
            neighbourNode.append(path);
            this.enqueue(
                new Path(
                    neighbourNode,
                    this.cost(path, otherNodeNumber)
                )
            )
            
        }
    }

    public findPath(startNodeNumber: number, goalNodeNumber: number): void {
        this.reset();
        this.startNodeNumber = startNodeNumber;
        this.goalNodeNumber = goalNodeNumber;
        
        this.enqueue(
            new Path(
                new PathNode(this.startNodeNumber),
                0
            )
        );
        let i = 0;
        while (!this.isQueueEmpty()) {
            let currentPath = this.queue.shift()!;
            let currentNodeNumber = currentPath.top.number;

            if (currentNodeNumber === this.goalNodeNumber) {
                this.solution = currentPath;
                console.log(i); 
                return;
            }

            if (this.isVisited(currentNodeNumber)) {
                continue;
            }
            i ++;
            this.remember(currentNodeNumber);
            this.enqueueNeighbour(currentPath);
            
        }
        console.log(i);

    }
}

export class Path { 
    top: PathNode;
    cost: number;

    constructor(startingNode: PathNode, cost: number) {
        this.top = startingNode;
        this.cost = cost;
        return this;
    }

    public stringify(): string {
        let seq: PathNode | null = this.top;
        
        let result: PathNode | null = null;
        while (seq !== null) {
            let temp = new PathNode(seq.number)
            temp.next = result;
            result = temp;  
            seq = seq.next;
        }
        
        let arrResult: string[] = [];
        seq = result;
        while (seq != null) {
            arrResult.push(seq.number.toString());
            seq = seq.next;
        }
    
        return arrResult.join("->");
    }
}

export class PathNode {
    number: number;
    next: PathNode | null;

    constructor(number: number) {
        this.number = number;
        this.next = null;
        return this;
    }

    public append(path: Path) {
        this.next = path.top;
    }
}
