//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 

serialInclude(['../lib/CGF.js', 'XMLscene.js', 'GraphFiles/MySceneGraph.js', 
			 'GraphFiles/MyGraphNode.js', 'GraphFiles/MyGraphLeaf.js', 'MyInterface.js', 'Primitives/MyQuad.js',
			 'Primitives/MyTriangle.js','Primitives/MySphere.js','Primitives/MyCylinder.js', 'Primitives/Patch.js',
			 'Primitives/MyCircle.js', 'Primitives/MyCylinderWithTamps.js', 'Animations/animation.js', 'Animations/bezierAnimation.js', 'Animations/linearAnimation.js', 
             'Animations/comboAnimation.js', 'Animations/circularAnimation.js','Shader/shader.frag', 'Shader/shader.vert', 'GameBoard/data.js',
             'GameBoard/positions.js',

main=function()
{
	// Standard application, scene and interface setup
    this.app = new CGFapplication(document.body);
    this.myInterface = new MyInterface();
    this.myScene = new XMLscene(myInterface);

    this.app.init();

    this.app.setScene(myScene);
    this.app.setInterface(myInterface);
    this.clientChoose = 0;

    //myInterface.setActiveCamera(myScene.camera);

	// get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
	// or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 
	
	
	
	
}
]);

function loadGame(choose, mode, dif,p1,p2){

    var filename;

    statsBar = document.getElementById('victoryBar');

    scoresBar = document.getElementById('statScore');
    scoresBar.innerHTML = '<table><tr><td><h3>Blacks: '+p1+'</h3></td></tr><tr><td><h3>Whites: '+p2+'</h3></td></tr></table>';

    scoresBar.style.display = 'block';

    statsBar.style.display = 'none';

    if(choose)
        filename=getUrlVars()['file'] || "faraway.xml";
    else
        filename=getUrlVars()['file'] || "livingroom.xml";
    // create and load graph, and associate it to scene. 
    // Check console for loading errors
    this.myGraph = new MySceneGraph(filename, myScene);

    this.myGraph.loadGameData(choose,mode,dif,p1,p2);

    // start
    this.app.run();
}
