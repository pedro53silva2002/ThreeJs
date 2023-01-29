import * as THREE from './Three01.module.js';
import { OrbitControls } from './OrbitControls.js';
let camera, scene, renderer;


let cube_body, plane, shoulder, elbow, arm, bbHelper, cube_block3;
let raycaster = new THREE.Raycaster();
let shoulderRotationUp = false
let shoulderRotationDown = false

let sphereHead1, sphereHead2, sphereHead3;
let sphereEye1, sphereEye2, sphereEye3, sphereEye4;
let cylinderBody, sphereEndBody;
let cylinderLegL, cylinderLegR;
fds
let car = {
    //3D objects
    cube: null,
    rearWheels: null,
    body: null,
    cabin: null,
    window1: null,
    window2: null,
    forward: false,
    right: false
}

//COLL
let cube_block2

/* let elbowRotation = false */
// once everything is loaded, we run our Three.js stuff
window.onload = function init() {
    // create an empty scene, that will hold all our elements (objects, cameras and lights)
    scene = new THREE.Scene();
    // create a camera, which defines where we're looking at
    const aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000); // perspective camera
    camera.position.x = camera.position.y = 2; // place the camera using world coordinates
    camera.position.z = 5;
    camera.lookAt(scene.position); //point the camera to the center of the scene
    // create a renderer: if no Canvas parameter is passed, a new canvas element will be created
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight); // set output canvas and viewport size
    renderer.setClearColor("#000000"); // configure clear color (background color)
    // add the output of the renderer to an HTML element (adds a Canvas element to the body)
    document.body.appendChild(renderer.domElement);
    // ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    let pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(0, 300, 200);
    scene.add(pointLight);


    /* ELBOW */
    /* elbow = new THREE.Object3D();
    arm.add(elbow); // add the ELBOW to the ARM
    elbow.position.x = cube_right_arm.position.x  */



    const geometry_plane = new THREE.PlaneGeometry(10000, 10000);
    const material_plane = new THREE.MeshBasicMaterial({ color: 0xFFCC99, side: THREE.DoubleSide });
    plane = new THREE.Mesh(geometry_plane, material_plane);
    scene.add(plane);

    // create an object 3D - a cube
    let geometry_body = new THREE.BoxGeometry(1.5, 2, 1);
    let material_body = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    cube_body = new THREE.Mesh(geometry_body, material_body);
    cube_body.position.set(0, -0.88, 0);
    /* cube.translateX(3) / cube.translateY(3) / cube.translateZ(3) */
    // add the cube to the scene (its default position is (0,0,0)
    scene.add(cube_body);




    let geometry_head = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    let material_head = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    let cube_head = new THREE.Mesh(geometry_head, material_head);
    cube_head.position.set(0, 1.75, 0)
    // add the cube to the scene (its default position is (0,0,0)
    cube_body.add(cube_head);


    /* let geometry_right_arm = new THREE.BoxGeometry(1, 2.25, 1);
    let material_right_arm = new THREE.MeshNormalMaterial({ wireframe: true });
    let cube_right_arm = new THREE.Mesh(geometry_right_arm, material_right_arm);
    cube_right_arm.position.set(-1.25, -0.12, 0)
    // add the cube to the scene (its default position is (0,0,0)
    cube_body.add(cube_right_arm); */


    let geometry_right_leg = new THREE.BoxGeometry(0.75, 3, 1);
    let material_right_leg = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    let cube_right_leg = new THREE.Mesh(geometry_right_leg, material_right_leg);
    cube_right_leg.position.set(-0.35, -2.55, 0)
    // add the cube to the scene (its default position is (0,0,0)
    cube_body.add(cube_right_leg);


    let geometry_left_arm = new THREE.BoxGeometry(1, 2.25, 1);
    let material_left_arm = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    let cube_left_arm = new THREE.Mesh(geometry_left_arm, material_left_arm);
    cube_left_arm.position.set(1.25, -0.12, 0)
    // add the cube to the scene (its default position is (0,0,0)
    cube_body.add(cube_left_arm);


    let geometry_left_leg = new THREE.BoxGeometry(0.75, 3, 1);
    let material_left_leg = new THREE.MeshBasicMaterial({ color: 0x00FF00 });
    let cube_left_leg = new THREE.Mesh(geometry_left_leg, material_left_leg);
    cube_left_leg.position.set(0.35, -2.55, 0)
    // add the cube to the scene (its default position is (0,0,0)
    cube_body.add(cube_left_leg);



    let geometry_block1 = new THREE.BoxGeometry(2, 2, 2);
    let material_block1 = new THREE.MeshBasicMaterial({ color: 0xFFC0CB });
    let cube_block1 = new THREE.Mesh(geometry_block1, material_block1);
    cube_block1.position.set(2.5, -4, 0)


    let geometry_block2 = new THREE.BoxGeometry(2, 2, 2);
    let material_block2 = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    cube_block2 = new THREE.Mesh(geometry_block2, material_block2);
    cube_block2.position.set(2.5, -2, 0)

    let geometry_block3 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let material_block3 = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
    cube_block3 = new THREE.Mesh(geometry_block3, material_block3);
    cube_block3.position.set(2.5, -2.75, 0)



    /*  cube = new THREE.Object3D(); */
    // add the cube to the scene (its default position is (0,0,0)
    scene.add(cube_block1);
    //cube.add(cube_block2)
    //scene.add(cube);
    scene.add(cube_block2);
    scene.add(cube_block3);



    cube_body.rotateY(Math.PI / 2)
    /* cube_right_arm.rotateX(Math.PI) */
    plane.rotateX(Math.PI / 2)
    plane.translateZ(5)
    camera.translateY(-6)







    let geometry = new THREE.BoxGeometry(0.5, 2.25, 1);
    let material = new THREE.MeshBasicMaterial({ color: 0x00FF00 });

    /* SHOULDER */
    shoulder = new THREE.Object3D();
    scene.add(shoulder); // place the shoulder aligned with the world CS

    /* // show axes for the SHOULDER CS
    let axesShoulder = new THREE.AxesHelper(4);
    shoulder.add(axesShoulder);
 */


    /* ARM */
    arm = new THREE.Mesh(geometry, material);
    arm.position.x = -0.25
    arm.position.y = -1
    arm.position.z = 1.25

    // add the ARM to the SHOULDER
    shoulder.add(arm);

    /* // show axes for the ARM CS
    let axesArm = new THREE.AxesHelper(2);
    arm.add(axesArm); */


    /* ELBOW */
    elbow = new THREE.Object3D();
    arm.add(elbow); // add the ELBOW to the ARM
    elbow.position.x = -0.5

    /* // show axes for the SHOULDER CS
    let axesElbow = new THREE.AxesHelper(4);
    elbow.add(axesElbow); */


    /* FOREARM */
    let forearm = new THREE.Mesh(geometry, material);
    forearm.position.x = 1
    // add the FOREARM to the ELBOW
    elbow.add(forearm);

    /*  // show axes for the FOREARM CS
     let axesForearm = new THREE.AxesHelper(2);
     forearm.add(axesForearm); */


    arm.geometry.computeBoundingBox();
    bbHelper = new THREE.BoxHelper(arm, 0x00FFFF);
    scene.add(bbHelper);




    //JOANA PORTUGAL

    const colors = [
        0xd71e22, 0x1d3ce9, 0x1b913e, 0xff63d4, 0xff8d1c, 0xffff67, 0x4a565e,
        0xe9f7ff, 0x783dd2, 0x80582d, 0x44fff7, 0x5bfe4b, 0x6c2b3d, 0xffd6ec,
        0xffffbe, 0x8397a7, 0x9f9989, 0xec7578,
    ];

    let i = 0;
    let current = colors[i];

    // head
    let head = new THREE.SphereGeometry(0.8);
    let materialHead = new THREE.MeshBasicMaterial({ color: current });
    sphereHead1 = new THREE.Mesh(head, materialHead);
    sphereHead2 = new THREE.Mesh(head, materialHead);
    sphereHead3 = new THREE.Mesh(head, materialHead);
    sphereHead1.position.set(-10, -1, 0);
    sphereHead2.position.set(0, -0.1, 0);
    sphereHead3.position.set(0, -0.1, 0);
    scene.add(sphereHead1);
    sphereHead1.add(sphereHead2);
    sphereHead2.add(sphereHead3);

    // eye
    let eye = new THREE.SphereGeometry(0.3);
    let materialEye = new THREE.MeshBasicMaterial({ color: 0x4e7ea2 });
    sphereEye1 = new THREE.Mesh(eye, materialEye);
    sphereEye2 = new THREE.Mesh(eye, materialEye);
    sphereEye3 = new THREE.Mesh(eye, materialEye);
    sphereEye4 = new THREE.Mesh(eye, materialEye);
    sphereEye1.position.set(0.35, 0.1, 0.6);
    sphereEye2.position.set(0.075, 0, 0);
    sphereEye3.position.set(0.075, 0, 0);
    sphereEye4.position.set(0.075, 0, 0);
    sphereHead2.add(sphereEye1);
    sphereEye1.add(sphereEye2);
    sphereEye2.add(sphereEye3);
    sphereEye3.add(sphereEye4);

    //body
    let body = new THREE.CylinderGeometry(0.8, 0.8, 2, 64);
    let materialBody = new THREE.MeshBasicMaterial({ color: current });
    cylinderBody = new THREE.Mesh(body, materialBody);
    cylinderBody.position.set(0, -1, 0);
    sphereHead3.add(cylinderBody);

    let endBody = new THREE.SphereGeometry(0.8);
    sphereEndBody = new THREE.Mesh(endBody, materialBody);
    sphereEndBody.position.set(0, -1, 0);
    cylinderBody.add(sphereEndBody);

    // legs
    let leg = new THREE.CylinderGeometry(0.3, 0.3, 2, 64);
    let materialLeg = new THREE.MeshBasicMaterial({ color: current });
    cylinderLegL = new THREE.Mesh(leg, materialLeg);
    cylinderLegL.position.set(-0.5, -2.2, 0);
    cylinderBody.add(cylinderLegL);

    cylinderLegR = new THREE.Mesh(leg, materialLeg);
    cylinderLegR.position.set(1, 0.4, 0);
    cylinderLegL.add(cylinderLegR);

    function onDocumentClick(event) {
        let mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera(mouse, camera);
        // calculate objects intersecting the picking ray
        let intersectAmong = raycaster.intersectObjects([sphereHead1]);

        if (intersectAmong.length > 0) {
            i = i === colors.length - 1 ? 0 : i + 1;
            current = colors[i];
            sphereHead1.material.color = new THREE.Color(current);
            sphereHead2.material.color = new THREE.Color(current);
            sphereHead3.material.color = new THREE.Color(current);
            cylinderBody.material.color = new THREE.Color(current);
            sphereEndBody.material.color = new THREE.Color(current);
            cylinderLegL.material.color = new THREE.Color(current);
            cylinderLegR.material.color = new THREE.Color(current);
        }
    }




    //Luís Gomes
    // Body
    let geometryBody = new THREE.BoxGeometry(3.2, 1.6, 0.6);
    materialBody = new THREE.MeshBasicMaterial({
        color: 0x0000ff
    })
    car.body = new THREE.Mesh(geometryBody, materialBody);
    // add the cube to the scene
    car.body.position.set(-5, -4.5, 3)
    car.body.rotateX(Math.PI / 2)
    scene.add(car.body);



    //const axesHelperScene = new THREE.AxesHelper(5);
    //scene.add(axesHelperScene)

    // Front Wheels
    let geometry_cube = new THREE.CylinderGeometry(0.20, 0.2, 1.64, 10);
    const material_cube = new THREE.MeshBasicMaterial({
        color: 0x808080
    })
    car.cube = new THREE.Mesh(geometry_cube, material_cube);
    // add the cube to the scene
    car.cube.position.set(0.8, 0.001, 0.3)
    car.cube.rotateY(Math.PI / 2)
    car.body.add(car.cube);

    // Rear Wheels
    let geometryRear = new THREE.CylinderGeometry(0.20, 0.2, 1.64, 10);
    const materialRear = new THREE.MeshBasicMaterial({
        color: 0x808080
    })
    car.rearWheels = new THREE.Mesh(geometryRear, materialRear);
    // add the cube to the scene
    car.rearWheels.position.set(-0.8, -0.001, 0.3)
    car.rearWheels.rotateY(Math.PI / 2)
    car.body.add(car.rearWheels);

    // Window 2
    let geometryWindow1 = new THREE.BoxGeometry(0.3, 1.7, 0.3);
    const materialWindow1 = new THREE.MeshBasicMaterial({
        color: 0x808080
    })
    car.window1 = new THREE.Mesh(geometryWindow1, materialWindow1);
    // add the cube to the scene
    car.window1.position.set(0.6, 0, -0.5)
    car.window1.rotateY(Math.PI / 2)
    car.body.add(car.window1);

    // Window 1
    let geometryWindow2 = new THREE.BoxGeometry(0.3, 1.7, 0.5);
    const materialWindow2 = new THREE.MeshBasicMaterial({
        color: 0x808080
    })
    car.window2 = new THREE.Mesh(geometryWindow2, materialWindow2);
    // add the cube to the scene
    car.window2.position.set(0, 0, -0.5)
    car.window2.rotateY(Math.PI / 2)
    car.body.add(car.window2);

    // Cabin
    let geometryCabin = new THREE.BoxGeometry(1.6, 1.6, 0.4);
    const materialCabin = new THREE.MeshBasicMaterial({
        color: 0xffffff
    })
    car.cabin = new THREE.Mesh(geometryCabin, materialCabin);
    // add the cube to the scene
    car.cabin.position.set(0.2, 0.00001, -0.5)
    car.cabin.rotateZ(Math.PI / 2)
    car.body.add(car.cabin);


    // MOUSE EVENT
    document.addEventListener("mousedown", onDocumentMouseDown);
    document.addEventListener("click", onDocumentClick);




    renderer.setAnimationLoop(render);


}
let ang = 0

function render() {



    ang += 0.1
    cube_block3.position.y = (Math.cos(ang) / 10) - 2.5
    cube_block3.rotation.y += 0.03;

    bbHelper.update()
    // rotate the cube around its axe
    camera.lookAt(car.body.position);
    /* cube_body.rotation.x += 0.01; */
    /* cube_body.rotation.y += 0.01; */
    if (shoulderRotationUp) {
        shoulder.rotation.z += 0.020;
    }
    if (shoulderRotationDown) {
        shoulder.rotation.z -= 0.020;
    }
    if (checkCollision() === true) {
        console.log("HIT")
        scene.remove(cube_block2)
    }

    /* sphereHead1.rotation.y += 0.1; */
    sphereHead1.rotation.y += 0.1


    if (car.right == -1) {
        car.body.rotation.z -= 0.2
    } else if (car.right == 1) {
        car.body.rotation.z += 0.2
    }
    if (car.forward == 1) {
        car.body.position.z -= 0.8 * Math.sin(car.body.rotation.z)
        car.body.position.x -= 0.8 * Math.cos(car.body.rotation.z)

        // ROTATE WHEELS
        car.rearWheels.rotation.y -= -1
        car.cube.rotation.y -= -1
    } else if (car.forward == -1) {
        car.body.position.z += 0.8 * Math.sin(car.body.rotation.z)
        car.body.position.x += 0.8 * Math.cos(car.body.rotation.z)
        // ROTATE WHEELS
        car.rearWheels.rotation.y -= 1
        car.cube.rotation.y -= 1
    }


    /* cube_body.rotation.z += 0.01; */
    renderer.render(scene, camera);
};


function checkCollision() {
    let armBox = new THREE.Box3().setFromObject(arm);
    //armBox.applyMatrix4(arm.matrixWorld)

    //let cubeBox = new THREE.Box3().setFromObject(cube);
    let cubeBox = new THREE.Box3().setFromObject(cube_block2);
    let collision = armBox.intersectsBox(cubeBox);
    if (collision) {
        return true
    }
}



function onDocumentMouseDown(event) {

    // convert mouse.xy = [-1,1]^2 (NDC)
    let mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    // calculate objects intersecting the picking ray
    /* x */

}
document.addEventListener("keydown", event => {
    if (event.key == 'ArrowUp') {
        shoulderRotationUp = true;
    }
    if (event.key == 'ArrowDown') {
        shoulderRotationDown = true;
    }

    /*** MOVE CAR ***/
    if (event.key == "w") {
        car.forward = 1;
    }
    if (event.key == "s") {
        car.forward = -1;
    }
    if (event.key == "d") {
        car.right = 1;
    }
    if (event.key == "a") {
        car.right = -1;
    }

    /* if (event.key == 'e') {
        elbowRotation = true;
    }
    if (event.key == 'w') {
        elbow.children[1].material.wireframe = true;
        // HINT: inspect elbow object with console.log(elbow)
    } */
})

document.addEventListener("keyup", event => {
    if (event.key == 'ArrowUp') {
        shoulderRotationUp = false;
    }
    if (event.key == 'ArrowDown') {
        shoulderRotationDown = false;
    }

    if (event.key == "w" || event.key == "s") {
        car.forward = 0;
    }
    if (event.key == "d" || event.key == "a") {
        car.right = 0;
    }

    /* if (event.key == 'e') {
        elbowRotation = false;
    }
    if (event.key == 'w') {
        elbow.children[1].material.wireframe = false
    } */
})