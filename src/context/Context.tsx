import React, { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};
export type PostsPost = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: number;
};

export type PostsUser = {
  id: number;
  username: string;
  avatar: string;
  userPostsCount: number;
};

export type PostsData = {
  post: PostsPost;
  user: PostsUser;
};

type User = {
  id: number;
  username: string;
  avatar: string;
};

type Ctx = {
  user: User | false | null;
  setUser: (user: Ctx["user"]) => void;
  posts: PostsData[];
  setPosts: (posts: Ctx["posts"]) => void;
  getPosts: () => void;
};

const initialValue: Ctx = {
  user: false,
  setUser: (user) => {},
  posts: [],
  setPosts: (posts) => {},
  getPosts: () => {},
};

export const context = createContext(initialValue);

const Context = ({ children }: Props) => {
  const [user, setUser] = useState(initialValue.user);
  const [posts, setPosts] = useState<PostsData[]>([]);

  const getUser = async () => {
    const user = await fetch("/auth/verifyUser");
    const userJson = await user.json();
    if (userJson.success) {
      setUser({
        id: userJson.id,
        username: userJson.username,
        avatar: userJson.avatar,
      });
    } else {
      setUser(null);
    }
  };

  const getPosts = async () => {
    const posts = await fetch("content/posts");
    const postsJson = await posts.json();
    if (postsJson.success) {
      setPosts(postsJson.posts);
    }
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, []);

  return (
    <context.Provider value={{ user, setUser, posts, setPosts, getPosts }}>
      {children}
    </context.Provider>
  );
};

export default Context;
