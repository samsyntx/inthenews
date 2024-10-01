"use client";
import type { Metadata } from "next";
import "./globals.css";

interface OpenGraph {
  title: string;
  description: string;
  url: string;
  siteName: string;
  images: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
  locale: string;
  type: string;
}

interface Twitter {
  card: string;
  site: string;
  title: string;
  description: string;
  image: string;
}

interface CustomMetadata extends Metadata {
  openGraph: OpenGraph;
  twitter: Twitter;
}

export const defaultMetadata: CustomMetadata = {
  title: "INTHENEWS - In depth fact-checking and Explanatory content",
  description:
    "Stay updated with the latest and trending topics in the US. Discover in-depth Tech, Medical, Anime, Projects information and brief introductions on current events.",
  keywords: "news, trending topics, US news, blogs",
  openGraph: {
    title: "INTHENEWS - In depth fact-checking and Explanatory content",
    description:
      "Stay updated with the latest and trending topics in the US. Discover in-depth Tech, Medical, Anime, Projects information and brief introductions on current events.",
    url: "https://www.inthenews.webwiser.in",
    siteName: "INTHENEWS - Web Wiser Technologies",
    images: [
      {
        url: "https://res.cloudinary.com/dtalgesli/image/upload/v1727439702/inthenews/ITN_hjlyil.png",
        width: 1200,
        height: 630,
        alt: "In The News",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@default",
    title: "INTHENEWS - In depth fact-checking and Explanatory content",
    description:
      "Stay updated with the latest and trending topics in the US. Discover in-depth Tech, Medical, Anime, Projects information and brief introductions on current events.",
    image:
      "https://res.cloudinary.com/dtalgesli/image/upload/v1727439702/inthenews/ITN_hjlyil.png",
  },
};

const mergeMetadata = (
  pageMetadata: CustomMetadata = {
    openGraph: {
      title: "",
      description: "",
      url: "",
      siteName: "",
      images: [],
      locale: "",
      type: "",
    },
    twitter: {
      card: "",
      site: "",
      title: "",
      description: "",
      image: "",
    },
  }
): CustomMetadata => {
  return {
    ...defaultMetadata,
    ...pageMetadata,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...pageMetadata.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...pageMetadata.twitter,
    },
  };
};

export default function RootLayout({
  children,
  pageMetadata = {
    openGraph: {
      title: "",
      description: "",
      url: "",
      siteName: "",
      images: [],
      locale: "",
      type: "",
    },
    twitter: {
      card: "",
      site: "",
      title: "",
      description: "",
      image: "",
    },
  },
}: Readonly<{
  children: React.ReactNode;
  pageMetadata?: CustomMetadata;
}>) {
  const metadata = mergeMetadata(pageMetadata);

  let ogImage:
    | { url: string; width: number; height: number; alt: string }
    | undefined;
  if (metadata.openGraph?.images) {
    ogImage = Array.isArray(metadata.openGraph.images)
      ? metadata.openGraph.images[0]
      : metadata.openGraph.images;
  }

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <link
          rel="icon"
          href="https://res.cloudinary.com/dtalgesli/image/upload/v1727439702/inthenews/ITN_hjlyil.png"
          type="image/png"
        />

        {/* Google Fonts  */}
        
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />

        {/* Merged metadata */}
        <title>{String(metadata.title)}</title>
        <meta name="description" content={metadata.description ?? undefined} />
        <meta name="keywords" content={String(metadata.keywords)} />

        {/* Open Graph tags */}
        <meta property="og:title" content={String(metadata.openGraph?.title)} />
        <meta
          property="og:description"
          content={metadata.openGraph?.description}
        />
        <meta property="og:url" content={String(metadata.openGraph?.url)} />
        <meta property="og:site_name" content={metadata.openGraph?.siteName} />

        {ogImage && (
          <>
            <meta property="og:image" content={ogImage.url ?? undefined} />
            <meta property="og:image:width" content={String(ogImage.width)} />
            <meta property="og:image:height" content={String(ogImage.height)} />
          </>
        )}
        <meta
          property="og:locale"
          content={metadata.openGraph?.locale ?? undefined}
        />
        <meta
          property="og:type"
          content={metadata.openGraph?.type ?? undefined}
        />

        {/* Twitter tags */}
        <meta name="twitter:card" content={metadata.twitter?.card} />
        <meta name="twitter:site" content={metadata.twitter?.site} />
        <meta name="twitter:title" content={metadata.twitter?.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter?.description}
        />
        <meta name="twitter:image" content={metadata.twitter?.image} />
      </head>
      <body>{children}</body>
    </html>
  );
}
