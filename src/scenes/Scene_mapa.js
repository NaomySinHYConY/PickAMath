class Scene_mapa extends Phaser.Scene {
    constructor() {
        super({
            key: 'Scene_mapa'
        });
    }

    init() {
        console.log('Escena del mapa');
    }

    preload() {
        console.log('Scene_mapa');
        this.load.setPath('./assets/mapa/');
        this.load.image(['fondoMapa', 'planet1', 'planet2', 'planet3', 'planet4',
        'planet5', 'planet6', 'planet7', 'planet8', 'planet9']);
    }

    create() {
       //Carga del fondo
        this.fondo = this.add.image(500, 325, 'fondoMapa');
        this.fondo.setScale(0.75);
    }
}
export default Scene_mapa;