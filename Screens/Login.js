import React, { useState } from "react"; 
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from "react-native"; 
import { signInWithEmailAndPassword } from "firebase/auth"; 
import { doc, getDoc } from "firebase/firestore"; 
import { auth, db } from "../firebase/config"; 

export default function Login({ navigation }) { 
  const [usuario, setUsuario] = useState(""); 
  const [contrasena, setContrasena] = useState(""); 
  const [cargando, setCargando] = useState(false); 

  const iniciarSesion = async () => { 
    if (!usuario || !contrasena) { 
      Alert.alert("Campos vacíos", "Por favor ingresa tu correo y contraseña."); 
      return; 
    } 

    setCargando(true); 

    try { 
      // 1. Autenticar credenciales en Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, usuario.trim(), contrasena); 
      const user = userCredential.user; 

      // 2. Consultar el rol del usuario en la colección 'usuarios' de Cloud Firestore
      const userDocRef = doc(db, "usuarios", user.uid); 
      const userDoc = await getDoc(userDocRef); 

      if (!userDoc.exists()) { 
        Alert.alert("Error de cuenta", "El usuario no tiene un perfil registrado en la base de datos."); 
        setCargando(false); 
        return; 
      } 

      const userData = userDoc.data(); 
      const rol = userData.rol; 

      // Enrutamiento dinámico basado estrictamente en el rol de Firestore
      if (rol === "cliente") { 
        navigation.replace("ClienteTabs"); 
      } else if (rol === "administrador") { 
        navigation.replace("AdminTabs"); 
      } else { 
        Alert.alert("Rol no asignado", "Este usuario no cuenta con un rol válido en el sistema."); 
      } 
    } catch (error) { 
      console.error("Error en autenticación:", error); 
      let mensajeError = "Ocurrió un error al iniciar sesión."; 
      if ( 
        error.code === "auth/invalid-credential" || 
        error.code === "auth/user-not-found" || 
        error.code === "auth/wrong-password" 
      ) { 
        mensajeError = "Correo o contraseña incorrectos."; 
      } else if (error.code === "auth/invalid-email") { 
        mensajeError = "El formato del correo electrónico es inválido."; 
      } 
      Alert.alert("Acceso denegado", mensajeError); 
    } finally { 
      setCargando(false); 
    } 
  }; 

  return ( 
    <View style={styles.contenedor}> 
      <Text style={styles.titulo}>IKY</Text> 
      <Text style={styles.subtitulo}>Iniciar sesión</Text> 
      <TextInput 
        style={styles.input} 
        placeholder="Usuario" 
        value={usuario} 
        onChangeText={setUsuario} 
        autoCapitalize="none" 
        keyboardType="email-address" 
      /> 
      <TextInput 
        style={styles.input} 
        placeholder="Contraseña" 
        value={contrasena} 
        onChangeText={setContrasena} 
        secureTextEntry 
      /> 
      <TouchableOpacity 
        style={styles.boton} 
        onPress={iniciarSesion} 
        disabled={cargando}
      > 
        {cargando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.textoBoton}>Ingresar</Text> 
        )}
      </TouchableOpacity> 
    </View> 
  ); 
} 

const styles = StyleSheet.create({ 
  contenedor: { 
    flex: 1, 
    justifyContent: "center", 
    padding: 25, 
    backgroundColor: "#f7f7ff", 
  }, 
  titulo: { 
    fontSize: 38, 
    fontWeight: "bold", 
    color: "#7C7CFF", 
    textAlign: "center", 
  }, 
  subtitulo: { 
    fontSize: 20, 
    textAlign: "center", 
    marginBottom: 30, 
  }, 
  input: { 
    backgroundColor: "#FFFFFF", 
    borderWidth: 1, 
    borderColor: "#DDD", 
    borderRadius: 10, 
    padding: 14, 
    marginBottom: 15, 
  }, 
  boton: { 
    backgroundColor: "#7C7CFF", 
    padding: 15, 
    borderRadius: 10, 
    alignItems: "center", 
  }, 
  textoBoton: { 
    color: "#FFFFFF", 
    fontSize: 16, 
    fontWeight: "bold", 
  }, 
});
