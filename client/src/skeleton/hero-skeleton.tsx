import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HeroSkeleton() {

  return (
    <section className="bg-white p-8 flex flex-col md:flex-row gap-3 mb-4">
      <section className="flex flex-col gap-3 grow">
        <Skeleton animation="wave" variant="rectangular" height="500px" className="rounded-lg"/>
        <Skeleton animation="wave" variant="rectangular" height="200px" className="rounded-lg" />
      </section>

      <section className="flex flex-col gap-3 grow">
        <Skeleton animation="wave" variant="rectangular" height="200px" className="rounded-lg" />
        <Skeleton animation="wave" variant="rectangular" height="500px" className="rounded-lg" />
      </section>
    </section>
  );
}
