import React from "react";
import { useAuth } from "../hooks/useAuth";
import SectionHeading from "../components/basic/SectionHeading";
import Card from "../components/basic/Card";

const MyAccount: React.FC = () => {
  const { user } = useAuth();

  if (!user)
    return (
      <div className="text-center text-gray-600 pt-20">
        Please log in to view your account.
      </div>
    );

  return (
    <Card className="h-full w-full bg-white pt-20 pb-6 flex flex-col items-center justify-center">
      <div className="container mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
          My Account
        </SectionHeading>
        <Card
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6"
          ariaLabel="Account details"
        >
          <p className="text-sm sm:text-base text-gray-600 mb-3 break-words">
            <span className="font-semibold text-gray-800">Email: </span>
            {user.email}
          </p>
          <p className="text-sm sm:text-base text-gray-600 break-words">
            <span className="font-semibold text-gray-800">User ID: </span>
            {user.uid}
          </p>
        </Card>
      </div>
    </Card>
  );
};

export default React.memo(MyAccount);
