import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useFocusEffect } from "@react-navigation/native";

export default function AdminProductosScreen({ navigation }) {
  const [productos, setProductos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      obtenerProductos();
    }, [])
  );

  const obtenerProductos = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "Productos")
      );

      const datos = [];

      querySnapshot.forEach((docSnap) => {
        datos.push({
          // ID REAL DEL DOCUMENTO DE FIRESTORE
          docId: docSnap.id,

          // Datos guardados dentro del documento
          ...docSnap.data(),
        });
      });

      setProductos(datos);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
    }
  };

  const confirmarEliminar = (idDocumento, nombreProducto) => {
    Alert.alert(
      "Eliminar producto",
      `¿Estás seguro de eliminar "${nombreProducto}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => eliminarProducto(idDocumento),
        },
      ]
    );
  };

  const eliminarProducto = async (idDocumento) => {
    try {
      await deleteDoc(
        doc(db, "Productos", idDocumento)
      );

      obtenerProductos();
    } catch (error) {
      console.error(
        "Error al eliminar el producto:",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>
        Administrar productos
      </Text>

      <TouchableOpacity
        style={styles.botonAgregar}
        onPress={() =>
          navigation.navigate("FormularioProducto")
        }
      >
        <Text style={styles.textoBotonAgregar}>
          + Agregar producto
        </Text>
      </TouchableOpacity>

      <FlatList
        data={productos}
        keyExtractor={(item, index) =>
          item.docId
            ? item.docId.toString()
            : index.toString()
        }
        renderItem={({ item }) => (
          <View style={styles.tarjeta}>
            <View style={styles.infoContainer}>
              <Text style={styles.nombre}>
                {item.nombre}
              </Text>

              <Text style={styles.precio}>
                C$ {item.precio}
              </Text>

              <Text style={styles.detalles}>
                Color: {item.color}
              </Text>

              <Text style={styles.detalles}>
                ID categoría: {item.categoriaid}
              </Text>

              <Text
                style={styles.detalles}
                numberOfLines={1}
              >
                ID documento: {item.docId}
              </Text>

              <Text style={styles.tiempo}>
                {item.tiempo}
              </Text>
            </View>

            <View style={styles.botonesAccion}>
              <TouchableOpacity
                style={styles.iconoAccion}
                onPress={() =>
                  navigation.navigate(
                    "FormularioProducto",
                    {
                      producto: item,
                    }
                  )
                }
              >
                <Ionicons
                  name="pencil"
                  size={20}
                  color="#D4A373"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconoAccion}
                onPress={() =>
                  confirmarEliminar(
                    item.docId,
                    item.nombre
                  )
                }
              >
                <Ionicons
                  name="trash"
                  size={20}
                  color="#E07A5F"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 15,
    paddingTop: 45,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 15,
  },

  botonAgregar: {
    backgroundColor: "#7C7CFF",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 15,
  },

  textoBotonAgregar: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    elevation: 2,
  },

  infoContainer: {
    flex: 1,
    marginRight: 10,
  },

  nombre: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  precio: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7C7CFF",
    marginVertical: 2,
  },

  detalles: {
    fontSize: 11,
    color: "#666",
    marginTop: 1,
  },

  tiempo: {
    fontSize: 10,
    color: "#999",
    marginTop: 4,
  },

  botonesAccion: {
    flexDirection: "row",
    gap: 8,
  },

  iconoAccion: {
    backgroundColor: "#F0F0FF",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});