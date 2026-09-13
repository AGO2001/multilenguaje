// [asincronia]
use std::thread;
use std::time::Duration;
// [end_asincronia]

// [archivos]
use std::fs;
// [end_archivos]

use std::env;
// [diccionarios]
use std::collections::HashMap;
// [end_diccionarios]
// [modulos]
use std::process::Command;
// [end_modulos]

// [POO]
// En Rust no existen 'class', se usan 'struct' para datos e 'impl' para métodos
struct Usuario {
    nombre: String,
    edad: String,
    rol: String,
}

impl Usuario {
    fn new(nombre: &str, edad: &str, rol: &str) -> Self {
        Self {
            nombre: nombre.to_string(),
            edad: edad.to_string(),
            rol: rol.to_string(),
        }
    }

    fn presentarse(&self) {
        println!(
            "Rust -> Hola, soy {} tengo {} años y trabajo como {}",
            self.nombre, self.edad, self.rol
        );
    }
}
// [end_POO]

// Definición de función en Rust (Retorno implícito)
// [funciones]
fn sumar_rust(a: i32, b: i32) -> i32 {
    a + b // Sin punto y coma al final = retorno implícito
}
// [end_funciones]
// [excepciones]
// Función auxiliar para manejar errores usando Result en Rust
fn dividir(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err(format!("División por cero no permitida"))
    } else {
        Ok(a / b)
    }
}
// [end_excepciones]
fn main() {
    let args: Vec<String> = env::args().collect();
    let leccion = if args.len() > 1 {
        &args[1]
    } else {
        "variables"
    };

    if leccion == "variables" {
        // [variables]
        let nombre = "Alex";
        let mut edad = 25;
        edad = edad + 1;
        let estatura = 1.75;
        println!(
            "Usuario: {} | Edad: {} | Estatura: {}m",
            nombre, edad, estatura
        );
        // [end_variables]
    } else if leccion == "condicionales" {
        // [condicionales]
        let edad = 18;
        if edad >= 18 {
            println!("Resultado Rust: Es mayor de edad");
        } else {
            println!("Resultado Rust: Es menor de edad");
        }
        // [end_condicionales]
    } else if leccion == "tipos_datos" {
        // [tipos_datos]
        let entero: i32 = 42;
        let decimal: f64 = 3.1416;
        let booleano: bool = true;
        let texto: &str = "Hola";

        println!(
            "Int: {} (i32) | Float: {} (f64) | Bool: {} (bool) | String: {} (&str)",
            entero, decimal, booleano, texto
        );
    // [end_tipos_datos]
    } else if leccion == "operadores" {
        // [operadores]
        let a: i32 = 10;
        let b: i32 = 4;

        let div_entera = a / b; // 2
        let div_decimal = a as f64 / b as f64; // 2.5 (Casteo explícito con 'as')
        let modulo = a % b; // 2
        let potencia = a.pow(4); // 10000

        println!(
            "Rust -> Div Entera: {} | Div Decimal: {} | Mod: {} | Potencia: {}",
            div_entera, div_decimal, modulo, potencia
        );
        // [end_operadores]
    } else if leccion == "mientras" {
        // [mientras]
        let mut contador = 1; // Requiere 'mut' para poder modificarse

        while contador <= 3 {
            println!("Rust -> Contando: {}", contador);
            contador += 1; // Rust NO tiene 'contador++'
        }
        // [end_mientras]
    } else if leccion == "para" {
        // [para]
        // Rango inclusivo usando '..=' (1..=3 produce 1, 2, 3)
        for i in 1..=3 {
            println!("Rust -> Iteración: {}", i);
        }
        // [end_para]
    } else if leccion == "funciones" {
        // [funciones]
        let resultado = sumar_rust(5, 3);
        println!("Rust -> Suma: {}", resultado);
        // [end_funciones]
    } else if leccion == "arreglos" {
        // [arreglos]
        // Usamos Vec (Vector) para colecciones de tamaño dinámico en Rust
        let mut frutas = vec!["Manzana", "Banano"];
        frutas.push("Cereza"); // Requiere 'mut' en el vector para hacer push

        println!("Rust -> frutas: {:?} | Total: {}", frutas, frutas.len());
        // [end_arreglos]
    } else if leccion == "diccionarios" {
        // [diccionarios]
        let mut usuario = HashMap::new();
        usuario.insert("nombre", "Alex");
        usuario.insert("edad", "25");

        usuario.insert("rol", "Dev"); // Insertar elemento nuevo

        // Usamos el formato Debug ({:?}) para imprimir el HashMap completo
        println!("Rust -> HashMap: {:?}", usuario);
        // [end_diccionarios]
    } else if leccion == "POO" {
        // [POO]
        // Requiere 'mut' para poder modificar el campo 'rol'
        let mut usuario = Usuario::new("Alex", "25", "Dev");
        usuario.presentarse();

        usuario.rol = "Lead".to_string(); // Modificar propiedad
        usuario.presentarse();
        // [end_POO]
    } else if leccion == "excepciones" {
        // [excepciones]
        let a = 10;
        let b = 0;

        match dividir(a, b) {
            Ok(resultado) => println!("Rust -> Resultado: {}", resultado),
            Err(error) => println!("Rust -> Error al dividir {} entre {}: {}", a, b, error),
        }
        println!("Rust -> Operación finalizada");
        // [end_excepciones]
    } else if leccion == "modulos" {
        // [modulos]
        // Usamos el comando nativo del sistema para formatear la fecha de forma idéntica
        let output = Command::new("date")
            .arg("+%Y-%m-%d %H:%M:%S")
            .output()
            .expect("Error al obtener la fecha");

        let fecha_formateada = String::from_utf8_lossy(&output.stdout).trim().to_string();

        println!("Rust -> Fecha y hora actual: {}", fecha_formateada);
        // [end_modulos]
    } else if leccion == "archivos" {
        // [archivos]
        let ruta = "ejemplors.txt";

        // Escritura
        fs::write(ruta, "Hola desde Rust").expect("Error al escribir el archivo");

        // Lectura
        let contenido = fs::read_to_string(ruta).expect("Error al leer el archivo");

        println!("Rust -> Contenido del archivo: {}", contenido);
        // [end_archivos]
    } else if leccion == "asincronia" {
        // [asincronia]
        println!("Rust -> Inicio");
        thread::sleep(Duration::from_secs(1)); // Detiene el hilo por 1 segundo
        println!("Rust -> Tarea completada tras 1s");
        println!("Rust -> Fin");
        // [end_asincronia]
    } else if leccion == "lambdas" {
        // [lambdas]
        // Closure/Lambda implícito en Rust
        let doblar = |x: i32| x * 2;

        // Closure capturando variable del entorno local
        let factor = 3;
        let triplicar = |x: i32| x * factor;

        println!("Rust -> Doble de 5: {}", doblar(5));
        println!("Rust -> Triple de 5: {}", triplicar(5));
        // [end_lambdas]
    } else if leccion == "genericos" {
        // [genericos]
        // Función genérica en Rust usando <T>. Devuelve una referencia &T
        fn primer_elemento<T>(lista: &[T]) -> Option<&T> {
            lista.first()
        }

        let numeros = vec![10, 20, 30];
        let textos = vec!["Hola", "Mundo"];

        if let Some(num) = primer_elemento(&numeros) {
            println!("Rust -> Primer entero: {}", num);
        }
        if let Some(txt) = primer_elemento(&textos) {
            println!("Rust -> Primer texto: {}", txt);
        }
        // [end_genericos]
    } else if leccion == "interfaces" {
        // [interfaces]
        // Definición de Trait en Rust
        trait Hablador {
            fn hablar(&self) -> String;
        }

        struct Perro;
        struct Gato;

        // Implementación del trait para Perro
        impl Hablador for Perro {
            fn hablar(&self) -> String {
                String::from("¡Guau!")
            }
        }

        // Implementación del trait para Gato
        impl Hablador for Gato {
            fn hablar(&self) -> String {
                String::from("¡Miau!")
            }
        }

        // Función que acepta cualquier tipo que implemente el Trait Hablador
        fn hacer_sonar(animal: &impl Hablador) {
            println!("Rust -> Animal dice: {}", animal.hablar());
        }

        hacer_sonar(&Perro);
        hacer_sonar(&Gato);
        // [end_interfaces]
    } else if leccion == "opcionales" {
        // [opcionales]
        fn buscar_usuario(id: i32) -> Option<String> {
            if id == 1 {
                Some(String::from("Alexander"))
            } else {
                None
            }
        }

        // .unwrap_or() desempaqueta el Some(...) o usa el valor por defecto si es None
        let nom1 = buscar_usuario(1).unwrap_or(String::from("Usuario no encontrado"));
        let nom2 = buscar_usuario(99).unwrap_or(String::from("Usuario no encontrado"));

        println!("Rust -> ID 1: {}", nom1);
        println!("Rust -> ID 99: {}", nom2);
        // [end_opcionales]
    } else if leccion == "funcional" {
        // [funcional]
        let numeros = vec![1, 2, 3, 4, 5, 6];

        // Iteradores perezosos (Lazy Iterators) en Rust: requieren iter() y collect()
        let pares_dobles: Vec<i32> = numeros
            .iter()
            .filter(|&&x| x % 2 == 0)
            .map(|&x| x * 2)
            .collect();

        println!("Rust -> Pares duplicados: {:?}", pares_dobles);
        // [end_funcional]
    }
}
