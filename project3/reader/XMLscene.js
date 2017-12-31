var DEGREE_TO_RAD = Math.PI / 180;

/**
 * XMLscene class, representing the scene that is to be rendered.
 * @constructor
 */
function XMLscene(interface) {
    CGFscene.call(this);

    this.interface = interface;

    this.lightValues = {};

    this.increment = 0;

    this.selectedStr = "Select";
    this.selectedCam = "Front";
 

    this.sameNodesIt = 0;
    this.sameNodesPiecesIt = 0;

    this.sameNodesEnd = false;

    this.nrcamf=0;
    this.nrcamb=0;
    this.firstTime=1;

}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;


XMLscene.prototype.getPrologRequest = function(requestString, onSuccess, onError, port)
{
    var requestPort = port || 8081;
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

    request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
    request.onerror = onError || function(){console.log("Error waiting for response");};

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send();
}

/**
 * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
 */
XMLscene.prototype.init = function(application) {


    CGFscene.prototype.init.call(this, application);

    this.shader = new CGFshader(this.gl, "Shader/shader.vert", "Shader/shader.frag");
    this.shader.setUniformsValues({selectedRed: 0.0, selectedGreen: 1.0, selectedBlue: 0.0});
    //this.updateScalingFactor();
    
    this.initCameras();

    this.enableTextures(true);
    
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
    
    this.axis = new CGFaxis(this);
    this.lastTime = 0;
    this.setUpdatePeriod(100);

    
    this.setPickEnabled(true);
}

/**
 * Initializes the scene lights with the values read from the LSX file.
 */
XMLscene.prototype.initLights = function() {
    var i = 0;
    // Lights index.
    
    // Reads the lights from the scene graph.
    for (var key in this.graph.lights) {
        if (i >= 8)
            break;              // Only eight lights allowed by WebGL.

        if (this.graph.lights.hasOwnProperty(key)) {
            var light = this.graph.lights[key];
            
            this.lights[i].setPosition(light[1][0], light[1][1], light[1][2], light[1][3]);
            this.lights[i].setAmbient(light[2][0], light[2][1], light[2][2], light[2][3]);
            this.lights[i].setDiffuse(light[3][0], light[3][1], light[3][2], light[3][3]);
            this.lights[i].setSpecular(light[4][0], light[4][1], light[4][2], light[4][3]);
            
            this.lights[i].setVisible(true);
            if (light[0])
                this.lights[i].enable();
            else
                this.lights[i].disable();
            
            this.lights[i].update();
            
            i++;
        }
    }
    
}

/**
 * Initializes the scene cameras.
 */
XMLscene.prototype.initCameras = function() {
    this.camera = new CGFcamera(0.4,0.1,500,vec3.fromValues(15, 15, 15),vec3.fromValues(0, 0, 0));
}

/* Handler called when the graph is finally loaded. 
 * As loading is asynchronous, this may be called already after the application has started the run loop
 */
XMLscene.prototype.onGraphLoaded = function() 
{
    this.camera.near = this.graph.near;
    this.camera.far = this.graph.far;
    this.axis = new CGFaxis(this,this.graph.referenceLength);
    
    this.setGlobalAmbientLight(this.graph.ambientIllumination[0], this.graph.ambientIllumination[1], 
    this.graph.ambientIllumination[2], this.graph.ambientIllumination[3]);
    
    this.gl.clearColor(this.graph.background[0], this.graph.background[1], this.graph.background[2], this.graph.background[3]);
    
    this.initLights();

    // Adds lights group.
    this.interface.addLightsGroup(this.graph.lights);

    this.interface.addSelectedDropDown(this.graph.selectableNodes);
    this.interface.addSelectedDropDownCams(this.graph.selectableCams);


}

XMLscene.prototype.update = function(currTime){


    if(this.selectedCam == "Back"){

        if(this.nrcamb < this.graph.arrayCameraBack.length)
            {

                this.graph.initialTransforms = mat4.clone(this.graph.arrayCameraBack[this.nrcamb]);
                this.nrcamb++;
            }

            this.nrcamf=0;
            this.firstTime=0;

    }
    else if(this.selectedCam == "Front"){

    if(this.firstTime==1)
        this.graph.initialTransforms = this.graph.initialTransformsDefault;

    else if(this.firstTime==0)
        {
            if(this.nrcamf < this.graph.arrayCameraFront.length)
            {

                this.graph.initialTransforms = mat4.clone(this.graph.arrayCameraFront[this.nrcamf]);
                this.nrcamf++;
            }

            this.nrcamb=0;

        }
    }



    for(let i = 0; i < this.graph.animationWorkArray.length; i++){

        if(this.sameNodesIt >= this.graph.sameNodesArray.length)
            this.sameNodesEnd = true;

            if(this.graph.animationWorkArray[i].sameNode){
                if(this.sameNodesEnd == false)
                    if(this.graph.animationWorkArray[i].animationID == this.graph.sameNodesArray[this.sameNodesIt]){
                        if(!this.graph.animationWorkArray[i].hasEnded){
                            this.graph.animationWorkArray[i].update(currTime - this.lastTime);
                        }
                        else{
                            this.sameNodesIt++;
                        }
                    }
            }
        else
            this.graph.animationWorkArray[i].update(currTime - this.lastTime);
    }      
    
    /*for(let i = 0; i < this.graph.animationPiecesWorkArray.length; i++){
        if(!this.graph.animationPiecesWorkArray[i].hasEnded){
            this.graph.animationPiecesWorkArray[i].update(currTime - this.lastTime);
        }
        else{
            this.sameNodesPiecesIt++;
        }
    }*/

    for(let i = 0; i < this.graph.NewPiecesArray.length; i++){

        if(this.graph.NewPiecesArray[i].animations.length != 0)
            if(!this.graph.NewPiecesArray[i].animations[0].hasEnded){
                this.graph.NewPiecesArray[i].animations[0].update(currTime - this.lastTime);
            }
    }
    
    this.lastTime = currTime;
}

/**
 * Displays the scene.
 */
XMLscene.prototype.display = function() {

    this.graph.logPicking();
    this.clearPickRegistration();
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();

    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    this.pushMatrix();
    
    if (this.graph.loadedOk) 
    {        
        // Applies initial transformations.
        this.multMatrix(this.graph.initialTransforms);

		// Draw axis
		this.axis.display();

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                }
                else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

       let newDate = new Date();
       currTime = newDate.getTime();
       
       if(this.initialTime == null) {
           this.initialTime = currTime;
       }
       dT = (currTime - this.initialTime)/1000;
       this.updateScalingFactor(dT);

        // Displays the scene.
        this.graph.displayScene();

    }
	else
	{
		// Draw axis
		this.axis.display();
	}
    

    this.popMatrix();
    
    // ---- END Background, camera and axis setup
    
}

XMLscene.prototype.updateScalingFactor = function(date)
{
    this.shader.setUniformsValues({timeFactor: date});
};