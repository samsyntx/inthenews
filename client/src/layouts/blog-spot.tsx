import React from "react";
import { formatDate } from "@/utils/format-date";
import BlogTitle from "../components/animate-title";
import { useMediaQuery } from "@mui/material";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const BlogSpot = ({
  imageHeight,
  isGrow,
  detail,
}: {
  imageHeight: string;
  isGrow?: boolean;
  detail: any;
}) => {
  /* @ts-ignore */
  const isMediumScreen = useMediaQuery("(min-width:719.98px)");

  const { id, title, description, created_at, topic, cover_image_url } = detail;

  return (
    <main className="rounded-lg shadow-md rounded-2xl grow flex flex-col justify-center align-center">
      <div
        className="rounded-2xl grow w-full overflow-hidden flex grow"
        style={{
          height: imageHeight,
          flexGrow: 1,
          display: imageHeight === "0" ? "none" : "block",
        }}
      >
        <img
          loading="lazy"
          src={cover_image_url}
          alt={title}
          className=" grow object-cover w-full h-full  hover:scale-105 transition-all duration-300"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2 mb-1 text-sm text-gray-500">
          <span>{formatDate(created_at) + " • " + topic.toUpperCase()}</span>
        </div>
        <a href={`/blog/${title.split(" ").join("-")}?blog-id=${id}`}>
          <BlogTitle title={title} />
          <p className="text-sm text-gray-500 mb-4">
            {description.substring(0, 200)}...
            <span className="text-blue-500 hover:underline">Read more</span>
          </p>
        </a>
      </div>
    </main>
  );
};

export default BlogSpot;
