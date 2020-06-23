import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config";
import "firebase/firestore"
import "firebase/storage"

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage()

  }

  async registrar(nombre, email, password) {
    const nuevoUsuario = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await nuevoUsuario.user.updateProfile({
        //crea el usuario y lo actualiza
        displayName: nombre
    })
  }

  //inicia sesion del usuario 

  async login(email, password){
     return this.auth.signInWithEmailAndPassword(email , password)
  }

  //cierra la secion del usuario 
  async cerrarSesion(){
    await this.auth.signOut();
    
  }
}

const firebase = new Firebase();

export default firebase;
