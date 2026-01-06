import React from "react";
import PageWrapper from "../Components/PageWrapper";
import Navbar from "../Components/Navbar";
import Featured from "../Components/Featured";

const ResourcesPage = () => {
  return (
    <div>
      <PageWrapper bg="resource">
        <div>
          <Navbar />
        </div>

        <div className="flex items-center justify-center h-[calc(100vh-100px)] lg:h-[calc(100vh-90px)] ">
          <h1 className="text-2xl md:text-4xl text-center uppercase tracking-widest">
            Resources
          </h1>
        </div>
      </PageWrapper>

      <div className="py-10 md:py-20 px-8 lg:px-16">
        <Featured />
      </div>
    </div>
  );
};

export default ResourcesPage;
