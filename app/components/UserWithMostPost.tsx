// components/UserWithMostPosts.tsx

import React from "react";
import Image from "next/image";

type User = {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  totalJobPosts: number;
};

const UserWithMostPosts: React.FC = () => {
  const users: User[] = [
    {
      avatarUrl: "https://img.daisyui.com/tailwind-css-component-profile-2@56w.png",
      firstName: "Hart",
      lastName: "Hagerty",
      totalJobPosts: 100,
    },
    {
      avatarUrl: "https://img.daisyui.com/tailwind-css-component-profile-3@56w.png",
      firstName: "Brice",
      lastName: "Swyre",
      totalJobPosts: 90,
    },
    {
      avatarUrl: "https://img.daisyui.com/tailwind-css-component-profile-4@56w.png",
      firstName: "Marjy",
      lastName: "Ferencz",
      totalJobPosts: 80,
    },
    {
      avatarUrl: "https://img.daisyui.com/tailwind-css-component-profile-5@56w.png",
      firstName: "Yancy",
      lastName: "Tear",
      totalJobPosts: 70,
    },
  ];

  return (
    <div className="overflow-x-auto bg-white p-2 md:p-4 shadow rounded-lg">
      <h2 className="text-md md:text-lg font-bold mb-2 md:mb-4">
        User with Most Posts
      </h2>
      <table className="table-auto w-full text-xs md:text-sm">
        <thead>
          <tr className="bg-yellow-400">
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">
              Avatar
            </th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">
              First Name
            </th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">
              Last Name
            </th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">
              Total Job Posts
            </th>
            <th className="px-2 py-1 md:px-4 md:py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b">
              <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                <div className="flex justify-center items-center gap-2 md:gap-4">
                  <div className="avatar">
                    <div className="mask mask-squircle h-8 w-8 md:h-12 md:w-12">
                      <Image
                        className="rounded-full"
                        src={user.avatarUrl}
                        alt={`Avatar of ${user.firstName} ${user.lastName}`}
                        width={48}
                        height={48}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                {user.firstName}
              </td>
              <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                {user.lastName}
              </td>
              <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                {user.totalJobPosts}
              </td>
              <td className="px-2 py-1 md:px-4 md:py-2 text-center">
                <button className="btn px-2 py-1 md:px-4 md:py-2 rounded-md bg-yellow-500 text-black hover:bg-yellow-600">
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-yellow-400">
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">
              Avatar
            </th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">
              First Name
            </th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">
              Last Name
            </th>
            <th className="px-2 py-1 md:px-4 md:py-2 text-center">
              Total Job Posts
            </th>
            <th className="px-2 py-1 md:px-4 md:py-2 rounded-l-lg"></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default UserWithMostPosts;
