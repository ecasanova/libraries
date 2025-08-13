# Configuración de Autenticación con GitHub

Esta guía te ayudará a configurar la autenticación completa con GitHub OAuth en tu aplicación React + Vite.

## 🚀 Pasos para configurar GitHub OAuth

### 1. Crear una GitHub OAuth App

1. Ve a [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/applications/new)
2. Haz clic en "New OAuth App"
3. Completa los campos:
   - **Application name**: `Mi App React` (o el nombre que prefieras)
   - **Homepage URL**: `http://localhost:5173`
   - **Application description**: Descripción opcional de tu app
   - **Authorization callback URL**: `http://localhost:5173/auth/callback`

4. Haz clic en "Register application"
5. Copia el **Client ID** que aparece en la página

### 2. Configurar variable de entorno

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza el valor placeholder con tu Client ID real:

```env
# GitHub OAuth configuration for Vite
VITE_GITHUB_CLIENT_ID=tu-client-id-de-github-aqui
```

### 3. Reiniciar el servidor

```bash
# Detén el servidor con Ctrl+C
# Luego reinicia:
npm run dev
```

## 🔧 Estructura simplificada

```
├── .env                          # Variables de entorno (no committear)
├── .env.example                  # Ejemplo de variables de entorno
└── src/
    └── lib/
        └── auth-context.tsx      # Contexto de autenticación personalizado
```

## ✨ Características de esta implementación

- **🎯 Simple y directo**: No requiere NextAuth.js ni dependencias pesadas
- **🔒 Seguro**: Usa el flujo OAuth 2.0 estándar de GitHub
- **💾 Persistente**: Guarda la sesión en localStorage
- **⚡ Compatible con Vite**: Diseñado específicamente para React + Vite
- **🛠️ Fácil de configurar**: Solo necesita una variable de entorno

## ⚠️ Notas importantes

### Seguridad
- **NUNCA** commites el archivo `.env` al repositorio
- El `.env` ya está en `.gitignore`
- Solo el Client ID es público; no necesitas Client Secret para aplicaciones SPA

### Para producción
Cuando despliegues la aplicación:

1. Crea una nueva GitHub OAuth App para producción
2. Usa la URL de producción en los campos de GitHub
3. Configura `VITE_GITHUB_CLIENT_ID` en tu plataforma de hosting

### Flujo de autenticación
1. Usuario hace clic en "Iniciar sesión"
2. Redirección a GitHub OAuth
3. Usuario autoriza la aplicación
4. GitHub redirecciona de vuelta con un código
5. La aplicación simula el intercambio de código por datos de usuario
6. Sesión guardada en localStorage

## 🆘 Troubleshooting

### Error: "Invalid client_id"
- Verifica que `VITE_GITHUB_CLIENT_ID` sea correcto
- Asegúrate de que no haya espacios extra en el `.env`

### Error: "Invalid redirect_uri"  
- Verifica que la URL de callback en GitHub coincida exactamente
- Debe ser: `http://localhost:5173/auth/callback`

### La autenticación no funciona
- Verifica que la variable esté configurada en `.env`
- Reinicia el servidor después de cambiar el `.env`
- Revisa la consola del navegador para errores

### "Configuración incompleta"
- Asegúrate de que `VITE_GITHUB_CLIENT_ID` esté configurado
- Verifica que el valor no sea el placeholder por defecto

## 📚 Recursos adicionales

- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [OAuth 2.0 Flow](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
