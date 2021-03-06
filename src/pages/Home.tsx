import React, { useContext, useEffect, useState } from "react";
import FilterBar from "../components/posts/FilterBar";
import PostCard from "../components/posts/PostCard";
import PostSkeleton from "../components/posts/PostSkeleton";
import { context, PostsData } from "../context/Context";

const Home = () => {
  const ctx = useContext(context);

  const [posts, setPosts] = useState<PostsData[]>([]);

  useEffect(() => {
    setPosts(ctx.posts);
  }, [ctx.posts]);

  return (
    <div className="max-w-5xl m-auto">
      <FilterBar />
      <div className="max-w-5xl m-auto flex flex-col gap-5 p-3 md:p-5">
        {posts.length === 0 &&
          ctx.posts.length === 0 &&
          Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)}
        {posts.map((item) => (
          <PostCard key={item.post.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
