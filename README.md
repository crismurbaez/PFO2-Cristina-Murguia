# Práctica Formativa Obligatoria 2: Prompt Engineering en Agentes de IA

## 🕵️‍♂️ Proyecto: English Case (Pathword)
**Institución:** IFTS N.°29  
**Materia:** Inteligencia Artificial  
**Fecha de Entrega:** 26/06/2026  

---

## 👤 Datos del Estudiante
* **Nombre y Apellido:** Cristina Laura Murguía Báez
* **Carrera:** Tecnicatura Superior en Desarrollo de Software
* **Comisión:** Comisión "D"

---

## 🌐 Despliegue (Deploy)
El proyecto unificado se encuentra desplegado en la plataforma Vercel. La portada de acceso contiene los enlaces directos tanto al texto plano del prompt como a las dos versiones de la Landing Page generadas de forma 100% autónoma por las IA.

🔗 **Link al Deploy Unificado:** [PEGAR_AQUÍ_TU_LINK_DE_VERCEL]

---

## 📑 Prompt Exacto Utilizado
Para evaluar la capacidad de resolución autónoma de los agentes de software, se diseñó un único prompt inicial de alta precisión siguiendo los lineamientos y buenas prácticas de Anthropic y OpenAI. El prompt utilizado fue el siguiente:

```xml
<system_prompt>
Eres un Ingeniero de Software Senior y Experto en Diseño UI/UX Freelance. Tu objetivo es desarrollar de forma completamente autónoma una Landing Page interactiva, moderna y sofisticada para un método innovador de aprendizaje de inglés.
</system_prompt>

<context>
El proyecto se llama "English Case" (o "Pathword"). Es una escuela de inglés con una propuesta única: los estudiantes memorizan las 1,000 palabras más comunes del idioma conectándolas entre sí mediante asociaciones lógicas y pistas, simulando la resolución de un caso policial en la mente. La estética debe rendir homenaje a Sherlock Holmes y los misterios victorianos de Londres, pero con un enfoque visual moderno, elegante, limpio y sofisticado (estilo Neo-Noir / Minimalista Victoriano).
</context>

<ui_ux_guidelines>
- Paleta de colores: Fondos oscuros profundos (misterio), acentos en dorado/bronce sofisticado, verde botella oscuro o azul de medianoche, y blanco/crema suave para el texto legible.
- Tipografía: Combinación de una fuente Serif elegante para títulos (estilo literario/clásico) y una Sans-serif limpia para el texto de lectura.
- Look & Feel: Uso de sombras sutiles, bordes definidos, estética de "expediente secreto", lupas, o líneas de conexión (hilos de investigación). Debe verse Premium, no caricaturesco.
</ui_ux_guidelines>

<project_requirements>
Debes generar una estructura de archivos web (HTML y CSS embebido o en archivo separado, según tu arquitectura de agente) que contenga las siguientes secciones obligatorias en una única Landing Page funcional e interactiva:

1. HEADER (Menú de navegación):
   - Logo: "English Case" (con un isotipo sutil de lupa o pipa estilizada).
   - Enlaces de navegación: Inicio, El Método, Las 1000 Palabras, Testimonios, Contacto.

2. HERO SECTION (Sección Principal):
   - Título impactante con temática de detective (Ej: "Resuelve el misterio del idioma: Conecta, asocia y domina las 1000 palabras clave").
   - Subtítulo explicativo sobre la memorización mediante conexiones personalizadas.
   - Botón de Llamada a la Acción (CTA) llamativo: "Iniciar Investigación" o "Ver Casos de Estudio".

3. DESCRIPCIÓN / SOBRE NOSOTROS ("El Método del Detective"):
   - Explicación del sistema de "Hilos de Conexión": cómo el cerebro recuerda mejor creando historias, pistas y detalles personalizados para fijar el vocabulario en la memoria a largo plazo.

4. SECCIÓN DE CARACTERÍSTICAS PRINCIPALES (Features):
   - Tres tarjetas o bloques visuales que expliquen las herramientas: 
     a) "Subida de Evidencias" (Subir tus propias listas de vocabulario).
     b) "Línea de Conexiones" (Vincular palabras de forma personalizada).
     c) "Bitácora del Caso" (Escribir el detalle o la historia detrás de cada conexión para grabarla en la memoria).

5. SECCIÓN INTERACTIVA: "LAS 1000 PALABRAS" (Muestra del Dashboard):
   - Una sección visual interactiva que simule el producto real. Debe mostrar una pequeña grilla o lista de ejemplo que represente las 1000 palabras más utilizadas.
   - Debe incluir un componente interactivo mock-up donde se simule una conexión: por ejemplo, dos palabras conectadas por una línea visual o un botón donde el usuario pueda hacer clic en una palabra y ver el "Detalle de la Conexión/Pista de Memoria" en un pequeño modal o panel lateral.

6. TESTIMONIOS o RESEÑAS DE CLIENTES ("Inspectores Graduados"):
   - Al menos 2 o 3 testimonios de estudiantes con nombres ficticios (Ej: "Inspector James W.", "Dra. Watson"), foto de perfil (placeholder estético) y sus opiniones sobre cómo lograron la fluidez con este sistema.

7. FORMULARIO DE CONTACTO ("Únete a la Agencia"):
   - Maquetado visual sofisticado de un formulario para solicitar una demostración o entrevista de nivelación. Campos: Nombre, Correo Electrónico y "Notas del Caso" (Mensaje).

8. PIE DE PÁGINA (Footer):
   - Enlaces a redes sociales de la "Agencia", políticas de privacidad y derechos de autor.
</project_requirements>

<constraints>
- RESTRICCIÓN ESTRICTA: Genera TODO el código necesario (HTML estructurado semánticamente, CSS moderno con Flexbox/Grid y animaciones suaves, y JavaScript para la interactividad de la sección de palabras) de forma autónoma. 
- No dejes comentarios del tipo "escribe tu código aquí". Todo el diseño, estilos y scripts deben venir completamente resueltos y listos para funcionar al abrir el archivo en el navegador.
- Asegúrate de que el diseño sea responsivo (adaptable a móviles y escritorio).
</constraints>

Genera el código completo respetando estas instrucciones detalladas.