class Scene_registro extends Phaser.Scene {
    constructor() {
        super('Scene_registro'); 
    }

    preload() {
        console.log('Scene_registro');
        this.load.setPath('./assets/');
    }

    create() {
       
    }
}
export default Scene_registro;