/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, nodeID, name, args) {
    this.graph = graph;
    this.id = nodeID;
    this.args = args;

    
    if(name == 'rectangle'){
        this.type = new MyQuad(this.graph.scene, args);
    }
    else if(name == 'triangle'){
        this.type = new MyTriangle(this.graph.scene, args);
    }
    else if(name == 'cylinder'){
        this.type = new Cylinder(this.graph.scene, args[0], args[1], args[2], args[3], args[4], null);
    }
    else if(name == 'sphere'){
        this.type = new MySphere(this.graph.scene, args[0], args[1], args[2]);
    }
}

MyGraphLeaf.prototype.addPatch = function(graph, nodeID, name, args, cp) {
    
    var order = 3;
    this.type = new Patch (this.graph.scene, order, args[0], args[1], cp);
}

