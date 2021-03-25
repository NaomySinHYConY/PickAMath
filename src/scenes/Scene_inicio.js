class Scene_inicio extends Phaser.Scene {
    constructor() {
        super('Scene_inicio'); 
    }

    preload() {
        console.log('Scene_inicio');
        this.load.setPath('./assets/');
    }

    create() {
       
    }
}
export default Scene_inicio;