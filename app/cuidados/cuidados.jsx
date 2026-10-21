
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

const cuidadosPlantas = {
  "1": {
    nombre: "Dracaena trifasciata",
    comun: "Lengua de suegra",
    imagen: require("../../assets/lengua.avif"),
    riego: "Cada 2 o 3 semanas. Deja secar el sustrato .",
    luz: "Prefiere luz indirecta.",
    temperatura: "15 °C - 29 °C",
    fertilizacion: "1 cc (líquido) o 1 g (sólido) por cada 1 L de agua semanal.",
    alerta: "El exceso de agua puede provocar la pudrición de las raíces.",
    consejo: "Comprueba que la tierra esté seca antes de volver a regar.",
  },

  "2": {
    nombre: "Euphorbia milii",
    comun: "Corona de Cristo",
    imagen: require("../../assets/corona.avif"),
    riego: "Riega cuando el sustrato esté seco y evita dejar agua acumulada.",
    luz: "Necesita buena iluminación y tolera el sol directo si se adapta gradualmente.",
    temperatura: "18 °C - 30 °C",
    fertilizacion: "Abona moderadamente durante el crecimiento.",
    alerta: "Ten cuidado con las espinas y su savia, que puede irritar la piel y los ojos.",
    consejo: "Utiliza un sustrato con buen drenaje para mantener las raíces sanas.",
  },

  "3": {
    nombre: "Melissa officinalis",
    comun: "Toronjil",
    imagen: require("../../assets/toronjil.png"),
    riego: "Mantén el sustrato ligeramente húmedo, sin encharcarlo.",
    luz: "Necesita buena iluminación, preferiblemente protegida del sol intenso.",
    temperatura: "15 °C - 25 °C",
    fertilizacion: "Puedes aportar compost de forma moderada.",
    alerta: "Evita que las raíces permanezcan en tierra encharcada.",
    consejo: "Retira las hojas deterioradas para favorecer el crecimiento de nuevos brotes.",
  },

  "4": {
    nombre: "Lilium candidum",
    comun: "Azucena",
    imagen: require("../../assets/lirio.jpg"),
    riego: "Riega cuando la superficie del sustrato comience a secarse.",
    luz: "Ubícala en un lugar luminoso, protegido del sol más intenso.",
    temperatura: "15 °C - 25 °C",
    fertilizacion: "Utiliza fertilizante para plantas con flor siguiendo las indicaciones del producto.",
    alerta: "Es altamente tóxica para los gatos, incluso en pequeñas cantidades.",
    consejo: "Utiliza un sustrato fértil y bien drenado para evitar daños en el bulbo.",
  },

  "5": {
    nombre: "Cattleya trianae",
    comun: "Flor de mayo",
    imagen: require("../../assets/Cattleya.jpg"),
    riego: "Riega cuando el sustrato esté casi seco y evita el encharcamiento.",
    luz: "Necesita luz brillante indirecta, sin exposición prolongada al sol intenso.",
    temperatura: "15 °C - 29 °C",
    fertilizacion: "Usa fertilizante para orquídeas según las indicaciones del producto.",
    alerta: "El sol directo intenso puede quemar sus hojas.",
    consejo: "Utiliza sustrato especial para orquídeas y mantén una buena ventilación.",
  },
};

// Tarjeta animada para cada cuidado
function TarjetaCuidado({ imagen, icono, titulo, descripcion, retraso }) {
  const escala = useRef(new Animated.Value(0.9)).current;
  const opacidad = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animacion = Animated.sequence([
      Animated.delay(retraso),
      Animated.parallel([
        Animated.spring(escala, {
          toValue: 1,
          friction: 7,
          tension: 50,
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
        styles.tarjeta,
        {
          opacity: opacidad,
          transform: [{ scale: escala }],
        },
      ]}
    >
      <View style={styles.iconoCirculo}>
        {imagen ? (
          <Image
            source={imagen}
            style={styles.imagenCuidado}
            resizeMode="contain"
          />
        ) : (
          <Ionicons name={icono} size={25} color="#48643F" />
        )}
      </View>

      <Text style={styles.tarjetaTitulo}>{titulo}</Text>

      <Text style={styles.tarjetaDescripcion}>
        {descripcion}
      </Text>
    </Animated.View>
  );
}

export default function Cuidados() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const planta = cuidadosPlantas[String(id)];

  const imagenOpacidad = useRef(new Animated.Value(0)).current;
  const imagenEscala = useRef(new Animated.Value(0.95)).current;
  const contenidoOpacidad = useRef(new Animated.Value(0)).current;
  const contenidoY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    const animacion = Animated.parallel([
      Animated.parallel([
        Animated.timing(imagenOpacidad, {
          toValue: 1,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.spring(imagenEscala, {
          toValue: 1,
          friction: 8,
          tension: 45,
          useNativeDriver: true,
        }),
      ]),

      Animated.sequence([
        Animated.delay(150),
        Animated.parallel([
          Animated.timing(contenidoOpacidad, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),

          Animated.timing(contenidoY, {
            toValue: 0,
            duration: 600,
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
          No encontramos los cuidados de esta planta.
        </Text>

        <TouchableOpacity
          style={styles.botonVolverError}
          onPress={() => router.back()}
        >
          <Text style={styles.textoVolverError}>Volver</Text>
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
        {/* Fotografía de la planta */}
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

        {/* Información y cuidados */}
        <Animated.View
          style={[
            styles.contenido,
            {
              opacity: contenidoOpacidad,
              transform: [{ translateY: contenidoY }],
            },
          ]}
        >
          {/* Nombre de la planta */}
          <Text style={styles.nombre}>{planta.nombre}</Text>

          <Text style={styles.comun}>{planta.comun}</Text>

          {/* Título principal */}
          <View style={styles.encabezadoSeccion}>
            <Text style={styles.tituloSeccion}>
              Cuidados esenciales
            </Text>
          </View>

          {/* Tarjetas de cuidados */}
          <View style={styles.seccion}>
            <View style={styles.grid}>
              <TarjetaCuidado
                imagen={require("../../assets/gota.png")}
                titulo="Riego"
                descripcion={planta.riego}
                retraso={200}
              />

              <TarjetaCuidado
                imagen={require("../../assets/sol.png")}
                titulo="Luz"
                descripcion={planta.luz}
                retraso={350}
              />

              <TarjetaCuidado
                imagen={require("../../assets/temperatura.png")}
                titulo="Temperatura"
                descripcion={planta.temperatura}
                retraso={500}
              />

              <TarjetaCuidado
                imagen={require("../../assets/Fertilizante.png")}
                titulo="Fertilización"
                descripcion={planta.fertilizacion}
                retraso={650}
              />
            </View>
          </View>

          {/* Advertencia */}
          <Text style={styles.tituloSeccion}>
            Recomendaciones y advertencias
          </Text>

          <View style={styles.alerta}>
            <View style={styles.iconoAlerta}>
              <Ionicons
                name="warning-outline"
                size={23}
                color="#B86A4C"
              />
            </View>

            <View style={styles.textosAviso}>
              <Text style={styles.tituloAlerta}>
                Advertencia
              </Text>

              <Text style={styles.textoAlerta}>
                {planta.alerta}
              </Text>
            </View>
          </View>

          {/* Consejo */}
          <View style={styles.consejo}>
            <View style={styles.iconoConsejo}>
              <Ionicons
                name="bulb-outline"
                size={23}
                color="#48643F"
              />
            </View>

            <View style={styles.textosAviso}>
              <Text style={styles.tituloConsejo}>
                Recomendación
              </Text>

              <Text style={styles.textoConsejo}>
                {planta.consejo}
              </Text>
            </View>
          </View>

          {/* Mensaje final */}
          <View style={styles.mensajeFinal}>
            <Ionicons
              name="heart-outline"
              size={17}
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
    height: 280,
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

  nombre: {
    fontSize: 25,
    fontWeight: "700",
    color: "#263D2D",
    textAlign: "center",
  },

  comun: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#788B75",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 17,
  },

  descripcionIntro: {
    fontSize: 14,
    lineHeight: 23,
    color: "#626B60",
    marginBottom: 27,
  },

  encabezadoSeccion: {
    marginBottom: 5,
  },

  seccion: {
    marginBottom: 20,
  },

  tituloSeccion: {
    fontSize: 23,
    fontWeight: "700",
    color: "#2F4633",
    marginBottom: 15,
    textAlign: "center",
  },

  textoAuxiliar: {
    fontSize: 13,
    color: "#858D80",
    marginBottom: 17,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  tarjeta: {
    width: "48.5%",
    minHeight: 160,
    backgroundColor: "#F8F7F3",
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: "#D6D6D1",
    paddingHorizontal: 12,
    paddingVertical: 16,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },

  iconoCirculo: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F8F7F3",
    borderWidth: 1.5,
    borderColor: "#CBD9C1",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  imagenCuidado: {
    width: 30,
    height: 30,
  },

  tarjetaTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#344B31",
    textAlign: "center",
    marginBottom: 9,
  },

  tarjetaDescripcion: {
    fontSize: 12,
    color: "#687064",
    lineHeight: 19,
    textAlign: "center",
  },

  alerta: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FBF0E8",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EBD8C9",
    padding: 14,
    gap: 11,
    marginTop: 5,
    marginBottom: 12,
  },

  iconoAlerta: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#F5E1D4",
    alignItems: "center",
    justifyContent: "center",
  },

  textosAviso: {
    flex: 1,
  },

  tituloAlerta: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92563F",
    marginBottom: 5,
  },

  textoAlerta: {
    fontSize: 13,
    lineHeight: 20,
    color: "#685247",
  },

  consejo: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8DA",
    padding: 14,
    gap: 11,
  },

  iconoConsejo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E8EFE2",
    alignItems: "center",
    justifyContent: "center",
  },

  tituloConsejo: {
    fontSize: 14,
    fontWeight: "700",
    color: "#48643F",
    marginBottom: 5,
  },

  textoConsejo: {
    fontSize: 13,
    lineHeight: 20,
    color: "#495547",
  },

  mensajeFinal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 25,
    marginBottom: 8,
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

  botonVolverError: {
    alignSelf: "flex-start",
    marginHorizontal: 20,
    paddingVertical: 10,
  },

  textoVolverError: {
    color: "#48643F",
    fontWeight: "600",
  },
});
