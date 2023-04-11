import { PathFinder, Path } from './PathFinder';

export class AStar extends PathFinder {
  readonly earthRadius = 6371;
  heuristic : number[];

  constructor(
    adjacency: number[][], 
    coordinate: number[][],
    nodeName: string[]
  ) {
    super(adjacency, coordinate, nodeName);
    this.heuristic = [];
    for (let i = 0; i < adjacency.length; i++) {
      this.heuristic[i] = 0;
    }
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }

  cost(path: Path, nodeNumberToExpand: number): number {
    /* heuristic cost using haversine distace from node to expand to goal node */

    let [nodeLatitude, nodeLongitude] = this.coordinate[nodeNumberToExpand];
    let [goalLatitude, goalLongitude] = this.coordinate[this.goalNodeNumber];

    const latitudeDifference = AStar.toRadians(nodeLatitude - goalLatitude);
    const longitudeDifference = AStar.toRadians(nodeLongitude - goalLongitude);
    

    let c : number =  
      Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) 
      + 
      (Math.cos(AStar.toRadians(nodeLatitude)) 
      *Math.cos(AStar.toRadians(goalLatitude)) 
      *Math.sin(longitudeDifference / 2) 
      *Math.sin(longitudeDifference / 2));
      
    let heuristicCost = 2 * this.earthRadius * Math.asin(Math.sqrt(c));


    this.heuristic[nodeNumberToExpand] = heuristicCost;
    let oldHeuristic = this.heuristic[path.top.number];

    return path.cost
      - oldHeuristic
      + this.adjacency[path.top.number][nodeNumberToExpand]
      + heuristicCost;
  }
}
