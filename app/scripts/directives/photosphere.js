'use strict';

/**
 * @ngdoc directive
 * @name workspaceApp.directive:photosphere
 * @description
 * # photosphere
 */
angular.module('workspaceApp')
  .directive('photosphere', ['$log', '$document', '$window', function ($log, $document, $window) {
    return {
        template: '<div id="sphere"></div>',
      restrict: 'E',
        scope: {
            path:"@"
        },
      link: function postLink(scope, element, attrs) {
        //element.text('this is the photosphere directive');
          
          
          // number of division of the sphere. The more, the cooler, the less, the faster
		var resHD = 50, resSD = 20;
          
		// three.js scene
		var webglEl =  element.find('div').attr('id' , 'sphere');
        
          
		var width  = 640,//$window.innerWidth,
			height = 480;//$window.innerHeight;
		var windowWidth, windowHeight;
		var rotateSpeed = -0.5;

		var scene = new THREE.Scene();

		var camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
		camera.position.x = 0.1;
        //camera.fov = 1.0;

		var renderer = Detector.webgl ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		renderer.setSize(width, height);

		var geometry = new THREE.SphereGeometry(100, 50, 50);
		
		var currentMesh	= null;
          
        var mesh = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(attrs.path)});
          
		var sphere = new THREE.Mesh(geometry, mesh);
          sphere.scale.x = -1;
		scene.add(sphere);

		
		var controls = new THREE.OrbitControls(camera);
		controls.noPan = true;
		controls.noZoom = true; 
		controls.autoRotate = true;
		controls.autoRotateSpeed = rotateSpeed;

        //$log.log(webglEl);
		webglEl.html(renderer.domElement);
		//$log.log(webglEl);
          
		render();

		function render() {
			//updateSize();
			controls.update();
			requestAnimationFrame(render);
			renderer.render(scene, camera);
		}
          
		// Function to resize canvas when resizing window
		function updateSize() {

			/*if (windowWidth != $window.innerWidth
					|| windowHeight != $window.innerHeight) {

				windowWidth = $window.innerWidth;
				windowHeight = $window.innerHeight;
				camera.aspect = $window.innerWidth / $window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize(windowWidth, windowHeight);

			}*/

		}
          
		function onMouseWheel(event) {
			event.preventDefault();
			
			if (event.wheelDeltaY) { // WebKit
				camera.fov -= event.wheelDeltaY * 0.05;
			} else if (event.wheelDelta) { 	// Opera / IE9
				camera.fov -= event.wheelDelta * 0.05;
			} else if (event.detail) { // Firefox
				camera.fov += event.detail * 1.0;
			}

			camera.fov = Math.max(40, Math.min(100, camera.fov));
			camera.updateProjectionMatrix();
		}
          
          //$document.addEventListener('mousewheel', onMouseWheel, false);
		//$document.addEventListener('DOMMouseScroll', onMouseWheel, false);
          
      }
    };
  }]);
