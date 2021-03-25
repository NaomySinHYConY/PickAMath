class Scene_temas extends Phaser.Scene {
    constructor() {
        super('Scene_temas'); 
    }

    preload() {
        console.log('Scene_temas');
        this.load.setPath('./assets/');
    }

    create() {
       
    }
}
export default Scene_temas;