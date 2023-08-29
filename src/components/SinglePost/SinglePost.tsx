import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { CategoriesContext } from '../../contexts/CategoriesContext';

import { PostInterface } from '../../@types';

import './SinglePost.scss';
import Spinner from '../Spinner/Spinner';

/*
  Objectif :
  récupérer le nom de la catégorie de l'article depuis le contexte

  1. on récupérer les catégories depuis le contexte
  2. on trouve la bonne catégorie en fonction de son id → `Array.find()`
  3. si on a une correspondance, j'ajoute la catégorie
      (objet obtenu à l'étape 2) à mon retour API (`data`)
*/

function SinglePost() {
  const categories = useContext(CategoriesContext);

  const { slug } = useParams();

  const navigate = useNavigate();

  const [post, setPost] = useState<PostInterface | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await axios.get(
          `https://oblog-react.vercel.app/api/posts/${slug}`
        );
        console.log(data);
        const foundCategory = categories.find(
          (category) => data.id === category.id
        );
        console.log('foundCategory', foundCategory);

        if (foundCategory) {
          setTimeout(() => {
            setPost(data);
          }, 1000);
        }
      } catch (error) {
        navigate('/404', { replace: true });
      }
    }

    fetchPost();
  }, [navigate, slug, categories]);

  if (!post) {
    return <Spinner />;
  }

  return (
    <main className="single">
      <h1 className="single-title">{post?.title}</h1>
      <h2 className="single-category">{post?.categoryId}</h2>

      <p className="single-content">{post?.content}</p>
    </main>
  );
}

export default SinglePost;
