import { NavLink, Outlet } from 'react-router-dom';

function Header() {
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
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Header;
