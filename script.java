
// [funcional]
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
// [end_funcional]

// [opcionales]
import java.util.Optional;
// [end_opcionales]

// [lambdas]
import java.util.function.Function;
// [end_lambdas]

// [archivos]
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
// [end_archivos]

// [arreglos]
import java.util.Arrays;
// [end_arreglos]
// [diccionarios]
import java.util.HashMap;
import java.util.Map;
// [end_diccionarios]
// [modulos]
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

// [end_modulos]
public class script {

    // [POO]
    // Definición de la clase Usuario en Java
    static class Usuario {
        public String nombre;
        public String edad;
        public String rol;

        public Usuario(String nombre, String edad, String rol) {
            this.nombre = nombre;
            this.edad = edad;
            this.rol = rol;
        }

        public void presentarse() {
            System.out.println(
                    "Java -> Hola, soy " + this.nombre + " tengo " + this.edad + " años y trabajo como " + this.rol);
        }
    }
    // [end_POO]

    // Método estático auxiliar dentro de la clase script
    // [funciones]
    public static int sumarJava(int a, int b) {
        return a + b;
    }
    // [end_funciones]

    public static void main(String[] args) {
        String leccion = (args.length > 0) ? args[0] : "variables";

        if (leccion.equals("variables")) {
            // [variables]
            String nombre = "Alex";
            int edad = 25;
            double estatura = 1.75;
            System.out.println("Usuario: " + nombre + " | Edad: " + edad + " | Estatura: " + estatura + "m");
            // [end_variables]
        } else if (leccion.equals("condicionales")) {
            // [condicionales]
            int edad = 18;
            if (edad >= 18) {
                System.out.println("Resultado Java: Es mayor de edad");
            } else {
                System.out.println("Resultado Java: Es menor de edad");
            }
            // [end_condicionales]
        } else if (leccion.equals("tipos_datos")) {
            // [tipos_datos]
            int entero = 42;
            double decimal = 3.1416;
            boolean booleano = true;
            String texto = "Hola";

            System.out.println("Int: " + entero + " (int) | Double: " + decimal + " (double) | Bool: " + booleano
                    + " (boolean) | String: " + texto + " (String)");
            // [end_tipos_datos]
        } else if (leccion.equals("operadores")) {
            // [operadores]
            int a = 10, b = 4;

            int divEntera = a / b; // 2 (Trunca decimales)
            double divDecimal = (double) a / b; // 2.5 (Casteo explícito)
            int modulo = a % b; // 2
            double potencia = Math.pow(a, b); // 10000.0

            System.out.println("Java -> Div Entera: " + divEntera + " | Div Decimal: " + divDecimal + " | Mod: "
                    + modulo + " | Potencia: " + potencia);
            // [end_operadores]
        } else if (leccion.equals("mientras")) {
            // [mientras]
            int contador = 1;

            while (contador <= 3) {
                System.out.println("Java -> Contando: " + contador);
                contador++; // Incremento tradicional '++'
            }
            // [end_mientras]
        } else if (leccion.equals("para")) {
            // [para]
            // Sintaxis clásica basada en C
            for (int i = 1; i <= 3; i++) {
                System.out.println("Java -> Iteración: " + i);
            }
            // [end_para]
        } else if (leccion.equals("funciones")) {
            // [funciones]
            int resultado = sumarJava(5, 3);
            System.out.println("Java -> Suma: " + resultado);
            // [end_funciones]
        } else if (leccion.equals("arreglos")) {
            // [arreglos]
            // Arreglo estático de tamaño fijo (3 elementos)
            String[] frutas = { "Manzana", "Banano", "Cereza" };

            System.out.println("Java -> frutas: " + Arrays.toString(frutas) + " | Total: " + frutas.length);
            // [end_arreglos]
        } else if (leccion.equals("diccionarios")) {
            // [diccionarios]
            Map<String, String> usuario = new HashMap<>();
            usuario.put("nombre", "Alex");
            usuario.put("edad", "25");

            usuario.put("rol", "Dev"); // Insertar elemento nuevo

            System.out.println("Java -> HashMap: " + usuario);
            // [end_diccionarios]
        } else if (leccion.equals("POO")) {
            // [POO]
            Usuario usuario = new Usuario("Alex", "25", "Dev");
            usuario.presentarse();

            usuario.rol = "Lead"; // Modificar propiedad
            usuario.presentarse();
            // [end_POO]
        } else if (leccion.equals("excepciones")) {
            // [excepciones]
            int a = 10;
            int b = 0;
            try {
                int resultado = a / b;
                System.out.println("Java -> Resultado: " + resultado);
            } catch (ArithmeticException error) {
                System.out.println("Java -> Error al dividir " + a + " entre " + b + ": " + error.getMessage());
            } finally {
                System.out.println("Java -> Operación finalizada");
            }
            // [end_excepciones]
        } else if (leccion.equals("modulos")) {
            // [modulos]
            LocalDateTime ahora = LocalDateTime.now();
            DateTimeFormatter formato = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            String fechaFormateada = ahora.format(formato);

            System.out.println("Java -> Fecha y hora actual: " + fechaFormateada);
            // [end_modulos]
        } else if (leccion.equals("archivos")) {
            // [archivos]
            String ruta = "ejemplojava.txt";
            try {
                // Escritura
                Files.writeString(Paths.get(ruta), "Hola desde Java");

                // Lectura
                String contenido = Files.readString(Paths.get(ruta));

                System.out.println("Java -> Contenido del archivo: " + contenido);
            } catch (IOException e) {
                System.out.println("Java -> Error de archivo: " + e.getMessage());
            }
            // [end_archivos]
        } else if (leccion.equals("asincronia")) {
            // [asincronia]
            System.out.println("Java -> Inicio");
            try {
                Thread.sleep(1000); // Pausa el hilo de ejecución por 1000ms
            } catch (InterruptedException e) {
                System.out.println("Java -> Error en hilo: " + e.getMessage());
            }
            System.out.println("Java -> Tarea completada tras 1s");
            System.out.println("Java -> Fin");
            // [end_asincronia]
        } else if (leccion.equals("lambdas")) {
            // [lambdas]
            // Exprensión Lambda utilizando la interfaz funcional Function
            Function<Integer, Integer> doblar = x -> x * 2;

            // Closure simulado (captura de variable efectiva final)
            int factor = 3;
            Function<Integer, Integer> triplicar = x -> x * factor;

            System.out.println("Java -> Doble de 5: " + doblar.apply(5));
            System.out.println("Java -> Triple de 5: " + triplicar.apply(5));
            // [end_lambdas]
        } else if (leccion.equals("genericos")) {
            // [genericos]
            // Método genérico en Java que utiliza el parámetro de tipo <T>
            class Util {
                public static <T> T primerElemento(T[] lista) {
                    return (lista != null && lista.length > 0) ? lista[0] : null;
                }
            }

            Integer[] numeros = { 10, 20, 30 };
            String[] textos = { "Hola", "Mundo" };

            System.out.println("Java -> Primer entero: " + Util.primerElemento(numeros));
            System.out.println("Java -> Primer texto: " + Util.primerElemento(textos));
            // [end_genericos]
        } else if (leccion.equals("interfaces")) {
            // [interfaces]
            // Definición de Interfaz (Contrato explícito)
            interface Hablador {
                String hablar();
            }

            class Perro implements Hablador {
                public String hablar() {
                    return "¡Guau!";
                }
            }

            class Gato implements Hablador {
                public String hablar() {
                    return "¡Miau!";
                }
            }

            class Util {
                public static void hacerSonar(Hablador animal) {
                    System.out.println("Java -> Animal dice: " + animal.hablar());
                }
            }

            Util.hacerSonar(new Perro());
            Util.hacerSonar(new Gato());
            // [end_interfaces]
        } else if (leccion.equals("opcionales")) {
            // [opcionales]
            class Repositorio {
                public static Optional<String> buscarUsuario(int id) {
                    if (id == 1) {
                        return Optional.of("Alexander");
                    }
                    return Optional.empty();
                }
            }

            // .orElse() define la alternativa segura si el valor es empty()
            String nom1 = Repositorio.buscarUsuario(1).orElse("Usuario no encontrado");
            String nom2 = Repositorio.buscarUsuario(99).orElse("Usuario no encontrado");

            System.out.println("Java -> ID 1: " + nom1);
            System.out.println("Java -> ID 99: " + nom2);
            // [end_opcionales]
        } else if (leccion.equals("funcional")) {
    // [funcional]
    List<Integer> numeros = Arrays.asList(1, 2, 3, 4, 5, 6);

    // Stream API de Java: requiere stream() inicial y collect() final
    List<Integer> paresDobles = numeros.stream()
        .filter(x -> x % 2 == 0)
        .map(x -> x * 2)
        .collect(Collectors.toList());

    System.out.println("Java -> Pares duplicados: " + paresDobles);
    // [end_funcional]
}

    }
}