"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

//Login form
export default function LoginForm() {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  async function handleCredential(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const formData = new FormData(event.currentTarget);
      if (!formData.get("email") || !formData.get("password")) {
        setError("Email and password are required");
        return;
      }
      const response = await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: false,  // Prevent automatic redirects
    });
      setIsLoading(false);
      if (!response) return null;
      if (response.error) {
        setError(response.error);
      } else {
        router.push("/dashboard");
      }
    } catch (e) {
      setIsLoading(false);
      setError("Check your Credentials");
    }
  }
  return (
    <div className="flex justify-center items-center mt-16">
    <Card className="bg-white p-6 max-w-md w-full shadow-lg rounded-lg">
      <div className="text-xl text-center text-red-600 mb-4">{error}</div>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h1>
      <form
        onSubmit={handleCredential}
        className="flex flex-col items-center space-y-6"
      >
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email:
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            aria-invalid
            className="w-full px-4 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password:
          </label>
          <Input
            type="password"
            name="password"
            id="password"
            aria-invalid
            className="w-full px-4 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
          />
        </div>
  
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          {isLoading ? "Logging In..." : "Login"}
        </Button>
      </form>
  
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Don&#39;t have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline ml-2">
            Register
          </Link>
        </p>
      </div>
    </Card>
    </div>
  
  
  );
}
