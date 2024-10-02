"use client";
import { defaultMetadata, generateMetadata } from "@/utils/meta-data";
import RootLayout from "@/app/layout";
import Common from "@/constant/Common";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useSearchParams } from "next/navigation";
import ReadFullBlog from "@/layouts/ReadFullBlog";
import BlogDetailsSkeleton from "@/skeleton/post-skeleton";
import NetworkError from "@/components/network-error";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const BlogPage = () => {
  const params = useParams();
  const query = useSearchParams();
  const [pageMetaData, setPageMetaData] = useState(defaultMetadata);
  const [loading, setLoading] = useState({ isLoading: true, netErr: false });
  const [blogDetails, setBlogDetails] = useState<any>(null);

  const blogId = query.get("blog-id");

  const slug = params.titleSlug as string;

  const getCompleteBlogData = async () => {
    try {
      const url = `${apiUrl}/blogs/${blogId}`;

      const response = await axios.get(url);
      setBlogDetails(response.data);
      setLoading({ isLoading: false, netErr: false });
    } catch (error) {
      console.log(error);
      setLoading({ isLoading: false, netErr: true });
    }
  };

  useEffect(() => {
    getCompleteBlogData();
  }, [slug]);

  useEffect(() => {
    if (blogDetails) {
      setPageMetaData(
        generateMetadata({
          title: blogDetails.title,
          description: blogDetails.description,
          keywords: blogDetails.keywords,
          openGraph: {
            title: blogDetails.title,
            description: blogDetails.description,
            url: `https://www.inthenews.webwiser.in/blog/${slug}`,
            siteName: `${blogDetails.title} - INTHENEWS`,
            images: [
              {
                url: blogDetails.cover_image_url,
                width: 1200,
                height: 630,
                alt: blogDetails.title,
              },
            ],
            locale: "en_US",
            type: "article",
          },
          twitter: {
            card: blogDetails.cover_image_url,
            site: "@default",
            title: blogDetails.title,
            description: blogDetails.description,
            image: blogDetails.cover_image_url,
          },
        })
      );
    }
  }, [blogDetails]);

  return (
    <RootLayout pageMetadata={pageMetaData}>
      <Common>
        {loading.isLoading ? loading.netErr ? <NetworkError /> : (
          <main className="max-w-4xl mx-auto">
            <BlogDetailsSkeleton />
          </main>
        ) : (
          <main className="max-w-4xl mx-auto">
            <ReadFullBlog blogDetails={blogDetails} />
          </main>
        )}
      </Common>
    </RootLayout>
  );
};

export default BlogPage;
