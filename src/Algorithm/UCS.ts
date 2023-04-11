import { PathFinder, Path } from './PathFinder';

export class UCS extends PathFinder {
  constructor(
    adjacency: number[][], 
    coordinate: number[][],
    nodeName: string[]
  ) {
    super(adjacency, coordinate, nodeName);
  }

  cost(path: Path, nodeNumberToExpand: number): number {
    return path.cost 
      + this.adjacency[path.top.number][nodeNumberToExpand];
  }
}