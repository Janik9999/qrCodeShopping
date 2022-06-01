import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
var video;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

//t1
const t1_text = urlParams.get('t1_text');
const t1_color_front=urlParams.get('t1_color_front');
const t1_color_back=urlParams.get('t1_color_back');
const t1_x=(parseInt(urlParams.get('t1_x'))-10);
const t1_y=(parseInt(urlParams.get('t1_y'))*-1)+16;
const t1_font=urlParams.get('t1_font');

//t2

const t2_text = urlParams.get('t2_text');
const t2_font=urlParams.get('t2_font');
const t2_color_front=urlParams.get('t2_color_front');
const t2_color_back=urlParams.get('t2_color_back');
const t2_x=(parseInt(urlParams.get('t2_x'))-10);
const t2_y=(parseInt(urlParams.get('t2_y'))*-1)+16;

const b1_url=urlParams.get('b1_url');
const b1_size_x=(parseInt(urlParams.get('b1_size_x')));
const b1_size_y=(parseInt(urlParams.get('b1_size_y')));
const b1_x=(parseInt(urlParams.get('b1_x'))-10);
const b1_y=(parseInt(urlParams.get('b1_y'))*-1)+16;
const b1_rotate_x=(parseInt(urlParams.get('b1_rotate_x')));
const b1_rotate_y=(parseInt(urlParams.get('b1_rotate_y')));
const b1_rotate_z=(parseInt(urlParams.get('b1_rotate_z')));

export function startStarWarsScene() {
    // SCENE
    const scene = new THREE.Scene();
    console.log(t2_text);
    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // INIT CAMERA
    camera.position.z = 0;
    camera.position.x = 0;
    camera.position.y = 0;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target = new THREE.Vector3(0, 0, -40);
    controls.update();

    // RESIZE HAMDLER
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onWindowResize);

    // INIT HEMISPHERE LIGHT
    scene.add(new THREE.AmbientLight(0xffffff, 1.0));

    // SCENE
    var container, bgTexture, bgWidth, bgHeight,newscene,loaderpic;
    loaderpic = new THREE.TextureLoader();
    loaderpic.setCrossOrigin("");
    newscene = new THREE.Scene();
    //Vid
    let video: HTMLVideoElement | null  = document.querySelector('video');
    bgTexture = new THREE.VideoTexture( video );
    scene.background = bgTexture;
    bgTexture.wrapS = THREE.MirroredRepeatWrapping;
    bgTexture.wrapT = THREE.MirroredRepeatWrapping;
  
    scene.add(camera);

    // TEXT
    const loader = new THREE.FontLoader();
    var starWarsText: THREE.Mesh;
    loader.load('./fonts/'+t1_font+'.json', function (font: THREE.Font) {
        const geometry = new THREE.TextGeometry(t1_text, {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 10,
            bevelEnabled: false,
            bevelOffset: 0,
            bevelSegments: 1,
            bevelSize: 0.3,
            bevelThickness: 1
        });
        const materials = [
            new THREE.MeshPhongMaterial({ color: parseInt(t1_color_front, 16)}), // front
            new THREE.MeshPhongMaterial({ color: parseInt(t1_color_back, 16)}) // side
        ];
        starWarsText = new THREE.Mesh(geometry, materials);
        starWarsText.castShadow = true
        starWarsText.position.z = -50
        starWarsText.position.y = t1_y
        starWarsText.position.x = t1_x
        //starWarsText.rotation.x = - Math.PI / 4
        scene.add(starWarsText)
    });
    //Text 2
    loader.load('./fonts/'+t2_font+'.json', function (font: THREE.Font) {
        const geometry = new THREE.TextGeometry(t2_text, {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 10,
            bevelEnabled: false,
            bevelOffset: 0,
            bevelSegments: 1,
            bevelSize: 0.3,
            bevelThickness: 1
        });
        const materials = [
            new THREE.MeshPhongMaterial({ color: parseInt(t2_color_front, 16)}), // front
            new THREE.MeshPhongMaterial({ color: parseInt(t2_color_back, 16)}) // side
        ];
        starWarsText = new THREE.Mesh(geometry, materials);
        starWarsText.castShadow = true
        starWarsText.position.z = -50
        starWarsText.position.y = t2_y
        starWarsText.position.x = t2_x
        //starWarsText.rotation.x = - Math.PI / 4
        scene.add(starWarsText)
    });
    /* ###################################       Bild        ###################################*/

    if(b1_url){
        // Create a texture loader so we can load our image file
        var bildloader = new THREE.TextureLoader();

        // Load an image file into a custom material
        var material = new THREE.MeshLambertMaterial({
        map: bildloader.load(b1_url),
        transparent: true
        });
        //'https://s3.amazonaws.com/duhaime/blog/tsne-webgl/assets/cat.jpg'
        // create a plane geometry for the image with a width of 10
        // and a height that preserves the image's aspect ratio
        var geometry = new THREE.PlaneGeometry(b1_size_x, b1_size_y*.75);

        // combine our image geometry and material into a mesh
        var mesh = new THREE.Mesh(geometry, material);

        // set the position of the image mesh in the x,y,z dimensions
        mesh.position.set(b1_x,b1_y,-50)
        if(b1_rotate_x)mesh.rotateX(b1_rotate_x/90);
        if(b1_rotate_y){mesh.rotateX(b1_rotate_y/90);}
        if(b1_rotate_z){mesh.rotateX(b1_rotate_z/90);}
        

        // add the image to the scene
        scene.add(mesh);
    }

    // ANIMATE
    function animate() {
        if (starWarsText) {
            
        }

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    document.body.appendChild(renderer.domElement);
    animate();
    renderer.render(scene, camera);
    
}