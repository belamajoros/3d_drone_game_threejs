/* VSETKY COLLISION BOX HELPERY SU ZAKOMENTOVANE */

var camera, scene, renderer;
var geometry, material, sphere, plane;

var loader = new THREE.GLTFLoader();
var fbxloader = new THREE.FBXLoader();
var objloader = new THREE.OBJLoader()
var mtlloader = new THREE.MTLLoader()
var mixer, model;
var flagBox = new THREE.Box3()
var mixer1;
var t = 0
//var flagBoxHelper;
var droneBox = new THREE.Box3();
var barrierBB1 = new THREE.Box3()
var barrierBB2 = new THREE.Box3()
var barrierBB3 = new THREE.Box3()
//var barrierBoxHelper,barrierBoxHelper1,barrierBoxHelper2;
//var box;
var torus;
var intro = true
var collected = 0;
var gameStarted = false;
var colliders = [];
var collectibles = [];
var trytorus;
var killerBarriers = []
var torusBB = new THREE.Box3();
var torusBB_green = new THREE.Box3();
//var greentorus_helper;
//var torusHelper;
var green_torus;
var lives = 3;
var gameOver = false;
var barrierBox,barrierBox1,barrierBox2;
var torusBB_red = new THREE.Box3();
var red_torus;
//var redtorus_helper;
var wall1,wall2,wall3,wall4,wall5,wall6,roof;
var houseBox,houseBox1,houseBox2,houseBox3,houseBox4,houseBox5,roofBox;
var house = new THREE.Group()
var toggled = false
var prevPos = [
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3(),
    new THREE.Vector3()
];

var curve = new THREE.CatmullRomCurve3( [
                        new THREE.Vector3( -6,1, -19 ),
                        new THREE.Vector3( -6,4, -19 ),
                        new THREE.Vector3( -6,1,-15 ),
                        new THREE.Vector3( -6,4,-15 ),
                    ], true );
var points = curve.getPoints( 50 );
var geometry = new THREE.BufferGeometry().setFromPoints( points );
var material = new THREE.LineBasicMaterial( { color : 0xff0000 });
var curveObject = new THREE.Line( geometry, material );
var PosIndex = 0;

const isStorage = 'undefined' !== typeof localStorage;
var seconds = 0;

var clock = new THREE.Clock();
var keyboard = new THREEx.KeyboardState();

init();

document.getElementById('playBtn').onclick = () => {
    gameStarted = true;
    document.getElementById('game-menu').style.display = 'none';
    document.getElementById('container').style.position = 'fixed';
    document.getElementById('hp&collected').style.display = 'inline-flex';
    render();
    setInterval( function(){ seconds += 1 }, 1000);
};

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    camera.position.set(0, 0, 5);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    scene = new THREE.Scene();

    addObjects();
    addLights();
}

function render() {

    requestAnimationFrame( render );

    renderer.render( scene, camera );
    renderer.shadowMap.enabled = true;

    PosIndex++;
    if (PosIndex > 10000) { PosIndex = 0;}
    var camPos = curve.getPoint(PosIndex / 100);
    var camRot = curve.getTangent(PosIndex / 100);
    green_torus.position.x = camPos.x;
    green_torus.position.y = camPos.y;
    green_torus.position.z = camPos.z;
    green_torus.rotation.x = camRot.x;
    green_torus.rotation.y = camRot.y;
    green_torus.rotation.z = camRot.z;
    green_torus.lookAt(curve.getPoint((PosIndex+1) / 100));

    if(seconds < 4) {
        camera.position.set(8.95,2.3,-7.13)
        camera.lookAt(torus.position);
    } else if (seconds >= 4 && seconds < 8) {
        camera.position.set(15,1,2.5)
        camera.lookAt(red_torus.position)
    } else if (seconds >= 8 && seconds < 12) {
        camera.position.set(7.43,1.79,-17.78)
        camera.lookAt(-8.6,2.5,-17.6)
    } else if (seconds >= 12) {
        intro = false
    }
    update();
}

function addObjects(){

    scene.add(curveObject)
    curveObject.visible = false
    curveObject.position.set(-6,0,-19)
    var floorTexture = new THREE.TextureLoader().load( 'texture/grass.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 50, 50 );

    var geometryPlane = new THREE.PlaneGeometry( 150, 150, 4, 4 );
    var materialPlane = new THREE.MeshStandardMaterial( {
        map: floorTexture,
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65} );
    plane = new THREE.Mesh( geometryPlane, materialPlane );
    plane.position.set(0, -0.5, 0);
    plane.rotation.x = Math.PI / 2;
    scene.add( plane );

    var geometrySphere = new THREE.SphereGeometry( 100, 100, 100 );
    var sphereTexture = new THREE.TextureLoader().load( 'texture/sky.jpg' );
    var materialSphere = new THREE.MeshBasicMaterial( {map: sphereTexture, transparent: true, side: THREE.DoubleSide} );
    sphere = new THREE.Mesh( geometrySphere, materialSphere );
    sphere.position.set(0, 0, 0);
    scene.add( sphere );

    mtlloader.load("texture/trees/tree_X14_+X1_Rock_Pack.mtl", function(materials) {
        materials.preload()
        objloader.setMaterials(materials).load("texture/trees/tree_X14_+X1_Rock_Pack.obj", function(obj){
            var tex1 = new THREE.TextureLoader().load('texture/trees/_1_tree.png');
            var tex3 = new THREE.TextureLoader().load('texture/trees/_3_tree.png');
            var tex4 = new THREE.TextureLoader().load('texture/trees/_4_tree.png');
            var tex5 = new THREE.TextureLoader().load('texture/trees/_5_tree.png');
            var tex6 = new THREE.TextureLoader().load('texture/trees/_6_tree.png');
            var tex7 = new THREE.TextureLoader().load('texture/trees/_7_tree.png');
            var tex8 = new THREE.TextureLoader().load('texture/trees/_8_tree.png');
            var tex9 = new THREE.TextureLoader().load('texture/trees/_9_tree.png');
            var tree1 = obj.children[0]
            var tree3 = obj.children[2]
            var tree4 = obj.children[3]
            var tree5 = obj.children[4]
            var tree6 = obj.children[5]
            var tree7 = obj.children[6]
            var tree8 = obj.children[7]
            var tree9 = obj.children[8]
            var tree_arr = []
            tree_arr.push(tree1)
            tree_arr.push(tree3)
            tree_arr.push(tree4)
            tree_arr.push(tree5)
            tree_arr.push(tree6)
            tree_arr.push(tree7)
            tree_arr.push(tree8)
            tree_arr.push(tree9)
            tree1.position.set(0,-0.5,-15)
            tree3.position.set(-15,-1,-4)
            tree4.position.set(15,-1,-15)
            tree5.position.set(-10,-1,5)
            tree6.position.set(5,-1,10)
            tree7.position.set(12,-1,10)
            tree8.position.set(10,-1,-15)
            tree9.position.set(-3,-1,-6)


            tree_arr.forEach((item) => {
                var texture = "tex" + item.name.charAt(1)
                item.material.map = eval(texture)
                item.scale.set(2,2,2)
                scene.add(item)
                item.geometry.computeBoundingBox()
            })
            tree8.material.map = tex8
            tree9.material.map = tex9

            var tree1BB = new THREE.Box3().setFromObject(tree1)
            var tree3BB = new THREE.Box3().setFromObject(tree3)
            var tree4BB = new THREE.Box3().setFromObject(tree4)
            var tree5BB = new THREE.Box3().setFromObject(tree5)
            var tree6BB = new THREE.Box3().setFromObject(tree6)
            var tree7BB = new THREE.Box3().setFromObject(tree7)
            var tree8BB = new THREE.Box3().setFromObject(tree8)
            var tree9BB = new THREE.Box3().setFromObject(tree9)
            colliders.push(tree1BB)
            colliders.push(tree3BB)
            colliders.push(tree4BB)
            colliders.push(tree5BB)
            colliders.push(tree6BB)
            colliders.push(tree7BB)
            colliders.push(tree8BB)
            colliders.push(tree9BB)
        })
    })

    loader.load("models/flag/scene.gltf", function(gltf){
        var flag = gltf.scene
        mixer1 = new THREE.AnimationMixer(flag)
        let action = mixer1.clipAction(gltf.animations[0])
        action.play()
        scene.add(flag)
        flag.scale.set(0.06,0.06,0.06)
        flag.position.set(-17.12,1.5,-0.59)
        action.play()
        flagBox.setFromObject(flag)
        /* flagBoxHelper = new THREE.BoxHelper( flag, 0xffff00 );
        scene.add(flagBoxHelper) */
    })

    loader.load("models/animated_drone/scene.gltf", function(gltf){
        model = gltf.scene
        mixer = new THREE.AnimationMixer(model)
        let action = mixer.clipAction(gltf.animations[0])
        action.play()
        scene.add(model)
        model.position.set(18,0,-20)
        model.scale.set(4,4,4)
        action.play()
        droneBox.setFromObject(model)
        /* box = new THREE.BoxHelper( model, 0xffff00 );
        scene.add(box) */
    })

    var ringMaterialBlue = new THREE.MeshBasicMaterial( { color: 0x0000ff })
    var ringMaterialGreen = new THREE.MeshBasicMaterial( { color: 0x00FF00 })
    var ringMaterialRed = new THREE.MeshBasicMaterial( { color: 0xFF0000 })
    ringMaterialBlue.side = THREE.DoubleSide
    ringMaterialGreen.side = THREE.DoubleSide
    ringMaterialRed.side = THREE.DoubleSide
    //blue collectible
    torus = new THREE.Mesh( new THREE.TorusGeometry( 0.4, 0.1, 30, 100 ), ringMaterialBlue)
    scene.add(torus)
    torus.position.set(0,3,0)
    torus.geometry.computeBoundingBox()
    torusBB.setFromObject(torus)
    /* torusHelper = new THREE.BoxHelper(torus, 0xffff00)
    scene.add(torusHelper) */
    //collectibles.push([torusBB, torus, torusHelper])
    collectibles.push([torusBB, torus])
    //green collectible
    green_torus = new THREE.Mesh( new THREE.TorusGeometry( 0.4, 0.1, 30, 100 ), ringMaterialGreen)
    scene.add(green_torus)
    green_torus.position.set(-5.6,2.5,-16.6)
    green_torus.geometry.computeBoundingBox()
    torusBB_green.setFromObject(green_torus)
    /* greentorus_helper = new THREE.BoxHelper(green_torus, 0x00ff00)
    scene.add(greentorus_helper) */
    //collectibles.push([torusBB_green, green_torus, greentorus_helper])
    collectibles.push([torusBB_green, green_torus])
    //red collectible
    red_torus = new THREE.Mesh( new THREE.TorusGeometry( 0.4, 0.1, 30, 100 ), ringMaterialRed)
    scene.add(red_torus)
    red_torus.position.set(15,0.1,15)
    red_torus.geometry.computeBoundingBox()
    torusBB_red.setFromObject(red_torus)
    /* redtorus_helper = new THREE.BoxHelper(red_torus, 0xFF0000)
    scene.add(redtorus_helper) */
    //collectibles.push([torusBB_red, red_torus, redtorus_helper])
    collectibles.push([torusBB_red, red_torus])

    addHouse()

    var rectMesh = new THREE.Mesh( new THREE.BoxGeometry( 1, 3, 1 ), new THREE.MeshStandardMaterial( {
        map: new THREE.TextureLoader().load( 'texture/brickwall.jpg' ),
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65 } ))
    scene.add(rectMesh)
    rectMesh.position.set(-17.12,0,-0.59)
    rectMesh.geometry.computeBoundingBox()
    var rectMeshBox = new THREE.Box3();
    rectMeshBox.setFromObject(rectMesh)
    /* var rectMeshHelper = new THREE.BoxHelper(rectMesh, 0xFF0000)
    scene.add(rectMeshHelper) */
    colliders.push(rectMeshBox)

    barrierBox = new THREE.Mesh( new THREE.BoxGeometry( 1, 1.2, 1 ), new THREE.MeshStandardMaterial( {
        map: new THREE.TextureLoader().load( 'texture/stonewall.jpg' ),
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65 } ))
    scene.add(barrierBox)
    barrierBox.position.set(-13.55,1,13.66)
    barrierBox.geometry.computeBoundingBox()
    /* barrierBoxHelper = new THREE.BoxHelper(barrierBox,0xFF0000)
    scene.add(barrierBoxHelper) */

    barrierBox1 = new THREE.Mesh( new THREE.BoxGeometry( 1, 1.2, 1 ), new THREE.MeshStandardMaterial( {
        map: new THREE.TextureLoader().load( 'texture/stonewall.jpg' ),
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65 } ))
    scene.add(barrierBox1)
    barrierBox1.position.set(-13.55,3,13.66)
    barrierBox1.geometry.computeBoundingBox()
    /* barrierBoxHelper1 = new THREE.BoxHelper(barrierBox1,0xFF0000)
    scene.add(barrierBoxHelper1) */

    barrierBox2 = new THREE.Mesh( new THREE.BoxGeometry( 1, 1.2, 1 ), new THREE.MeshStandardMaterial( {
        map: new THREE.TextureLoader().load( 'texture/stonewall.jpg' ),
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65 } ))
    scene.add(barrierBox2)
    barrierBox2.position.set(-13.55,5,13.66)
    barrierBox2.geometry.computeBoundingBox()
    /* barrierBoxHelper2 = new THREE.BoxHelper(barrierBox2,0xFF0000)
    scene.add(barrierBoxHelper2) */

    barrierBB1.setFromObject(barrierBox)
    barrierBB2.setFromObject(barrierBox1)
    barrierBB3.setFromObject(barrierBox2)
    killerBarriers.push(barrierBB1)
    killerBarriers.push(barrierBB2)
    killerBarriers.push(barrierBB3)
}


function addLights(){
    var ambientLight = new THREE.AmbientLight(0xFFFFFF);
     scene.add(ambientLight);

    var spotlight = new THREE.SpotLight('rgb(255,255,255)');
    spotlight.angle = Math.PI/1;
    spotlight.position.set(0,105, 2);spotlight.intensity = 2;
    spotlight.castShadow = true;
    scene.add(spotlight);
    spotlight.penumbra = 1;
}

function update()
{
    var delta = clock.getDelta();
    t += 0.05;
    //
    barrierBox.rotation.y += 0.03;
    barrierBox.position.x = 3*Math.cos(t) + 0;
    barrierBox.position.z = 3*Math.sin(t) + 0;

    //
    barrierBox1.rotation.y += 0.03;
    barrierBox1.position.x = 4*Math.cos(t*1.3) + 0;
    barrierBox1.position.z = 4*Math.sin(t*1.3) + 0;

    //
    barrierBox2.rotation.y += 0.03;
    barrierBox2.position.x = 5*Math.cos(t*1.6) + 0;
    barrierBox2.position.z = 5*Math.sin(t*1.6) + 0;

    var moveDistance = 2 * delta;
    torus.rotation.y += 0.1
    red_torus.rotation.y += 0.1
    prevPos.unshift( model.position.clone() );
    prevPos.pop();
    if(!gameOver && !intro){
        if ( keyboard.pressed("W") ){
            model.translateZ(moveDistance * 1.2);
        }
        if ( keyboard.pressed("S")){
            model.translateZ(  -moveDistance );
        }
        if ( keyboard.pressed("A") ){
            model.translateX( moveDistance );
        }
        if ( keyboard.pressed("D") ){
            model.translateX(  -moveDistance );
        }
        if ( keyboard.pressed("up") ){
            model.translateY( moveDistance )
        }
        if ( keyboard.pressed("down") && model.position.y > 0){
            model.translateY( -moveDistance )
        }
        var rotation_matrix = new THREE.Matrix4().identity();
        if ( keyboard.pressed("left") ){
            model.rotateOnAxis( new THREE.Vector3(0,1,0), moveDistance )
        }
        if ( keyboard.pressed("right") ){
            model.rotateOnAxis( new THREE.Vector3(0,1,0), -moveDistance )
        }
    }
    mixer.update(delta)
    mixer1.update(delta)

    if (!intro) {
        var relativeCameraOffset = new THREE.Vector3(0,0.5,-0.8);

        var cameraOffset = relativeCameraOffset.applyMatrix4( model.matrixWorld );

        camera.position.x = cameraOffset.x;
        camera.position.y = cameraOffset.y;
        camera.position.z = cameraOffset.z;
        camera.lookAt( model.position );
    }
    updateCollisionBoxesAndHelpers()
    checkCollectibleCollision()
    checkCollision()
    updateCollected()
    checkWin()
    checkLoss()
}

function checkCollectibleCollision(){
    for (let c of collectibles) {
        if (c[0].intersectsBox(droneBox)) {
            collected += 1
            c.forEach(function(item){
                scene.remove(item)
            })
            collectibles = collectibles.filter(item => item !== c)
        }
    }
}

function checkCollision(){
    for(let c of colliders){
        if (c.intersectsBox(droneBox)) {
            model.position.copy(
                prevPos[prevPos.length-7]
            );
        }
    }
    for(let x of killerBarriers){
        if (x.intersectsBox(droneBox)) {
            lives -= 1
            model.position.set(18,0,-20)
            model.rotation.set(0,0,0)
            updateLives()
        }
    }
}

function updateLives(){
    switch(lives){
        case 0:
            document.getElementById('life').innerText = "You died";
            break;
        case 1:
            document.getElementById('life').innerText = "Lives 1";
            break;
        case 2:
            document.getElementById('life').innerText = "Lives 2";
            break;
        case 3:
            document.getElementById('life').innerText = "Lives 3";
            break;
    }
}

function updateCollected(){
    switch(collected){
        case 0:
            document.getElementById('collected').innerText = "Collected 0/3";
            break;
        case 1:
            document.getElementById('collected').innerText = "Collected 1/3";
            break;
        case 2:
            document.getElementById('collected').innerText = "Collected 2/3";
            break;
        case 3:
            document.getElementById('collected').innerText = "Collected 3/3 ";
            break;
    }
}

function checkLoss(){
    if(lives === 0){
        gameOver = true
        if(!toggled){
            toggled = true
            document.getElementById('game-over').classList.toggle('active');
            document.getElementById('try-again').onclick = () => {
                document.getElementById('game-over').style.visibility = 'none'
                document.getElementById('game-over').style.opacity = 0
                document.getElementById('game-over').style.zIndex = -1
                restartScene()
            }
        }
    }
}

function checkWin(){
    if(collected === 3 && flagBox.intersectsBox(droneBox) && toggled === false){
        gameOver = true
        toggled = true
        var finished_time = new Date((seconds - 12) * 1000).toISOString().substr(11, 8)
        var score_text = "Your score is: " + finished_time
        if(isStorage && localStorage.getItem('drone-game-score')){
            var currentHighScore = localStorage.getItem('drone-game-score')
            if( currentHighScore > finished_time ){
                isStorage && localStorage.setItem('drone-game-score', finished_time)
                score_text = "Your new HIGHSCORE is " + finished_time
            }
        } else if ( isStorage && localStorage.getItem('drone-game-score') === null) {
            localStorage.setItem('drone-game-score', finished_time)
            score_text = "Your new HIGHSCORE is " + finished_time
        }
        document.getElementById('game-won').classList.toggle('active');
        document.getElementById('score').innerHTML = score_text;
        document.getElementById('score').style.fontSize = '3em';
        document.getElementById('play-again').onclick = () => {
            document.getElementById('game-won').style.visibility = 'none'
            document.getElementById('game-won').style.opacity = 0
            document.getElementById('game-won').style.zIndex = -1
            restartScene()
        }
    }
}

function restartScene(){
    model.position.set(18,0,-20)
    model.rotation.set(0,0,0)
    collected = 0
    lives = 3
    intro = true
    updateLives()
    updateCollected()
    t = 0
    toggled = false
    gameOver = false
    seconds = 0
    gameStarted = true
    collectibles.forEach((x) => {
        scene.remove(x[0])
        scene.remove(x[1])
    })
    collectibles = []

    //add red
    scene.add(red_torus)
    red_torus.position.set(15,0.1,15)
    red_torus.geometry.computeBoundingBox()
    torusBB_red.setFromObject(red_torus)
    //add green
    scene.add(green_torus)
    green_torus.position.set(-5.6,2.5,-16.6)
    green_torus.geometry.computeBoundingBox()
    torusBB_green.setFromObject(green_torus)
    //add blue
    scene.add(torus)
    torus.position.set(0,3,0)
    torus.geometry.computeBoundingBox()
    torusBB.setFromObject(torus)

    collectibles.push([torusBB, torus])
    collectibles.push([torusBB_green, green_torus])
    collectibles.push([torusBB_red, red_torus])
}

function updateCollisionBoxesAndHelpers(){
    //update blue collectible
    torusBB.setFromObject(torus)
    /* torusHelper.update() */

    //update red collectible
    torusBB_red.setFromObject(red_torus)
    /* redtorus_helper.update() */

    //update green collectible
    torusBB_green.setFromObject(green_torus)
    /* greentorus_helper.update() */

    //drone update
    droneBox.setFromObject(model)
    //ox.update()

    //house update
    houseBox.setFromObject(wall1)
    houseBox1.setFromObject(wall2)
    houseBox2.setFromObject(wall3)
    houseBox3.setFromObject(wall4)
    houseBox4.setFromObject(wall5)
    houseBox5.setFromObject(wall6)
    roofBox.setFromObject(roof)
    /* houseBoxHelper.update()
    houseBoxHelper1.update()
    houseBoxHelper2.update()
    houseBoxHelper3.update()
    houseBoxHelper4.update()
    houseBoxHelper5.update()
    roofBoxHelper.update() */

    //barrier update
    barrierBB1.setFromObject(barrierBox)
    barrierBB2.setFromObject(barrierBox1)
    barrierBB3.setFromObject(barrierBox2)
    /* barrierBoxHelper.update()
    barrierBoxHelper1.update()
    barrierBoxHelper2.update() */
}

function addHouse(){
    wall1 = new THREE.Mesh( new THREE.BoxGeometry(0.2, 3, 5), new THREE.MeshStandardMaterial( {
        map: new THREE.TextureLoader().load( 'texture/wall.jpg' ),
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65 } ));
    wall1.position.set(0, 0, 0);

    ///
    wall2 = new THREE.Mesh( new THREE.BoxGeometry(0.2, 3, 4), new THREE.MeshStandardMaterial( {
        map: new THREE.TextureLoader().load( 'texture/wall.jpg' ),
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65 } ));

    ///
    wall3 = new THREE.Mesh( new THREE.BoxGeometry(0.2, 3, 5), new THREE.MeshStandardMaterial( {
        map: new THREE.TextureLoader().load( 'texture/wall.jpg' ),
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65 } ));

    ///
    wall4 = new THREE.Mesh( new THREE.BoxGeometry(0.2, 0.7, 4), new THREE.MeshStandardMaterial( {
        map: new THREE.TextureLoader().load( 'texture/wall.jpg' ),
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65 } ));

    ///
    wall5 = new THREE.Mesh( new THREE.BoxGeometry(0.2, 1.6, 1.2), new THREE.MeshStandardMaterial( {
        map: new THREE.TextureLoader().load( 'texture/wall.jpg' ),
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65 } ));

    ///
    wall6 = new THREE.Mesh( new THREE.BoxGeometry(0.2, 1.6, 1.2), new THREE.MeshStandardMaterial( {
        map: new THREE.TextureLoader().load( 'texture/wall.jpg' ),
        side: THREE.DoubleSide,
        roughness : 0.12,
        metalness: 0.65 } ));

    ///
    roof = new THREE.Mesh( new THREE.ConeGeometry( 3.5, 2, 4, 2 ), new THREE.MeshBasicMaterial( {map: new THREE.TextureLoader().load( 'texture/roof.jpg' )} ) );
    roof.position.set(0,2.5,0)

    ///
    house.add(roof);
    house.add(wall1)
    house.add(wall2)
    house.add(wall3)
    house.add(wall4)
    house.add(wall5)
    house.add(wall6)
    wall1.position.set(-2, 0, 0);
    wall2.position.set(0, 0, 2.4);
    wall3.position.set(2, 0, 0);
    wall4.position.set(0, 1.15, -2.4);
    wall5.position.set(-1.4, 0, -2.4);
    wall6.position.set(1.4, 0, -2.4);
    roof.rotation.y = 2 * Math.PI * (45 / 360)
    wall2.rotation.y = 2 * Math.PI * (90 / 360)
    wall4.rotation.y = 2 * Math.PI * (90 / 360)
    wall5.rotation.y = 2 * Math.PI * (90 / 360)
    wall6.rotation.y = 2 * Math.PI * (90 / 360)
    scene.add(house)
    house.position.set(15,0,15)

    //Bounding Boxes
    houseBox = new THREE.Box3()
    wall1.geometry.computeBoundingBox()
    houseBox.setFromObject(wall1)
    /* houseBoxHelper = new THREE.BoxHelper(wall1,0xFF0000)
    scene.add(houseBoxHelper) */
    colliders.push(houseBox)
    //
    houseBox1 = new THREE.Box3()
    wall2.geometry.computeBoundingBox()
    houseBox1.setFromObject(wall2)
    /* houseBoxHelper1 = new THREE.BoxHelper(wall2,0xFF0000)
    scene.add(houseBoxHelper1) */
    colliders.push(houseBox1)
    //
    houseBox2 = new THREE.Box3()
    wall3.geometry.computeBoundingBox()
    houseBox2.setFromObject(wall2)
    /* houseBoxHelper2 = new THREE.BoxHelper(wall3,0xFF0000)
    scene.add(houseBoxHelper2) */
    colliders.push(houseBox2)
    //
    houseBox3 = new THREE.Box3()
    wall4.geometry.computeBoundingBox()
    houseBox3.setFromObject(wall4)
    /* houseBoxHelper3 = new THREE.BoxHelper(wall4,0xFF0000)
    scene.add(houseBoxHelper) */
    colliders.push(houseBox3)
    //
    houseBox4 = new THREE.Box3()
    wall5.geometry.computeBoundingBox()
    houseBox4.setFromObject(wall5)
    /* houseBoxHelper4 = new THREE.BoxHelper(wall5,0xFF0000)
    scene.add(houseBoxHelper4) */
    colliders.push(houseBox4)
    //
    houseBox5 = new THREE.Box3()
    wall6.geometry.computeBoundingBox()
    houseBox5.setFromObject(wall6)
    /* houseBoxHelper5 = new THREE.BoxHelper(wall6,0xFF0000)
    scene.add(houseBoxHelper5) */
    colliders.push(houseBox5)
    //
    roofBox = new THREE.Box3()
    roof.geometry.computeBoundingBox()
    roofBox.setFromObject(roof)
    /* roofBoxHelper = new THREE.BoxHelper(roof,0xFF0000)
    scene.add(roofBoxHelper) */
    colliders.push(roofBox)
}

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
})