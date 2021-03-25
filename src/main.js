import Bootloader from './Bootloader.js';
import Scene_login from './scenes/Scene_login.js';
import Scene_registro from './scenes/Scene_registro.js';
import Scene_mapa from './scenes/Scene_mapa.js';
import Scene_temas from './scenes/Scene_temas.js';
import Scene_nivel1 from './scenes/Scene_nivel1.js';
import Scene_rancking from './scenes/Scene_rancking.js';
import Scene_grupos from './scenes/Scene_grupos.js';
import Scene_agregarGrupo from './scenes/Scene_agregarGrupo.js';

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
    backgroundColor: "#2E294E",
    pixelArt: false,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 500
            }
        }
    },
    scene: [
        Bootloader,Scene_login,Scene_registro,Scene_mapa,Scene_temas,Scene_nivel1,Scene_rancking,Scene_grupos,Scene_agregarGrupo
    ]
};

new Phaser.Game(config);