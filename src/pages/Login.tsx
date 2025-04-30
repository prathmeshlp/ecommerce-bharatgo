import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Input from "../components/basic/Input";
import SectionHeading from "../components/basic/SectionHeading";
import Card from "../components/basic/Card";
import Button from "../components/basic/Button";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      toast.success("Login successfull!");
      navigate("/home");
    } catch (error: unknown) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        toast.error(
          error.message || "Login failed. Please check your credentials."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card className="bg-white pt-20 pb-6 flex flex-col items-center w-full h-full">
      <div className="container mx-auto max-w-md px-4 sm:px-6 lg:px-8">
        <SectionHeading className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </SectionHeading>
        <Card className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <form onSubmit={handleSubmit} aria-label="Login form">
            {error && (
              <p className="text-red-500 text-sm mb-4 text-center" role="alert">
                {error}
              </p>
            )}
            <div className="mb-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                ariaLabel="Email address"
                required
              />
            </div>
            <div className="mb-6">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                ariaLabel="Password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
              ariaLabel="Submit login"
            >
              Login
            </Button>
          </form>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-600 transition-colors"
            >
              Register
            </Link>
          </p>
        </Card>
      </div>
    </Card>
  );
};

export default React.memo(Login);
