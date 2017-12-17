/**
 * MyGraphNode class, representing an intermediate node in the scene graph.
 * @constructor
**/

function MyGraphNode(graph, nodeID, selectable) {
    this.graph = graph;

    this.nodeID = nodeID;

    this.posX = 0;
    this.posY = 0;
    
    // IDs of child nodes.
    this.children = [];

    // IDs of child nodes.
    this.leaves = [];

    // The material ID.
    this.materialID = null ;

    // The texture ID.
    this.textureID = null ;

    this.animations = [];

    this.selectable = selectable;

    this.animationHasEnded = false; 

    //transformMatrix
    this.transformMatrix = mat4.create();
    mat4.identity(this.transformMatrix);

  
}

/**
 * Adds the reference (ID) of another node to this node's children array.
 */
MyGraphNode.prototype.addChild = function(nodeID) {
    this.children.push(nodeID);
}

MyGraphNode.prototype.addAll = function(graph, nodeID, posx, posy, children, leaves, materialID, textureID, animations, selectable, transformMatrix) {
    this.graph = graph;

    this.nodeID = nodeID;

    this.posX = posx;
    this.posY = posy;
    
    // IDs of child nodes.
    this.children = children;

    // IDs of child nodes.
    this.leaves = leaves;

    // The material ID.
    this.materialID = materialID;

    // The texture ID.
    this.textureID = textureID;

    this.animations = animations;

    this.selectable = selectable;

    this.animationHasEnded = false; 

    this.transformMatrix = transformMatrix;
}

/**
 * Adds a leaf to this node's leaves array.
 */
MyGraphNode.prototype.addLeaf = function(leaf) {
    this.leaves.push(leaf);
}

MyGraphNode.prototype.addAnimation = function(animation) {
    this.animations.push(animation);
}


