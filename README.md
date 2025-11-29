# HairGPT: AI Haircut Stylistido a **Incubate**, tu compañero para la incubación de sueños y el cambio de realidad (Reality Shifting).

Esta guía te ayudará a configurar el proyecto desde cero en tu ordenador, asumiendo que es la primera vez que configuras un entorno de desarrollo.

---

## 📋 Requisitos Previos

Antes de empezar, necesitas instalar algunas herramientas básicas en tu ordenador.

### 1. Instalar Node.js
Node.js es el entorno necesario para ejecutar JavaScript fuera del navegador.
1. Ve a la página oficial: [nodejs.org](https://nodejs.org/).
2. Descarga la versión **LTS** (Long Term Support), que es la más estable (actualmente v20 o v22).
3. Instálalo siguiendo los pasos del instalador (todo "Siguiente" está bien).
4. Para verificar que se instaló correctamente, abre una terminal (PowerShell en Windows o Terminal en Mac) y escribe:
   ```bash
   node -v
   ```
   Deberías ver un número de versión (ej. `v20.10.0`).

### 2. Instalar Git
Git es la herramienta para gestionar el código fuente.
1. Ve a [git-scm.com](https://git-scm.com/downloads).
2. Descarga la versión para tu sistema operativo.
3. Instálalo. Durante la instalación, puedes dejar todas las opciones por defecto.
4. Verifica la instalación en tu terminal:
   ```bash
   git --version
   ```

### 3. (Opcional) Visual Studio Code
Es el editor de código que recomendamos.
1. Descárgalo gratis en [code.visualstudio.com](https://code.visualstudio.com/).
2. Instálalo.

### 4. App Expo Go (En tu móvil)
Para probar la aplicación en tu teléfono físico:
*   **Android:** Descarga "Expo Go" desde la Play Store.
*   **iOS:** Descarga "Expo Go" desde la App Store.

---

## 🚀 Instalación del Proyecto

Sigue estos pasos para descargar y preparar el proyecto.

### 1. Clonar el Repositorio
Abre tu terminal (o PowerShell) y navega a la carpeta donde quieras guardar el proyecto (por ejemplo, `Documentos` o `Proyectos`).

```bash
# Navega a tu carpeta de proyectos (ejemplo)
cd Documents

# Clona el repositorio (descarga el código)
git clone <URL_DEL_REPOSITORIO>
```
*(Sustituye `<URL_DEL_REPOSITORIO>` por el enlace de GitHub de este proyecto).*

### 2. Entrar en la carpeta del proyecto
```bash
cd Incubate
```

### 3. Instalar Dependencias
Este comando descargará todas las librerías necesarias (React Native, Expo, etc.) que usa el proyecto. Puede tardar unos minutos.

```bash
npm install
```

---

## ▶️ Ejecutar el Proyecto

Una vez instalado todo, ¡es hora de correr la app!

1. En la terminal, dentro de la carpeta del proyecto, ejecuta:
   ```bash
   npx expo start
   ```

2. Verás un código QR en la terminal.
   *   **Android:** Abre la app Expo Go y escanea el QR.
   *   **iOS:** Abre la cámara de tu iPhone, apunta al QR y toca la notificación para abrirlo en Expo Go.

¡Listo! La aplicación debería cargarse en tu teléfono.

---

## 🛠 Comandos Útiles

*   **`npx expo start`**: Inicia el servidor de desarrollo.
*   **`npx expo start -c`**: Inicia el servidor limpiando la caché (útil si algo raro pasa).
*   **`r`**: Si pulsas la tecla `r` en la terminal mientras corre el proyecto, recargará la app en el móvil.

## 📂 Estructura del Proyecto

Si vas a editar código, aquí tienes un mapa rápido:

*   `src/features`: Aquí están las pantallas y lógica principal (Home, Profile, etc.).
*   `src/core/ui`: Componentes reutilizables (Botones, Tarjetas).
*   `src/core/theme`: Colores y configuración de diseño.

---

¿Tienes problemas? Contacta con el equipo de desarrollo o revisa la documentación oficial de [Expo](https://docs.expo.dev/).
