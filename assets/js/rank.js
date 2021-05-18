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
    console.log("Código del juego: " + codigo);
    var db = firebase.database();
    var ref = db.ref("puntuacion/"+codigo);

    var cantDatos = 0;
    
    ref.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          cantDatos++;
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          console.log("Llave: " + childKey);
          console.log("Nombre: " + childData.nombre);
          console.log("Puntaje: " + childData.puntaje);

          var item = "item"+cantDatos;
          //document.getElementById("wrapper").innerHTML= data;

          document.getElementById("wrapper").innerHTML=`<div class='item"+cantDatos+"'>
                                                        <div class='card'>
                                                        <div class='card-image'></div>
                                                        <div class='card-text'>"+
                  <h2 id='nombreR'>Alumno</h2>
                  <p id='puntajeR'>Puntaje: # </p>
              </div>
              <div class='card-stats'>
                  <div class='stat'>
                  <div class='value'></div>
              </div>
              </div>
                                                        </div>
                                                        </div>`;
        });

        
        console.log("Total de datos: " + cantDatos);
    });
}