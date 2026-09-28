import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const plantas = [
    {
        id: "1",
        nombre: "Dracaena trifasciata",
        comun: "Lengua de suegra",
        imagen: require("../../assets/lengua.avif"),
    },
    {
        id: "2",
        nombre: "Euphorbia milii",
        comun: "Corona de Cristo",
        imagen: require("../../assets/corona.avif"),
    },
    {
        id: "3",
        nombre: "Melissa officinalis",
        comun: "Toronjil",
        imagen: require("../../assets/toronjil.png"),
    },
    {
        id: "4",
        nombre: "Lilium candidum",
        comun: "Azucena",
        imagen: require("../../assets/lirio.jpg"),
    },
];
const plagas = [
    {
        id: "1",
        nombre: "Myzus persicae",
        comun: "Pulgón verde",
        imagen: require("../../assets/pulgonverde.jpg"),
    },
    {
        id: "2",
        nombre: "Planococcus citri",
        comun: "Cochinilla algodonosa",
        imagen: require("../../assets/cochinilla.webp"),
    },
    {
        id: "3",
        nombre: "Aphis fabae",
        comun: "pulgón negro",
        imagen: require("../../assets/pulgonnegro.webp"),
    }
];

export default function Explore() {
    const [seccion, setSeccion] = useState("plantas");
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={seccion === "plantas" ? plantas : plagas}
                numColumns={2}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.row}
                ListHeaderComponent={
                    <>
                        {/* HEADER */}
                        <View style={styles.header}>

                            <View style={styles.leftHeader}>

                                <View style={styles.logoWrapper}>
                                    <Image
                                        source={require("../../assets/logo.png")}
                                        style={styles.logo}
                                        resizeMode="contain"
                                    />
                                </View>

                                <View style={styles.textContainer}>
                                    <Text style={styles.logoText}>Florae</Text>
                                    <Text style={styles.logoSubtitle}>
                                        Tu jardín inteligente
                                    </Text>
                                </View>

                            </View>

                            <TouchableOpacity style={styles.notification}>
                                <Ionicons
                                    name="notifications-outline"
                                    size={26}
                                    color="#48643F"
                                />

                                <View style={styles.notificationDot} />
                            </TouchableOpacity>

                        </View>
                        {/* TITULO */}
                        <Text style={styles.title}>
                            {seccion === "plantas"
                                ? "Encuentra y expande tu colección"
                                : "¿Que plaga está afectando tu planta?"}
                        </Text>

                        {/* BUSCADOR */}
                        <View style={styles.searchContainer}>
                            <Ionicons
                                name="search"
                                size={25}
                                color="#888"
                            />

                            <TextInput
                                placeholder={
                                    seccion === "plantas"
                                        ? "Busca por nombre común o científico"
                                        : "Busca por nombre común o científico"
                                }
                                style={styles.input}
                            />
                        </View>

                        {/* BOTONES */}
                        <View style={styles.categories}>
                            <TouchableOpacity
                                onPress={() => setSeccion("plantas")}
                                style={[
                                    styles.btnPlantas,
                                    seccion === "plantas" && styles.btnActivoVerde,
                                ]}
                            >
                                <Ionicons
                                    name="leaf-outline"
                                    size={22}
                                    color="#5A7D3A"
                                />

                                <Text style={styles.textPlantas}>
                                    Plantas
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setSeccion("plagas")}
                                style={[
                                    styles.btnPlagas,
                                    seccion === "plagas" && styles.btnActivoRojo,
                                ]}
                            >
                                <Ionicons
                                    name="bug-outline"
                                    size={22}
                                    color="#8B2E2E"
                                />

                                <Text style={styles.textPlagas}>
                                    Plagas
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                }
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Image
                            source={item.imagen}
                            style={styles.cardImage}
                        />

                        <View style={styles.cardBody}>
                            <Text style={styles.cardTitle}>
                                {item.nombre}
                            </Text>

                            <Text style={styles.cardSubtitle}>
                                {item.comun}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
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
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: "#F8F7F3",
    borderBottomWidth: 1,
    borderBottomColor: "#E7EEE4",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
},

leftHeader: {
    flexDirection: "row",
    alignItems: "center",
},

logoWrapper: {
    width: 62,
    height: 62,
    justifyContent: "center",
    alignItems: "center",
},

logo: {
    width: 110,
    height: 110,
},

textContainer: {
    marginLeft: 12,
},

logoText: {
    fontSize: 27,
    fontWeight: "600",
    color: "#4B6D46",
    letterSpacing: 0.6,
},

logoSubtitle: {
    fontSize: 13,
    color: "#7F8D79",
    marginTop: 2,
},

notification: {
    width: 50,
    height: 50,
    borderRadius: 25,

    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E7EEE4",

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
},

notificationDot: {
    position: "absolute",
    top: 12,
    right: 12,

    width: 9,
    height: 9,
    borderRadius: 4.5,

    backgroundColor: "#7BC45A",

    borderWidth: 2,
    borderColor: "#FFFFFF",
},
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#525d4e",
        lineHeight: 36,
        marginTop: 22,
        marginBottom: 24,
    },

    searchContainer: {
        flexDirection: "row",
        backgroundColor: "#ffffff",
        alignItems: "center",
        paddingHorizontal: 18,
        borderRadius: 20,
        height: 65,
        elevation: 4,
        marginBottom: 15,
    },

    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color:"#7F8D79",
    },

    categories: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
    },
    btnPlantas: {
        width: "48%",
        backgroundColor: "#EEF3E7",
        height: 55,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "transparent",
    },

    btnPlagas: {
        width: "48%",
        backgroundColor: "#F8ECEA",
        height: 55,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "transparent",
    },

    /* Botón activo de Plantas */
    btnActivoVerde: {
        borderColor: "#5A7D3A",
        backgroundColor: "#DCECCF",
    },

    /* Botón activo de Plagas */
    btnActivoRojo: {
        borderColor: "#8B2E2E",
        backgroundColor: "#F5D8D5",
    },

    textPlantas: {
        marginLeft: 8,
        color: "#5A7D3A",
        fontSize: 18,
        fontWeight: "600",
    },

    textPlagas: {
        marginLeft: 8,
        color: "#8B2E2E",
        fontSize: 18,
        fontWeight: "600",
    },

    row: {
        justifyContent: "space-between",
    },

    card: {
        width: "48%",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginBottom: 18,
        overflow: "hidden",
        elevation: 4,
    },

    cardImage: {
        width: "100%",
        height: 120,
    },

    cardBody: {
        padding: 12,
        minHeight: 65,
        justifyContent: "space-between",
    },

    cardTitle: {
        fontSize: 15.5,
        fontWeight: "bold",
        color: "#102415",
    },
    cardSubtitle: {
        color: "#777",
        fontStyle: "italic",
        marginTop: 4,
        fontSize: 14,
    },

});