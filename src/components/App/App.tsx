/* eslint-disable react/jsx-no-constructed-context-values */
import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import Spinner from '../Spinner/Spinner';
import NotFound from '../NotFound/NotFound';
import SinglePost from '../SinglePost/SinglePost';

import { ZenModeContext } from '../../contexts/ZenModeContext';

import { PostInterface } from '../../@types';

import './App.scss';
import { DarkContext, DarkProvider } from '../../contexts/DarkContext';
import DarkModeComponent from './DarkModeComponent';

function App() {
  const { zenMode } = useContext(ZenModeContext);

  // Appel API : articles
  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data } = await axios.get(
          'https://oblog-react.vercel.app/api/posts'
        );

        // on retourne
        setPosts(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className={zenMode ? 'app app--zen' : 'app'}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {/* le Header sera présent sur TOUTES LES PAGES */}
          <Header />

          {/* <Posts list={posts} /> */}
          {/* ICI, c'est la partie qui va changer en fonction de l'URL */}
          <Routes>
            {/*
              Router 3 : ajout des routes
              si le `path` (chemin) de la route correspond à l'URL
              alors on affiche `element`
            */}
            <Route path="/" element={<Posts list={posts} />} /> {/* accueil */}
            {/* <Route path="/category/react" element={<h1>React</h1>} /> */}
            {/* on utilise les routes paramétrées */}
            <Route path="/category/:slug" element={<Posts list={posts} />} />
            <Route path="/post/:slug" element={<SinglePost />} />
            <Route path="/about" element={<h1>À propos</h1>} />
            {/* Pour toutes les autres URL, on affiche la page d'erreur */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      <Footer />

      {/*
        Ici en utilisant `DarkContext.Provider`,
        je fournis une nouvelle valeur aux propriétés de mon contexte
      */}
      <DarkProvider>
        <DarkModeComponent />
      </DarkProvider>
    </div>
  );
}

export default App;
