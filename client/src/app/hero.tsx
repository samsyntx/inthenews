"use client";

import BlogSpot from "@/layouts/blog-spot";
import HeroSkeleton from "@/skeleton/hero-skeleton";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

function Hero() {
  const isMediumScreen = useMediaQuery("(min-width:719.98px)");
  const [latestBlog, setLatestBlog] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchLatestBlog = async () => {
    try {
      const url = `${apiUrl}/blogs/latest/`;
      const response = await axios.get(url);
      setLatestBlog({
        blogOne: response.data[0],
        blogTwo: response.data[1],
        blogThree: response.data[2],
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching blog", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestBlog();
  }, []);

  return isLoading ? (
    <HeroSkeleton />
  ) : (
    <section className="bg-white p-8 flex flex-col md:flex-row gap-3 mb-4">
      <section className="grow flex flex-col grow gap-3">
        <BlogSpot
          isGrow={true}
          imageHeight={isMediumScreen ? "300px" : "300px"}
          detail={latestBlog.blogOne}
        />
        <div
          className="text-white bg-gradient-to-r from-yellow-100 grow flex justify-center items-center text-center p-3 rounded-lg shadow-lg border-2 border-yellow-100"
        >
          <h2 className="text-3xl text-gray-800 font-bold">
            Unpacking the Trending Topics Captivating Audiences Everywhere!
          </h2>
        </div>
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
