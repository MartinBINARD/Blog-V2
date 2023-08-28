import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App/App';

import './styles/index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // Router 1 : on se connecte à l'URL
  // → on diffuse partout dans notre application
  // les outils de React Router
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
