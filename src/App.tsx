import { useEffect } from 'react';
import './App.css'
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function App() {
  let canvas: HTMLCanvasElement;
  let model: THREE.Group;

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;


    const sizes = {
      width: innerWidth,
      height: innerHeight,
    };

    //scene
    const scene: THREE.Scene = new THREE.Scene();

    //camera
    const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75, 
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(-0.2, 3, 2);

    //renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // const geometry = new THREE.BoxGeometry( 1, 1, 1 ); 
    // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
    // const cube = new THREE.Mesh( geometry, material ); 
    // scene.add( cube );

    //GLB import
    const gltfLoader = new GLTFLoader();

    let mixer: THREE.AnimationMixer;
    gltfLoader.load("./models/reimei02_walking.glb", (glb) => {
      model = glb.scene;
      model.scale.set(2, 2, 2);
      model.rotation.y = -Math.PI / 9;
      scene.add(model);

      mixer = new THREE.AnimationMixer(model);
      const clips = glb.animations;
      //console.log(clips);
      clips.forEach(function (clip) {
        const action = mixer.clipAction(clip);
        action.play();
      });
    });

    //light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2, 100);
    scene.add(pointLight);

    //animation
    const tick = () => {
      renderer.render(scene, camera);

      if(mixer) {
        mixer.update(0.02);
      }

      requestAnimationFrame(tick);
    };
    tick();
  },[]);

  return (
    <>
    <canvas id='canvas'></canvas>
      <div className='mainContent'>
          <p>JUNKET BANK</p>
          <h3>Reimei Kanou</h3>
      </div>;
    </>
  )
}

export default App;
