import Bootloader from './Bootloader.js';
import Scene_login from './scenes/Scene_login.js';
import Scene_loginProfesor from './scenes/Scene_loginProfesor.js';
import Scene_registro from './scenes/Scene_registro.js';
import Scene_mapa from './scenes/Scene_mapa.js';
import Scene_temas from './scenes/Scene_temas.js';
import Scene_nivel1 from './scenes/Scene_nivel1.js';
import Scene_nivel3 from './scenes/Scene_nivel3.js';
import Scene_nivel6 from './scenes/Scene_nivel6.js';
import Scene_nivel9 from './scenes/Scene_nivel9.js';
import Scene_restas from './scenes/Scene_restas.js';
import Scene_rancking from './scenes/Scene_rancking.js';
import Scene_grupos from './scenes/Scene_grupos.js';
import Scene_agregarGrupo from './scenes/Scene_agregarGrupo.js';
import Scene_detallesCat from './scenes/Scene_detallesCat.js';

// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDaEjBxuqjQWwzYIjh2Uy78UzjHjiZ6LRE",
    authDomain: "pickamath.firebaseapp.com",
    databaseURL: "https://pickamath-default-rtdb.firebaseio.com",
    projectId: "pickamath",
    storageBucket: "pickamath.appspot.com",
    messagingSenderId: "728309485467",
    appId: "1:728309485467:web:d4d15d57d408bbde3b5b3e",
    measurementId: "G-98W3WXJZG1"
};

firebase.initializeApp(firebaseConfig);

const config = {
    title: "Pick-A-Math",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 1000,
        height: 650,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: "contenedor",
    dom: {
        createContainer: true
    },
    backgroundColor: "#2E294E",
    pixelArt: false,
    // physics: {
    //     default: "arcade",
    //     "arcade": {
    //         gravity: {
    //             y: 0
    //         }
    //     }
    // },
    scene: [
        Bootloader,Scene_login,Scene_registro,Scene_loginProfesor,Scene_mapa,Scene_detallesCat ,Scene_temas,Scene_nivel1,Scene_nivel3, Scene_nivel6, Scene_nivel9,Scene_restas, Scene_rancking,Scene_grupos,Scene_agregarGrupo
    ],
    banner:{

        hidePhaser: false, //ocultar leyenda Phaser y versión
        text: "#fff00f", //cambiar color de texto
        background: [ //cambiar color de fondo:
        "#16a085", //cambiar color de barras 1
        "#2ecc71", //cambiar color de barras 2
        "#e74c3c", //cambiar color de barras 3
        "#000000"] //cambiar color de fondo del texto
        },
};

//new Phaser.Game({ callbacks: { postBoot: function (game) { game.domContainer.style.pointerEvents = 'none'; }, }, });
const game = new Phaser.Game(config);