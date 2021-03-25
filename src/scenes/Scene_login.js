class Scene_login extends Phaser.Scene {
    constructor() {
        super('Scene_login'); 
    }

    preload() {
        console.log('Scene_login');
        this.load.setPath('./assets/');
    }

    create() {
       
    }
}
export default Scene_login;