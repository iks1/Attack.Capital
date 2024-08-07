'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Post } from '@/pages/types';

const DashboardPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       router.push('/login');
  //       return;
  //     }

  //     try {
  //       const res = await axios.get('http://localhost:3001/api/posts', {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       });
  //       setPosts(res.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchPosts();
  // }, [router]);

  // const handlePost = async () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     router.push('/login');
  //     return;
  //   }

  //   try {
  //     const res = await axios.post('http://localhost:3001/api/posts', { title, content }, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     setPosts([...posts, res.data]);
  //     setTitle('');
  //     setContent('');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/posts', { withCredentials: true });
        setPosts(res.data);
      } catch (error) {
        console.error(error);
        router.push('/login');
      }
    };

    fetchPosts();
  }, [router]);

  const handlePost = async () => {
    try {
      const res = await axios.post('http://localhost:3001/api/posts', { title, content }, { withCredentials: true });
      setPosts([...posts, res.data]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      router.push('/login');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/api/users/logout', {}, { withCredentials: true });
      // Clear any client-side state if necessary (e.g., user info, posts)
      setPosts([]);
      setTitle('');
      setContent('');
      // Redirect to the login page
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        <h2>Create a new post</h2>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content"></textarea>
        <button onClick={handlePost}>Post</button>
      </div>
      <div>
        <h2>Your posts</h2>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
