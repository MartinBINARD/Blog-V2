import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { createMarkup } from '../../utils';

import { PostInterface } from '../../@types';
import Spinner from '../Spinner/Spinner';

import './SinglePost.scss';

interface SinglePostProps {
  postsList: PostInterface[];
}

function SinglePost({ postsList }: SinglePostProps) {
  const { slug } = useParams();

  // constante pour la redirection
  // dans React, il existe des règles pour les Hooks
  // l'une d'entre elles est qu'on ne peut utiliser un hook
  // uniquement au premier niveau du composant
  // ça veut dire :
  //   - pas dans une boucle
  //   - pas dans une condition
  //   - pas dans une fonction imbriquée
  //
  // > https://react.dev/warnings/invalid-hook-call-warning#breaking-rules-of-hooks
  //
  // Pour utiliser les hooks dans un bloc profond,
  // on passe par une variable intermédiaire

  // je vais stocker le résultat de mon API
  const [post, setPost] = useState<PostInterface | null>(null);

  // constante pour la redirection
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data } = await axios.get(
          `https://oblog-react.vercel.app/api/posts/${slug}`
        );

        setPost(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        // En cas d'erreur => redirection
        navigate('/404', { replace: true });
      }
    }

    fetchPost();
  }, [slug, navigate]);

  // à l'initialisation (mon useEffect n'est pas encore appelé)
  // post est null
  if (!post) {
    return <Spinner />;
  }

  return (
    <main className="single">
      <h2 className="single-title">{post?.title}</h2>
      <div className="single-category">{post?.categoryId}</div>
      <p className="single-content">{post?.content}</p>
    </main>
  );
}

export default SinglePost;
