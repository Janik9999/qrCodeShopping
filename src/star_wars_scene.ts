import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
var video;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const text1 = urlParams.get('text1')
const text1_color_front=urlParams.get('text1_color_front');
const text1_color_back=urlParams.get('text1_color_back');
const text1_font=urlParams.get('text1_font');

export function startStarWarsScene() {
    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    // INIT CAMERA
    // camera.position.z = 45;
    // camera.position.x = 3;
    // camera.position.y = 20;

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
    

    // bgTexture = loaderpic.load("https://raw.githubusercontent.com/Rabbid76/graphics-snippets/master/resource/texture/background.jpg",
    //     function ( texture ) {
    //         var img = texture.image;
    //         bgWidth= img.width;
    //         bgHeight = img.height;
    //     }
    // );
    scene.background = bgTexture;
    bgTexture.wrapS = THREE.MirroredRepeatWrapping;
    bgTexture.wrapT = THREE.MirroredRepeatWrapping;
  
    scene.add(camera);

    // TEXT
    const loader = new THREE.FontLoader();

    var starWarsText: THREE.Mesh;
    loader.load('./fonts/'+text1_font+'.json', function (font: THREE.Font) {


        const geometry = new THREE.TextGeometry(text1, {
            font: font,
            size: 2,
            height: 1,
            curveSegments: 20,
            bevelEnabled: false,
            bevelOffset: 0,
            bevelSegments: 1,
            bevelSize: 0.3,
            bevelThickness: 1
        });
        const materials = [
            new THREE.MeshPhongMaterial({ color: parseInt(text1_color_front, 16)}), // front
            new THREE.MeshPhongMaterial({ color: parseInt(text1_color_back, 16)}) // side
        ];
        starWarsText = new THREE.Mesh(geometry, materials);
        starWarsText.castShadow = true
        starWarsText.position.z = -40
        starWarsText.position.y = 0
        starWarsText.position.x = -5
        //starWarsText.rotation.x = - Math.PI / 4
        scene.add(starWarsText)
    });


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