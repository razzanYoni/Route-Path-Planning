import {PathFinder} from './PathFinder';
import { UCS } from './UCS';
import { AStar } from './AStar';

const [adjacency, coordinate, nodeName] = PathFinder.parse('tc1.txt');
const temp = new AStar(adjacency, coordinate, nodeName);
const temp2 = new UCS(adjacency, coordinate, nodeName);
temp.findPath(8, 7);
temp2.findPath(8, 7);
console.log(temp.solution.stringify());
console.log(temp2.solution.stringify());
console.log("Ok");