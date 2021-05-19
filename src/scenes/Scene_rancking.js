class Scene_rancking extends Phaser.Scene {
    constructor() {
        super('Scene_rancking'); 
    }

    init(data){
        this.score = data.score;
        this.codigo = data.code;
        console.log("Puntaje desde la escena del ranking: " + this.score);
        console.log("Código del juego desde Scene_rancking: " + this.codigo);
    }

    preload() {
        console.log('Scene_rancking');
        this.load.setPath('./assets/');

        this.load.image(['logo', 'alien_rancking', 'strangePlanet', 'ufo']);
        this.load.image('exit', '/Botones/eliminar.png');
        this.load.image('fondoRan','/fondos/46270.jpg');

        this.load.audio("exitSound", "/sonidos/glitch-2.mp3");
        this.load.audio("hoverSound", "/sonidos/whosh4.mp3");
        this.load.html('ranktarget', 'txt/ranktarget.html');
    }

    create() {
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        const eventos = Phaser.Input.Events;
        
        this.musicConf1 = {
            volume: 0.7,
            loop: false
        };

        this.musicConf2 = {
            volume: 0.3,
            loop: false
        };

        this.exitSound = this.sound.add("exitSound", this.musicConf1);
        this.whosh = this.sound.add("hoverSound", this.musicConf2);

        //this.galaxia        = this.add.image(500,325,"galaxia").setScale(1.30).setInteractive().setDepth(0);
        this.fondoRan       = this.add.image(500,325,"fondoRan").setDepth(0).setScale(0.19);
        this.logo           = this.add.image(110,50,"logo").setDepth(5);
        this.tituloR        = this.add.image(500,120,"alien_rancking").setScale(0.8).setDepth(5);
        this.planet         = this.add.image(80,590,"strangePlanet").setScale(0.8).setDepth(5);
        this.ufo            = this.add.image(910,80,"ufo").setScale(0.8).setDepth(5);
        this.salir          = this.add.image(80,120,"exit").setInteractive().setName('exit').setScale(0.15).setDepth(5);

        this.ranktarget = this.add.dom(550, 400).createFromCache('ranktarget');
        this.ranktarget.setDepth(6).setScale(0.60);

        var puntaje = this.add.text(296, 195, 'Tu puntaje: ' + this.score, { color: 'white', fontFamily: 'Sigmar One', fontSize: '50px '});
        puntaje.setDepth(5);

        function puntajes(codigo){
            console.log("Código del juego desde Puntajes: " + codigo);
            var db = firebase.database();
            var ref = db.ref("puntuacion/"+codigo);
        
            var cantDatos = 0;
            
            ref.once('value', (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                  cantDatos = cantDatos + 1;
                  var childKey = childSnapshot.key;
                  var childData = childSnapshot.val();
                  console.log("Llave: " + childKey);
                  console.log("Nombre: " + childData.nombre);
                  console.log("Puntaje: " + childData.puntaje);
        
                  var item = "item"+cantDatos;
        
                  //const divWrapper = document.createElement("div"); 
                  //divWrapper.className = "wrapper"; 
        
                  const divItem = document.createElement("div"); 
                  divItem.className = item; 
        
                  const divCard = document.createElement("div"); 
                  divCard.className = "card";
        
                  const divImage = document.createElement("div");
                  divImage.className = "card-image";
        
                  const divText = document.createElement("div");
                  divText.className = "card-text";
        
                  const h2N = document.createElement('H2');
                  const nombreH2 = document.createTextNode(childData.nombre);
                  h2N.appendChild(nombreH2);
        
                  const pP = document.createElement('p');
                  const puntajeP = document.createTextNode(childData.puntaje);
                  pP.appendChild(puntajeP);
        
                  const divCardStats = document.createElement("div");
                  divCardStats.className = "card-stats";
        
                  const divStat = document.createElement("div");
                  divStat.className = "stat";
        
                  const divValue = document.createElement("div");
                  divValue.className = "value";
        
                  const wrapper = document.getElementById("wrapper");
                  wrapper.appendChild(divItem);
        
                  //document.getElementById("wrapper").innerHTML= divItem;
                  //document.body.appendChild(divWrapper);
                  //divWrapper.appendChild(divItem);
        
                  divItem.appendChild(divCard);
                  divCard.appendChild(divImage);
                  divCard.appendChild(divText);
                  divText.appendChild(h2N);
                  divText.appendChild(pP);
                  divCardStats.appendChild(divStat);
                  divStat.appendChild(divValue);
                });
                console.log("Total de datos: " + cantDatos);
            });
        }

        puntajes(this.codigo);

        this.salir.on(eventos.POINTER_DOWN, () =>{
            this.exitSound.play();
            signOut();
            this.scene.stop(this);
            this.scene.start('Bootloader');
        });

        this.salir.on(eventos.POINTER_OVER, () => {
            this.salir.setScale(0.2);
            this.whosh.play();
        });

        this.salir.on(eventos.POINTER_OUT, () => {
            this.salir.setScale(0.15);
        });
    }
}
export default Scene_rancking;