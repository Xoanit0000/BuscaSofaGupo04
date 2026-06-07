import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Decodifica el payload de un token JWT (base64url) para obtener el username.
// Devuelve null si no hay token o si no se puede decodificar.
function getUsernameFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const data = JSON.parse(atob(normalized));
    return data.username || null;
  } catch {
    return null;
  }
}

function UserProfile({ user }) {
  const [username, setUsername] = useState(user || null);

  useEffect(() => {
    if (user) {
      setUsername(user);
    } else {
      setUsername(getUsernameFromToken());
    }
  }, [user]);

  // Si no hay sesión iniciada, invitamos al usuario a iniciar sesión.
  if (!username) {
    return (
      <div className="user-profile">
        <h2>Perfil de usuario</h2>
        <p>No has iniciado sesión.</p>
        <Link to="/login">Iniciar sesión</Link>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>Perfil de usuario</h2>
      <p>
        Nombre de usuario: <strong className="profile-username">{username}</strong>
      </p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}

export default UserProfile;
