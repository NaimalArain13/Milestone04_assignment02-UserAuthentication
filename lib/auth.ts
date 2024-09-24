import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/mongo";
import User from "@/model/user-model";
import { AuthOptions } from "next-auth";


export const authOptions:AuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
        name: "credentials",
        credentials: {
          email: { label: "email", type: "email", placeholder: "jsmith" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials){
            console.log("Credential recieved" ,credentials)
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Please provide both email and password");
          }
  
          const { email, password } = credentials;
  
          try {
            // Ensure database connection is established
            await dbConnect();
  
            const user = await User.findOne({ email }).exec();
            console.log("User Found ",user)
            if (!user) {
              throw new Error("User not found");
            }
  
            // Compare passwords
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("Password matched" , isMatch)
            if (!isMatch) {
              throw new Error("Incorrect email or password");
            }
  
            
            
            // Return user object for session
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
            };
                
          } catch (error) {
            console.log("Callback error:", error);
            throw new Error("Authentication failed");
          }
        },
      }),
  ],
  secret: process.env.AUTH_SECRET,
  pages:{
    signIn: "/",
    newUser:"/auth/register"
  }
};