import Post from '../Post/Post';

import { PostInterface } from '../../@types';

import './Posts.scss';

interface PostsProps {
  list: PostInterface[];
}

function Posts({ list }: PostsProps) {
  const items = list.map((post) => <Post key={post.id} data={post} />);

  return (
    <main className="posts">
      <h1 className="posts-title">Dev Of Thrones</h1>
      <div className="posts-list">{items}</div>
    </main>
  );
}

export default Posts;
