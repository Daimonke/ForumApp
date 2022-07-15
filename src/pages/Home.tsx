import React, { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import PostSkeleton from "../components/PostSkeleton";
import { context, PostsData } from "../context/Context";

const Home = () => {
  const ctx = useContext(context);

  const [posts, setPosts] = useState<PostsData[]>([]);

  useEffect(() => {
    setPosts(ctx.posts);
  }, [ctx.posts]);

  return (
    <div className="max-w-5xl m-auto">
      <div className="flex flex-col gap-5 p-3 md:p-5">
        {posts.length === 0 &&
          Array.from({ length: 10 }).map((_, i) => <PostSkeleton key={i} />)}

        {posts.map((item) => (
          <PostCard key={item.post.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
