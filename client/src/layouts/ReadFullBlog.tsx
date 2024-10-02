import BlogTitle from "@/components/animate-title";
import { formatDate } from "@/utils/format-date";
import React from "react";

interface BlogDetails {
  id: string;
  title: string;
  topic: string;
  main_heading: string;
  cover_image_url: string;
  content1: string;
  content2?: string;
  content3?: string;
  content4?: string;
  image1_url?: string;
  image2_url?: string;
  image3_url?: string;
  created_at: string;
}

export default function ReadFullBlog({
  blogDetails,
}: {
  blogDetails: BlogDetails;
}) {
  const {
    title,
    topic,
    main_heading,
    cover_image_url,
    content1,
    content2,
    content3,
    content4,
    created_at,
    image1_url,
    image2_url,
    image3_url,
  } = blogDetails;

  if (!blogDetails) {
    return <div>Error: Blog details not found</div>;
  }

  return (
    <section className="md:px-20 w-full px-5 mx-auto">
      <BlogTitle title={main_heading} />

      <div className="mb-8 mt-5 w-full h-[400px] overflow-hidden rounded-lg shadow-md mb-6 group">
        <img
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
          src={cover_image_url}
          alt={title}
        />
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-600 mb-2">
          {formatDate(created_at) + " | " + topic.toUpperCase()}
        </p>
      </div>

      <div className="space-y-4">
        <div dangerouslySetInnerHTML={{ __html: content1 }} />

        {image1_url && (
          <div className="image-container">
            <img src={image1_url} alt={title} />
          </div>
        )}

        {content2 && <div dangerouslySetInnerHTML={{ __html: content2 }} />}

        {image2_url && (
          <div className="image-container">
            <img src={image2_url} alt={title} />
          </div>
        )}

        {content3 && <div dangerouslySetInnerHTML={{ __html: content3 }} />}

        {image3_url && (
          <div className="image-container">
            <img src={image3_url} alt={title} />
          </div>
        )}

        {content4 && <div dangerouslySetInnerHTML={{ __html: content4 }} />}
      </div>
    </section>
  );
}
