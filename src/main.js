import Bootloader from './Bootloader.js';

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
    backgroundColor: "#4834d4",
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
        Bootloader,Scene_inicio,Scene_login,Scene_registro,Scene_mapa,Scene_temas,Scene_nivel1,Scene_rancking,Scene_grupos,Scene_agregarGrupo
    ]
};

new Phaser.Game(config);