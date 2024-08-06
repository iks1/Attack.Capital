import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Post } from '@/pages/types';

type Props = {
  posts: Post[];
};

const HomePage = ({ posts }: Props) => {
  return (
    <div>
      <h1>All Blog Posts</h1>
      {posts?.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>By {post.author.email}</small>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('http://localhost:3001/api/posts');
  return { props: { posts: res.data } };
};

export default HomePage;


