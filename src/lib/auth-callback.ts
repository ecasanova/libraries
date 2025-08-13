// Página simple para manejar el callback de GitHub OAuth
// Esto normalmente estaría en un router, pero para simplicidad lo agregaremos al App principal

export function handleAuthCallback() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');
  const error = urlParams.get('error');

  if (error) {
    console.error('OAuth error:', error);
    alert(`Error de autenticación: ${error}`);
    return;
  }

  if (code) {
    console.log('OAuth code received:', code);
    // El AuthContext se encargará del resto
    return true;
  }

  return false;
}
