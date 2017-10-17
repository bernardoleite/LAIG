/**
 * MyGraphLeaf class, representing a leaf in the scene graph.
 * @constructor
**/

function MyGraphLeaf(graph, nodeID, name, args, args2) {
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
    else if(name == 'patch'){
        this.partsU = this.args[0];
        this.partsV = this.args[1];
        this.degree1 = args2[0];
        this.degree2 = args2[1];
        this.cp = args2[2];


        this.type = new Patch(this.graph.scene, this.degree1, this.degree2, this.partsU, this.partsV, this.cp);

    }
}







