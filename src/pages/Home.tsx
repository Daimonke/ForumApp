import { Container } from "@mui/material";
import React, { useState } from "react";
import PostCard from "../components/PostCard";

type Props = {};

export type Post = {
  id: number;
  title: string;
  content: string;

  user: {
    id: number;
    username: string;
  };
};

const testPosts: Post[] = [
  {
    id: 1,
    title: "Test Post 1",
    content:
      "This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1This is the content of test post 1",

    user: {
      id: 1,
      username: "testuser1",
    },
  },
  {
    id: 2,
    title: "Test Post 2",
    content: "This is the content of test post 2",

    user: {
      id: 2,
      username: "testuser2",
    },
  },
];

const Home = (props: Props) => {
  const [posts, setPosts] = useState<Post[]>(testPosts);

  const getPosts = async () => {
    const posts = await fetch("/api/posts");
    const postsJson = await posts.json();
    setPosts(postsJson);
  };

  return (
    <div className="bg-gradient-to-r from-gray-700/30 to-slate-600/30 max-w-5xl m-auto h-full">
      <div className="flex flex-col gap-5 p-3 md:p-5 !min-h-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
