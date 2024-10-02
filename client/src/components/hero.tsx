"use client";

import BlogSpot from "@/layouts/blog-spot";
import HeroSkeleton from "@/skeleton/hero-skeleton";
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from "axios";
import { useEffect, useState } from "react";
import NetworkError from "./network-error";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Hero() {
  /* @ts-ignore */
  const isMediumScreen = useMediaQuery("(min-width:719.98px)");
  const [latestBlog, setLatestBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState({ loading: true, netErr: false });

  const fetchLatestBlog = async () => {
    try {
      const url = `${apiUrl}/blogs/latest/`;
      const response = await axios.get(url);
      setLatestBlog({
        blogOne: response.data[0],
        blogTwo: response.data[1],
        blogThree: response.data[2],
      });
      setIsLoading({ loading: false, netErr: false });
    } catch (error) {
      console.error("Error fetching blog", error);
      setIsLoading({ loading: false, netErr: true });
    }
  };

  useEffect(() => {
    fetchLatestBlog();
  }, []);

  return isLoading.loading ? (
    <HeroSkeleton />
  ) : isLoading.netErr ? (
    <div className="md:h-lvh h-auto">
      <NetworkError />
    </div>
  ) : (
    <section className="bg-white p-8 flex flex-col md:flex-row gap-3 mb-4">
      <section className="grow flex flex-col grow gap-3">
        <BlogSpot
          isGrow={true}
          imageHeight={isMediumScreen ? "300px" : "300px"}
          detail={latestBlog.blogOne}
        />
      </section>

      <section className="flex flex-col gap-3 grow">
        <BlogSpot
          detail={latestBlog.blogTwo}
          imageHeight={isMediumScreen ? "0" : "180px"}
        />
        <BlogSpot detail={latestBlog.blogThree} imageHeight="200px" />
      </section>
    </section>
  );
}
export default Hero;
