import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPost = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    //@ts-ignore
    const userId = req.user?.userId;
  
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
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
    const {author} = req.query;
    console.log(author);
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
    //   const posts = await prisma.post.findMany({
    //   include: {
    //     author: true,
    //   },
    // });
    // res.json(posts);
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