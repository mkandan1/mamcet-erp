import React from "react";
import { Icon } from "@iconify/react";
import { Container } from "../components/Container";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { user } = useSelector((state)=> (state.auth.user))

  return (
    <Container title={'My Account'}>
      <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl">
          {/* Profile Header */}
          <div className="flex items-center p-6 border-b">
            <img
              src={user.photo + '?alt=media'}
              alt="User Profile"
              className="h-24 w-24 rounded-full border-4 border-white shadow-md"
            />
            <div className="ml-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">{user.designation}</p>
              <div className="mt-2">
                {user.roles.map((role) => (
                  <span
                    key={role}
                    className="inline-block bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
                  >
                    {role.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Icon icon="mdi:email-outline" className="w-6 h-6 text-gray-500" />
                <p className="ml-3 text-gray-700">{user.email}</p>
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:account-check-outline" className={`w-6 h-6 ${user.email_verified ? 'text-green-500' : 'text-red-500'}`} />
                <p className="ml-3 text-gray-700">
                  {user.email_verified ? "Email Verified" : "Email Not Verified"}
                </p>
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:account-outline" className="w-6 h-6 text-gray-500" />
                <p className="ml-3 text-gray-700">Status: {user.status}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <Icon icon="mdi:calendar-clock" className="w-6 h-6 text-gray-500" />
                <p className="ml-3 text-gray-700">
                  Created At: {new Date(user.createdAt * 1000).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <Icon icon="mdi:calendar-edit" className="w-6 h-6 text-gray-500" />
                <p className="ml-3 text-gray-700">
                  Last Updated: {new Date(user.updatedAt * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end p-6 border-t">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Edit Profile
            </button>
            <button className="bg-red-600 text-white px-4 py-2 ml-4 rounded-md hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};
