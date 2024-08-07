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
      <Title>All Blog Posts</Title>

      <FilterForm method="get">
        <Input
          type="text"
          name="author"
          placeholder="Filter by author ID"
          defaultValue={''}
        />
        <Button type="submit">Filter</Button>
        </FilterForm>
      {posts?.map(post => (
        <PostContainer key={post.id}>
          <PostTitle>{post.title}</PostTitle>
          <PostContent>{post.content}</PostContent>
          <PostAuthor>By {post.author.email}</PostAuthor>
        </PostContainer>
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


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const FilterForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  @media (min-width: 600px) {
    margin-right: 10px;
    margin-bottom: 0;
    width: auto;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const PostContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;

  @media (min-width: 600px) {
    padding: 30px;
  }
`;

const PostTitle = styled.h2`
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  margin-bottom: 10px;
`;

const PostAuthor = styled.small`
  color: #555;
`;


