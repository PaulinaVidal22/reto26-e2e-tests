# Reto 2026 – QA – E2E Tests (Ithaka & Nettra)

## 1. Introducción

El presente repositorio contiene la implementación de pruebas automatizadas End-to-End (E2E) para los proyectos **Ithaka** y **Nettra**, desarrollados en el marco del Reto 2026.

La organización general del trabajo responde a una separación por tipo de prueba (API, E2E, Performance, IA). Este repositorio se concentra exclusivamente en la validación del comportamiento funcional del frontend.

La automatización fue diseñada considerando principios de mantenibilidad, escalabilidad, separación de responsabilidades y alineación con prácticas adoptadas en la industria del testing automatizado.

---

## 2. Requisitos

Para ejecutar correctamente el proyecto es necesario contar con:

* **Node.js 20 LTS**

Cucumber no es compatible con versiones intermedias (por ejemplo, Node 21).
Se recomienda utilizar una versión LTS para garantizar estabilidad y compatibilidad con las dependencias.

Se puede verificar la versión instalada con:

```bash
node -v
```

---

## 3. Stack Tecnológico

Para el desarrollo de las pruebas E2E se seleccionaron herramientas del ecosistema Node.js:

* **Playwright**: framework moderno de automatización de navegadores.
* **Cucumber**: definición de escenarios en sintaxis Gherkin bajo el enfoque Behaviour Driven Development (BDD).
* **TypeScript**: tipado estático para mayor robustez y mantenibilidad.
* **dotenv**: gestión de variables de entorno.

La combinación Playwright + Cucumber permite:

* Separar la especificación funcional (features) de su implementación técnica.
* Utilizar los escenarios como documentación viva del sistema.
* Aplicar el patrón Page Object Model (POM) para desacoplar la lógica de interacción.

---

## 4. Estructura del Proyecto

```
RETO26-E2E-TESTS/
│
├── features/
│   ├── ithaka/
│   └── nettra/
│
├── src/
│   ├── pages/         # Page Objects (POM)
│   ├── steps/         # Implementación de steps Gherkin
│   ├── hooks/         # Lifecycle (Before / After)
│   └── support/       # World y utilidades compartidas
│
├── data/              # Datos de prueba
├── docs/              # Documentación funcional
├── reports/           # Reportes generados (no versionados)
│
├── cucumber.js        # Configuración Cucumber
├── tsconfig.json      # Configuración TypeScript
├── package.json       # Dependencias y scripts
└── .env.example       # Plantilla de variables de entorno
```

Se adopta el patrón **Page Object Model** para encapsular selectores y acciones de la interfaz, reduciendo duplicación y facilitando el mantenimiento ante cambios en la UI.

---

## 5. Configuración del Entorno

### 5.1 Instalación de dependencias

```bash
npm install
```

### 5.2 Instalación de navegadores

```bash
npx playwright install
```

---

## 6. Variables de Entorno

El proyecto utiliza un archivo `.env` para centralizar configuraciones como URLs base, parámetros de ejecución y timeouts.

Para configurar el entorno:

1. Crear un archivo `.env` a partir de `.env.example`.
2. Completar las URLs correspondientes según el ambiente de ejecución.

Ejemplo:

```
ITHAKA_BASE_URL=
NETTRA_BASE_URL=
HEADLESS=true
```

El archivo `.env` no debe versionarse.

---

## 7. Ejecución de Pruebas

Ejecutar la suite completa:

```bash
npm run test:e2e
```

Ejecutar únicamente pruebas de Ithaka:

```bash
npm run test:ithaka
```

Ejecutar únicamente pruebas de Nettra:

```bash
npm run test:nettra
```

---

## 8. Generación de Reportes

Los reportes generados por Cucumber se almacenan en la carpeta `reports/`.

En caso de fallo de un escenario:

* Se genera automáticamente un screenshot.
* La evidencia queda adjunta al reporte.
* Las capturas se almacenan dentro de `reports/screenshots/`.

La carpeta `reports/` no se versiona.

---

## 9. Estrategia de Automatización

La estrategia adoptada contempla distintos principios de diseño:

### 9.1 Behaviour Driven Development (BDD)

Los escenarios se definen en lenguaje Gherkin para describir el comportamiento esperado desde la perspectiva del negocio.

### 9.2 Page Object Model (POM)

Se encapsulan selectores y acciones en clases específicas para:

* Reducir duplicación de código.
* Facilitar mantenimiento.
* Minimizar el impacto de cambios en la interfaz.

### 9.3 Aislamiento de Escenarios

Cada escenario se ejecuta en un contexto de navegador independiente, evitando contaminación de estado y garantizando reproducibilidad.

---

## 10. Criterios de Calidad

El framework fue diseñado bajo los siguientes principios:

* Separación clara entre especificación y ejecución.
* Configuración centralizada mediante variables de entorno.
* No hardcodeo de configuraciones sensibles.
* Reutilización de código mediante POM.
* Independencia entre escenarios.
* Generación automática de evidencia ante fallos.
* Preparación para integración continua.
