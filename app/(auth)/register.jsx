import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Image,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Registro() {

    const router = useRouter();

    // Estados de los campos
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [confirmarContrasena, setConfirmarContrasena] = useState("");

    // Mostrar u ocultar contraseñas
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    // Registrar usuario
    const registrarUsuario = () => {

        // Verificar campos vacíos
        if (
            !nombre.trim() ||
            !apellido.trim() ||
            !correo.trim() ||
            !contrasena ||
            !confirmarContrasena
        ) {
            Alert.alert(
                "Campos incompletos",
                "Por favor completa todos los campos."
            );
            return;
        }

        // Validar correo
        const correoValido =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!correoValido.test(correo)) {
            Alert.alert(
                "Correo inválido",
                "Ingresa un correo electrónico válido."
            );
            return;
        }

        // Validar contraseña
        if (contrasena.length < 8) {
            Alert.alert(
                "Contraseña débil",
                "La contraseña debe tener mínimo 8 caracteres."
            );
            return;
        }

        // Confirmar contraseña
        if (contrasena !== confirmarContrasena) {
            Alert.alert(
                "Las contraseñas no coinciden",
                "Verifica que ambas contraseñas sean iguales."
            );
            return;
        }

        // Por ahora solamente mostramos un mensaje
        Alert.alert(
            "¡Registro exitoso! 🌿",
            `Bienvenido/a a Florae, ${nombre}.`,
            [
                {
                    text: "Continuar",
                    onPress: () => router.replace("/login"),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>

            <KeyboardAvoidingView
                style={styles.container}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >

                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >

                    {/* LOGO */}
                    <View style={styles.logoContainer}>

                        {/* Si tienes logo puedes reemplazar este texto
                            por un componente Image */}

                        <View style={styles.logoCircle}>
                            <Text style={styles.logoIcon}>
                                🌿
                            </Text>
                        </View>

                        <Text style={styles.logoText}>
                            Florae
                        </Text>

                        <Text style={styles.subtitle}>
                            Cuida tus plantas, ellas cuidarán de ti
                        </Text>

                    </View>


                    {/* TARJETA DE REGISTRO */}
                    <View style={styles.card}>

                        <Text style={styles.title}>
                            Crear una cuenta
                        </Text>

                        <Text style={styles.description}>
                            Regístrate para comenzar a cuidar y
                            gestionar tus plantas.
                        </Text>


                        {/* NOMBRE */}
                        <View style={styles.inputContainer}>

                            <Text style={styles.label}>
                                Nombre
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Ingresa tu nombre"
                                placeholderTextColor="#9CA3AF"
                                value={nombre}
                                onChangeText={setNombre}
                                autoCapitalize="words"
                            />

                        </View>


                        {/* APELLIDO */}
                        <View style={styles.inputContainer}>

                            <Text style={styles.label}>
                                Apellido
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholder="Ingresa tu apellido"
                                placeholderTextColor="#9CA3AF"
                                value={apellido}
                                onChangeText={setApellido}
                                autoCapitalize="words"
                            />

                        </View>


                        {/* CORREO */}
                        <View style={styles.inputContainer}>

                            <Text style={styles.label}>
                                Correo electrónico
                            </Text>

                            <TextInput
                                style={styles.input}
                                placeholder="ejemplo@correo.com"
                                placeholderTextColor="#9CA3AF"
                                value={correo}
                                onChangeText={setCorreo}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />

                        </View>


                        {/* CONTRASEÑA */}
                        <View style={styles.inputContainer}>

                            <Text style={styles.label}>
                                Contraseña
                            </Text>

                            <View style={styles.passwordContainer}>

                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Mínimo 8 caracteres"
                                    placeholderTextColor="#9CA3AF"
                                    value={contrasena}
                                    onChangeText={setContrasena}
                                    secureTextEntry={!mostrarContrasena}
                                />

                                <TouchableOpacity
                                    onPress={() =>
                                        setMostrarContrasena(
                                            !mostrarContrasena
                                        )
                                    }
                                >
                                    <Text style={styles.eye}>
                                        {mostrarContrasena
                                            ? "🙈"
                                            : "👁️"}
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>


                        {/* CONFIRMAR CONTRASEÑA */}
                        <View style={styles.inputContainer}>

                            <Text style={styles.label}>
                                Confirmar contraseña
                            </Text>

                            <View style={styles.passwordContainer}>

                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Repite tu contraseña"
                                    placeholderTextColor="#9CA3AF"
                                    value={confirmarContrasena}
                                    onChangeText={
                                        setConfirmarContrasena
                                    }
                                    secureTextEntry={
                                        !mostrarConfirmacion
                                    }
                                />

                                <TouchableOpacity
                                    onPress={() =>
                                        setMostrarConfirmacion(
                                            !mostrarConfirmacion
                                        )
                                    }
                                >
                                    <Text style={styles.eye}>
                                        {mostrarConfirmacion
                                            ? "🙈"
                                            : "👁️"}
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>


                        {/* BOTÓN REGISTRARSE */}
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={registrarUsuario}
                            activeOpacity={0.8}
                        >

                            <Text style={styles.registerButtonText}>
                                Crear cuenta
                            </Text>

                        </TouchableOpacity>


                        {/* LOGIN */}
                        <View style={styles.loginContainer}>

                            <Text style={styles.loginText}>
                                ¿Ya tienes una cuenta?
                            </Text>

                            <TouchableOpacity
                                onPress={() =>
                                    router.push("/login")
                                }
                            >

                                <Text style={styles.loginLink}>
                                    Iniciar sesión
                                </Text>

                            </TouchableOpacity>

                        </View>

                    </View>


                    {/* TEXTO INFERIOR */}
                    <Text style={styles.footer}>
                        Al crear una cuenta aceptas nuestros{" "}
                        <Text style={styles.footerLink}>
                            términos y condiciones
                        </Text>
                        .
                    </Text>

                </ScrollView>

            </KeyboardAvoidingView>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    safeArea: {
        flex: 1,
        backgroundColor: "#F3F8F3",
    },

    container: {
        flex: 1,
    },

    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingHorizontal: 22,
        paddingVertical: 25,
    },


    // LOGO

    logoContainer: {
        alignItems: "center",
        marginBottom: 20,
    },

    logoCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#DCEEDC",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
    },

    logoIcon: {
        fontSize: 34,
    },

    logoText: {
        fontSize: 42,
        fontWeight: "600",
        color: "#2E6B3A",
        fontStyle: "italic",
    },

    subtitle: {
        fontSize: 13,
        color: "#6B7280",
        marginTop: 2,
    },


    // TARJETA

    card: {
        width: "100%",
        maxWidth: 430,
        backgroundColor: "#FFFFFF",
        borderRadius: 22,
        padding: 24,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.08,
        shadowRadius: 10,

        elevation: 4,
    },

    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#1F2937",
        textAlign: "center",
        marginBottom: 8,
    },

    description: {
        fontSize: 14,
        lineHeight: 20,
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 24,
    },


    // INPUTS

    inputContainer: {
        marginBottom: 16,
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 7,
    },

    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 15,
        color: "#1F2937",
        backgroundColor: "#FAFAFA",
    },


    // PASSWORD

    passwordContainer: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        paddingLeft: 15,
        paddingRight: 12,
        backgroundColor: "#FAFAFA",
    },

    passwordInput: {
        flex: 1,
        fontSize: 15,
        color: "#1F2937",
    },

    eye: {
        fontSize: 19,
    },


    // BOTÓN

    registerButton: {
        height: 52,
        backgroundColor: "#3D7A46",
        borderRadius: 13,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 6,
        marginBottom: 20,

        shadowColor: "#3D7A46",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 5,

        elevation: 3,
    },

    registerButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },


    // LOGIN

    loginContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    loginText: {
        color: "#6B7280",
        fontSize: 14,
    },

    loginLink: {
        color: "#3D7A46",
        fontSize: 14,
        fontWeight: "700",
        marginLeft: 5,
    },


    // FOOTER

    footer: {
        maxWidth: 350,
        textAlign: "center",
        color: "#9CA3AF",
        fontSize: 12,
        lineHeight: 18,
        marginTop: 18,
        marginBottom: 10,
    },

    footerLink: {
        color: "#3D7A46",
        fontWeight: "600",
    },

});