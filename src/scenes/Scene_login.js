class Scene_login extends Phaser.Scene {
    constructor() {
        super('Scene_login'); 
    }

    preload() {
        console.log('Scene_login');
        this.load.setPath('./assets/');

        this.load.image('galaxia','galaxia.png');
        this.load.image('play', '/Botones/play.png');
        this.load.image('astro2', 'astro2.png');
        this.load.image('fondo_numeros', 'numeros.png');
        this.load.image('logo', 'logo.png');
        this.load.image('alien','alien.png');
        this.load.image('back','back.png');

        this.load.audio("bback", "/sonidos/glitch-2.mp3");

        this.load.html('loginform', 'txt/loginform.html');
    }

    create() {
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
        this.bback = this.sound.add("bback", this.musicConf2);

        class Usuario{
            constructor(nombre, correo, id, photo) {
                this.nombre = nombre;
                this.correo = correo;
                this.id = id;
                this.photo = photo;
            }
        }

        function buscarCodigoGrupo(codigo){
            var database = firebase.database();
            database.ref().child("grupos").child(codigo).get().then(function(snapshot) {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    var clase = snapshot.val().Docente;
                    //var docente = clase.Docente;
                    console.log("Su docente es: " + clase);
                }
                else {
                  console.log("No data available");
                }
              }).catch(function(error) {
                console.error(error);
            });
        }
        
        this.galaxia        = this.add.image(500,325,"galaxia").setScale(1.30).setInteractive().setDepth(0);
        this.fondo_numeros  = this.add.image(500,330,"fondo_numeros").setDepth(1).setScale(1.2);
        this.logo           = this.add.image(100,50,"logo");
        this.back           = this.add.image(50,120,"back").setInteractive().setName('back');
        this.astro2         = this.add.image(500,270,"astro2").setScale(1.3).setDepth(2);
        this.registrar      = this.add.image(900,50,'registrar').setInteractive().setName('registrar').setDepth(2);
        this.alien          = this.add.image(75,560,"alien").setInteractive();
        this.play           = this.add.image(510,550,"play").setInteractive().setName('play').setDepth(2);
        this.element = this.add.dom(500, 500).createFromCache('loginform');
        this.element.setDepth(5);
        //this.element.addListener('click');

        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if(gameObject.name == 'play' || gameObject.name == 'registrar' || gameObject.name == 'back'){
                gameObject.setScale(1.10);
                this.whosh.play();
            }
        });

        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if(gameObject.name == 'play' || gameObject.name == 'registrar' || gameObject.name == 'back'){
                gameObject.setScale(1);
            }
        });

        this.play.on(eventos.POINTER_DOWN, () => {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope("https://www.googleapis.com/auth/userinfo.email");
                
            firebase.auth().signInWithPopup(provider).then(function (result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    
                    console.log(user);
                    
                    var usuario = firebase.auth().currentUser;
                    if(usuario != null){
                        var nombre      = usuario.displayName;
                        var email       = usuario.email;
                        var userId      = usuario.uid;
                        var imageURL  = usuario.photoURL;
                        console.log(nombre);
                        console.log(email);
                        var NuevoUsuario = new Usuario(nombre,email, userId,imageURL);
                        
                        firebase.database().ref('usuarios/' + NuevoUsuario.id).set({
                            username: NuevoUsuario.nombre,
                            email: NuevoUsuario.correo,
                            profile_picture : NuevoUsuario.photo
                          }, (error) => {
                            if (error) {
                                // The write failed...
                                var errorCode = error.code;
                                var errorMessage = error.message;
                            } else {
                              // Data saved successfully!
                              var codigoClase = document.getElementById('codigoclase').value;
                              buscarCodigoGrupo(codigoClase);
                              alert('Usuario '+ NuevoUsuario.nombre + ' insertado');
                              this.scene.stop(this);
                              this.scene.start('Scene_nivel1');
                              this.next.play();
                            }
                        });
                    }
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    var credential = error.credential;
                });
        });

        this.back.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this)
            this.scene.start('Bootloader');
            this.bback.play();
        });

        this.registrar.on(eventos.POINTER_DOWN, () => {
            this.scene.stop(this);
            this.scene.start('Scene_registro');
            this.next.play();
        });

      //  element
/*
        this.element.on('click', function(event){
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope("https://www.googleapis.com/auth/userinfo.email");
                
            firebase.auth().signInWithPopup(provider).then(function (result) {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    
                    console.log(user);
                    
                    var usuario = firebase.auth().currentUser;
                    if(usuario != null){
                        var nombre      = usuario.displayName;
                        var email       = usuario.email;
                        var userId      = usuario.uid;
                        var imageURL  = usuario.photoURL;
                        console.log(nombre);
                        console.log(email);
                        var NuevoUsuario = new Usuario(nombre,email, userId,imageURL);
                        
                        firebase.database().ref('usuarios/' + NuevoUsuario.id).set({
                            username: NuevoUsuario.nombre,
                            email: NuevoUsuario.correo,
                            profile_picture : NuevoUsuario.photo
                          }, (error) => {
                            if (error) {
                                // The write failed...
                                var errorCode = error.code;
                                var errorMessage = error.message;
                            } else {
                              // Data saved successfully!
                              var codigoClase = document.getElementById('codigoclase').value;
                              buscarCodigoGrupo(codigoClase);
                              alert('Usuario '+ NuevoUsuario.nombre + ' insertado');
                            }
                        });
                    }
                }).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    var credential = error.credential;
                });
        });*/
        
    }
}
export default Scene_login;