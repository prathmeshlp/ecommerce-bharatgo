import React from "react";
import { useAuth } from "../hooks/useAuth";
import SectionHeading from "./SectionHeading";
import Card from "./Card";

const MyAccount: React.FC = () => {
  const { user } = useAuth();

  if (!user)
    return (
      <div className="text-center text-gray-600 pt-20">
        Please log in to view your account.
      </div>
    );

  return (
    <Card className="min-h-screen bg-white pt-20 pb-6 flex flex-col items-center">
      <div className="container mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          My Account
        </SectionHeading>
        <Card
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6"
          ariaLabel="Account details"
        >
          <p className="text-sm sm:text-base text-gray-600 mb-3">
            <strong className="font-semibold text-gray-800">Email:</strong>
            {user.email}
          </p>
          <p className="text-sm sm:text-base text-gray-600">
            <strong className="font-semibold text-gray-800">User ID:</strong>
            {user.uid}
          </p>
        </Card>
      </div>
    </Card>
  );
};

export default React.memo(MyAccount);
