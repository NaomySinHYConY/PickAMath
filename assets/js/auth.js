function singIn(){
    var pass = document.getElementById('password').value;
    var correo = document.getElementById('correo').value;

    firebase.auth().signInWithEmailAndPassword(correo, pass)
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

function observer(){
    firebase.auth().onAuthStateChanged(function(usuario) {
        if (usuario) {
           var email = usuario.email
           console.log("Hay un usuario activo");
           console.log("Correo: " + email);
           console.log("Verificado(?): " + usuario.emailVerified);
           redirigir(usuario);
        } else {
          // No user is signed in.
          console.log("No hay un usuario autenticado aún");
        }
    });
}

function redirigir(user){
    var user = user;
    var id = user.uid;
    //Buscar el usuario por su id
    //Buscar cual es su ocupacion para saber si es profesor
    //Si es profesor verificado,lo llevamos a la escena de los grupos
    var database = firebase.database();
    database.ref().child("usuario").child(id).get().then(function(snapshot) {
        if (snapshot.exists()) {
            console.log(snapshot.val().employment);
            var cargo = snapshot.val().employment;
            if(cargo == "Docente"){
                
            }
        }
        else 
        {
            console.log("No data available");
        }
    },this).catch(function(error) {
        console.error(error);
    });
}

function signOut(){
    firebase.auth().signOut().then(function(){
        console.log("Saliendo...");
    })
    .catch(function(error){
        console.log(error);
    });
}

class Usuario{
    constructor(nombre, correo, id, photo) {
        this.nombre = nombre;
        this.correo = correo;
        this.id = id;
        this.photo = photo;
    }
}

function ingresarGoogle(){
    var res = false;
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
            
            firebase.database().ref('usuario/' + NuevoUsuario.id).set({
                username: NuevoUsuario.nombre,
                email: NuevoUsuario.correo,
                profile_picture : NuevoUsuario.photo,
                employment: "Alumno"
            }, (error) => {
                if (error) {
                    // The write failed...
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    alert(errorMessage);
                } else {
                  // Data saved successfully!
                  console.log('Usuario '+ NuevoUsuario.nombre + ' insertado');
                  
                }
            });
        }
        else
        {
            return res = false;
        }
    });
}
