import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import Spinner from '../Spinner/Spinner';
import NotFound from '../NotFound/NotFound';

import { CategoryInterface, PostInterface } from '../../@types';

import './App.scss';

function App() {
  const [zenMode, setZenMode] = useState(false);

  // Appel API : articles
  const [posts, setPosts] = useState<PostInterface[]>([]);
  // const [postsLoading, setPostsLoading] = useState(false);

  // Appel API : catégories
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  // Appels API : loading commun
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts(): Promise<PostInterface[]> {
      try {
        const { data } = await axios.get(
          'https://oblog-react.vercel.app/api/posts'
        );

        // on retourne
        return data;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }

      // si erreur, je retourne un tableau vide
      return [];
    }

    async function fetchCategories(): Promise<CategoryInterface[]> {
      try {
        const { data } = await axios.get(
          'https://oblog-react.vercel.app/api/categories'
        );

        // on stocke la réponse dans la variable d'état
        // setCategories(data);

        // je force un délai de 3 secondes pour stocker mes catégories
        // pour simuler une différence de traitement entre les promesses
        // return await new Promise((resolve) => {
        //   setTimeout(() => {
        //     resolve(data);
        //   }, 3000);
        // });
        return data;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }

      // si erreur, je retourne un tableau vide
      return [];
    }

    /*
      Ici on lance nos promesses les unes après les autres (sérialisation) ;
      souvent on a besoin de résultats provenant de différentes promesses
      en même temps
      → c'est la parallélisation

      (voir ./__docs/promise_all.png)
    */
    // fetchPosts();
    // fetchCategories();
    async function fetchData() {
      const [categoriesData, postsData] = await Promise.all([
        fetchCategories(),
        fetchPosts(),
      ]);

      setCategories(categoriesData);
      setPosts(postsData);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  return (
    <div className={zenMode ? 'app app--zen' : 'app'}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {/* le Header sera présent sur TOUTES LES PAGES */}
          <Header
            categories={categories}
            zenMode={zenMode}
            setZenMode={setZenMode}
          />

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
            <Route path="/about" element={<h1>À propos</h1>} />
            {/* Pour toutes les autres URL, on affiche la page d'erreur */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
