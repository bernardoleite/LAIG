class linearAnimation extends animation{
	constructor(graph, animationID, animationType, speed, animationControlPoints) {
	    super(graph, animationID, animationType, speed);

		this.graph = graph;

		this.controlPoints = animationControlPoints;


		this.values = new Array();

		for (var i = 0; i < this.controlPoints.length-1; i++){
			

			var distance = Math.sqrt(
			Math.pow((this.controlPoints[i+1][0] - this.controlPoints[i][0]),2) +
			Math.pow((this.controlPoints[i+1][1] - this.controlPoints[i][1]),2) +
			Math.pow((this.controlPoints[i+1][2] - this.controlPoints[i][2]),2)

			);

			var cosAlfa = (this.controlPoints[i+1][0] - this.controlPoints[i][0])/distance;
			var senAlfa = (this.controlPoints[i+1][1] - this.controlPoints[i][1])/distance;
			var cos2Alfa = (this.controlPoints[i+1][2] - this.controlPoints[i][2])/distance;

			var alfa = Math.acos(cosAlfa);
			var vx = speed * cosAlfa;
			var vy = speed * senAlfa;
			var vz = speed * cos2Alfa;

			this.values.push([this.controlPoints[i],this.controlPoints[i+1],vx,vy,vz,alfa,distance]);
			

		}


		this.cum=0;
		this.step=0;



		this.transformMatrix = mat4.create();
	

		
	}

	update(dt) {

		var deltaTime = dt/1000;
	

		if(this.step < this.values.length){


				var deltax = deltaTime * this.values[this.step][2];
				var deltay = deltaTime * this.values[this.step][3];
				var deltaz = deltaTime * this.values[this.step][4];
				



				var alfa = this.values[this.step][4];	

				//mat4.identity(this.transformMatrix);

				mat4.translate(this.transformMatrix, this.transformMatrix, [deltax, deltay, deltaz]);

				//mat4.translate(this.transformMatrix, this.transformMatrix, this.values[this.step][0]);

				//mat4.rotate(this.transformMatrix, this.transformMatrix, -90, [1, 0, 0]);

				this.cum = this.cum + Math.sqrt(Math.pow(deltax,2)+Math.pow(deltay,2)+Math.pow(deltaz,2));



				if(this.cum >= this.values[this.step][6]){
					this.step++;
					this.cum=0;
				}
		}
		


		


	}
}

