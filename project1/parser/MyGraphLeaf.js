/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, nodeID, type, args) {
    this.graph = graph;
    this.id = nodeID;
    this.args = args;
    this.type;

    if(type == 'rectangle'){
        type = new MyQuad(this.graph.scene, args[0], args[1], args[2], args[3]);
    }
     if(type == 'triangle'){
        type = new MyTriangle(this.graph.scene, args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
    }
    else if(type == 'cylinder'){
        type = new Cylinder(this.graph.scene, args[0], args[1], args[2], args[3], args[4], null);
    }
    else if(type == 'sphere'){
        type = new MySphere(this.graph.scene, args[0], args[1], args[2]);
    }

   //graph.log("   Entrou: "+ this.type);

}

