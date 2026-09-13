// [archivos]
import fs from 'node:fs';
// [end_archivos]

import process from 'node:process';
// [modulos]
// En Node.js las fechas son nativas (Date), pero para mostrar importación de módulos nativos
// usaremos el módulo 'util' para formatear.
import util from 'node:util';
// [end_modulos]
// [POO]
// Definición de la clase Usuario en JavaScript (ES6)
class Usuario {
    constructor(nombre, edad, rol) {
        this.nombre = nombre;
        this.edad = edad;
        this.rol = rol;
    }

    presentarse() {
        console.log(`JS -> Hola, soy ${this.nombre} tengo ${this.edad} años y trabajo como ${this.rol}`);
    }
}
// [end_POO]
// Definición de la función en JS
// [funciones]
function sumarJS(a, b) {
    return a + b;
}
// [end_funciones]

const leccion = process.argv[2] || 'variables';

if (leccion === 'variables') {
    // [variables]
    const nombre = 'Alex';
    let edad = 25;
    edad = edad + 1;
    const estatura = 1.75;
    console.log(`Usuario: ${nombre} | Edad: ${edad} | Estatura: ${estatura}m`);
    // [end_variables]
} else if (leccion === 'condicionales') {
    // [condicionales]
    const edad = 18;
    if (edad >= 18) {
        console.log('Resultado JavaScript: Es mayor de edad');
    } else {
        console.log('Resultado JavaScript: Es menor de edad');
    }
    // [end_condicionales]
}
else if (leccion === 'tipos_datos') {
    // [tipos_datos]
    const entero = 42;
    const decimal = 3.1416;
    const booleano = true;
    const texto = "Hola";

    console.log(`Int/Float: ${entero} (${typeof entero}) | Float: ${decimal} (${typeof decimal}) | Bool: ${booleano} (${typeof booleano}) | String: ${texto} (${typeof texto})`);
    // [end_tipos_datos]
} else if (leccion === 'operadores') {
    // [operadores]
    const a = 10, b = 4;

    const div = a / b;                  // 2.5
    const divEntera = Math.floor(a / b); // 2
    const modulo = a % b;               // 2
    const potencia = a ** b;            // 10000

    console.log(`JS -> Div: ${div} | Div Entera: ${divEntera} | Mod: ${modulo} | Pot: ${potencia}`);
    // [end_operadores]

} else if (leccion === 'mientras') {
    // [mientras]
    let contador = 1;

    while (contador <= 3) {
        console.log(`JS -> Contando: ${contador}`);
        contador++;  // Operador de incremento '++'
    }
    // [end_mientras]
} else if (leccion === 'para') {
    // [para]
    // Sintaxis clásica (inicio; condición; incremento)
    for (let i = 1; i <= 3; i++) {
        console.log(`JS -> Iteración: ${i}`);
    }
    // [end_para]
} else if (leccion === 'funciones') {
    // [funciones]
    const resultado = sumarJS(5, 3);
    console.log(`JS -> Suma: ${resultado}`);
    // [end_funciones]
} else if (leccion === 'arreglos') {
    // [arreglos]
    // En JS los arrays son dinámicos y de tipo flexible
    const frutas = ['Manzana', 'Banano'];
    frutas.push('Cereza');  // Agregar elemento

    console.log(`JS -> frutas: ${frutas} | Total: ${frutas.length}`);
    // [end_arreglos]
} else if (leccion === 'diccionarios') {
    // [diccionarios]
    const usuario = {
        nombre: 'Alex',
        edad: '25'
    };
    usuario.rol = 'Dev';  // Insertar elemento nuevo

    // ✅ Formato texto plano sin colores ANSI
    console.log(`JS -> Objeto: ${JSON.stringify(usuario)}`);
    // [end_diccionarios]
} else if (leccion === 'POO') {
    // [POO]
    const usuario = new Usuario('Alex', '25', 'Dev');
    usuario.presentarse();

    usuario.rol = 'Lead';  // Modificar propiedad
    usuario.presentarse();
    // [end_POO]
} else if (leccion === 'excepciones') {
    // [excepciones]
    const a = 10;
    const b = 0;
    try {
        if (b === 0) {
            throw new Error('División por cero no permitida');
        }
        const resultado = a / b;
        console.log(`JS -> Resultado: ${resultado}`);
    } catch (error) {
        console.log(`JS -> Error al dividir ${a} entre ${b}: ${error.message}`);
    } finally {
        console.log('JS -> Operación finalizada');
    }
    // [end_excepciones]
} else if (leccion === 'modulos') {
    // [modulos]
    const ahora = new Date();
    // Formato ISO estándar legible YYYY-MM-DD HH:MM:SS
    const fechaFormateada = ahora.toISOString().replace('T', ' ').substring(0, 19);

    console.log(util.format('JS -> Fecha y hora actual: %s', fechaFormateada));
    // [end_modulos]

} else if (leccion === 'archivos') {
    // [archivos]
    const ruta = 'ejemplojs.txt';

    // Escritura
    fs.writeFileSync(ruta, 'Hola desde JavaScript', 'utf-8');

    // Lectura
    const contenido = fs.readFileSync(ruta, 'utf-8');

    console.log(`JS -> Contenido del archivo: ${contenido}`);
    //[end_archivos]
} else if (leccion === 'asincronia') {
    // [asincronia]
    const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function tarea() {
        console.log('JS -> Inicio');
        await esperar(1000);
        console.log('JS -> Tarea completada tras 1s');
        console.log('JS -> Fin');
    }

    await tarea(); // En Node.js con ESM (type: module) puedes usar Top-Level Await
    // [end_asincronia]
} else if (leccion === 'lambdas') {
    // [lambdas]
    // Arrow Function (Lambda)
    const doblar = (x) => x * 2;

    // Closure (Captura ámbito externo)
    function crearMultiplicador(factor) {
        return (x) => x * factor;
    }

    const triplicar = crearMultiplicador(3);

    console.log(`JS -> Doble de 5: ${doblar(5)}`);
    console.log(`JS -> Triple de 5: ${triplicar(5)}`);
    // [end_lambdas]
} else if (leccion === 'genericos') {
    // [genericos]
    // En JS (dinámico), el arreglo acepta cualquier tipo de dato automáticamente
    function primerElemento(lista) {
        return lista.length > 0 ? lista[0] : null;
    }

    const numeros = [10, 20, 30];
    const textos = ['Hola', 'Mundo'];

    console.log(`JS -> Primer entero: ${primerElemento(numeros)}`);
    console.log(`JS -> Primer texto: ${primerElemento(textos)}`);
    // [end_genericos]
} else if (leccion === 'interfaces') {
    // [interfaces]
    // Duck Typing: JS invoca el método hablar() si existe en el objeto recibido
    class Perro {
        hablar() { return "¡Guau!"; }
    }

    class Gato {
        hablar() { return "¡Miau!"; }
    }

    function hacerSonar(animal) {
        console.log(`JS -> Animal dice: ${animal.hablar()}`);
    }

    hacerSonar(new Perro());
    hacerSonar(new Gato());
    // [end_interfaces]
} else if (leccion === 'opcionales') {
    // [opcionales]
    function buscarUsuario(id) {
        if (id === 1) return { nombre: "Alexander" };
        return null;
    }

    const usr1 = buscarUsuario(1);
    const usr2 = buscarUsuario(99);

    // Optional Chaining (?.) y Nullish Coalescing (??)
    const nom1 = usr1?.nombre ?? "Usuario no encontrado";
    const nom2 = usr2?.nombre ?? "Usuario no encontrado";

    console.log(`JS -> ID 1: ${nom1}`);
    console.log(`JS -> ID 99: ${nom2}`);
    // [end_opcionales]
} else if (leccion === 'funcional') {
    // [funcional]
    const numeros = [1, 2, 3, 4, 5, 6];

    // Métodos de arreglos encadenados (Method Chaining)
    const paresDobles = numeros
        .filter(x => x % 2 === 0)
        .map(x => x * 2);

    console.log(`JS -> Pares duplicados: ${paresDobles}`);
    // [end_funcional]
}