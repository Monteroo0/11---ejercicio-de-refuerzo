const dueños = [];
const mascotas = [];
let idDueño = 1;
let idMascota = 1;

const validarTexto = (texto) => texto && texto.trim() !== "";
const validarNumero = (num) => !isNaN(num) && num > 0;

const validarEspecie = (especie) => {
    const especiesValidas = ["perro", "gato", "ave", "reptil", "otro"];
    return especiesValidas.includes(especie.toLowerCase());
};

const validarEstadoSalud = (estado) => {
    const estadosValidos = ["sano", "enfermo", "en tratamiento"];
    return estadosValidos.includes(estado.toLowerCase());
};

const normalizarTexto = (texto) => {
    if (!texto) return "";
    return texto.trim().charAt(0).toUpperCase() + texto.trim().slice(1).toLowerCase();
};

const solicitarDato = (mensaje, validar, errorMensaje) => {
    while (true) {
        const valor = prompt(mensaje);

        if (valor === null) {
            throw new Error("Operación cancelada por el usuario.");
        }
        if (validar(valor)) {
            return valor;
        }
        alert(errorMensaje);
    }
};

const registrarDueño = async (nombre, cedula, telefono, correo) => {
    if (!validarTexto(nombre)) throw new Error("El nombre del dueño no puede estar vacío.");
    if (!validarTexto(cedula)) throw new Error("La cédula del dueño no puede estar vacía.");
    if (!validarTexto(telefono)) throw new Error("El teléfono del dueño no puede estar vacío.");
    if (!validarTexto(correo)) throw new Error("El correo del dueño no puede estar vacío.");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Validando datos del dueño...");
            const dueñoExistente = dueños.find(d => d.cedula.toLowerCase() === cedula.toLowerCase());
            if (dueñoExistente) {
                reject(new Error("Ya existe un dueño con esa cédula."));
                return;
            }
            const nuevoDueño = { id: idDueño++, nombre: normalizarTexto(nombre), cedula, telefono, correo };
            dueños.push(nuevoDueño);
            console.log("Dueño registrado:", nuevoDueño);
            resolve(`Dueño ${nombre} registrado con éxito.`);
        }, 1500);
    });
};

const registrarMascota = async () => {
    try {
        const nombre = solicitarDato(
            "Nombre de la mascota:",
            validarTexto,
            "El nombre de la mascota no puede estar vacío."
        );

        const especie = solicitarDato(
            "Especie (Perro, Gato, Ave, Reptil, Otro):",
            validarEspecie,
            "Especie inválida. Use: Perro, Gato, Ave, Reptil, Otro."
        );

        const edad = solicitarDato(
            "Edad (en años):",
            validarNumero,
            "La edad debe ser un número positivo."
        );

        const peso = solicitarDato(
            "Peso (en kg):",
            validarNumero,
            "El peso debe ser un número positivo."
        );

        const estadoSalud = solicitarDato(
            "Estado de salud (Sano, Enfermo, En tratamiento):",
            validarEstadoSalud,
            "Estado de salud inválido. Use: Sano, Enfermo, En tratamiento."
        );

        const cedulaDueño = solicitarDato(
            "Cédula del dueño:",
            validarTexto,
            "La cédula del dueño no puede estar vacía."
        );

        return await new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log("Validando datos de la mascota...");
                console.log({ nombre, especie, edad: parseFloat(edad), peso: parseFloat(peso), estadoSalud, cedulaDueño });

                const dueño = dueños.find(d => d.cedula.toLowerCase() === cedulaDueño.toLowerCase());
                if (!dueño) {
                    reject(new Error("No se encontró un dueño con esa cédula."));
                    return;
                }

                const nuevaMascota = {
                    id: idMascota++,
                    nombre: normalizarTexto(nombre),
                    especie: normalizarTexto(especie),
                    edad: parseFloat(edad),
                    peso: parseFloat(peso),
                    estadoSalud: normalizarTexto(estadoSalud),
                    idDueño: dueño.id
                };
                mascotas.push(nuevaMascota);
                console.log("Mascota registrada:", nuevaMascota);
                console.log("Estado actual de mascotas:", mascotas);
                resolve(`Mascota ${nombre} registrada con éxito para el dueño ${dueño.nombre}.`);
            }, 2000);
        });
    } catch (error) {
        throw error;
    }
};

const buscarMascota = async (nombre) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Buscando mascota con nombre: ${nombre}`);
            const nombreNormalizado = normalizarTexto(nombre);
            const mascota = mascotas.find(m => m.nombre === nombreNormalizado);
            if (!mascota) {
                reject("Mascota no encontrada.");
            } else {
                const dueño = dueños.find(d => d.id === mascota.idDueño);
                resolve({
                    ...mascota,
                    nombreDueño: dueño ? dueño.nombre : "Desconocido"
                });
            }
        }, 1500);
    });
};

const actualizarEstadoSalud = async (nombre, nuevoEstado) => {
    if (!validarTexto(nombre)) throw new Error("El nombre de la mascota no puede estar vacío.");
    if (!validarEstadoSalud(nuevoEstado)) throw new Error("Estado de salud inválido. Use: Sano, Enfermo, En tratamiento.");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Actualizando estado de salud de ${nombre} a ${nuevoEstado}`);
            const nombreNormalizado = normalizarTexto(nombre);
            const mascota = mascotas.find(m => m.nombre === nombreNormalizado);
            if (!mascota) {
                reject("Mascota no encontrada.");
                return;
            }
            mascota.estadoSalud = normalizarTexto(nuevoEstado);
            resolve(`Estado de salud de ${nombre} actualizado a ${nuevoEstado}.`);
        }, 1000);
    });
};

const eliminarMascota = async (nombre) => {
    if (!validarTexto(nombre)) throw new Error("El nombre de la mascota no puede estar vacío.");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Intentando eliminar mascota: ${nombre}`);
            const nombreNormalizado = normalizarTexto(nombre);
            const index = mascotas.findIndex(m => m.nombre === nombreNormalizado);
            if (index === -1) {
                reject("Mascota no encontrada.");
                return;
            }
            const confirmacion = confirm(`¿Estás seguro de eliminar a ${nombre}?`);
            if (!confirmacion) {
                reject("Eliminación cancelada.");
                return;
            }
            mascotas.splice(index, 1);
            console.log("Mascota eliminada. Estado actual de mascotas:", mascotas);
            resolve(`Mascota ${nombre} eliminada con éxito.`);
        }, 2000);
    });
};

const verMascotasDueño = async (cedula) => {
    if (!validarTexto(cedula)) throw new Error("La cédula del dueño no puede estar vacía.");

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Buscando mascotas para cédula: ${cedula}`);
            const dueño = dueños.find(d => d.cedula.toLowerCase() === cedula.toLowerCase());
            if (!dueño) {
                reject("Dueño no encontrado.");
                return;
            }
            const mascotasDueño = mascotas.filter(m => m.idDueño === dueño.id);
            if (mascotasDueño.length === 0) {
                resolve(`El dueño ${dueño.nombre} no tiene mascotas registradas.`);
            } else {
                let mensaje = `Mascotas de ${dueño.nombre}:\n`;
                mascotasDueño.forEach(m => {
                    mensaje += `- ${m.nombre} (${m.especie}, ${m.edad} años, ${m.peso} kg, ${m.estadoSalud})\n`;
                });
                resolve(mensaje);
            }
        }, 2000);
    });
};

const listarMascotas = () => {
    if (mascotas.length === 0) {
        return "No hay mascotas registradas.";
    }
    let mensaje = "Lista de mascotas:\n";
    mascotas.forEach(m => {
        const dueño = dueños.find(d => d.id === m.idDueño);
        mensaje += `- ${m.nombre} (${m.especie}, ${m.edad} años, ${m.peso} kg, ${m.estadoSalud}, Dueño: ${dueño ? dueño.nombre : "Desconocido"})\n`;
    });
    return mensaje;
};

// Menú
const menu = async () => {
    while (true) {
        const opcion = prompt(
            `Gestión de Veterinaria 🐶🐱\n` +
            `1. Registrar un nuevo dueño\n` +
            `2. Registrar una nueva mascota\n` +
            `3. Listar todas las mascotas\n` +
            `4. Buscar una mascota por nombre\n` +
            `5. Actualizar el estado de salud de una mascota\n` +
            `6. Eliminar una mascota por nombre\n` +
            `7. Ver mascotas de un dueño\n` +
            `8. Salir\n` +
            `Selecciona una opción (1-8):`
        );

        if (opcion === null) {
            alert("Operación cancelada.");
            continue;
        }

        if (opcion === "8") {
            alert("Gracias por usar el sistema de la veterinaria!!!!");
            break;
        }

        try {
            switch (opcion) {
                case "1":
                    const nombreDueño = prompt("Nombre del dueño:");
                    if (nombreDueño === null) throw new Error("Operación cancelada.");
                    const cedula = prompt("Cédula del dueño:");
                    if (cedula === null) throw new Error("Operación cancelada.");
                    const telefono = prompt("Teléfono del dueño:");
                    if (telefono === null) throw new Error("Operación cancelada.");
                    const correo = prompt("Correo del dueño:");
                    if (correo === null) throw new Error("Operación cancelada.");
                    const mensajeDueño = await registrarDueño(nombreDueño, cedula, telefono, correo);
                    console.log("Éxito:", mensajeDueño);
                    alert(mensajeDueño);
                    break;

                case "2":
                    const mensajeMascota = await registrarMascota();
                    console.log("Éxito:", mensajeMascota);
                    alert(mensajeMascota);
                    break;

                case "3":
                    console.log("Listando mascotas...");
                    alert(listarMascotas());
                    break;

                case "4":
                    const buscarNombre = prompt("Nombre de la mascota a buscar:");
                    if (buscarNombre === null) throw new Error("Operación cancelada.");
                    const mascota = await buscarMascota(buscarNombre);
                    console.log("Mascota encontrada:", mascota);
                    alert(
                        `Mascota encontrada: ${mascota.nombre} (${mascota.especie}, ${mascota.edad} años, ` +
                        `${mascota.peso} kg, ${mascota.estadoSalud}, Dueño: ${mascota.nombreDueño})`
                    );
                    break;

                case "5":
                    const nombreActualizar = prompt("Nombre de la mascota:");
                    if (nombreActualizar === null) throw new Error("Operación cancelada.");
                    const nuevoEstado = prompt("Nuevo estado de salud (Sano, Enfermo, En tratamiento):");
                    if (nuevoEstado === null) throw new Error("Operación cancelada.");
                    const mensajeActualizar = await actualizarEstadoSalud(nombreActualizar, nuevoEstado);
                    console.log("Éxito:", mensajeActualizar);
                    alert(mensajeActualizar);
                    break;

                case "6":
                    const nombreEliminar = prompt("Nombre de la mascota a eliminar:");
                    if (nombreEliminar === null) throw new Error("Operación cancelada.");
                    const mensajeEliminar = await eliminarMascota(nombreEliminar);
                    console.log("Éxito:", mensajeEliminar);
                    alert(mensajeEliminar);
                    break;

                case "7":
                    const cedulaVer = prompt("Cédula del dueño:");
                    if (cedulaVer === null) throw new Error("Operación cancelada.");
                    const mensajeVer = await verMascotasDueño(cedulaVer);
                    console.log("Éxito:", mensajeVer);
                    alert(mensajeVer);
                    break;

                default:
                    alert("Opción inválida. Por favor, selecciona una opción válida.");
            }
        } catch (error) {
            console.error("Error:", error.message);
            alert(error.message);
        }
    }
};

menu();