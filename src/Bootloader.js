class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'Bootloader'
        });
    }

    init() {
        console.log('Escena Bootloader');
    }

    preload() {
        console.log('Bootloader');
        this.load.setPath('./assets/');

        this.load.audio("whosh", "/sonidos/whosh4.mp3");
        this.load.audio("next", "/sonidos/glitch-1.mp3");

        this.load.image('PAM', 'PAM.png');
        this.load.image('PickAMath', 'PickAMath.png');
        this.load.image('fondo','fondos/fondo.png');
        this.load.image('cat','cat.png');
        this.load.image('astro','astro.png');
        this.load.image('galaxia','galaxia.png');
        this.load.image('play', '/Botones/play.png');
        this.load.image('docente','/Botones/docente.png');

        this.load.on('complete', () => {
            console.log('Load complete');
        });
    }

    create() {
        const esDocente = () => {
            this.scene.stop(this);
            this.scene.start('Scene_grupos');
            this.next.play();
          }  
        //observer();
        var database = firebase.database();

        firebase.auth().onAuthStateChanged(function(usuario) {
            if (usuario) {
               var email = usuario.email
               console.log("Hay un usuario activo");
               console.log("Correo: " + email);
               console.log("Verificado(?): " + usuario.emailVerified);
               var id = usuario.uid;

                database.ref().child("usuario").child(id).get().then(function(snapshot) {
                    if (snapshot.exists()) {
                        console.log(snapshot.val().employment);
                        var cargo = snapshot.val().employment;
                        if(cargo == "Docente"){
                            esDocente();
                        }
                    }
                    else 
                    {
                        console.log("No data available");
                    }
                }).catch(function(error) {
                    console.error(error);
                });

            } else {
              // No user is signed in.
              console.log("No hay un usuario autenticado aún");
            }
        });


        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        this.musicConf = {
            volume: 0.3,
            loop: false
        };
        this.musicConf2 = {
            volume: 0.7,
            loop: false
        };
        this.whosh = this.sound.add("whosh", this.musicConf);
        this.next = this.sound.add("next", this.musicConf2);

        this.titulo     = this.add.image(500, 270, 'PAM').setDepth(2);
        this.titulo_2   = this.add.image(500,350,"PickAMath").setDepth(2);
        this.galaxia    = this.add.image(640,330,"galaxia").setScale(0.70).setInteractive().setDepth(0);
        this.fondo      = this.add.image(470,330,"fondo").setDepth(1);
        this.astro      = this.add.image(750,280,"astro").setDepth(2).setInteractive();
        this.play       = this.add.image(500,550,"play").setInteractive().setName('play').setDepth(2);
        this.cat        = this.add.image(130,400,"cat").setDepth(2);
        this.docente    = this.add.image(900,580,"docente").setDepth(2).setInteractive().setName('docente').setScale(0.50);

        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if(gameObject.name == 'play'){
                gameObject.setScale(1.10);
                this.whosh.play();
            }else if(gameObject.name == 'docente'){
                gameObject.setScale(0.80);
                this.whosh.play();
            }
        });

        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if(gameObject.name == 'play'){
                //this.hover.play(this.musicConf2);
                gameObject.setScale(1);
            }else if(gameObject.name == 'docente'){
                gameObject.setScale(0.50);
            }
        });

        this.play.on(eventos.POINTER_DOWN, () => {
            ingresarGoogle();
            this.scene.stop(this);
            this.scene.start('Scene_login');
            this.next.play();
        });

        this.docente.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this)
            this.scene.start('Scene_loginProfesor');
            this.next.play();
        });

        /*
        this.tweens2 = this.add.tween({
            targets: this.astro,
            props: {
              alpha: { value: 0}
            },
            yoyo: false,
            repeat: 0,
        });
        */
    }

    update(time, delta) {
        // ESTA FUNCION CREA UN CICLO INFINITO
    }
}
export default Bootloader;