class Scene_grupos extends Phaser.Scene {
    constructor() {
        super('Scene_grupos'); 
    }

    preload() {
        console.log('Scene_grupos');
        this.load.setPath('./assets/');

        this.load.image('galaxia','galaxia.png');
        this.load.image('exit', '/Botones/eliminar.png');
        this.load.image('logo', 'logo.png');
        this.load.image('tabla_grupos','tabla_grupos.png');
    }

    create() {
       
    }
}
export default Scene_grupos;