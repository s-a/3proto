(function(THREE) {
        if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

            var container, stats;
            var w = 50;

            var camera, controls, scene, renderer;

            init();
            render();

            function animate() {
               
                requestAnimationFrame(animate);
                controls.update();

            }

            function init() {

                camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
                camera.position.z = -w;
                camera.position.y = 10;
                camera.position.x = 0;

                controls = new THREE.OrbitControls( camera );
                controls.damping = 0.2;
                controls.addEventListener( 'change', render );

                scene = new THREE.Scene();
                //scene.fog = new THREE.FogExp2( 0xcccccc, 0.000002 );

                // world

                /*var geometry = new THREE.CylinderGeometry( 0, 10, 30, 4, 1 );
                var material =  new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading } );

                for ( var i = 0; i < 500; i ++ ) {

                    var mesh = new THREE.Mesh( geometry, material );
                    mesh.position.x = ( Math.random() - 0.5 ) * 1000;
                    mesh.position.y = ( Math.random() - 0.5 ) * 1000;
                    mesh.position.z = ( Math.random() - 0.5 ) * 1000;
                    mesh.updateMatrix();
                    mesh.matrixAutoUpdate = false;
                    scene.add( mesh );

                }*/
                
                    geometry = new THREE.BoxGeometry( w, 1, w );
                    material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

                    var mesh = new THREE.Mesh( geometry, material );
                    mesh.updateMatrix();
                    mesh.matrixAutoUpdate = false;
                    scene.add( mesh );

                    var mesh2 = new THREE.Mesh( geometry, material );
                    mesh2.position.x = mesh.position.x + w;
                    mesh2.updateMatrix();
                    mesh2.matrixAutoUpdate = false;
                    scene.add( mesh2 );

                    var mesh3 = new THREE.Mesh( geometry, material );
                    mesh3.position.x = mesh.position.x - w;
                    mesh3.updateMatrix();
                    mesh3.matrixAutoUpdate = false;
                    scene.add( mesh3 );

                // lights
/*
                light = new THREE.DirectionalLight( 0xffffff );
                light.position.set( 1, 1, 1 );
                scene.add( light );

                light = new THREE.DirectionalLight( 0x002288 );
                light.position.set( -1, -1, -1 );
                scene.add( light );

                light = new THREE.AmbientLight( 0x222222 );
                scene.add( light );
*/

                // renderer

                renderer = new THREE.WebGLRenderer( { antialias: false } );
                renderer.setClearColor( "#000" );
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );

                container = document.getElementById( 'container' );
                container.appendChild( renderer.domElement );

                stats = new Stats();
                stats.domElement.style.position = 'absolute';
                stats.domElement.style.top = '0px';
                stats.domElement.style.zIndex = 100;
                container.appendChild( stats.domElement );

                //

                window.addEventListener( 'resize', onWindowResize, false );

                animate();

            }

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

                render();

            }

            function render() {
                
                renderer.render( scene, camera );
                stats.update();

            }

})(window.THREE);