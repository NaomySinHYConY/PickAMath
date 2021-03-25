class Scene_rancking extends Phaser.Scene {
    constructor() {
        super('Scene_rancking'); 
    }

    preload() {
        console.log('Scene_rancking');
        this.load.setPath('./assets/');
        
    }

    create() {
       
    }
}
export default Scene_rancking;