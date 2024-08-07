import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
const JWT_SECRET="SECRET";

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    //@ts-ignore
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized billa' });
    }
  
    try {
      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          authorId: userId,
        },
      });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  };


export const getAllPosts = async (req: Request, res: Response) => {
    let {author} = req.query;


    const token = req.headers.authorization?.split(' ')[1];
    if(token){
      const user = jwt.verify(token, JWT_SECRET!);
      //@ts-ignore
      author = author? author: user?.userId;
    }

    // const token = req.cookies.token;
    // console.log(author);
    try {
      const posts = author?  await prisma.post.findMany({
        where: {
          authorId: Number(author),
        },
        include: {
          author: true,
        },
        }) :
        await prisma.post.findMany({
          include: {
            author: true,
          },
        });
        res.json(posts);

    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
  };

export const getPostsByAuthor = async (req: Request, res: Response) => {
    const { author } = req.query;
    const posts = await prisma.post.findMany({
      where: {
        authorId: Number(author),
      },
      include: {
        author: true,
      },
    });
    res.json(posts);
  };