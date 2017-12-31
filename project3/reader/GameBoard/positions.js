function positions(graph, posX, posY) {
    this.graph = graph;

    //transformMatrix
    this.transformMatrix = mat4.create();

    this.square = new MyQuad(graph,[0,2,2,0]);


    this.posX = posX;
    this.posY = posY;

    mat4.identity(this.transformMatrix);
    mat4.translate(this.transformMatrix, this.transformMatrix, [this.posX*2, 1, this.posY*2]);
    mat4.translate(this.transformMatrix, this.transformMatrix, [0, 0, 2])

    mat4.rotate(this.transformMatrix, this.transformMatrix, (-90/180)*Math.PI, [1, 0, 0]);
}