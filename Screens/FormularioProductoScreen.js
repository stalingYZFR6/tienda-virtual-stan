import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";

export default function FormularioProductoScreen({ route, navigation }) {
  const productoEditar = route.params?.producto || null;

  const [id, setId] = useState(
    productoEditar ? String(productoEditar.id || "") : ""
  );

  const [categoriaId, setCategoriaId] = useState(
    productoEditar ? String(productoEditar.categoriaid || "") : ""
  );

  const [nombre, setNombre] = useState(
    productoEditar ? productoEditar.nombre : ""
  );

  const [precio, setPrecio] = useState(
    productoEditar ? String(productoEditar.precio || "") : ""
  );

  const [color, setColor] = useState(
    productoEditar ? productoEditar.color : ""
  );

  const [imagen, setImagen] = useState(
    productoEditar ? productoEditar.imagen : ""
  );

  const [tiempo, setTiempo] = useState(
    productoEditar ? productoEditar.tiempo : ""
  );

  const guardarProducto = async () => {
    try {
      const datosProducto = {
        id: Number(id),
        categoriaid: Number(categoriaId),
        nombre: nombre,
        precio: Number(precio),
        color: color,
        imagen: imagen,
        tiempo: tiempo,
      };

      if (productoEditar) {
        // IMPORTANTE:
        // Firestore utiliza el ID REAL del documento para actualizarlo.
        // Ese ID viene guardado en productoEditar.docId desde AdminProductosScreen.

        if (!productoEditar.docId) {
          console.error(
            "No se encontró el ID del documento de Firestore:",
            productoEditar
          );
          return;
        }

        await updateDoc(
          doc(db, "Productos", productoEditar.docId),
          datosProducto
        );
      } else {
        await addDoc(
          collection(db, "Productos"),
          datosProducto
        );
      }

      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>
        {productoEditar ? "Editar producto" : "Nuevo producto"}
      </Text>

      <Text style={styles.label}>ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 3"
        keyboardType="numeric"
        value={id}
        onChangeText={setId}
      />

      <Text style={styles.label}>ID Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 1"
        keyboardType="numeric"
        value={categoriaId}
        onChangeText={setCategoriaId}
      />

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Precio</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 27"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <Text style={styles.label}>Color</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. #F5AFC1"
        value={color}
        onChangeText={setColor}
      />

      <Text style={styles.label}>Imagen</Text>
      <TextInput
        style={styles.input}
        placeholder="URL de la imagen"
        value={imagen}
        onChangeText={setImagen}
      />

      <Text style={styles.label}>Tiempo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. 10 hours ago"
        value={tiempo}
        onChangeText={setTiempo}
      />

      <TouchableOpacity
        style={styles.botonGuardar}
        onPress={guardarProducto}
      >
        <Text style={styles.textoBotonGuardar}>
          {productoEditar
            ? "ACTUALIZAR PRODUCTO"
            : "GUARDAR PRODUCTO"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 45,
    paddingBottom: 40,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 45,
    marginBottom: 15,
    color: "#333",
  },

  botonGuardar: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  textoBotonGuardar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});