# Mise en place d'un router

## Installation

`yarn add react-router-dom`

## Connexion

On connecte notre React à l'URL

```js
// On importe ReactDom qui nous permettra d'injecter notre application dans le DOM
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// On importe notre composant principal
import App from './components/App';
// On importe notre fichier de style global
import './styles/index.scss';

// Je créer un root pour mon application (a partir d'un élément HTML)
const root = ReactDOM.createRoot(document.getElementById('root'));

// On injecte notre application dans le DOM
root.render(
  // 1. Connecter notre application React à l'URL
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Les outils de React Router sont désormais disponibles dans tous nos composants.

## Ajout des liens

`<Link to="/">Item </Link>`

Pour les menus :  
`<NavLink to="/">Item </NavLink>`

```js
<NavLink
  className={({ isActive }) =>
    isActive ? 'menu-link menu-link--selected' : 'menu-link'
  }
  to="/"
>
  Accueil
</NavLink>
```

## Ajout des routes

```js
<Routes>
  <Route
    path="/" // la route répond à quelle URL ?
    // si l'URL correspond au path, affiche l'élément
    element={<Posts posts={postsData} />}
  />
  <Route path="/hello" element={<h1>Hello World!</h1>} />
  {/* Généralement on ajoute une 404 si aucune route ne correspond  */}
  <Route path="*" element={<NotFound />} />
</Routes>
```
