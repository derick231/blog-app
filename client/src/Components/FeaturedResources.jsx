import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Card from "./Card";

const fetchFeaturedResources = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/resources?featured=true`
  );
  return res.data;
};

const FeaturedResources = () => {
  const {
    isPending,
    error,
    data: featuredResources = [],
  } = useQuery({
    queryKey: ["featuredResources"],
    queryFn: fetchFeaturedResources,
  });

  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-8 mb-20">
      <h1 className="text-red-800 text-2xl md:text-4xl">Featured Resources</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {featuredResources.map((resource) => (
          <div key={resource.id} className="w-full lg:w-1/3 contents">
            <Card resource={resource} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedResources;
