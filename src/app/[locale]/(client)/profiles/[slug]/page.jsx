'use client'

import ScrollToTop from "@/components/scroll-to-top";
import Image from "next/image";
import { useParams } from 'next/navigation'

const profiles = [
  {
    id: 1,
    name: "John Doe",
    bio: "Publisher of tech books",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 2,
    name: "Jane Smith",
    bio: "Educational books publisher",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 3,
    name: "Alice Johnson",
    bio: "Children’s books publisher",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 4,
    name: "Michael Brown",
    bio: "Travel and adventure books",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 5,
    name: "Sara Lee",
    bio: "Cookbook and culinary publisher",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 6,
    name: "Robert Wilson",
    bio: "Science fiction books publisher",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 7,
    name: "Laura Adams",
    bio: "History books publisher",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 8,
    name: "Daniel Clark",
    bio: "Business and finance books",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 9,
    name: "Emily Davis",
    bio: "Health and wellness books",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 10,
    name: "Chris Martinez",
    bio: "Children’s storybooks publisher",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 11,
    name: "Angela Thomas",
    bio: "Romance books publisher",
    avatar: "/images/shops/logo.png",
  },
  {
    id: 12,
    name: "Kevin Harris",
    bio: "Technology guides publisher",
    avatar: "/images/shops/logo.png",
  },
];

const Page = () => {
    const params = useParams() 
  return (
    <div className="p-4">
      <ScrollToTop />

      <h2 className="mb-4 text-2xl font-bold uppercase">{params.slug}</h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="flex flex-col items-center p-4 transition-transform duration-300 transform bg-white rounded-lg shadow-md hover:scale-105 hover:shadow-lg"
          >
            <Image
              src={profile.avatar}
              alt={profile.name}
              width={100}
              height={100}
              className="mb-4 rounded-full"
            />
            <h3 className="text-lg font-semibold">{profile.name}</h3>
            <p className="text-sm text-gray-600">{profile.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
