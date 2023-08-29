// pour un « cycle de dépendance » (import A qui importe B qui importe A…)
// on précise qu'on veut importer seulement les types et interfaces
// import type { PostInterface } from '../Posts/Posts';
import { Link } from 'react-router-dom';

import { createMarkup } from '../../utils';
import { PostInterface } from '../../@types';

import './Post.scss';

interface PostProps {
  data: PostInterface;
}

function Post({ data }: PostProps) {
  return (
    <Link to={`/post/${data.slug}`} className="post-link">
      <article className="post">
        <h2 className="post-title">{data.title}</h2>
        <div className="post-category">{data.category.name}</div>
        <p
          className="post-excerpt"
          dangerouslySetInnerHTML={createMarkup(data.excerpt)}
        />
      </article>
    </Link>
  );
}

export default Post;
