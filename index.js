import express from 'express';
import cors from 'cors';
import { exec } from 'node:child_process';
import fs from 'node:fs';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Función que extrae TODOS los bloques etiquetados con [leccion] ... [end_leccion]
function extraerFragmento(codigoCompleto, leccion) {
    // Escapamos la lección por seguridad y construimos la Regex
    // [\s\S]*? coincide con cualquier carácter (incluyendo saltos de línea) de forma no codiciosa
    const regex = new RegExp(`\\[${leccion}\\]([\\s\\S]*?)\\[end_${leccion}\\]`, 'g');

    const fragmentos = [];
    let match;

    while ((match = regex.exec(codigoCompleto)) !== null) {
        // match[1] contiene el texto capturado dentro del grupo entre las etiquetas
        const contenido = match[1].trim();
        if (contenido) {
            fragmentos.push(contenido);
        }
    }

    if (fragmentos.length > 0) {
        return fragmentos.join('\n\n');
    }

    return codigoCompleto;
}

function ejecutarYLeer(comando, nombreLenguaje, rutaArchivo, leccion) {
    return new Promise((resolve) => {
        let codigoFuente = '';
        try {
            const contenidoCompleto = fs.readFileSync(rutaArchivo, 'utf-8');
            codigoFuente = extraerFragmento(contenidoCompleto, leccion);
        } catch (e) {
            codigoFuente = `// No se pudo cargar el archivo: ${rutaArchivo}`;
        }

        exec(comando, (error, stdout, stderr) => {
            if (error || stderr) {
                return resolve({
                    lenguaje: nombreLenguaje,
                    codigo: codigoFuente,
                    salida_consola: stderr || error.message,
                    es_error: true
                });
            }

            resolve({
                lenguaje: nombreLenguaje,
                codigo: codigoFuente,
                salida_consola: stdout.trim(),
                es_error: false
            });
        });
    });
}

// 🐍 Python
app.get('/api/python', async (req, res) => {
    const leccion = req.query.leccion || 'variables';
    const datos = await ejecutarYLeer(`python3 script.py ${leccion}`, 'Python', 'script.py', leccion);
    res.json(datos);
});

// ⚡ JavaScript
app.get('/api/javascript', async (req, res) => {
    const leccion = req.query.leccion || 'variables';
    const datos = await ejecutarYLeer(`node script.js ${leccion}`, 'JavaScript', 'script.js', leccion);
    res.json(datos);
});

// ☕ Java
app.get('/api/java', async (req, res) => {
    const leccion = req.query.leccion || 'variables';
    const datos = await ejecutarYLeer(`java script.java ${leccion}`, 'Java', 'script.java', leccion);
    res.json(datos);
});

// 🦀 Rust
app.get('/api/rust', async (req, res) => {
    const leccion = req.query.leccion || 'variables';
    const datos = await ejecutarYLeer(`./script_rust ${leccion}`, 'Rust', 'script.rs', leccion);
    res.json(datos);
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor de ejecución real corriendo en http://localhost:${PORT}`);
});
// Diccionario de consignas y salidas esperadas por lección
const DESAFIOS = {
    variables: {
        titulo: "Suma Básica de Variables",
        consigna: "Declara dos variables 'a' = 10 y 'b' = 20. Suma ambas variables en 'resultado' e imprime el resultado.",
        salidaEsperada: "30",
        // Expresiones regulares para asegurar que no hagan print(30) directo
        validaciones: {
            python: [
                { regex: /\ba\s*=\s*10\b/, mensaje: "Debes declarar la variable 'a' con valor 10" },
                { regex: /\bb\s*=\s*20\b/, mensaje: "Debes declarar la variable 'b' con valor 20" },
                { regex: /\bresultado\s*=\s*a\s*\+\s*b\b/, mensaje: "Debes sumar 'a' y 'b' en la variable 'resultado'" },
                // Acepta print(resultado), print(f"{resultado}"), print(str(resultado)), etc.
                { regex: /print\s*\([^)]*\bresultado\b[^)]*\)/, mensaje: "Debes pasar la variable 'resultado' dentro del print()" }
            ],
            javascript: [
                { regex: /(const|let|var)\s+a\s*=\s*10\b/, mensaje: "Debes declarar 'a = 10'" },
                { regex: /(const|let|var)\s+b\s*=\s*20\b/, mensaje: "Debes declarar 'b = 20'" },
                { regex: /(const|let|var)\s+resultado\s*=\s*a\s*\+\s*b\b/, mensaje: "Debes calcular 'resultado = a + b'" },
                // Acepta console.log(resultado), console.log(`${resultado}`), etc.
                { regex: /console\.log\s*\([^)]*\bresultado\b[^)]*\)/, mensaje: "Debes pasar la variable 'resultado' dentro de console.log()" }
            ],
            java: [
                { regex: /\ba\s*=\s*10\b/, mensaje: "Falta declarar la variable 'a' con valor 10" },
                { regex: /\bb\s*=\s*20\b/, mensaje: "Falta declarar la variable 'b' con valor 20" },
                { regex: /\bresultado\s*=\s*a\s*\+\s*b\b/, mensaje: "Debes asignar 'a + b' a la variable 'resultado'" },
                { regex: /System\.out\.println\s*\([^)]*\bresultado\b[^)]*\)/, mensaje: "Debes pasar 'resultado' a System.out.println()" }
            ],
            rust: [
                { regex: /let(\s+mut)?\s+a\s*(:\s*\w+)?\s*=\s*10\b/, mensaje: "Debes declarar 'a' con valor 10" },
                { regex: /let(\s+mut)?\s+b\s*(:\s*\w+)?\s*=\s*20\b/, mensaje: "Debes declarar 'b' with valor 20" },
                { regex: /let(\s+mut)?\s+resultado\s*(:\s*\w+)?\s*=\s*a\s*\+\s*b\b/, mensaje: "Debes calcular 'resultado = a + b'" },
                { regex: /println!\s*\([^)]*\bresultado\b[^)]*\)/, mensaje: "Debes pasar 'resultado' a println!" }
            ]
        }
    }
};

app.post('/api/:lenguaje/evaluar', (req, res) => {
    const { lenguaje } = req.params;
    const { leccion, codigo } = req.body;

    const desafio = DESAFIOS[leccion];
    if (!desafio) {
        return res.status(400).json({ salida_consola: 'No hay desafío configurado.', es_error: true });
    }

    // 1. Validar reglas de sintaxis obligatorias
    const reglasLenguaje = desafio.validaciones?.[lenguaje] || [];
    for (const regla of reglasLenguaje) {
        if (!regla.regex.test(codigo)) {
            return res.json({
                salida_consola: `❌ Estructura incorrecta: ${regla.mensaje}`,
                es_correcto: false,
                es_error: true
            });
        }
    }

    // 2. Ejecutar código si pasa la validación de sintaxis
    let comando = '';
    let rutaArchivo = '';

    if (lenguaje === 'python') {
        rutaArchivo = 'temp_desafio.py';
        fs.writeFileSync(rutaArchivo, codigo);
        comando = `python3 ${rutaArchivo}`;
    } else if (lenguaje === 'javascript') {
        rutaArchivo = 'temp_desafio.js';
        fs.writeFileSync(rutaArchivo, codigo);
        // FORCE_COLOR=0 evita que Node añada códigos ANSI de color al stdout
        comando = `FORCE_COLOR=0 node ${rutaArchivo}`;
    } else if (lenguaje === 'java') {
        rutaArchivo = 'Solution.java';
        fs.writeFileSync(rutaArchivo, codigo);
        comando = `javac ${rutaArchivo} && java Solution`;
    } else if (lenguaje === 'rust') {
        rutaArchivo = 'temp_desafio.rs';
        fs.writeFileSync(rutaArchivo, codigo);
        comando = `rustc ${rutaArchivo} -o temp_desafio_rs && ./temp_desafio_rs`;
    }

    exec(comando, { timeout: 5000 }, (error, stdout, stderr) => {
        // Limpieza de archivos temporales
        try {
            if (fs.existsSync(rutaArchivo)) fs.unlinkSync(rutaArchivo);
            if (fs.existsSync('Solution.class')) fs.unlinkSync('Solution.class');
            if (fs.existsSync('temp_desafio_rs')) fs.unlinkSync('temp_desafio_rs');
        } catch (e) { }

        if (error || stderr) {
            return res.json({
                salida_consola: stderr || error.message,
                es_correcto: false,
                es_error: true
            });
        }

        const salidaObtenida = stdout.trim();
        const esCorrecto = salidaObtenida === desafio.salidaEsperada;

        return res.json({
            salida_consola: stdout,
            es_correcto: esCorrecto,
            es_error: !esCorrecto,
            mensaje: esCorrecto ? '🎉 ¡Desafío Resuelto Con Éxito!' : `Salida incorrecta.`
        });
    });
});