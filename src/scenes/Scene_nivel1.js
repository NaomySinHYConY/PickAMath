class Scene_nivel1 extends Phaser.Scene {
    constructor() {
        super('Scene_nivel1'); 
    }

    init(code){
        var categoria = this.add.text(150, 575, 'Please login to play', { color: 'white', fontFamily: 'Sigmar One', fontSize: '20px '});
        categoria.setDepth(5);
        
        var database = firebase.database();
        database.ref().child("grupos").child(code).get().then(function(snapshot) {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                    
                var rescategoria = snapshot.val().Categoria;
                
                categoria.setText("Categoria: " + rescategoria);
                this.data.set('categoria',rescategoria);
            }
            else {
              console.log("No data available");
            }
        }).catch(function(error) {
            console.error(error);
        });
        this.data.set('coderank', code);
    }

    preload() {
        console.log('Scene_nivel1');
        this.load.setPath('./assets/nivel1');
        this.load.image(['fondo_nivel1', 'titulo', 'tituloPAM', 'IntentosCuadro', 'EliminaEnemigos', 'Mush', 
        'speech', 'btnResp', 'Intentos', 'operacionEjemplo', '169','189', '250', 'planet', 'next2']);
        this.load.image('astro', '../astro.png');
        this.load.audio("nextSound", '../sonidos/glitch-1.mp3');
        this.load.audio("clicSound", '../sonidos/clic.mp3');
        this.load.audio("hoverSoundResp", '../sonidos/hoverResp.mp3');
        this.load.audio("hoverSound", "../sonidos/whosh4.mp3");
        this.load.audio("backSound", "../sonidos/glitch-2.mp3");
    }

    create() {
        const eventos = Phaser.Input.Events;
        var flag = false;
        var aciertos = 0;
        var intentos = 8;

        this.musicConf1 = {
            volume: 0.7,
            loop: false
        };
        this.musicConf2 = {
            volume: 0.9,
            loop: false
        };
        this.musicConf3 = {
            volume: 0.15,
            loop: false
        };

        this.musicConf4 = {
            volume: 0.3,
            loop: false
        };


        this.nextSound = this.sound.add("nextSound", this.musicConf1);
        let clicSound = this.sound.add("clicSound", this.musicConf2);
        this.hoverSoundResp = this.sound.add("hoverSoundResp", this.musicConf3);
        this.hoverSound = this.sound.add("hoverSound", this.musicConf4);
        this.backSound = this.sound.add("backSound", this.musicConf1);

        
        this.respuestas = this.add.group();

        this.fondo = this.add.image(0, 0, 'fondo_nivel1', 1).setOrigin(0);
        this.intentosCuadro = this.add.image(55, 20, 'IntentosCuadro').setOrigin(0).setScale(0.8);
        this.titulo = this.add.image(500, 30, 'titulo').setScale(0.6);
        this.tituloPAM = this.add.image(500, 58, 'tituloPAM').setScale(0.65);
        this.planet = this.add.image(0, 485, 'planet').setOrigin(0);
        this.letrero = this.add.image(750, 10, 'EliminaEnemigos').setOrigin(0).setScale(0.75);
        this.mush = this.add.image(720, 0, 'Mush').setOrigin(0);
        this.speech = this.add.image(500, 260, 'speech').setOrigin(0);
        this.btn_Next = this.add.image(950, 600, 'next2').setScale(0.8).disableInteractive();
        this.btn_Resp1 = this.add.image(1000, 170, 'btnResp').setScale(0.8).setInteractive()
        .setName('Resp1');
        this.btn_Resp2 = this.add.image(0, 300, 'btnResp').setScale(0.8).setInteractive()
        .setName('Resp2');
        this.btn_Resp3 = this.add.image(1000, 430, 'btnResp').setScale(0.8).setInteractive()
        .setName('Resp3');
        this.Intentos = this.add.image(60, 45, 'Intentos').setOrigin(0).setScale(0.8);
        this.astro = this.add.image(0, 0, 'astro', 1).setOrigin(0).setInteractive().setScale(0.5);
        

        this.RespAleatorias();
        
        this.respuestas.addMultiple([this.btn_Resp1, this.btn_Resp2, this.btn_Resp3]);

        var nombreAlumno = this.add.text(150, 550, 'Please login to play', { color: 'white', fontFamily: 'Sigmar One', fontSize: '20px '});
        
        firebase.auth().onAuthStateChanged(function(usuario) {
            if (usuario) {
                var nombre      = usuario.displayName;
                console.log(nombre);
                
                nombreAlumno.setText(nombre);
            } else {
              // No user is signed in.
            }
        });

        function registrarPuntuacion(codigo, puntuacion, planeta){
            firebase.auth().onAuthStateChanged(function(usuario) {
                if (usuario) {
                    var nombre      = usuario.displayName;
                    var userId      = usuario.uid;
                    firebase.database().ref('puntuacion/'+ codigo + '/' + userId).set({
                        nombre : nombre,
                        puntaje: puntuacion,
                        categoria: 'Arcus'
                    }, (error) => {
                        if (error) {
                            // The write failed...
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            alert(errorMessage);
                        } else {
                            console.log("Puntuación insertada para: " + nombre);
                        }
                    });
                   
                } else {
                  console.log("No hay un usuario en sesión");
                }
            });
        }

        this.txtNumOportunidades = this.add.text(215, 40, "8", 
        {font: '28px Rubik', fill: '#FF8139'});


        this.input.on(eventos.GAMEOBJECT_OVER, (pointer, gameObject) => {
            if(gameObject.name == 'Resp1' || gameObject.name == 'Resp2' || gameObject.name == 'Resp3'){
                gameObject.setTint(0xF46036);
                gameObject.setScale(0.9);
                this.hoverSoundResp.play();
                this.btn_Next.setInteractive();
            }
        });
        this.input.on(eventos.GAMEOBJECT_OUT, (pointer, gameObject) => {
            if(gameObject.name == 'Resp1' || gameObject.name == 'Resp2' || gameObject.name == 'Resp3'){
                gameObject.clearTint();
                gameObject.setScale(0.8);
                this.btn_Next.disableInteractive();
            }
        });

        this.respuestas.children.iterate((resp) =>{
            resp.on(eventos.POINTER_DOWN, () => {
                resp.setScale(0.7);
                clicSound.play();
                if(resp.state == "Correcta"){
                    flag = true;
                    console.log("Es la correcta");
                }else{
                    flag = false;
                    console.log("No es la correcta");
                }
                this.btn_Next.setInteractive();
            });
        });

        this.btn_Next.on(eventos.POINTER_OVER,  () => 
        {  
            this.hoverSound.play();
            this.btn_Next.setScale(0.9);
        });
        this.btn_Next.on(eventos.POINTER_OUT, () => 
        {  
            this.btn_Next.setScale(0.8);
        });

        this.btn_Next.on(eventos.POINTER_DOWN, () => 
        {
            this.nextSound.play();
            if(aciertos == 9){
                console.log("Ganaste :c");
                registrarPuntuacion(this.data.list.coderank,aciertos, this.data.list.categoria);
                this.scene.stop(this);
                this.scene.start('Scene_rancking');
            }
            if(flag == true && aciertos < 9 && intentos != 0){ //respuesta correcta
                aciertos += 1;
                console.log("Aciertos: " + aciertos);
                this.operacion.setX(545);
                this.operacion.setText("Asombroso");
                this.time.delayedCall(2000, function(){ 
                    this.DestruirDatos();
                    this.RespAleatorias();
                }, [], this);  
                
            }else if(flag == false){ //respuesta incorrecta
                intentos -= 1;
                this.txtNumOportunidades.setText(intentos.toString());
                this.txtTitulo = this.add.text(530, 320, "Respuesta correcta:", {font: '18px Rubik', fill: '#000000'});
                this.operacion.setX(585);
                this.operacion.setY(350);
                this.operacion.setText(this.numResp1.name);
                this.time.delayedCall(2000, function(){   
                    if(intentos == 0){
                        console.log("Perdiste :c");
                        this.scene.stop(this);
                        this.scene.start('Scene_login');
                    }
                    this.txtTitulo.destroy();
                    this.DestruirDatos();
                    this.RespAleatorias();
                }, [], this); 
            }  
        });

        this.astro.on(eventos.POINTER_OVER, ()  =>
        {  
            this.hoverSound.play();
            this.astro.setScale(0.6);
        });
        this.astro.on(eventos.POINTER_OUT, () => 
        {  
            this.astro.setScale(0.5);
        });

        this.astro.on(eventos.POINTER_DOWN, () => 
        {
            this.backSound.play();
            this.scene.stop(this);
            this.scene.start('Scene_login');
        });

        //Tweens

        this.tweenMush = this.add.tween({
            targets: [this.mush],
            ease: 'Bounce',
            y:330,
            repeat: 0,
            onStart: () => {
               this.mush.setScale(0.7);
            },
            onComplete: () => {
                this.mush.setScale(1);
            },
        });

        this.tweenSpeech = this.add.tween({
            targets: [this.speech, this.operacion],
            ease: 'Linear',
            time: 4000,
            repeat: 0,
            onStart: () => {
                this.speech.alpha = 0.1;
                this.operacion.alpha = 0.1;
            },
            onComplete: () => {
                this.speech.alpha = 1;
                this.operacion.alpha = 1;
            },
        });

        this.tweenResps1y3 = this.add.tween({
            targets: [this.btn_Resp1, this.btn_Resp3],
            ease: 'Bounce.Out',
            x: 170,
            onStart: () => {
                this.btn_Resp1.setScale(1);
                this.btn_Resp3.setScale(1);
                this.numResp1.alpha = 0.1;
                this.numResp3.alpha = 0.1;
             },
             onComplete: () => {
                this.btn_Resp1.setScale(0.8);
                this.btn_Resp3.setScale(0.8);
                this.numResp1.alpha = 1;
                this.numResp3.alpha = 1;
             },
        });

        this.tweenResp2 = this.add.tween({
            targets: [this.btn_Resp2],
            ease: 'Bounce.Out',
            x: 380,
            onStart: () => {
                this.btn_Resp2.setScale(1);
                this.numResp2.alpha = 0.1;
             },
             onComplete: () => {
                this.btn_Resp2.setScale(0.8);
                this.numResp2.alpha = 1;
             },
        });
  /*      
        var categoria = this.add.text(150, 570, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '20px '});
        var database = firebase.database();
        database.ref().child("grupos").child(codigo).get().then(function(snapshot) {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                    
                var rescategoria = snapshot.val().Categoria;
                console.log("Categoria: " + rescategoria);
                categoria.setText("Categoria: " + rescategoria);
            }
            else {
              console.log("No data available");
            }
        }).catch(function(error) {
            console.error(error);
        });
*/
        
    }

    RespAleatorias(){
        var num1 = Phaser.Math.Between(0,99);
        var num2 = Phaser.Math.Between(0,99);
        var respCorrecta = num1 + num2;
        var resp1;
        var resp2;
        do {
            resp1 = Phaser.Math.RND.integerInRange(0,198)
        } while (respCorrecta == resp1)

        do {
            resp2 = Phaser.Math.RND.integerInRange(0,198)
        } while (respCorrecta == resp2)
        this.operacion = this.add.text(560, 335, num1 + " + " + num2, {font: '28px Rubik', fill: '#000000'});
        var Pos1 = {"x":155, "y":155};
        var Pos2 = {"x":365, "y":285};
        var Pos3 = {"x":155, "y":415};
        let PosRand = [Pos1, Pos2, Pos3];
        var aleatorio = Math.floor(Math.random()*(3));
        //numResp1 siempre va a tener la respuesta correcta
        this.numResp1 = this.add.text(PosRand[aleatorio]["x"], PosRand[aleatorio]["y"], respCorrecta, 
        {font: '28px Rubik', fill: '#000000'}).setName(respCorrecta);
        if(PosRand[aleatorio] == Pos1){
            this.btn_Resp1.setState("Correcta");
            this.btn_Resp2.setState(":v");
            this.btn_Resp3.setState(":v");
        }else if(PosRand[aleatorio] == Pos2){   
            this.btn_Resp2.setState("Correcta");
            this.btn_Resp1.setState(":v");
            this.btn_Resp3.setState(":v");
        }else if(PosRand[aleatorio] == Pos3){
            this.btn_Resp3.setState("Correcta");
            this.btn_Resp1.setState(":v");
            this.btn_Resp2.setState(":v");
        }
        PosRand.splice(aleatorio, 1);
        aleatorio = Math.floor(Math.random()*(2));
        this.numResp2 = this.add.text(PosRand[aleatorio]["x"], PosRand[aleatorio]["y"], resp1, 
        {font: '28px Rubik', fill: '#000000'});
        PosRand.splice(aleatorio, 1);
        this.numResp3 = this.add.text(PosRand[0]["x"], PosRand[0]["y"], resp2, 
        {font: '28px Rubik', fill: '#000000'});
    }

    DestruirDatos(){
        this.operacion.destroy();
        this.numResp1.destroy();
        this.numResp2.destroy();
        this.numResp3.destroy();
    }
}
export default Scene_nivel1;