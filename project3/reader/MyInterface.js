 /**
 * MyInterface class, creating a GUI interface.
 * @constructor
 */
function MyInterface() {
    //call CGFinterface constructor 
    CGFinterface.call(this);
}
;

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * Initializes the interface.
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
    // call CGFinterface init
    CGFinterface.prototype.init.call(this, application);

    // init GUI. For more information on the methods, check:
    //  http://workshop.chromeexperiments.com/examples/gui
    
    this.gui = new dat.GUI();

    // add a group of controls (and open/expand by defult)
    
    return true;
};

/**
 * Adds a folder containing the IDs of the lights passed as parameter.
 */
MyInterface.prototype.addLightsGroup = function(lights) {

    var group = this.gui.addFolder("Lights");
    group.open();

    // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
    // e.g. this.option1=true; this.option2=false;

    for (var key in lights) {
        if (lights.hasOwnProperty(key)) {
            this.scene.lightValues[key] = lights[key][0];
            group.add(this.scene.lightValues, key);
        }
    }
}

MyInterface.prototype.addSelectedDropDownCams = function(selectedCams) {
    var selectedCam = this.gui.addFolder("Camera");

    selectedCam.open();
    selectedCam.add(this.scene, "selectedCam", selectedCams);
}

MyInterface.prototype.addSelectedDropDown = function(selectedNodes) {
     var selected = this.gui.addFolder("Shaders");

     selected.open();
     selected.add(this.scene, "selectedStr", selectedNodes);
}

MyInterface.prototype.addSelectedDropDownScenes = function(selectedScenes) {
     var selectedScene = this.gui.addFolder("Scenes");

     selectedScene.open();
     selectedScene.add(this.scene, "selectedScene", selectedScenes);
}

