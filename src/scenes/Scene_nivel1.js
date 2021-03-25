class Scene_nivel1 extends Phaser.Scene {
    constructor() {
        super('Scene_nivel1'); 
    }

    preload() {
        console.log('Scene_nivel1');
        this.load.setPath('./assets/');
    }

    create() {
       
    }
}
export default Scene_nivel1;