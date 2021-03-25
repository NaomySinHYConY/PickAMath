class Scene_mapa extends Phaser.Scene {
    constructor() {
        super('Scene_mapa'); 
    }

    preload() {
        console.log('Scene_mapa');
        this.load.setPath('./assets/');
    }

    create() {
       
    }
}
export default Scene_mapa;