import { GetServerSideProps } from 'next';
import axios from 'axios';
import { Post } from '@/pages/types';
import styled from 'styled-components';

type Props = {
  posts: Post[];
};

const HomePage = ({ posts }: Props) => {
  return (
    <Container>
      <h1>All Blog Posts</h1>

      <form method="get">
        <input
          type="text"
          name="author"
          placeholder="Filter by author ID"
          defaultValue={''}
        />
        <button type="submit">Filter</button>
        </form>
      {posts?.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <small>By {post.author.email}</small>
        </div>
      ))}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {author} = context.query;
  try{
    const res = await axios.get(`http://localhost:3001/api/posts`, {
      params: { author }
    });
    return { props: { posts: res.data } };
  }catch(e){
    return { props: { posts: [] } };
  }
};

export default HomePage;


const Container=styled.div`
   display:flex;
   flex-direction:column;
   justify-content: center;
   align-items:center;

`


