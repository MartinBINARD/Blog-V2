import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/CategoriesContext';
import { ZenModeContext } from '../../contexts/ZenModeContext';

import './Header.scss';

function Header() {
  // Context : lecture
  // je vais récupérer les catégories depuis mon contexte
  const categories = useContext(CategoriesContext);
  // je vais récupérer le mode zen depuis mon contexte
  const { zenMode, setZenMode } = useContext(ZenModeContext);

  const allCategories = categories.map((category) => (
    <NavLink
      key={category.id}
      className={({ isActive }) =>
        isActive ? 'menu-link menu-link--selected' : 'menu-link'
      }
      to={`/category/${category.slug}`}
    >
      {category.name}
    </NavLink>
  ));

  const handleClick = () => {
    setZenMode(!zenMode);
  };

  return (
    <header className="menu" id="header">
      <nav className="menu-nav">
        <NavLink
          className={({ isActive }) =>
            isActive ? 'menu-link menu-link--selected' : 'menu-link'
          }
          to="/"
        >
          Accueil
        </NavLink>

        {allCategories}

        {/* Ajout d'un lien vers la page `À propos` */}
        <NavLink
          className={({ isActive }) =>
            isActive ? 'menu-link menu-link--selected' : 'menu-link'
          }
          to="/about"
        >
          À propos
        </NavLink>

        <button className="menu-btn" type="button" onClick={handleClick}>
          {zenMode ? 'Désactiver' : 'Activer'} le mode zen
        </button>
      </nav>
    </header>
  );
}

export default Header;
