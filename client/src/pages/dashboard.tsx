'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Post } from '@/pages/types';
import styled from 'styled-components';

const DashboardPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const res = await axios.get('http://localhost:3001/api/posts', { withCredentials: true });
  //       setPosts(res.data);
  //     } catch (error) {
  //       console.error(error);
  //       router.push('/login');
  //     }
  //   };

  //   fetchPosts();
  // }, [router]);

  // const handlePost = async () => {
  //   try {
  //     const res = await axios.post('http://localhost:3001/api/posts', { title, content }, { withCredentials: true });
  //     setPosts([...posts, res.data]);
  //     setTitle('');
  //     setContent('');
  //   } catch (error) {
  //     console.error(error);
  //     router.push('/login');
  //   }
  // };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/users/logout', {}, { withCredentials: true });
      localStorage.removeItem('token');
      setPosts([]);
      setTitle('');
      setContent('');
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      try {
        const res = await axios.get('http://localhost:3001/api/posts', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [router]);

  const handlePost = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3001/api/posts', { title, content }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts([...posts, res.data]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <Container>
      <Title>Dashboard</Title>
      <Button onClick={handleLogout}>Logout</Button>
      <FormContainer>
        <Subtitle>Create a new post</Subtitle>
        <Input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content"></Textarea>
        <Button onClick={handlePost}>Post</Button>
      </FormContainer>
      <PostContainer>
        <Subtitle>Your posts</Subtitle>
        {posts.map(post => (
          <PostContainer key={post.id}>
            <PostTitle>{post.title}</PostTitle>
            <PostContent>{post.content}</PostContent>
          </PostContainer>
        ))}
      </PostContainer>
    </Container>
  );
};

export default DashboardPage;


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

const Subtitle = styled.h2`
  margin-bottom: 10px;
`;

const FormContainer = styled.div`
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

const PostsContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const PostContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;

  @media (min-width: 600px) {
    padding: 30px;
  }
`;

const PostTitle = styled.h3`
  margin-bottom: 10px;
`;

const PostContent = styled.p`
  margin-bottom: 10px;
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
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #007bff;
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
