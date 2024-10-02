import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

export default function BlogDetailsSkeleton() {
  return (
    <section className="md:px-20 w-full px-5 mx-auto flex flex-col gap-3">
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="100px"
        className="rounded-lg"
      />

      <Skeleton
        animation="wave"
        variant="rectangular"
        height="400px"
        className="rounded-lg"
      />

      <Skeleton
        animation="wave"
        variant="rectangular"
        height="40px"
        className="rounded-lg"
      />

      <Skeleton
        animation="wave"
        variant="rectangular"
        height="300px"
        className="rounded-lg"
      />

      <Skeleton
        animation="wave"
        variant="rectangular"
        height="400px"
        className="rounded-lg"
      />

      <Skeleton
        animation="wave"
        variant="rectangular"
        height="300px"
        className="rounded-lg"
      />

      <Skeleton
        animation="wave"
        variant="rectangular"
        height="400px"
        className="rounded-lg"
      />
    </section>
  );
}
