# Configuración de Autenticación con GitHub

Esta guía te ayudará a configurar la autenticación completa con GitHub OAuth en tu aplicación.

## 🚀 Pasos para configurar GitHub OAuth

### 1. Crear una GitHub OAuth App

1. Ve a [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/applications/new)
2. Haz clic en "New OAuth App"
3. Completa los campos:
   - **Application name**: `Mi App React` (o el nombre que prefieras)
   - **Homepage URL**: `http://localhost:5174`
   - **Application description**: Descripción opcional de tu app
   - **Authorization callback URL**: `http://localhost:5174/api/auth/callback/github`

4. Haz clic en "Register application"
5. Copia el **Client ID** que aparece en la página
6. Haz clic en "Generate a new client secret" y copia el **Client Secret**

### 2. Configurar variables de entorno

1. Abre el archivo `.env` en la raíz del proyecto
2. Reemplaza los valores placeholder con tus credenciales reales:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:5174
NEXTAUTH_SECRET=genera-un-secreto-aleatorio-aqui-de-al-menos-32-caracteres

# GitHub OAuth App Configuration
GITHUB_CLIENT_ID=tu-client-id-de-github-aqui
GITHUB_CLIENT_SECRET=tu-client-secret-de-github-aqui
```

### 3. Generar un secreto seguro

Para `NEXTAUTH_SECRET`, puedes generar un secreto aleatorio usando:

```bash
# En terminal (Node.js)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# O usando OpenSSL
openssl rand -hex 32

# O manualmente crear una cadena aleatoria de al menos 32 caracteres
```

### 4. Reiniciar el servidor

```bash
# Detén el servidor con Ctrl+C
# Luego reinicia:
npm run dev
```

## 🔧 Estructura de archivos creada

```
├── .env                          # Variables de entorno (no committear)
├── .env.example                  # Ejemplo de variables de entorno
├── src/
│   ├── lib/
│   │   └── auth.ts              # Configuración de NextAuth.js
│   └── api/
│       └── auth.ts              # Mock de API para desarrollo
```

## ⚠️ Notas importantes

### Seguridad
- **NUNCA** commites el archivo `.env` al repositorio
- El `.env` ya está en `.gitignore`
- Usa secretos diferentes para desarrollo y producción
- En producción, usa HTTPS y URLs de producción

### Para producción
Cuando despliegues la aplicación:

1. Crea una nueva GitHub OAuth App para producción
2. Usa la URL de producción en `NEXTAUTH_URL`
3. Configura las variables de entorno en tu plataforma de hosting
4. Usa un `NEXTAUTH_SECRET` diferente y más seguro

### Limitaciones actuales
Esta configuración está adaptada para Vite + React. En un proyecto real de Next.js:
- Los endpoints de API estarían en `/pages/api/auth/[...nextauth].ts`
- La configuración sería más directa
- Tendría soporte completo para todas las funciones de NextAuth.js

## 🆘 Troubleshooting

### Error: "Invalid client_id"
- Verifica que `GITHUB_CLIENT_ID` sea correcto
- Asegúrate de que no haya espacios extra en el `.env`

### Error: "Invalid redirect_uri"
- Verifica que la URL de callback en GitHub coincida exactamente
- Debe ser: `http://localhost:5174/api/auth/callback/github`

### Error: "NEXTAUTH_SECRET is not set"
- Asegúrate de tener `NEXTAUTH_SECRET` configurado en `.env`
- Reinicia el servidor después de cambiar el `.env`

### La autenticación no funciona
- Verifica que todas las variables estén configuradas
- Revisa la consola del navegador para errores
- Asegúrate de que el servidor esté ejecutándose en el puerto correcto

## 📚 Recursos adicionales

- [Documentación de NextAuth.js](https://next-auth.js.org/)
- [GitHub OAuth Apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app)
- [NextAuth.js with GitHub Provider](https://next-auth.js.org/providers/github)
