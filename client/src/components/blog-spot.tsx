import React from "react";

const BlogSpot = () => {
  return (
    <main className="flex flex-col md:flex-row md:h-lvh gap-3 mb-4">
      <section className="grow flex flex-col">
        <div className="flex flex-col grow gap-3 borders">
          <article className="bg-gray-700 rounded-lg overflow-hidden shadow-md">
            <img
              src="/path/to/travel-image.jpg"
              alt="Travel"
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2 text-sm text-gray-500">
                <span>04/08. 2022</span>
                <span>&middot;</span>
                <span>Travel</span>
              </div>
              <h3 className="text-xl font-bold mb-4">
                Get to your dream now destinations with Travel Pro
              </h3>
              <a href="#" className="text-blue-500 hover:underline">
                Read more &rarr;
              </a>
            </div>
          </article>

          <article className="grow bg-gray-700 grow rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2 text-sm text-gray-500">
                <span>AOS</span>
                <span>&middot;</span>
                <span>BROADCASTMEMBER</span>
              </div>
              <h3 className="text-xl font-bold mb-4">
                Real talk in a corporate world
              </h3>
              <a href="#" className="text-blue-500 hover:underline">
                Learn more
              </a>
            </div>
          </article>
        </div>
      </section>
      <section className="grow flex flex-col">
        <h2
          className="text-3xl font-bold mb-4 text-[var(--primary-color)]"
        >
          Discover the Latest Trends
        </h2>
        <article className="bg-gray-700 rounded-lg overflow-hidden shadow-md grow">
          <img
            src="/path/to/fashion-image.jpg"
            alt="Fashion"
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-bold mb-4">See all picks -</h3>
            <a href="#" className="text-blue-500 hover:underline">
              View collection &rarr;
            </a>
          </div>
        </article>
      </section>
    </main>
  );
};

export default BlogSpot;
