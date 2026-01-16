# 🔥 Firebase Streak System (Sistema de Rachas)

Un sistema de gamificación ligero y elegante estilo "Snapchat/Duolingo" para webs, construido con HTML, CSS y Firebase Firestore.

Este módulo permite añadir retención de usuarios obligándoles a realizar una acción diaria (ej: enviar mensajes, hacer login, completar tareas) para mantener su "fuego" encendido.

## ✨ Características
- **Lógica Diaria:** Detecta automáticamente si es un nuevo día.
- **Persistencia:** Guarda el progreso en Firestore Database.
- **Sistema de Metas:** Configurable (ej: 2 acciones para salvar la racha).
- **Recompensas:** Sistema de desbloqueo al llegar a X días.
- **UI Minimalista:** Diseño limpio con animaciones CSS.

## 🚀 Instalación

### 1. Configurar Firebase
Crea un proyecto en [Firebase Console](https://console.firebase.google.com/), habilita **Firestore Database** y copia tu configuración web.

### 2. Reglas de Seguridad
Copia el contenido de `firestore.rules` en la pestaña de "Reglas" de tu Firestore para permitir la creación de usuarios y rachas.

### 3. Conectar en tu Web
Añade el script `streak-manager.js` en tus archivos HTML.

## 💻 Uso

### Inicializar
En tu archivo JavaScript principal:

```javascript
import { StreakManager } from './js/streak-manager.js';

// Tu config de Firebase
const firebaseConfig = { ... }; 

// Inicializar (el ID de usuario debe ser único)
const streakSystem = new StreakManager(firebaseConfig);
const userId = "usuario_123";
