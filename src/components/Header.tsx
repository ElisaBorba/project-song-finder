import { NavLink, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';
import { UserType } from '../types';

function Header() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userFetch = await getUser();
        setUserData(userFetch);

        console.log('userFetch', userFetch);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        throw new Error('Erro, API não resolvida');
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Carregando />;
  }

  return (
    <div>
      <header data-testid="header-component">
        <NavLink data-testid="link-to-search" to="/search">
          PESQUISAR
        </NavLink>
        <NavLink data-testid="link-to-favorites" to="/favorites">
          FAVORITOS
        </NavLink>
        <NavLink data-testid="link-to-profile" to="/profile">
          PERFIL
        </NavLink>
        {userData && (
          <p data-testid="header-user-name">{userData.name}</p>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Header;
