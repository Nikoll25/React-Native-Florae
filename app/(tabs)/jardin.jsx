import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,Button } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const plantas = [
    {
        id: 1,
        nombre: "Flor de mayo",
        estado: "Saludable",
        tipo: "saludable",
        imagen: require("../../assets/Cattleya.jpg"),
    },
    {
        id: 2,
        nombre: "Narciso",
        estado: "Necesita riego",
        tipo: "riego",
        imagen: require("../../assets/Cattleya.jpg"),
    },
    {
        id: 3,
        nombre: "Hortensia",
        estado: "En crecimiento",
        tipo: "crecimiento",
        imagen: require("../../assets/Cattleya.jpg"),
    },
    {
        id: 4,
        nombre: "Valeriana",
        estado: "Necesita riego",
        tipo: "riego",
        imagen: require("../../assets/Cattleya.jpg"),
    },
    {
        id: 5,
        nombre: "Escaramujo",
        estado: "Saludable",
        tipo: "saludable",
        imagen: require("../../assets/Cattleya.jpg"),
    },
];

export default function Jardin() {
      const router = useRouter();
    const renderEstado = (tipo, texto) => {
        switch (tipo) {
            case "saludable":
                return (
                    <View style={styles.estado}>
                        <Ionicons
                            name="checkmark-circle"
                            size={22}
                            color="#4CAF50"
                        />
                        <Text style={[styles.estadoTexto, { color: "#4CAF50" }]}>
                            {texto}
                        </Text>
                    </View>
                );

            case "riego":
                return (
                    <View style={styles.estado}>
                        <Ionicons
                            name="water"
                            size={22}
                            color="#C63D3D"
                        />
                        <Text style={[styles.estadoTexto, { color: "#C63D3D" }]}>
                            {texto}
                        </Text>
                    </View>
                );

            case "crecimiento":
                return (
                    <View style={styles.estado}>
                        <MaterialCommunityIcons
                            name="sprout"
                            size={22}
                            color="#97A828"
                        />
                        <Text style={[styles.estadoTexto, { color: "#97A828" }]}>
                            {texto}
                        </Text>
                    </View>
                );
        }
    };

    return (
        <View style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADER */}

                <View style={styles.header}>

                    <View style={styles.left}>

                        <View style={styles.logoContainer}>
                            <Image
                                source={require("../../assets/logo.png")}
                                style={styles.logo}
                            />
                        </View>

                        <Text style={styles.titulo}>
                            Mi Jardín
                        </Text>

                    </View>

                    <TouchableOpacity style={styles.notificationButton}>
                        <Ionicons
                            name="notifications-outline"
                            size={28}
                            color="#2F4F2F"
                        />
                    </TouchableOpacity>

                </View>
                {/* CATEGORÍAS */}

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.categorias}
                >

                    <TouchableOpacity style={styles.activa}>
                        <Text style={styles.textoActivo}>
                            Todas
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoria}>
                        <Text>Decorativa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoria}>
                        <Text>Culinaria</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoria}>
                        <Text>Medicinal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.categoria}>
                        <Text>Frutales</Text>
                    </TouchableOpacity>

                </ScrollView>

                {/* TARJETAS */}

                {plantas.map((planta) => (

                    <View key={planta.id} style={styles.card}>

                        <Image
                            source={planta.imagen}
                            style={styles.imagen}
                        />

                        <View style={styles.info}>

                            <View style={styles.superior}>

                                <Text style={styles.nombre}>
                                    {planta.nombre}
                                </Text>

                                <Ionicons
                                    name="ellipsis-vertical"
                                    size={22}
                                    color="#555"
                                />

                            </View>

                            {renderEstado(planta.tipo, planta.estado)}

                        </View>

                    </View>

                ))}

            </ScrollView>

            {/* BOTÓN FLOTANTE */}

           <TouchableOpacity
  style={styles.botonFlotante}
  onPress={() => router.push("/(tabs)/explore")}
>
  <Ionicons
    name="add"
    size={35}
    color="#FFFFFF"
  />
</TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8F8F4",
        paddingTop: 10,
        paddingHorizontal: 18
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 0,
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
    },

    logoContainer: {
        width: 70,      // espacio reservado para el logo
        alignItems: "center",
    },

    logo: {
        width: 200,
        height: 90,
        resizeMode: "contain",
    },

    titulo: {
        marginLeft: 10,
        fontSize: 25,
        fontWeight: "bold",
        color: "#2F4F2F",
    },

    categorias: {
        marginBottom: 20
    },

    categoria: {
        backgroundColor: "#fff",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: 10,
        elevation: 2
    },

    activa: {
        backgroundColor: "#8BAF72",
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 25,
        marginRight: 10
    },

    textoActivo: {
        color: "#fff",
        fontWeight: "bold"
    },

    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 12,
        marginBottom: 18,
        elevation: 4
    },

    imagen: {
        width: 120,
        height: 120,
        borderRadius: 16
    },

    info: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "center"
    },

    superior: {
        flexDirection: "row",
        justifyContent: "space-between"
    },

    nombre: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#243B2D",
        marginBottom: 15
    },

    estado: {
        flexDirection: "row",
        alignItems: "center"
    },

    estadoTexto: {
        marginLeft: 8,
        fontSize: 16
    },

    botonFlotante: {
        position: "absolute",
        bottom: 20,
        right: 10,
        width: 70,
        height: 70,
        borderRadius: 36,
        backgroundColor: "#8BAF72",
        justifyContent: "center",
        alignItems: "center",
        elevation: 8
    }

});