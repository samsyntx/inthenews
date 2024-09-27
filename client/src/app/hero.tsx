"use client";

import Image from "next/image";
import { Button, Typography, Input } from "@material-tailwind/react";
import BlogSpot from "@/components/blog-spot";

function Hero() {
  return (
    <section className="bg-white p-8">
      <BlogSpot />

      <div className="w-full lg:container lg:mx-auto">
        <Image
          width={1024}
          height={400}
          src="/image/blog-background.png"
          alt="credit cards"
          className="h-96 w-full rounded-lg object-cover lg:h-[21rem]"
        />
      </div>
    </section>
  );
}
export default Hero;
