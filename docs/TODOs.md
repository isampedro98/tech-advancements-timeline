# TODOs

## Prioridad alta

- Rehacer el hover/focus semántico de eventos relacionados.
  - Pedido explícito del proyecto: no improvisarlo si rompe legibilidad.
  - Objetivo futuro:
    - destacar evento actual
    - destacar `relatedEventIds`
    - atenuar de forma leve lo no relacionado
    - mantenerlo estable dentro de cada bloque histórico
  - Restricción: tiene que sentirse editorial y no “romper” la visualización.

- Reemplazar `ieee-integrated-circuit` por una fuente primaria o institucional más sólida.
  - Estado actual: apunta a Wikipedia.
  - Impacto: es la referencia más débil del dataset en términos académicos.

- Reemplazar `csis-drones` por una fuente más general sobre la expansión del uso militar de drones.
  - Estado actual: la URL existe, pero es bastante específica y no representa tan bien el evento amplio `Expansión de la guerra con drones`.
  - Posibles alternativas a evaluar:
    - CSIS con foco histórico más general
    - RAND
    - Air University / U.S. Air Force

- Revisar `symantec-stuxnet`.
  - Estado actual: la URL es válida, pero hoy el registro bibliográfico quedó como documento del National Security Archive y no como análisis técnico principal.
  - Sugerencia: sumar o reemplazar por una fuente técnica más directa si se quiere más precisión sobre Stuxnet como caso de cibersabotaje.

## Prioridad media

- Resolver el caso borde del label contextual de `Guerra Fría` en el bloque `1946-1991`.
  - Estado actual: al estar muy cerca del borde izquierdo, su label sigue viéndose mal posicionado.
  - Sugerencia: tratarlo como excepción visual explícita o permitir un offset dependiente del viewport.

- Normalizar `sourceIds` cuyos nombres ya no coinciden con el publisher o el título real.
  - Casos visibles:
    - `historian-cold-war` ahora apunta a The National WWII Museum
    - `nps-radar` ahora apunta a Imperial War Museums
    - `ieee-transistor` ahora apunta a Nokia Bell Labs
    - `space-force-gps` ahora apunta a The Aerospace Corporation
    - `symantec-stuxnet` ya no apunta a Symantec
  - Impacto: no rompe la app, pero dificulta mantenimiento y lectura del dataset.

- Revisar si conviene actualizar algunos textos de resumen para alinearlos mejor con las nuevas fuentes.
  - Casos a mirar primero:
    - `Transistor`
    - `Circuito integrado`
    - `Stuxnet y la visibilidad de la ciberguerra`
    - `Guerra Fría`
    - `Expansión de la guerra con drones`

- Evaluar si la bibliografía general debería indicar tipo de fuente.
  - Ejemplos:
    - museo
    - archivo
    - organismo estatal
    - think tank
    - enciclopedia

## Prioridad baja

- Unificar criterio editorial en títulos de fuentes.
  - Hoy conviven títulos muy literales del enlace real con títulos más normalizados.
  - Decidir si se quiere:
    - respetar siempre el título exacto de la página
    - o usar títulos abreviados y homogéneos

- Revisar si conviene agregar una nota metodológica breve sobre calidad y jerarquía de fuentes.
  - Por ejemplo: distinguir entre fuentes primarias, institucionales y de síntesis.
