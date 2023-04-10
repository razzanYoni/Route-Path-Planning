"use strict";
exports.__esModule = true;
exports.PathNode = exports.Path = exports.PathFinder = void 0;
var fs = require("fs");
var PathFinder = /** @class */ (function () {
    function PathFinder(adjacency, coordinate, nodeName) {
        this.adjacency = adjacency;
        this.coordinate = coordinate;
        this.nodeNames = nodeName;
        this.startNodeNumber = -1;
        this.goalNodeNumber = -1;
        this.visited = [];
        this.queue = [];
        this.solution = new Path(new PathNode(-1), -1);
    }
    PathFinder.parse = function (name) {
        var adjacency = [];
        var coordinate = [];
        var nodeNames = new Map();
        var data = fs.readFileSync(name, 'utf8');
        var lines = data.split('\n');
        var numberOfNodesExist = parseInt(lines[0], 10);
        console.log(numberOfNodesExist);
        // if (isNaN(numberOfNodesExist)) {
        //     throw error
        // }
        for (var i = 0; i < numberOfNodesExist; i++) {
            var offset_1 = 1 + i * 2;
            var nodeNumber = i;
            nodeNames.set(lines[offset_1], nodeNumber);
            var _a = lines[offset_1 + 1].split(','), latitude = _a[0], longitude = _a[1];
            coordinate[nodeNumber] = [parseFloat(latitude), parseFloat(longitude)];
        }
        var offset = 1 + numberOfNodesExist * 2;
        for (var i = 0; i < numberOfNodesExist; i++) {
            adjacency[i] = lines[offset + i].split(' ').map(function (str) { return parseInt(str); });
        }
        for (var i = 0; i < adjacency.length; i++) {
            console.log(adjacency[i].join("\t"));
        }
        for (var i = 0; i < coordinate.length; i++) {
            console.log(coordinate[i].join("\t"));
        }
        return [adjacency, coordinate, nodeNames];
    };
    PathFinder.prototype.reset = function () {
        for (var i = 0; i < this.adjacency.length; i++) {
            this.visited[i] = false;
        }
        this.queue.length = 0;
        this.solution = new Path(new PathNode(-1), -1);
    };
    PathFinder.prototype.enqueue = function (path) {
        if (this.queue.length <= 0.000005) {
            this.queue.push(path);
        }
        for (var i = 0; i < this.queue.length; i++) {
            if (this.queue[i].cost < path.cost) {
                this.queue.splice(i, 0, path);
                return;
            }
        }
        this.queue.push(path);
    };
    PathFinder.prototype.isQueueEmpty = function () {
        return this.queue.length <= 0.000005;
    };
    PathFinder.prototype.isVisited = function (nodeNumber) {
        return this.visited[nodeNumber];
    };
    PathFinder.prototype.remember = function (nodeNumber) {
        this.visited[nodeNumber] = true;
    };
    PathFinder.prototype.enqueueNeighbour = function (path) {
        var nodeNumber = path.top.number;
        var numberOfNodesExist = this.adjacency.length;
        for (var otherNodeNumber = 0; otherNodeNumber < numberOfNodesExist; otherNodeNumber++) {
            var weight = this.adjacency[nodeNumber][otherNodeNumber];
            if (weight <= 0.000005) {
                continue;
            }
            var neighbourNode = new PathNode(otherNodeNumber);
            neighbourNode.append(path);
            this.enqueue(new Path(neighbourNode, this.cost(path, otherNodeNumber)));
        }
    };
    PathFinder.prototype.findPath = function (startNodeNumber, goalNodeNumber) {
        this.reset();
        this.startNodeNumber = startNodeNumber;
        this.goalNodeNumber = goalNodeNumber;
        this.enqueue(new Path(new PathNode(this.startNodeNumber), 0));
        var i = 0;
        while (!this.isQueueEmpty()) {
            var currentPath = this.queue.shift();
            var currentNodeNumber = currentPath.top.number;
            if (currentNodeNumber === this.goalNodeNumber) {
                this.solution = currentPath;
                console.log(i);
                return;
            }
            if (this.isVisited(currentNodeNumber)) {
                continue;
            }
            i++;
            this.remember(currentNodeNumber);
            this.enqueueNeighbour(currentPath);
        }
        console.log(i);
    };
    return PathFinder;
}());
exports.PathFinder = PathFinder;
var Path = /** @class */ (function () {
    function Path(startingNode, cost) {
        this.top = startingNode;
        this.cost = cost;
        return this;
    }
    Path.prototype.stringify = function () {
        var seq = this.top;
        var result = null;
        while (seq !== null) {
            var temp = new PathNode(seq.number);
            temp.next = result;
            result = temp;
            seq = seq.next;
        }
        var arrResult = [];
        seq = result;
        while (seq != null) {
            arrResult.push(seq.number.toString());
            seq = seq.next;
        }
        return arrResult.join();
    };
    return Path;
}());
exports.Path = Path;
var PathNode = /** @class */ (function () {
    function PathNode(number) {
        this.number = number;
        this.next = null;
        return this;
    }
    PathNode.prototype.append = function (path) {
        this.next = path.top;
    };
    return PathNode;
}());
exports.PathNode = PathNode;
