"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import SocialLogin from "./social-login";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [error, setError] = useState<string>("");
  const router = useRouter();
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    // Basic validation checks
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (typeof email === "string" && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Invalid email format.");
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        router.push("/");
      } else if (response.status === 400) {
        setError("User already exists.");
      } else {
        setError("Registration failed. Try again.");
      }
    } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
          setError("An unexpected error occurred.");
        }
  }
}
  return (
    <div className="flex justify-center items-center mt-16">
      <Card className="bg-white p-6 max-w-md w-full shadow-lg rounded-lg">
      <div className="text-xl text-red-600 text-center mb-4">{error}</div>
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Register
      </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-6"
        >
          <div className="w-full">
            <label htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <Input
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-full">
            <label htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <Input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="w-full">
            <label htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <Input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full py-2 text-lg font-semibold bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Register
          </Button>
        </form>

       
      <div className="mt-4 text-center ">
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/" className="text-blue-600 underline ml-2">
          Login
        </Link>
      </p>
      </div>
      
      </Card>
    </div>
  );
}
