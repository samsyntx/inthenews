"use client";
import "./globals.css";
import { CustomMetadata, generateMetadata } from "@/utils/meta-data";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

export default function RootLayout({
  children,
  pageMetadata,
}: Readonly<{
  children: React.ReactNode;
  pageMetadata?: Partial<CustomMetadata>;
}>) {
  const metadata = generateMetadata(pageMetadata);

  const tagManagerArgs = {
    gtmId: "GTM-M9ZDQF27",
  };

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);

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

        <title>{String(metadata.title)}</title>
        <meta name="description" content={metadata.description ?? undefined} />
        <meta name="keywords" content={String(metadata.keywords)} />
        <meta property="og:title" content={String(metadata.openGraph.title)} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={String(metadata.openGraph.url)} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        {metadata.openGraph.images && metadata.openGraph.images.length > 0 && (
          <>
            <meta
              property="og:image"
              content={metadata.openGraph.images[0].url}
            />
            <meta
              property="og:image:width"
              content={String(metadata.openGraph.images[0].width)}
            />
            <meta
              property="og:image:height"
              content={String(metadata.openGraph.images[0].height)}
            />
          </>
        )}
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:type" content={metadata.openGraph.type} />
        {/* Twitter tags */}
        <meta name="twitter:card" content={metadata.twitter.card} />
        <meta name="twitter:site" content={metadata.twitter.site} />
        <meta name="twitter:title" content={metadata.twitter.title} />
        <meta
          name="twitter:description"
          content={metadata.twitter.description}
        />
        <meta name="twitter:image" content={metadata.twitter.image} />

        {/* <!-- Google Tag Manager --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M9ZDQF27')`,
          }}
        />
      </head>
      <body>
        {children}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M9ZDQF27"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      </body>
    </html>
  );
}
