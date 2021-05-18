function registrarPuntuacion(codigo, puntuacion, planeta){
    firebase.auth().onAuthStateChanged(function(usuario) {
        if (usuario) {
            var nombre      = usuario.displayName;
            var userId      = usuario.uid;
            firebase.database().ref('puntuacion/'+ codigo + '/' + userId).set({
                nombre : nombre,
                puntaje: puntuacion,
                categoria: planeta
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