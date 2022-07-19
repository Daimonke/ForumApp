import React, { createContext, useEffect, useState } from "react";
import URL from "../uri";

type Props = {
  children: React.ReactNode;
};
export type PostsPost = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  user_id: number;
  postVotes: number;
  userVoted: number | null;
  comments: number;
  original_content: string | null;
  original_title: string | null;
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
  userPostsCount: number;
};

type Ctx = {
  user: User | false | null;
  setUser: (user: Ctx["user"]) => void;
  posts: PostsData[];
  setPosts: (posts: Ctx["posts"]) => void;
  getPosts: () => void;
  setUpdate: (update: boolean) => void;
  update: boolean;
  sortSwitch: string;
  setSortSwitch: (sortSwitch: Ctx["sortSwitch"]) => void;
};

const initialValue: Ctx = {
  user: false,
  setUser: (user) => {},
  posts: [],
  setPosts: (posts) => {},
  getPosts: () => {},
  setUpdate: (update) => {},
  update: false,
  sortSwitch: "",
  setSortSwitch: (sortSwitch) => {},
};

export const context = createContext(initialValue);

const Context = ({ children }: Props) => {
  const [user, setUser] = useState(initialValue.user);
  const [posts, setPosts] = useState<PostsData[]>([]);
  const [update, setUpdate] = useState(initialValue.update);
  const [sortSwitch, setSortSwitch] = useState(initialValue.sortSwitch);

  const getUser = async () => {
    const user = await fetch(`${URL}/auth/verifyUser`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const userJson = await user.json();
    if (userJson.success) {
      setUser({
        id: userJson.id,
        username: userJson.username,
        avatar: userJson.avatar,
        userPostsCount: userJson.userPostsCount,
      });
    } else {
      setUser(null);
    }
  };

  const getPosts = async () => {
    const posts = await fetch(`${URL}/content/posts`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const postsJson = await posts.json();
    if (postsJson.success) {
      setPosts(postsJson.posts);
    }
  };

  useEffect(() => {
    getUser();
    getPosts();
  }, [update]);

  return (
    <context.Provider
      value={{
        user,
        setUser,
        posts,
        setPosts,
        getPosts,
        setUpdate,
        update,
        sortSwitch,
        setSortSwitch,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default Context;
