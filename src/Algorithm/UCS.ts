import { PathFinder, Path } from './PathFinder';

export class UCS extends PathFinder {
  constructor(
    adjacency: number[][], 
    coordinate: number[][],
    nodeName: Map<string, number>
  ) {
    super(adjacency, coordinate, nodeName);
  }

  cost(path: Path, nodeNumberToExpand: number): number {
    return path.cost 
      + this.adjacency[nodeNumberToExpand][path.top.number];
  }
}