export type Post = {
    id: number;
    title: string;
    content: string;
    authorId: number;
    createdAt: Date;
    author: {
      email: string;
    };
  };
  