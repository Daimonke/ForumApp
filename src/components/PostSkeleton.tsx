import { Skeleton } from "@mui/material";
import React from "react";

const PostSkeleton = () => {
  return (
    <div className="flex w-full gap-2 p-2">
      <div className="flex flex-col gap-2 items-center justify-center rounded-md">
        <Skeleton variant="text" sx={{ bgcolor: "grey.700" }} width={"70%"} />
        <Skeleton
          variant="circular"
          height={"100%"}
          width={"100px"}
          sx={{ bgcolor: "grey.700" }}
        />
        <Skeleton variant="text" width={"70%"} sx={{ bgcolor: "grey.700" }} />
      </div>
      <Skeleton
        sx={{ bgcolor: "grey.700", borderRadius: "6px" }}
        variant="rectangular"
        height={160}
        width={"100%"}
      />
    </div>
  );
};

export default PostSkeleton;
