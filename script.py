import sys
# [asincronia]
import asyncio
# [end_asincronia]
# [modulos]
# Importación de la librería nativa datetime
from datetime import datetime
# [end_modulos]

# [POO]
# Definición de la clase Usuario en Python
class Usuario:
    def __init__(self, nombre: str, edad: str, rol: str):
        self.nombre = nombre
        self.edad = edad
        self.rol = rol

    def presentarse(self):
        print(f"Py -> Hola, soy {self.nombre} tengo {self.edad} años y trabajo como {self.rol}")
# [end_POO]

# Definición de la función (Tipado opcional en firmas con type hints)
# [funciones]
def sumar_py(a: int, b: int) -> int:
    return a + b
# [end_funciones]

leccion = sys.argv[1] if len(sys.argv) > 1 else "variables"

if leccion == "variables":
    # [variables]
    nombre = "Alex"
    edad = 25
    estatura = 1.75
    print(f"Usuario: {nombre} | Edad: {edad} | Estatura: {estatura}m")
    # [end_variables]
    
elif leccion == "condicionales":
    # [condicionales]
    edad = 18
    if edad >= 18:
        print("Resultado Python: Es mayor de edad")
    else:
        print("Resultado Python: Es menor de edad")
    # [end_condicionales]

elif leccion == "tipos_datos":
   # [tipos_datos]
    entero = 42
    decimal = 3.1416
    booleano = True
    texto = "Hola"

    print(f"Int: {entero} ({type(entero).__name__}) | Float: {decimal} ({type(decimal).__name__}) | Bool: {booleano} ({type(booleano).__name__}) | String: {texto} ({type(texto).__name__})")
    # [end_tipos_datos]

elif leccion == "operadores":
    # [operadores]
    a, b = 10, 4
    
    div_normal = a / b     # 2.5 (Float automático)
    div_entera = a // b    # 2 (División piso)
    modulo = a % b         # 2 (Residuo)
    potencia = a ** b      # 10000

    print(f"Py -> Div: {div_normal} | Div Entera: {div_entera} | Mod: {modulo} | Pot: {potencia}")
    # [end_operadores]

elif leccion == "mientras":
    # [mientras]
    contador = 1
    
    while contador <= 3:
        print(f"Py -> Contando: {contador}")
        contador += 1  # Python NO tiene 'contador++'
    # [end_mientras]
elif leccion == "para":
    # [para]
    # En Python los rangos excluyen el limite superior: range(1, 4) produce 1, 2, 3
    for i in range(1, 4):
        print(f"Py -> Iteración: {i}")
    # [end_para]


elif leccion == "funciones":
    # [funciones]
    resultado = sumar_py(5, 3)
    print(f"Py -> Suma: {resultado}")
    # [end_funciones]
elif leccion == "arreglos":
    # [arreglos]
    # En Python las listas son dinámicas por defecto
    frutas = ["Manzana", "Banano"]
    frutas.append("Cereza")  # Agregar elemento
    
    print(f"Py -> frutas: {frutas} | Total: {len(frutas)}")
    # [end_arreglos]

elif leccion == "diccionarios":
    # [diccionarios]
    usuario = {
        "nombre": "Alex",
        "edad": "25"
    }
    usuario["rol"] = "Dev"  # Insertar elemento nuevo

    print(f"Py -> Diccionario: {usuario}")
    # [end_diccionarios]
elif leccion == "POO":
    # [POO]
    usuario = Usuario("Alex", "25", "Dev")
    usuario.presentarse()

    usuario.rol = "Lead"  # Modificar propiedad
    usuario.presentarse()
    # [end_POO]
elif leccion == "excepciones":
    # [excepciones]
    a = 10
    b = 0
    try:
        resultado = a / b
        print(f"Py -> Resultado: {resultado}")
    except ZeroDivisionError as error:
        print(f"Py -> Error al dividir {a} entre {b}: {error}")
    finally:
        print("Py -> Operación finalizada")
    # [end_excepciones]
elif leccion == "modulos":
    # [modulos]
    ahora = datetime.now()
    fecha_formateada = ahora.strftime("%Y-%m-%d %H:%M:%S")

    print(f"Py -> Fecha y hora actual: {fecha_formateada}")
    # [end_modulos]
elif leccion == "archivos":
    # [archivos]
    ruta = "ejemplopy.txt"
    
    # Escritura
    with open(ruta, "w", encoding="utf-8") as f:
        f.write("Hola desde Python")

    # Lectura
    with open(ruta, "r", encoding="utf-8") as f:
        contenido = f.read()

    print(f"Py -> Contenido del archivo: {contenido}")
    # [end_archivos]
elif leccion == "asincronia":
    # [asincronia]
    async def tarea():
        print("Py -> Inicio")
        await asyncio.sleep(1)
        print("Py -> Tarea completada tras 1s")
        print("Py -> Fin")

    asyncio.run(tarea())
    # [end_asincronia]
elif leccion == "lambdas":
    # [lambdas]
    # Lambda (función anónima simple)
    doblar = lambda x: x * 2

    # Closure (función que captura ámbito externo)
    def crear_multiplicador(factor):
        return lambda x: x * factor

    triplicar = crear_multiplicador(3)

    print(f"Py -> Doble de 5: {doblar(5)}")
    print(f"Py -> Triple de 5: {triplicar(5)}")
    # [end_lambdas]
elif leccion == "genericos":
    # [genericos]
    # En Python (tipado dinámico), las funciones son genéricas por naturaleza
    def primer_elemento(lista):
        return lista[0] if lista else None

    numeros = [10, 20, 30]
    textos = ["Hola", "Mundo"]

    print(f"Py -> Primer entero: {primer_elemento(numeros)}")
    print(f"Py -> Primer texto: {primer_elemento(textos)}")
    # [end_genericos]
elif leccion == "interfaces":
    # [interfaces]
    # Duck Typing: No requiere declarar interfaz. Solo se exige que el objeto implemente hablar()
    class Perro:
        def hablar(self):
            return "¡Guau!"

    class Gato:
        def hablar(self):
            return "¡Miau!"

    # Función polimórfica basada en comportamiento, no en tipos explícitos
    def hacer_sonar(animal):
        print(f"Py -> Animal dice: {animal.hablar()}")

    hacer_sonar(Perro())
    hacer_sonar(Gato())
    # [end_interfaces]
elif leccion == "opcionales":
    # [opcionales]
    def buscar_usuario(user_id):
        if user_id == 1:
            return {"nombre": "Alexander"}
        return None

    usr1 = buscar_usuario(1)
    usr2 = buscar_usuario(99)

    # Manejo seguro usando el método .get() o un operador condicional
    nom1 = usr1["nombre"] if usr1 else "Usuario no encontrado"
    nom2 = usr2["nombre"] if usr2 else "Usuario no encontrado"

    print(f"Py -> ID 1: {nom1}")
    print(f"Py -> ID 99: {nom2}")
    # [end_opcionales]
elif leccion == "funcional":
    # [funcional]
    numeros = [1, 2, 3, 4, 5, 6]

    # Programación funcional usando filter() y map() o List Comprenhensions
    pares_dobles = list(map(lambda x: x * 2, filter(lambda x: x % 2 == 0, numeros)))

    print(f"Py -> Pares duplicados: {pares_dobles}")
    # [end_funcional]