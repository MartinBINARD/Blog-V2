import { Link, NavLink } from 'react-router-dom';

import { CategoryInterface } from '../../@types';
import './Header.scss';

interface HeaderProps {
  categories: CategoryInterface[];
  zenMode: boolean;
  setZenMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ categories, zenMode, setZenMode }: HeaderProps) {
  const allCategories = categories.map((category) => (
    // Router 2 : ajout des liens
    // → <Link to=""> >>> génère des `<a href="">`
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
