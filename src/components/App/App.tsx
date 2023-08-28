import { useEffect, useState } from 'react';
import axios from 'axios';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Posts from '../Posts/Posts';
import Spinner from '../Spinner/Spinner';

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
          <Header
            categories={categories}
            zenMode={zenMode}
            setZenMode={setZenMode}
          />

          {/* {postsLoading ? <Spinner /> : <Posts list={posts} />} */}
          <Posts list={posts} />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
