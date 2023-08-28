import { CategoryInterface } from '../../@types';
import './Header.scss';

interface HeaderProps {
  categories: CategoryInterface[];
  zenMode: boolean;
  setZenMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ categories, zenMode, setZenMode }: HeaderProps) {
  const allCategories = categories.map((category) => (
    <a key={category.id} className="menu-link" href={`/${category.slug}`}>
      {category.name}
    </a>
  ));

  const handleClick = () => {
    setZenMode(!zenMode);
  };

  return (
    <header className="menu" id="header">
      <nav className="menu-nav">
        <a className="menu-link menu-link--selected" href="#header">
          Accueil
        </a>

        {allCategories}

        <button className="menu-btn" type="button" onClick={handleClick}>
          {zenMode ? 'Désactiver' : 'Activer'} le mode zen
        </button>
      </nav>
    </header>
  );
}

export default Header;
