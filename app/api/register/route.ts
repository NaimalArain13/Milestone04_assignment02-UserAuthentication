import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { dbConnect } from "@/lib/mongo";
import User from "@/model/user-model";
import { UserData } from "@/types/userType";
import createUser from "@/app/queries/users";

export const POST = async (request: NextRequest) => {
  try {
    const { name, email, password }: UserData = await request.json();
    console.log(name, email, password);

    // Create DB connection
    await dbConnect();
    console.log("Database connected");

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Form new user payload
    const newUser: UserData = {
      email,
      name,
      password: hashedPassword,
    };

    // Save the user to the database
    await createUser(newUser);

    // Return success response
    return NextResponse.json(
      { message: "User has been created" },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message); // Log the error to the console
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Unknown error occurred" },
      { status: 500 }
    );
  }
};
