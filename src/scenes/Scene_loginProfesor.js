class Scene_loginProfesor extends Phaser.Scene {
    constructor() {
        super('Scene_loginProfesor'); 
    }

    preload() {
        console.log('Scene_loginProfesor');
        this.load.setPath('./assets/');

        this.load.audio("whosh", "/sonidos/whosh4.mp3");
        this.load.audio("next", "/sonidos/glitch-1.mp3");
        this.load.audio("bback", "/sonidos/glitch-2.mp3");

        this.load.image('logo', 'logo.png');
        this.load.image('astro_back','astro.png');

        this.load.image('fondo_espacio','fondos/espacio_00.jpg');
        this.load.image('fondo_numeros_01','fondos/numeros_01.png');

        this.load.html('loginform', 'txt/loginform.html');
    }

    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;

        this.whosh  = this.sound.add("whosh", this.musicConf);
        this.next   = this.sound.add("next", this.musicConf2);
        this.bback  = this.sound.add("bback", this.musicConf2);

        this.fondo_espacio  = this.add.image(500,300,"fondo_espacio").setDepth(0).setScale(0.25);
        this.fondo_numeros  = this.add.image(500,330,"fondo_numeros_01").setDepth(1).setScale(0.65);
        this.astro_back     = this.add.image(70,565,"astro_back").setDepth(2).setScale(0.70).setInteractive();
        this.logo           = this.add.image(890,600,"logo").setDepth(2).setScale(0.65);
        var loginform      = this.add.dom(500, 500).createFromCache('loginform').setDepth(5).setVisible(true);

        this.astro_back.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            this.scene.start('Bootloader');
            this.next.play();
        });

        const esDocente = () => {
          this.scene.stop(this);
          this.scene.start('Scene_grupos');
          this.next.play();
        }  

        //Para pasar a la escena del registro
        loginform.addListener('click');
        loginform.on('click', function(event){
          if(event.target.name === 'btn_registrar'){
            console.log("Presionaste registrar");
            this.scene.stop(this);
            this.scene.start('Scene_registro');
            this.next.play();
          }else if(event.target.name === 'btn_entrar'){
            //Para ingresar como profesor
            console.log("Presionaste ingresar");
            singIn();
            var database = firebase.database();
            firebase.auth().onAuthStateChanged(function(usuario) {
                if (usuario) {
                  var email = usuario.email
                  console.log("Correo del usuario activo: " + email);
                  console.log("Verificado(?): " + usuario.emailVerified);
                  var id = usuario.uid;

                    database.ref().child("usuario").child(id).get().then(function(snapshot) {
                        if (snapshot.exists()) {
                            console.log(snapshot.val().employment);
                            var cargo = snapshot.val().employment;
                            if(cargo == "Docente"){
                                esDocente();
                            }else{
                              alert("Lo sentimos, tu cuenta no est?? registrada o no eres docente");
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
                  console.log("No hay un usuario autenticado a??n");
                }
            });
          }
        },this);
        
      }

    update(time,delta){}
}

export default Scene_loginProfesor;