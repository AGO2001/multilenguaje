import { useState, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import './App.css'

function App() {
  const [seccionCurso, setSeccionCurso] = useState('basico')
  const [temaActual, setTemaActual] = useState('variables')
  const [cargando, setCargando] = useState(false)
  const [datosLenguajes, setDatosLenguajes] = useState({
    python: {}, javascript: {}, java: {}, rust: {}
  })
  const [lenguajeTerminal, setLenguajeTerminal] = useState('python')

  // Pestaña activa para la interfaz de Desafíos
  const [lenguajeDesafioActivo, setLenguajeDesafioActivo] = useState('python')

  // Estado con código independiente e individualizado por lenguaje
  const [codigosDesafio, setCodigosDesafio] = useState({
    python: '# Solución en Python...\n',
    javascript: '// Solución en JavaScript...\n',
    rust: '// Solución en Rust...\n',
    java: '// Solución en Java...\n'
  })
  // Enunciados de los desafíos por lección
  const CONSIGNAS_DESAFIOS = {
    variables: {
      titulo: 'Suma Básica de Variables',
      instrucciones: 'Crea dos variables "a" con valor 10 y "b" con valor 20. Calcula su suma en una variable "resultado" e imprime el resultado final en la consola (Debe imprimir exacto: 30).'
    },
    condicionales: {
      titulo: 'Evaluación de Mayoría de Edad',
      instrucciones: 'Declara una variable "edad" con valor 18. Si es mayor o igual a 18, imprime "Mayor de edad", de lo contrario "Menor de edad".'
    }
  }

  // Boilerplate inicial vacío o minimalista por lenguaje
  const PLANTILLAS_VACIAS = {
    python: '# Escribe tu solución aquí...\n',
    javascript: '// Escribe tu solución aquí...\n',
    rust: 'fn main() {\n    // Escribe tu solución aquí...\n}\n',
    java: 'public class Solution {\n    public static void main(String[] args) {\n        // Escribe tu solución aquí...\n    }\n}\n'
  }

  // Estado con resultados de evaluación independientes
  const [resultadosDesafio, setResultadosDesafio] = useState({
    python: null, javascript: null, rust: null, java: null
  })

  // Nombres de archivo ficticios para obligar a Monaco a crear 4 modelos de texto aislados
  const archivosMonaco = {
    python: 'desafios/solucion.py',
    javascript: 'desafios/solucion.js',
    rust: 'desafios/solucion.rs',
    java: 'desafios/solucion.java'
  }

  const cargarCodigoInicial = async (leccion) => {
    setCargando(true)
    try {
      const [resPy, resJs, resJava, resRs] = await Promise.all([
        fetch(`http://localhost:5000/api/python?leccion=${leccion}`).catch(() => null),
        fetch(`http://localhost:5000/api/javascript?leccion=${leccion}`).catch(() => null),
        fetch(`http://localhost:5000/api/java?leccion=${leccion}`).catch(() => null),
        fetch(`http://localhost:5000/api/rust?leccion=${leccion}`).catch(() => null)
      ])

      const py = resPy ? await resPy.json() : { codigo: '// Error cargando' }
      const js = resJs ? await resJs.json() : { codigo: '// Error cargando' }
      const java = resJava ? await resJava.json() : { codigo: '// Error cargando' }
      const rs = resRs ? await resRs.json() : { codigo: '// Error cargando' }

      setDatosLenguajes({ python: py, javascript: js, java, rust: rs })
    } catch (error) {
      console.error("Error conectando con el backend:", error)
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    cargarCodigoInicial(temaActual)
    // Limpia el editor para el nuevo desafío
    setCodigosDesafio(PLANTILLAS_VACIAS)
    setResultadosDesafio({ python: null, javascript: null, rust: null, java: null })
  }, [temaActual])

  // Actualiza únicamente el estado del lenguaje específico
  const manejarCambioCodigoDesafio = (lang, valor) => {
    setCodigosDesafio(prev => ({
      ...prev,
      [lang]: valor
    }))
  }

  // Evalúa el lenguaje seleccionado
  const evaluarDesafíoEspecifico = async (lang) => {
    setCargando(true)
    try {
      const res = await fetch(`http://localhost:5000/api/${lang}/evaluar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leccion: temaActual, codigo: codigosDesafio[lang] })
      })
      const data = await res.json()
      setResultadosDesafio(prev => ({ ...prev, [lang]: data }))
    } catch (error) {
      setResultadosDesafio(prev => ({
        ...prev,
        [lang]: { salida_consola: 'Error al conectar con el servidor', es_error: true }
      }))
    } finally {
      setCargando(false)
    }
  }

  const cambiarSeccion = (seccion, primeraLeccion) => {
    setSeccionCurso(seccion)
    setTemaActual(primeraLeccion)
  }

  return (
    <div className="app-container">
      <header>
        <h1>⚡ Playground de Ejecución Real</h1>
        <p>Código fuente real leído de disco y ejecutado en vivo por Node, JVM, Rustc y Python3.</p>

        <div className="course-menu">
          <button
            className={`course-tab ${seccionCurso === 'basico' ? 'active' : ''}`}
            onClick={() => cambiarSeccion('basico', 'variables')}
          >
            📘 1. Curso Básico (Similitudes)
          </button>
          <button
            className={`course-tab ${seccionCurso === 'intermedio' ? 'active' : ''}`}
            onClick={() => cambiarSeccion('intermedio', 'lambdas')}
          >
            🚀 2. Paradigmas e Interfaces
          </button>
        </div>

        <div className="theme-selector">
          {seccionCurso === 'basico' && (
            <>
              <button className={`btn-theme ${temaActual === 'variables' ? 'active' : ''}`} onClick={() => setTemaActual('variables')}>1. Variables</button>
              <button className={`btn-theme ${temaActual === 'condicionales' ? 'active' : ''}`} onClick={() => setTemaActual('condicionales')}>2. Condicionales</button>
              <button className={`btn-theme ${temaActual === 'tipos_datos' ? 'active' : ''}`} onClick={() => setTemaActual('tipos_datos')}>3. Tipos de Datos</button>
              <button className={`btn-theme ${temaActual === 'operadores' ? 'active' : ''}`} onClick={() => setTemaActual('operadores')}>4. Operadores</button>
              <button className={`btn-theme ${temaActual === 'mientras' ? 'active' : ''}`} onClick={() => setTemaActual('mientras')}>5. Bucle While</button>
              <button className={`btn-theme ${temaActual === 'para' ? 'active' : ''}`} onClick={() => setTemaActual('para')}>6. Bucle For</button>
              <button className={`btn-theme ${temaActual === 'funciones' ? 'active' : ''}`} onClick={() => setTemaActual('funciones')}>7. Funciones</button>
              <button className={`btn-theme ${temaActual === 'arreglos' ? 'active' : ''}`} onClick={() => setTemaActual('arreglos')}>8. Arreglos</button>
              <button className={`btn-theme ${temaActual === 'diccionarios' ? 'active' : ''}`} onClick={() => setTemaActual('diccionarios')}>9. Diccionarios / Mapas</button>
              <button className={`btn-theme ${temaActual === 'POO' ? 'active' : ''}`} onClick={() => setTemaActual('POO')}>10. Estructuras / Clases</button>
              <button className={`btn-theme ${temaActual === 'excepciones' ? 'active' : ''}`} onClick={() => setTemaActual('excepciones')}>11. Excepciones y Errores</button>
              <button className={`btn-theme ${temaActual === 'modulos' ? 'active' : ''}`} onClick={() => setTemaActual('modulos')}>12. Módulos e Importaciones</button>
              <button className={`btn-theme ${temaActual === 'archivos' ? 'active' : ''}`} onClick={() => setTemaActual('archivos')}>13. Manejo de Archivos (I/O)</button>
              <button className={`btn-theme ${temaActual === 'asincronia' ? 'active' : ''}`} onClick={() => setTemaActual('asincronia')}>14. Asincronía y Concurrencia</button>
            </>
          )}

          {seccionCurso === 'intermedio' && (
            <>
              <button className={`btn-theme ${temaActual === 'lambdas' ? 'active' : ''}`} onClick={() => setTemaActual('lambdas')}>15. Lambdas y Closures</button>
              <button className={`btn-theme ${temaActual === 'genericos' ? 'active' : ''}`} onClick={() => setTemaActual('genericos')}>16. Genéricos y Tipos Paramétricos</button>
              <button className={`btn-theme ${temaActual === 'interfaces' ? 'active' : ''}`} onClick={() => setTemaActual('interfaces')}>17. Interfaces vs Traits</button>
              <button className={`btn-theme ${temaActual === 'opcionales' ? 'active' : ''}`} onClick={() => setTemaActual('opcionales')}>18. Optionals y Null Safety</button>
              <button className={`btn-theme ${temaActual === 'funcional' ? 'active' : ''}`} onClick={() => setTemaActual('funcional')}>19. Programación Funcional (Streams/Iter)</button>
            </>
          )}
        </div>
      </header>

      <main>
        <h3>Lección Activa: {temaActual.toUpperCase()}</h3>

        {/* Mosaico de las 4 lecciones estáticas (Solo Lectura) */}
        <div className="grid-code">
          <div className="code-card">
            <div className="card-header" style={{ color: '#38bdf8' }}>script.py 🐍</div>
            <pre><code>{datosLenguajes.python?.codigo || '// Cargando archivo...'}</code></pre>
          </div>

          <div className="code-card">
            <div className="card-header" style={{ color: '#facc15' }}>script.js 💛</div>
            <pre><code>{datosLenguajes.javascript?.codigo || '// Cargando archivo...'}</code></pre>
          </div>

          <div className="code-card">
            <div className="card-header" style={{ color: '#f97316' }}>script.rs 🦀</div>
            <pre><code>{datosLenguajes.rust?.codigo || '// Cargando archivo...'}</code></pre>
          </div>

          <div className="code-card">
            <div className="card-header" style={{ color: '#ef4444' }}>script.java ☕</div>
            <pre><code>{datosLenguajes.java?.codigo || '// Cargando archivo...'}</code></pre>
          </div>
        </div>
      </main>

      <button
        className="run-btn"
        onClick={() => cargarCodigoInicial(temaActual)}
        disabled={cargando}
      >
        {cargando ? '⏳ Compilando y Ejecutando...' : '▶ Re-ejecutar Ejemplos en Vivo'}
      </button>

      {/* Terminal de Consola de la Lección */}
      <section className="terminal-section">
        <div className="terminal-header" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span>TERMINAL DE SALIDA REAL:</span>
          <div className="terminal-tabs">
            {['python', 'javascript', 'java', 'rust'].map((lang) => (
              <button
                key={lang}
                className={`tab-btn ${lenguajeTerminal === lang ? 'active' : ''}`}
                onClick={() => setLenguajeTerminal(lang)}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <pre style={{
          padding: '0.5rem 0',
          color: datosLenguajes[lenguajeTerminal]?.es_error ? '#f87171' : '#34d399'
        }}>
          {`$ exec ${lenguajeTerminal}\n>`} {datosLenguajes[lenguajeTerminal]?.salida_consola || 'Sin salida de consola'}
        </pre>
      </section>

      {/* --- SECCIÓN DE DESAFÍOS: EDITORES DE MONACO TOTALMENTE AISLADOS --- */}
      <section className="desafio-section" style={{ marginTop: '2.5rem', borderTop: '1px solid #334155', paddingTop: '1.5rem' }}>
        <h2>🎯 Desafío Práctico: {temaActual.toUpperCase()}</h2>

        {/* Tarjeta del Enunciado del Desafío */}
        {CONSIGNAS_DESAFIOS[temaActual] && (
          <div style={{
            backgroundColor: '#1e293b',
            border: '1px solid #38bdf8',
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#38bdf8' }}>
              📌 {CONSIGNAS_DESAFIOS[temaActual].titulo}
            </h3>
            <p style={{ margin: 0, color: '#f8fafc', fontSize: '0.95rem', lineHeight: '1.5' }}>
              {CONSIGNAS_DESAFIOS[temaActual].instrucciones}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem' }}>
          {['python', 'javascript', 'java', 'rust'].map((lang) => (
            <button
              key={lang}
              className={`tab-btn ${lenguajeDesafioActivo === lang ? 'active' : ''}`}
              onClick={() => setLenguajeDesafioActivo(lang)}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Editors Monaco con plantilla vacía */}
        {['python', 'javascript', 'java', 'rust'].map((lang) => (
          <div
            key={lang}
            style={{ display: lenguajeDesafioActivo === lang ? 'block' : 'none' }}
          >
            <div className="monaco-wrapper">
              <Editor
                height="250px"
                path={archivosMonaco[lang]}
                language={lang}
                theme="vs-dark"
                value={codigosDesafio[lang]}
                onChange={(val) => manejarCambioCodigoDesafio(lang, val || '')}
                options={{
                  fontSize: 13,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true
                }}
              />
            </div>

            <button
              className="run-btn"
              onClick={() => evaluarDesafíoEspecifico(lang)}
              disabled={cargando}
              style={{ backgroundColor: '#22c55e', marginTop: '1rem' }}
            >
              {cargando ? '⏳ Evaluando...' : `🚀 Probar Solución en ${lang.toUpperCase()}`}
            </button>

            {resultadosDesafio[lang] && (
              <div style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#0f172a',
                borderRadius: '6px',
                borderLeft: `4px solid ${resultadosDesafio[lang].es_correcto ? '#22c55e' : '#f87171'}`
              }}>
                <h4 style={{ color: resultadosDesafio[lang].es_correcto ? '#22c55e' : '#f87171', margin: '0 0 0.5rem 0' }}>
                  {resultadosDesafio[lang].es_correcto ? '✅ ¡Desafío Resuelto!' : '❌ Error o Respuesta Incorrecta'}
                </h4>
                <pre style={{ color: resultadosDesafio[lang].es_correcto ? '#34d399' : '#f87171' }}>
                  {resultadosDesafio[lang].salida_consola}
                </pre>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  )
}

export default App