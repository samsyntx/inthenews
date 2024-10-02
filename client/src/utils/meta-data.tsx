
export interface OpenGraphImage {
    url: string;
    width: number;
    height: number;
    alt: string;
  }
  
  export interface OpenGraph {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: OpenGraphImage[];
    locale: string;
    type: string;
  }
  
  export interface Twitter {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
  }
  
  export interface CustomMetadata {
    title: string;
    description: string;
    keywords: string;
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
    card: "https://res.cloudinary.com/dtalgesli/image/upload/v1727439702/inthenews/ITN_hjlyil.png",
    site: "@default",
    title: "INTHENEWS - In depth fact-checking and Explanatory content",
    description:
      "Stay updated with the latest and trending topics in the US. Discover in-depth Tech, Medical, Anime, Projects information and brief introductions on current events.",
    image:
      "https://res.cloudinary.com/dtalgesli/image/upload/v1727439702/inthenews/ITN_hjlyil.png",
  },
};

export const generateMetadata = (pageMetadata?: Partial<CustomMetadata>): CustomMetadata => {
  return {
    title: pageMetadata?.title || defaultMetadata.title,
    description: pageMetadata?.description || defaultMetadata.description,
    keywords: pageMetadata?.keywords || defaultMetadata.keywords,
    openGraph: {
      title: pageMetadata?.openGraph?.title || defaultMetadata.openGraph.title,
      description: pageMetadata?.openGraph?.description || defaultMetadata.openGraph.description,
      url: pageMetadata?.openGraph?.url || defaultMetadata.openGraph.url,
      siteName: pageMetadata?.openGraph?.siteName || defaultMetadata.openGraph.siteName,
      images: pageMetadata?.openGraph?.images || defaultMetadata.openGraph.images,
      locale: pageMetadata?.openGraph?.locale || defaultMetadata.openGraph.locale,
      type: pageMetadata?.openGraph?.type || defaultMetadata.openGraph.type,
    },
    twitter: {
      card: pageMetadata?.twitter?.card || defaultMetadata.twitter.card,
      site: pageMetadata?.twitter?.site || defaultMetadata.twitter.site,
      title: pageMetadata?.twitter?.title || defaultMetadata.twitter.title,
      description: pageMetadata?.twitter?.description || defaultMetadata.twitter.description,
      image: pageMetadata?.twitter?.image || defaultMetadata.twitter.image,
    },
  };
};
