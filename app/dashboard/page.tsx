import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignOut from "../components/logout";
import { authOptions } from "@/lib/auth";


export default async function HomePage() {
  const session = await getServerSession(authOptions); 
  
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center m-4">
      
      <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome, {session?.user?.email}
        </h1>
        <p className="text-gray-600 mb-6">
          You are successfully logged in. Enjoy your dashboard!
        </p>
      
      
      <SignOut />
    </div>
  );
}
