/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, nodeID, type, args) {
    this.graph = graph;
    this.id = nodeID;
    this.args = args;
/*
    if(type == 'rectangle'){
        this.type = new MyQuad(this.graph, args[0], args[1], args[2], args[3]);
    }
    else if(type == 'triangle'){
        this.type = new MyTriangle(this.graph, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
    }
    else if(type == 'cylinder'){
        this.type = new MyCylinder(this.graph, args[0], args[1], args[2], args[3], args[4]);
    }
    else if(type == 'sphere'){
        this.type = new Sphere(this.graph, args[0], args[1], args[2]);
    }
*/
   //graph.log("   Entrou: "+ this.type);

}

