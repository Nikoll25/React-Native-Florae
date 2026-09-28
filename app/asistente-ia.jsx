import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function AsistenteIA() {

    const router = useRouter();

    const [imagen, setImagen] = useState(null);
    const [pregunta, setPregunta] = useState("");

    // ============================================================
    // ELEGIR FOTO DE LA GALERÍA
    // ============================================================

    const elegirDeGaleria = async () => {

        try {

            const permiso =
                await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permiso.granted) {
                Alert.alert(
                    "Permiso necesario",
                    "Necesitamos acceso a tu galería para subir una foto."
                );
                return;
            }

            const resultado =
                await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ["images"],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.7,
                });

            if (!resultado.canceled && resultado.assets?.length > 0) {
                setImagen(resultado.assets[0].uri);
            }

        } catch (error) {

            console.error("Error al seleccionar imagen:", error);

            Alert.alert(
                "Error",
                "No fue posible seleccionar la imagen."
            );
        }
    };


    // ============================================================
    // TOMAR FOTO CON CÁMARA
    // ============================================================

    const tomarFoto = async () => {

        try {

            const permiso =
                await ImagePicker.requestCameraPermissionsAsync();

            if (!permiso.granted) {
                Alert.alert(
                    "Permiso necesario",
                    "Necesitamos acceso a tu cámara para tomar una foto."
                );
                return;
            }

            const resultado =
                await ImagePicker.launchCameraAsync({
                    mediaTypes: ["images"],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.7,
                });

            if (!resultado.canceled && resultado.assets?.length > 0) {
                setImagen(resultado.assets[0].uri);
            }

        } catch (error) {

            console.error("Error al tomar foto:", error);

            Alert.alert(
                "Error",
                "No fue posible tomar la fotografía."
            );
        }
    };


    // ============================================================
    // MENÚ DE FOTO
    // ============================================================

 const abrirOpcionesFoto = () => {

    // ================= WEB =================

    if (Platform.OS === "web") {
        elegirDeGaleria();
        return;
    }

    // ================= ANDROID / IOS =================

    Alert.alert(
        "Agregar foto",
        "¿De dónde quieres tomar la imagen?",
        [
            {
                text: "Cámara",
                onPress: tomarFoto,
            },
            {
                text: "Galería",
                onPress: elegirDeGaleria,
            },
            {
                text: "Cancelar",
                style: "cancel",
            },
        ]
    );
};


    // ============================================================
    // QUITAR IMAGEN
    // ============================================================

    const quitarImagen = () => {
        setImagen(null);
    };


    // ============================================================
    // SIMULACIÓN DE IA
    // ============================================================

    const enviarPregunta = () => {

        if (!pregunta.trim() && !imagen) {

            Alert.alert(
                "Asistente IA",
                "Escribe una pregunta o agrega una foto de tu planta."
            );

            return;
        }

        Alert.alert(
            "Asistente IA 🌱",
            "Esta función estará disponible próximamente.\n\n" +
            "Aquí podrás recibir recomendaciones y diagnósticos " +
            "sobre el cuidado de tus plantas mediante inteligencia artificial."
        );
    };


    // ============================================================
    // INTERFAZ
    // ============================================================

    return (
        <SafeAreaView style={styles.container}>

            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <View style={styles.header}>

                <TouchableOpacity
                    onPress={() => router.replace("/jardin")}
                    style={styles.backButton}
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color="#29432A"
                    />
                </TouchableOpacity>

                <View style={styles.headerTextContainer}>

                    <Text style={styles.title}>
                        Asistente IA
                    </Text>

                    <Text style={styles.subtitle}>
                        Tu futuro asistente para el cuidado de plantas
                    </Text>

                </View>

            </View>


            {/* ================================================= */}
            {/* CONTENIDO */}
            {/* ================================================= */}

            <View style={styles.emptyState}>

                {imagen ? (

                    // =================================================
                    // FOTO SELECCIONADA
                    // =================================================

                    <View style={styles.previewContainer}>

                        <Image
                            source={{ uri: imagen }}
                            style={styles.previewImage}
                            resizeMode="cover"
                        />

                        <TouchableOpacity
                            style={styles.removeImageButton}
                            onPress={quitarImagen}
                        >
                            <Ionicons
                                name="close"
                                size={18}
                                color="#FFFFFF"
                            />
                        </TouchableOpacity>

                        <View style={styles.readyContainer}>

                            <Ionicons
                                name="checkmark-circle"
                                size={22}
                                color="#5F8A58"
                            />

                            <Text style={styles.readyText}>
                                Foto lista para analizar
                            </Text>

                        </View>

                        <Text style={styles.previewHint}>
                            Cuando la IA esté disponible podrás
                            recibir un diagnóstico de tu planta.
                        </Text>

                    </View>

                ) : (

                    // =================================================
                    // ESTADO INICIAL
                    // =================================================

                    <>

                        <View style={styles.iconCircle}>

                            <Ionicons
                                name="sparkles-outline"
                                size={40}
                                color="#3F5D3F"
                            />

                        </View>

                        <Text style={styles.emptyTitle}>
                            Próximamente
                        </Text>

                        <Text style={styles.emptyText}>
                            El Asistente IA estará disponible
                            próximamente para ayudarte a identificar
                            problemas, resolver dudas y cuidar mejor
                            tus plantas.
                        </Text>

                        <View style={styles.futureCard}>

                            <Ionicons
                                name="leaf-outline"
                                size={22}
                                color="#5F8A58"
                            />

                            <View style={styles.futureTextContainer}>

                                <Text style={styles.futureTitle}>
                                    ¿Qué podrás hacer?
                                </Text>

                                <Text style={styles.futureText}>
                                    • Consultar dudas sobre tus plantas{"\n"}
                                    • Analizar fotos de hojas y flores{"\n"}
                                    • Recibir recomendaciones de cuidado
                                </Text>

                            </View>

                        </View>

                    </>

                )}

            </View>


            {/* ================================================= */}
            {/* BARRA DE INPUT */}
            {/* ================================================= */}

            <View style={styles.inputBar}>

                <TouchableOpacity
                    style={styles.attachButton}
                    onPress={abrirOpcionesFoto}
                >
                    <Ionicons
                        name="camera-outline"
                        size={22}
                        color="#3F5D3F"
                    />
                </TouchableOpacity>

                <TextInput
                    placeholder="Escribe tu pregunta..."
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={pregunta}
                    onChangeText={setPregunta}
                    multiline={false}
                />

                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={enviarPregunta}
                >
                    <Ionicons
                        name="send"
                        size={18}
                        color="#FFFFFF"
                    />
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    );
}


// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8F7F3",
    },


    // ============================================================
    // HEADER
    // ============================================================

    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#E6EDE3",
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
        elevation: 2,
    },

    headerTextContainer: {
        flex: 1,
    },

    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#29432A",
    },

    subtitle: {
        fontSize: 13,
        color: "#5F8A58",
        marginTop: 2,
    },


    // ============================================================
    // CONTENIDO
    // ============================================================

    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
    },

    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#EDF2E9",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },

    emptyTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#3F5D3F",
        marginBottom: 10,
    },

    emptyText: {
        fontSize: 14,
        color: "#777",
        textAlign: "center",
        lineHeight: 21,
        maxWidth: 330,
    },


    // ============================================================
    // TARJETA FUTURA IA
    // ============================================================

    futureCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        width: "100%",
        backgroundColor: "#EDF2E9",
        borderRadius: 16,
        padding: 16,
        marginTop: 24,
    },

    futureTextContainer: {
        flex: 1,
        marginLeft: 12,
    },

    futureTitle: {
        fontSize: 15,
        fontWeight: "700",
        color: "#3F5D3F",
        marginBottom: 6,
    },

    futureText: {
        fontSize: 13,
        color: "#667466",
        lineHeight: 20,
    },


    // ============================================================
    // PREVISUALIZACIÓN
    // ============================================================

    previewContainer: {
        alignItems: "center",
        width: "100%",
    },

    previewImage: {
        width: 220,
        height: 220,
        borderRadius: 20,
    },

    removeImageButton: {
        position: "absolute",
        top: -8,
        right: 38,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#B14A4A",
        justifyContent: "center",
        alignItems: "center",
        elevation: 4,
    },

    readyContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 14,
    },

    readyText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#5F8A58",
        marginLeft: 6,
    },

    previewHint: {
        fontSize: 13,
        color: "#777",
        textAlign: "center",
        marginTop: 10,
        paddingHorizontal: 24,
        lineHeight: 18,
    },


    // ============================================================
    // INPUT
    // ============================================================

    inputBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: "#E6EDE3",
        backgroundColor: "#FFFFFF",
    },

    attachButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#EDF2E9",
        justifyContent: "center",
        alignItems: "center",
    },

    input: {
        flex: 1,
        height: 44,
        backgroundColor: "#F1F3EE",
        borderRadius: 22,
        paddingHorizontal: 16,
        fontSize: 14,
        color: "#333",
    },

    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#3F5D3F",
        justifyContent: "center",
        alignItems: "center",
    },

});
