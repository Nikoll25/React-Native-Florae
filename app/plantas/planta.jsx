
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

const datosPlantas = {
  "1": {
    nombre: "Dracaena trifasciata",
    comun: "Lengua de suegra",
    imagen: require("../../assets/lengua.avif"),
    descripcion:
      "Planta perenne de hojas rígidas, alargadas y verticales, reconocida por su resistencia y su capacidad para adaptarse a espacios interiores. Prefiere lugares con buena iluminación indirecta y un sustrato que permita drenar el exceso de agua. Tolera periodos cortos de sequía, por lo que es importante evitar el riego excesivo.",
    origen: "África occidental",
    tipo: "Decorativa",
    clima: "Cálido",
    tamano: "Mediano",
  },

  "2": {
    nombre: "Euphorbia milii",
    comun: "Corona de Cristo",
    imagen: require("../../assets/corona.avif"),
    descripcion:
      "Planta ornamental de tallos espinosos y flores pequeñas rodeadas de brácteas de colores llamativos. Necesita abundante luz, temperaturas cálidas y un sustrato bien drenado. Conviene dejar secar parcialmente la tierra entre riegos y manipularla con cuidado por sus espinas y su savia irritante.",
    origen: "Madagascar",
    tipo: "Decorativa",
    clima: "Cálido",
    tamano: "Mediano",
  },

  "3": {
    nombre: "Melissa officinalis",
    comun: "Toronjil",
    imagen: require("../../assets/toronjil.png"),
    descripcion:
      "Planta aromática de hojas verdes, dentadas y con un agradable aroma cítrico. Se cultiva en macetas y jardines por sus hojas fragantes. Crece mejor con buena iluminación, suelo fértil y humedad moderada, evitando el encharcamiento. Sus hojas pueden recolectarse cuando la planta está bien establecida.",
    origen: "Europa y región mediterránea",
    tipo: "Aromática",
    clima: "Templado",
    tamano: "Pequeño",
  },

  "4": {
    nombre: "Lilium candidum",
    comun: "Azucena",
    imagen: require("../../assets/lirio.jpg"),
    descripcion:
      "Planta bulbosa que produce flores blancas elegantes y fragantes. Necesita un lugar luminoso, un sustrato fértil con buen drenaje y riegos moderados durante su crecimiento. Es importante evitar que el bulbo permanezca en tierra encharcada. Los lirios verdaderos son muy tóxicos para los gatos.",
    origen: "Región mediterránea",
    tipo: "Decorativa",
    clima: "Templado",
    tamano: "Grande",
  },

  "5": {
    nombre: "Cattleya trianae",
    comun: "Flor de mayo",
    imagen: require("../../assets/Cattleya.jpg"),
    descripcion:
      "Orquídea epífita de flores grandes y vistosas, emblemática de Colombia. Crece sobre árboles en su hábitat natural y necesita buena iluminación indirecta, ventilación y un sustrato especial para orquídeas que permita la circulación del aire alrededor de sus raíces. Requiere riego según el secado del sustrato y las condiciones ambientales.",
    origen: "Colombia",
    tipo: "Decorativa",
    clima: "Tropical",
    tamano: "Grande",
  },
};

// Características circulares animadas
function Caracteristica({ icono, titulo, valor, retraso }) {
  const escala = useRef(new Animated.Value(0.5)).current;
  const opacidad = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animacion = Animated.sequence([
      Animated.delay(retraso),
      Animated.parallel([
        Animated.spring(escala, {
          toValue: 1,
          friction: 6,
          tension: 65,
          useNativeDriver: true,
        }),
        Animated.timing(opacidad, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]);

    animacion.start();

    return () => animacion.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.caracteristica,
        {
          opacity: opacidad,
          transform: [{ scale: escala }],
        },
      ]}
    >
      <View style={styles.circulo}>
        <Ionicons name={icono} size={27} color="#48643F" />
      </View>

      <Text style={styles.etiqueta}>{titulo}</Text>
      <Text style={styles.valor}>{valor}</Text>
    </Animated.View>
  );
}

// Botones con animación al presionar
function BotonAnimado({ children, onPress, style }) {
  const escala = useRef(new Animated.Value(1)).current;

  function presionar() {
    Animated.spring(escala, {
      toValue: 0.96,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }

  function soltar() {
    Animated.spring(escala, {
      toValue: 1,
      friction: 5,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Animated.View style={{ transform: [{ scale: escala }] }}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPressIn={presionar}
        onPressOut={soltar}
        onPress={onPress}
        style={style}
      >
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function DetallePlanta() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const planta = datosPlantas[String(id)];

  const imagenOpacidad = useRef(new Animated.Value(0)).current;
  const imagenEscala = useRef(new Animated.Value(0.94)).current;
  const contenidoOpacidad = useRef(new Animated.Value(0)).current;
  const contenidoY = useRef(new Animated.Value(25)).current;

  useEffect(() => {
    const animacion = Animated.parallel([
      Animated.parallel([
        Animated.timing(imagenOpacidad, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.spring(imagenEscala, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),

      Animated.sequence([
        Animated.delay(180),
        Animated.parallel([
          Animated.timing(contenidoOpacidad, {
            toValue: 1,
            duration: 650,
            useNativeDriver: true,
          }),
          Animated.timing(contenidoY, {
            toValue: 0,
            duration: 650,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]);

    animacion.start();

    return () => animacion.stop();
  }, []);

  if (!planta) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>
          No encontramos la información de esta planta.
        </Text>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.volverTexto}>Volver</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContenido}
      >
        {/* Fotografía */}
        <View style={styles.contenedorImagen}>
          <Animated.Image
            source={planta.imagen}
            style={[
              styles.imagen,
              {
                opacity: imagenOpacidad,
                transform: [{ scale: imagenEscala }],
              },
            ]}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#3F5D3F"
            />
          </TouchableOpacity>
        </View>

        {/* Información de la planta */}
        <Animated.View
          style={[
            styles.contenido,
            {
              opacity: contenidoOpacidad,
              transform: [{ translateY: contenidoY }],
            },
          ]}
        >
          <Text style={styles.titulo}>{planta.nombre}</Text>

          <Text style={styles.comun}>"{planta.comun}"</Text>

          {/* Descripción */}
          <Text style={styles.descripcion}>
            {planta.descripcion}
          </Text>

          {/* Origen en una sola línea */}
          <Text style={styles.origenLinea}>
            <Text style={styles.origenNegrita}>Origen: </Text>
            {planta.origen}
          </Text>

          {/* Características circulares */}
          <View style={styles.seccion}>
            <View style={styles.caracteristicas}>
              <Caracteristica
                icono="leaf-outline"
                titulo="Tipo"
                valor={planta.tipo}
                retraso={250}
              />

              <Caracteristica
                icono="sunny-outline"
                titulo="Clima"
                valor={planta.clima}
                retraso={400}
              />

              <Caracteristica
                icono="resize-outline"
                titulo="Tamaño"
                valor={planta.tamano}
                retraso={550}
              />
            </View>
          </View>

          {/* Enlace subrayado a cuidados */}
          <TouchableOpacity
            style={styles.enlaceCuidados}
            activeOpacity={0.6}
            onPress={() =>
              router.push({
                pathname: "/cuidados/cuidados",
                params: { id: String(id) },
              })
            }
          >
            <Text style={styles.enlaceCuidadosTexto}>
              Ver cuidados detallados
            </Text>

            <Ionicons
              name="arrow-forward"
              size={16}
              color="#657F60"
            />
          </TouchableOpacity>

          {/* Botón para añadir al jardín */}
          <BotonAnimado
            style={styles.boton}
            onPress={() => router.push("/(tabs)/jardin")}
          >
            <Ionicons
              name="add-circle-outline"
              size={23}
              color="#FFFFFF"
            />

            <Text style={styles.botonTexto}>
              Añadir a mi jardín
            </Text>
          </BotonAnimado>

          <View style={styles.mensajeFinal}>
            <Ionicons
              name="heart-outline"
              size={16}
              color="#8BAF72"
            />

            <Text style={styles.mensajeFinalTexto}>
              Cada planta merece un cuidado especial
            </Text>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F7F3",
  },

  scrollContenido: {
    paddingBottom: 25,
  },

  contenedorImagen: {
    height: 300,
    position: "relative",
    backgroundColor: "#E7E9E1",
    overflow: "hidden",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  imagen: {
    width: "100%",
    height: "100%",
  },

  backButton: {
    position: "absolute",
    top: 15,
    left: 17,
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  contenido: {
    paddingHorizontal: 22,
    paddingTop: 25,
  },

  titulo: {
    fontSize: 25,
    fontWeight: "700",
    color: "#263D2D",
    textAlign: "left",
  },

  comun: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#717171",
    textAlign: "left",
    marginTop: 6,
    marginBottom: 22,
  },

  descripcion: {
    fontSize: 14.5,
    lineHeight: 24,
    color: "#303130",
    marginBottom: 18,
  },

  origenLinea: {
    fontSize: 14,
    color: "#626B60",
    marginBottom: 28,
  },

  origenNegrita: {
    fontWeight: "700",
    color: "#48643F",
  },

  seccion: {
    marginBottom: 25,
  },

  tituloSeccion: {
    fontSize: 19,
    fontWeight: "700",
    color: "#2F4633",
    marginBottom: 8,
  },

  textoAuxiliar: {
    fontSize: 13,
    color: "#858D80",
    marginBottom: 19,
  },

  caracteristicas: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },

  caracteristica: {
    flex: 1,
    alignItems: "center",
  },

  circulo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.7,
    borderColor: "#CBD9C1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    shadowColor: "#48643F",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  etiqueta: {
    fontSize: 13,
    fontWeight: "700",
    color: "#48643F",
    marginBottom: 5,
  },

  valor: {
    fontSize: 12,
    color: "#737C6E",
    textAlign: "center",
  },

  enlaceCuidados: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 7,
    marginTop: 2,
    marginBottom: 22,
    paddingVertical: 8,
  },

  enlaceCuidadosTexto: {
    fontSize: 15,
    color: "#657F60",
    textDecorationLine: "underline",
    fontWeight: "500",
  },

  boton: {
    flexDirection: "row",
    backgroundColor: "#80A66F",
    minHeight: 54,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginBottom: 18,
    elevation: 3,
    shadowColor: "#48643F",
    shadowOpacity: 0.15,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
  },

  botonTexto: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "700",
  },

  mensajeFinal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginBottom: 10,
  },

  mensajeFinalTexto: {
    color: "#879080",
    fontSize: 11,
    fontStyle: "italic",
  },

  error: {
    color: "#344A35",
    fontSize: 16,
    padding: 20,
  },

  volverTexto: {
    color: "#48643F",
    padding: 20,
  },
});
