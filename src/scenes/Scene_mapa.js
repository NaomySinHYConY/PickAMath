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
        'planet5', 'planet6', 'planet7', 'planet8', 'planet9', 'MAPA', 'PickAMath', 'astro', 'next', 'elige']);
        
        this.load.audio("whosh", ["../sonidos/whosh4.mp3"]);
        this.load.audio("next", ["../sonidos/glitch-1.mp3"]);
    }

    create() {
        const eventos = Phaser.Input.Events;
        
        this.musicConf = {
            volume: 0.3,
            loop: false
        };
        this.musicConf2 = {
            volume: 0.7,
            loop: false
        };
        let whosh = this.sound.add("whosh", this.musicConf);
        this.next = this.sound.add("next", this.musicConf2);

       //Carga del fondo
        this.fondo = this.add.image(500, 325, 'fondoMapa').setScale(0.23).setAlpha(0.5);
        
        this.Mapa = this.add.image(500,40,'MAPA').setScale(0.4);

        this.instrucciones = this.add.image(900,50,'elige');

        this.astro = this.add.image(40, 50, 'astro').setScale(0.15);

        //Botón de avance
        this.btonNext = this.add.image(950, 600,'next').setScale(0.25).setInteractive().setName('next');
        this.btonNext.on(eventos.POINTER_OVER, function () 
        {  
            this.scaleX += 0.07;
            this.scaleY += 0.07;
        });
        this.btonNext.on(eventos.POINTER_OUT, function () 
        {  
            this.scaleX -= 0.07;
            this.scaleY -= 0.07;
        });

        this.btonLast = this.add.image(50, 600,'next').setScale(0.25).setInteractive().setName('last').setFlipX(true);
        this.btonLast.on(eventos.POINTER_OVER, function () 
        {  
            this.scaleX += 0.07;
            this.scaleY += 0.07;
        });
        this.btonLast.on(eventos.POINTER_OUT, function () 
        {  
            this.scaleX -= 0.07;
            this.scaleY -= 0.07;
        });

        //Planetas

        this.planetas = this.add.group();

        this.dobleAnilloP = this.add.image(165, 224, 'planet9').setScale(0.16).setRotation(0.5).setInteractive();
        //this.dobleAnilloP = this.add.image(0, 0, 'planet9').setInteractive();

        this.fucsiaP = this.add.image(170, 480, 'planet5').setScale(0.24);

        this.tierraP = this.add.image(380, 360, 'planet4').setScale(0.14);
        
        this.robotP = this.add.image(500, 210, 'planet6').setScale(0.17);
        
        this.huecosP = this.add.image(490, 540,'planet7').setScale(0.18);
        
        this.hieloP = this.add.image(640, 370, 'planet1').setScale(0.15);
        
        this.slimeP = this.add.image(810, 200,'planet3').setScale(0.16);

        this.cascaraP = this.add.image(880, 370, 'planet2').setScale(0.14);
        
        this.saturnoP = this.add.image(780, 540, 'planet8').setScale(0.14).setFlipX(true);

        this.planetas.addMultiple([this.dobleAnilloP, this.fucsiaP, this.tierraP, this.robotP, this.huecosP, this.hieloP, this.slimeP, this.cascaraP, this.saturnoP]);

        this.planetas.children.iterate((planet) =>{
            planet.setInteractive();
            planet.setAlpha(0.7);

            planet.on(eventos.POINTER_OVER, function() {
                this.scaleX += 0.05;
                this.scaleY += 0.05;
                this.setAlpha(1)
                whosh.play();
            });
            planet.on(eventos.POINTER_OUT, function() {
                this.scaleX -= 0.05;
                this.scaleY -= 0.05;
                this.setAlpha(0.7);
            });
        });

        this.input.on(eventos.GAMEOBJECT_UP, (pointer, gameObject) => {
            if(gameObject.name == 'next' || gameObject.name == 'last')
            {
                this.next.play();
            }
            else
            {
                //Al ser un planeta, debe mostrar la información correspondiente a su categoría
                // this.planetas.children.iterate((planet) =>{
                //     planet.setAlpha(0.6);
                // });
                // gameObject.setAlpha(1);
            }
        });

        this.btonLast.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this)
            this.scene.start('Scene_grupos');
            //this.next.play();
        });

    }
}
export default Scene_mapa;