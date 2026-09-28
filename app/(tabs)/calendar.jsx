
import React, { useMemo, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
    Calendar,
    LocaleConfig,
} from "react-native-calendars";


// ===============================================================
// CONFIGURACIÓN DEL CALENDARIO EN ESPAÑOL
// ===============================================================

LocaleConfig.locales["es"] = {
    monthNames: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ],

    monthNamesShort: [
        "Ene.",
        "Feb.",
        "Mar.",
        "Abr.",
        "May.",
        "Jun.",
        "Jul.",
        "Ago.",
        "Sep.",
        "Oct.",
        "Nov.",
        "Dic.",
    ],

    dayNames: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ],

    dayNamesShort: [
        "Dom.",
        "Lun.",
        "Mar.",
        "Mié.",
        "Jue.",
        "Vie.",
        "Sáb.",
    ],

    today: "Hoy",
};

LocaleConfig.defaultLocale = "es";


// ---------------------------------------------------------------
// DATOS DE EJEMPLO (en memoria) — mismas plantas que en Jardín,
// con "eventos" (días marcados en el calendario) y "tareas"
// (checklist) propios de cada planta.
// ---------------------------------------------------------------

const plantasIniciales = [
    {
        id: "1",
        nombre: "Orquídea Cattleya",
        imagen: require("../../assets/Cattleya.jpg"),
        eventos: {
            6: {
                tipo: "riego",
                tarea: "Regar con agua a temperatura ambiente, empapando bien el sustrato."
            },
            15: {
                tipo: "cuidado",
                tarea: "Quitar hojas secas y limpiar residuos."
            },
            20: {
                tipo: "riego",
                tarea: "Regar y aprovechar para aplicar fertilizante diluido."
            },
        },
        tareas: [
            {
                id: "1-t1",
                texto: "HOY - Limpiar hojas",
                hecha: false
            },
        ],
    },

    {
        id: "2",
        nombre: "Narciso",
        imagen: require("../../assets/narciso.jpg"),
        eventos: {
            10: {
                tipo: "riego",
                tarea: "Regar moderadamente, evitando encharcar el bulbo."
            },
        },
        tareas: [
            {
                id: "2-t1",
                texto: "HOY - Regar planta",
                hecha: false
            },
        ],
    },

    {
        id: "3",
        nombre: "Albahaca",
        imagen: require("../../assets/albahaca.jpg"),
        eventos: {
            3: {
                tipo: "cuidado",
                tarea: "Cortar las flores para que siga produciendo hojas."
            },
            23: {
                tipo: "cuidado",
                tarea: "Podar las hojas superiores para estimular el crecimiento."
            },
        },
        tareas: [
            {
                id: "3-t1",
                texto: "HOY - Limpiar hojas",
                hecha: false
            },
            {
                id: "3-t2",
                texto: "HOY - Podar brotes",
                hecha: false
            },
        ],
    },

    {
        id: "4",
        nombre: "valeriana",
        imagen: require("../../assets/valeriana.jpg"),
        eventos: {
            12: {
                tipo: "riego",
                tarea: "Regar manteniendo el sustrato húmedo, sin encharcar."
            },
        },
        tareas: [
            {
                id: "4-t1",
                texto: "HOY - Regar planta",
                hecha: false
            },
        ],
    },

    {
        id: "5",
        nombre: "Pronto alivio",
        imagen: require("../../assets/prontoalivio.jpg"),
        eventos: {
            8: {
                tipo: "riego",
                tarea: "Regar en la base evitando mojar las hojas."
            },
        },
        tareas: [
            {
                id: "5-t1",
                texto: "HOY - Regar planta",
                hecha: false
            },
        ],
    },

    {
        id: "6",
        nombre: "Sábila",
        imagen: require("../../assets/sabila.jpg"),
        eventos: {
            18: {
                tipo: "cuidado",
                tarea: "Retirar hojas secas de la base."
            },
        },
        tareas: [
            {
                id: "6-t1",
                texto: "HOY - Limpiar hojas secas",
                hecha: false
            },
        ],
    },

    {
        id: "7",
        nombre: "Tomate de árbol",
        imagen: require("../../assets/tomatearbol.webp"),
        eventos: {
            5: {
                tipo: "riego",
                tarea: "Regar abundantemente, es una etapa de crecimiento activo."
            },
            25: {
                tipo: "cuidado",
                tarea: "Revisar tutores y guiar las ramas nuevas."
            },
        },
        tareas: [
            {
                id: "7-t1",
                texto: "HOY - Regar planta",
                hecha: false
            },
            {
                id: "7-t2",
                texto: "HOY - Revisar tutores",
                hecha: false
            },
        ],
    },

    {
        id: "8",
        nombre: "Tomate",
        imagen: require("../../assets/tomate.webp"),
        eventos: {
            14: {
                tipo: "riego",
                tarea: "Regar en la base, temprano en la mañana."
            },
        },
        tareas: [
            {
                id: "8-t1",
                texto: "HOY - Regar planta",
                hecha: false
            },
        ],
    },
];


// ===============================================================
// COMPONENTE
// ===============================================================

export default function CalendarioPlantas() {

    const [plantaSeleccionada, setPlantaSeleccionada] = useState(
        plantasIniciales[0].id
    );

    // Ya no necesitamos mes/anio ni generarCuadricula.
    // react-native-calendars se encarga del calendario.

    const [tareasPorPlanta, setTareasPorPlanta] = useState(
        Object.fromEntries(
            plantasIniciales.map((p) => [p.id, p.tareas])
        )
    );

    // Fecha seleccionada por la librería
    const [fechaSeleccionada, setFechaSeleccionada] = useState(
        "2026-01-15"
    );

    // Modal de "tarea del día"
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);

    // Modal de confirmación
    const [confirmacionVisible, setConfirmacionVisible] =
        useState(false);


    const planta = useMemo(
        () =>
            plantasIniciales.find(
                (p) => p.id === plantaSeleccionada
            ) || plantasIniciales[0],
        [plantaSeleccionada]
    );


    // ===========================================================
    // OBTENER EL DÍA DESDE UNA FECHA
    // ===========================================================

    const obtenerDia = (fecha) => {
        return Number(fecha.split("-")[2]);
    };


    // ===========================================================
    // TAREAS DE LA PLANTA
    // ===========================================================

    const tareasDeLaPlanta = tareasPorPlanta[planta.id] || [];


    // ===========================================================
    // CAMBIAR UNA TAREA
    // ===========================================================

    const alternarTarea = (id) => {

        setTareasPorPlanta((prev) => ({
            ...prev,

            [planta.id]: prev[planta.id].map((t) =>
                t.id === id
                    ? { ...t, hecha: !t.hecha }
                    : t
            ),
        }));
    };


    // ===========================================================
    // TOCAR UNA FECHA DEL CALENDARIO
    // ===========================================================

    const tocarDia = (fecha) => {

        const dia = obtenerDia(fecha);

        const evento = planta.eventos[dia];

        // Solo abre el modal si existe un cuidado
        if (!evento) {
            return;
        }

        setFechaSeleccionada(fecha);

        setDiaSeleccionado({
            dia,
            ...evento,
        });
    };


    // ===========================================================
    // CERRAR MODAL
    // ===========================================================

    const cerrarDiaModal = () =>
        setDiaSeleccionado(null);


    // ===========================================================
    // ENVIAR TAREAS
    // ===========================================================

    const enviarTareas = () => {

        setTareasPorPlanta((prev) => ({
            ...prev,

            [planta.id]: prev[planta.id].map(
                (t) => ({
                    ...t,
                    hecha: true
                })
            ),
        }));

        setConfirmacionVisible(true);
    };


    const cerrarConfirmacion = () =>
        setConfirmacionVisible(false);


    // ===========================================================
    // FECHA ACTUAL DE EJEMPLO
    // ===========================================================

    const hoy = "2026-01-15";


    // ===========================================================
    // FECHAS QUE TIENEN CUIDADOS
    // ===========================================================

    const markedDates = {};

    Object.keys(planta.eventos).forEach((dia) => {

        const fecha =
            `2026-01-${String(dia).padStart(2, "0")}`;

        markedDates[fecha] = {
            marked: true,
        };
    });


    // ===========================================================
    // CALENDARIO
    // ===========================================================

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADER */}

                <View style={styles.header}>

                    <View>

                        <Text style={styles.title}>
                            Calendario
                        </Text>

                        <View style={styles.plantsInfo}>

                            <Ionicons
                                name="water"
                                size={14}
                                color="#5F8A58"
                            />

                            <Text style={styles.plantsText}>
                                {planta.nombre}
                            </Text>

                        </View>

                    </View>


                    <TouchableOpacity style={styles.notification}>

                        <Ionicons
                            name="notifications-outline"
                            size={25}
                            color="#48643F"
                        />

                        <View style={styles.notificationDot} />

                    </TouchableOpacity>

                </View>


                {/* MIS PLANTAS — todas las plantas del jardín */}

                <View style={styles.plantsTitleRow}>

                    <Text style={styles.sectionTitle}>
                        Mis Plantas
                    </Text>

                    <View style={styles.scrollHint}>

                        <Text style={styles.scrollHintText}>
                            Desliza
                        </Text>

                        <Ionicons
                            name="chevron-forward"
                            size={16}
                            color="#5F8A58"
                        />

                    </View>

                </View>


                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.plantsRow}
                >

                    {plantasIniciales.map((p) => {

                        const activa =
                            p.id === plantaSeleccionada;

                        return (

                            <TouchableOpacity
                                key={p.id}
                                style={styles.plantCard}
                                onPress={() =>
                                    setPlantaSeleccionada(p.id)
                                }
                                activeOpacity={0.8}
                            >

                                <Image
                                    source={p.imagen}
                                    style={[
                                        styles.plantImage,
                                        activa &&
                                            styles.plantImageActiva,
                                    ]}
                                    resizeMode="cover"
                                />

                                <Text
                                    style={styles.plantName}
                                    numberOfLines={1}
                                >
                                    {p.nombre}
                                </Text>

                            </TouchableOpacity>

                        );

                    })}

                </ScrollView>


                {/* =================================================
                    CALENDARIO
                    AHORA LO MANEJA react-native-calendars
                ================================================= */}

                <View style={styles.calendarCard}>

                    <Calendar

                        current={fechaSeleccionada}

                        onDayPress={(day) =>
                            tocarDia(day.dateString)
                        }

                        firstDay={1}

                        hideExtraDays={true}

                        enableSwipeMonths={true}

                        markedDates={{
                            ...markedDates,

                            [fechaSeleccionada]: {
                                ...markedDates[
                                    fechaSeleccionada
                                ],
                                selected: true,
                            },
                        }}

                        monthFormat="MMMM yyyy"

                        theme={{
                            backgroundColor: "#F8F7F3",
                            calendarBackground: "#F8F7F3",

                            textSectionTitleColor:
                                "#A9B8A3",

                            selectedDayBackgroundColor:
                                "#EDF2E9",

                            selectedDayTextColor:
                                "#29432A",

                            todayTextColor:
                                "#29432A",

                            dayTextColor:
                                "#253A27",

                            textDisabledColor:
                                "#D5DDD1",

                            arrowColor:
                                "#29432A",

                            monthTextColor:
                                "#29432A",

                            textMonthFontSize: 17,

                            textMonthFontWeight: "500",

                            textDayHeaderFontSize: 12,

                            textDayFontSize: 15,
                        }}

                        renderArrow={(direction) => (

                            <Ionicons
                                name={
                                    direction === "left"
                                        ? "chevron-back"
                                        : "chevron-forward"
                                }
                                size={20}
                                color="#29432A"
                            />

                        )}

                        dayComponent={( {
                            date,
                            state,
                        }) => {

                            const dia =
                                Number(date.day);

                            const evento =
                                planta.eventos[dia];

                            const esHoy =
                                date.dateString === hoy;

                            return (

                                <TouchableOpacity
                                    style={[
                                        styles.dayCell,

                                        esHoy &&
                                            styles.dayCellHoy,
                                    ]}
                                    onPress={() =>
                                        evento &&
                                        tocarDia(
                                            date.dateString
                                        )
                                    }
                                    disabled={!evento}
                                    activeOpacity={
                                        evento ? 0.6 : 1
                                    }
                                >

                                    {date ? (
                                        <>

                                            <Text
                                                style={[
                                                    styles.dayNumber,

                                                    state ===
                                                        "disabled" &&
                                                        {
                                                            color:
                                                                "#D5DDD1",
                                                        },
                                                ]}
                                            >
                                                {date.day}
                                            </Text>


                                            {evento?.tipo ===
                                                "riego" && (

                                                <Ionicons
                                                    name="water"
                                                    size={15}
                                                    color="#2C6FA6"
                                                />

                                            )}


                                            {evento?.tipo ===
                                                "cuidado" && (

                                                <Ionicons
                                                    name="leaf"
                                                    size={15}
                                                    color="#5F8A58"
                                                />

                                            )}

                                        </>
                                    ) : null}

                                </TouchableOpacity>

                            );

                        }}

                    />

                </View>


                {/* TAREAS DIARIAS — solo de la planta seleccionada */}

                <View style={styles.tasksSection}>

                    <View style={styles.tasksHeader}>

                        <Ionicons
                            name="checkmark-circle-outline"
                            size={18}
                            color="#29432A"
                        />

                        <Text style={styles.sectionTitle}>
                            Tareas Diarias
                        </Text>

                    </View>


                    {/* =================================================
                        AQUÍ SE MUESTRAN LOS CUIDADOS DEL DÍA
                    ================================================= */}

                    {(() => {

                        const dia =
                            obtenerDia(fechaSeleccionada);

                        const evento =
                            planta.eventos[dia];

                        if (!evento) {

                            return (

                                <Text
                                    style={styles.tasksEmpty}
                                >
                                    No hay cuidados programados
                                    para este día.
                                </Text>

                            );
                        }


                        const tareaDelDia =
                            tareasDeLaPlanta.find(
                                (t) =>
                                    t.texto
                                        .toLowerCase()
                                        .includes(
                                            evento.tipo ===
                                                "riego"
                                                ? "regar"
                                                : "limpiar"
                                        )
                            );


                        if (tareaDelDia) {

                            return (

                                <TouchableOpacity
                                    key={tareaDelDia.id}
                                    style={styles.taskRow}
                                    onPress={() =>
                                        alternarTarea(
                                            tareaDelDia.id
                                        )
                                    }
                                    activeOpacity={0.8}
                                >

                                    <View
                                        style={styles.taskInfo}
                                    >

                                        <Text
                                            style={
                                                styles.taskWhen
                                            }
                                        >
                                            {tareaDelDia.texto.split(
                                                " - "
                                            )[0]}
                                        </Text>

                                        <Text
                                            style={[
                                                styles.taskLabel,
                                                tareaDelDia.hecha &&
                                                    styles.taskLabelHecha,
                                            ]}
                                        >
                                            {evento.tarea}
                                        </Text>

                                    </View>


                                    <Ionicons
                                        name={
                                            tareaDelDia.hecha
                                                ? "checkbox"
                                                : "square-outline"
                                        }
                                        size={22}
                                        color={
                                            tareaDelDia.hecha
                                                ? "#5F8A58"
                                                : "#A9B8A3"
                                        }
                                    />

                                </TouchableOpacity>

                            );

                        }


                        // Si el cuidado no coincide con una
                        // tarea existente, mostramos igualmente
                        // el cuidado del día.

                        return (

                            <TouchableOpacity
                                style={styles.taskRow}
                                onPress={() => {

                                    setDiaSeleccionado({
                                        dia,
                                        ...evento,
                                    });

                                }}
                                activeOpacity={0.8}
                            >

                                <View
                                    style={styles.taskInfo}
                                >

                                    <Text
                                        style={styles.taskWhen}
                                    >
                                        CUIDADO DEL DÍA
                                    </Text>

                                    <Text
                                        style={styles.taskLabel}
                                    >
                                        {evento.tarea}
                                    </Text>

                                </View>


                                <Ionicons
                                    name={
                                        evento.tipo ===
                                            "riego"
                                            ? "water"
                                            : "leaf"
                                    }
                                    size={22}
                                    color={
                                        evento.tipo ===
                                            "riego"
                                            ? "#2C6FA6"
                                            : "#5F8A58"
                                    }
                                />

                            </TouchableOpacity>

                        );

                    })()}


                    {/* BOTÓN: ENVIAR TAREAS DEL DÍA */}

                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={enviarTareas}
                        activeOpacity={0.85}
                    >

                        <Text
                            style={styles.sendButtonText}
                        >
                            Enviar
                        </Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>


            {/* MODAL: TAREA DEL DÍA */}

            <Modal
                visible={!!diaSeleccionado}
                transparent
                animationType="fade"
                onRequestClose={cerrarDiaModal}
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalCard}>

                        <View
                            style={[
                                styles.modalIconWrapper,

                                diaSeleccionado?.tipo ===
                                    "riego"
                                    ? styles.modalIconRiego
                                    : styles.modalIconCuidado,
                            ]}
                        >

                            <Ionicons
                                name={
                                    diaSeleccionado?.tipo ===
                                        "riego"
                                        ? "water"
                                        : "leaf"
                                }
                                size={26}
                                color={
                                    diaSeleccionado?.tipo ===
                                        "riego"
                                        ? "#2C6FA6"
                                        : "#5F8A58"
                                }
                            />

                        </View>


                        <Text style={styles.modalTitle}>

                            {diaSeleccionado
                                ? `${diaSeleccionado.dia} de ${[
                                      "enero",
                                      "febrero",
                                      "marzo",
                                      "abril",
                                      "mayo",
                                      "junio",
                                      "julio",
                                      "agosto",
                                      "septiembre",
                                      "octubre",
                                      "noviembre",
                                      "diciembre",
                                  ][
                                      Number(
                                          fechaSeleccionada.split(
                                              "-"
                                          )[1]
                                      ) - 1
                                  ]}`
                                : ""}

                        </Text>


                        <Text style={styles.modalSubtitle}>
                            {planta.nombre}
                        </Text>


                        <Text style={styles.modalMessage}>
                            {diaSeleccionado?.tarea}
                        </Text>


                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={cerrarDiaModal}
                        >

                            <Text
                                style={styles.modalCloseText}
                            >
                                Entendido
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>


            {/* MODAL: CONFIRMACIÓN DE TAREAS ENVIADAS */}

            <Modal
                visible={confirmacionVisible}
                transparent
                animationType="fade"
                onRequestClose={
                    cerrarConfirmacion
                }
            >

                <View style={styles.modalOverlay}>

                    <View style={styles.modalCard}>

                        <View
                            style={[
                                styles.modalIconWrapper,
                                styles.modalIconExito,
                            ]}
                        >

                            <Ionicons
                                name="checkmark-circle"
                                size={30}
                                color="#5F8A58"
                            />

                        </View>


                        <Text style={styles.modalTitle}>
                            ¡Tareas completadas!
                        </Text>


                        <Text style={styles.modalMessage}>
                            Se registraron las tareas del día para{" "}
                            {planta.nombre}.
                        </Text>


                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={
                                cerrarConfirmacion
                            }
                        >

                            <Text
                                style={styles.modalCloseText}
                            >
                                Listo
                            </Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </Modal>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#F8F7F3",
        paddingHorizontal: 16,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 10,
        paddingBottom: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#E6EDE3",
    },

    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#29432A",
    },

    plantsInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 2,
    },

    plantsText: {
        fontSize: 14,
        color: "#5F8A58",
        fontWeight: "600",
    },

    notification: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 3,
    },

    notificationDot: {
        position: "absolute",
        top: 9,
        right: 9,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#79B851",
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#29432A",
        marginTop: 18,
        marginBottom: 12,
    },

    // ===========================================================
    // INDICADOR PARA DESLIZAR EN MIS PLANTAS
    // ===========================================================

    plantsTitleRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },

    scrollHint: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
        marginBottom: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor: "#EDF2E9",
    },

    scrollHintText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#5F8A58",
        marginRight: 2,
    },

    plantsRow: {
        flexDirection: "row",
        gap: 12,
        paddingBottom: 4,
    },

    plantCard: {
        width: 78,
        alignItems: "center",
    },

    plantImage: {
        width: 78,
        height: 78,
        borderRadius: 14,
        backgroundColor: "#EDF2E9",
        borderWidth: 2,
        borderColor: "transparent",
    },

    plantImageActiva: {
        borderColor: "#5F8A58",
    },

    plantName: {
        marginTop: 6,
        fontSize: 12,
        fontWeight: "600",
        color: "#253A27",
        textAlign: "center",
    },


    // ===========================================================
    // CALENDARIO
    // ===========================================================

    calendarCard: {
        borderRadius: 18,
        padding: 0,
        marginTop: 18,
        elevation: 2,
        overflow: "hidden",
    },


    // ===========================================================
    // DÍA PERSONALIZADO DEL CALENDARIO
    // ===========================================================

    dayCell: {
        width: 40,
        height: 43,
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 8,
        paddingTop: 2,
    },

    dayCellHoy: {
        backgroundColor: "#EDF2E9",
    },

    dayNumber: {
        fontSize: 15,
        color: "#253A27",
        marginBottom: 2,
    },


    // ===========================================================
    // TAREAS
    // ===========================================================

    tasksSection: {
        marginTop: 22,
        marginBottom: 30,
    },

    tasksHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    tasksEmpty: {
        fontSize: 13,
        color: "#7A8B74",
        fontStyle: "italic",
    },

    taskRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 14,
        marginBottom: 0,
        elevation: 1,
    },

    taskInfo: {
        flex: 1,
        paddingRight: 12,
    },

    taskWhen: {
        fontSize: 12,
        fontWeight: "600",
        color: "#5F8A58",
        marginBottom: 3,
    },

    taskLabel: {
        fontSize: 17,
        fontWeight: "400",
        color: "#253A27",
        marginTop: 0,
    },

    taskLabelHecha: {
        textDecorationLine: "line-through",
        color: "#A9B8A3",
    },

    sendButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#9dcd88",
        borderRadius: 14,
        paddingVertical: 14,
        marginLeft: 50,
        width: 260,
        marginTop: 6,
        elevation: 2,
    },

    sendButtonText: {
        color: "#090909",
        fontSize: 18,
        fontWeight: "500",
        fontStyle: "italic",
    },


    // ===========================================================
    // MODALES
    // ===========================================================

    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(20, 30, 20, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    modalCard: {
        width: "100%",
        maxWidth: 340,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingVertical: 26,
        paddingHorizontal: 22,
        alignItems: "center",
        elevation: 8,
    },

    modalIconWrapper: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 12,
    },

    modalIconRiego: {
        backgroundColor: "#E4EEF7",
    },

    modalIconCuidado: {
        backgroundColor: "#E7F3E4",
    },

    modalIconExito: {
        backgroundColor: "#E7F3E4",
    },

    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#253A27",
        textAlign: "center",
        textTransform: "capitalize",
    },

    modalSubtitle: {
        fontSize: 13,
        fontWeight: "600",
        color: "#5F8A58",
        marginTop: 2,
        marginBottom: 10,
    },

    modalMessage: {
        fontSize: 14,
        color: "#6A7F75",
        textAlign: "center",
        lineHeight: 20,
        marginTop: 4,
    },

    modalCloseButton: {
        marginTop: 20,
        width: "100%",
        backgroundColor: "#7aa17b",
        borderRadius: 12,
        paddingVertical: 13,
        alignItems: "center",
    },

    modalCloseText: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 14,
    },

});
