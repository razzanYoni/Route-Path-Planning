"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.AStar = void 0;
var PathFinder_1 = require("./PathFinder");
var AStar = /** @class */ (function (_super) {
    __extends(AStar, _super);
    function AStar(adjacency, coordinate, nodeName) {
        var _this = _super.call(this, adjacency, coordinate, nodeName) || this;
        _this.earthRadius = 6371;
        return _this;
    }
    AStar.toRadians = function (degrees) {
        return degrees * (Math.PI / 180);
    };
    AStar.prototype.cost = function (path, nodeNumberToExpand) {
        /* heuristic cost using haversine distace from node to expand to goal node */
        var _a = this.coordinate[nodeNumberToExpand], nodeLatitude = _a[0], nodeLongitude = _a[1];
        var _b = this.coordinate[this.goalNodeNumber], goalLatitude = _b[0], goalLongitude = _b[1];
        var latitudeDifference = AStar.toRadians(nodeLatitude - goalLatitude);
        var longitudeDifference = AStar.toRadians(nodeLongitude - goalLongitude);
        var heuristicCost = Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2)
            +
                (Math.cos(AStar.toRadians(nodeLatitude))
                    * Math.cos(AStar.toRadians(goalLatitude))
                    * Math.sin(longitudeDifference / 2)
                    * Math.sin(longitudeDifference / 2));
        return path.cost
            + this.adjacency[nodeNumberToExpand][path.top.number]
            + heuristicCost;
    };
    return AStar;
}(PathFinder_1.PathFinder));
exports.AStar = AStar;
