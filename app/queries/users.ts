import User from "@/model/user-model";
import { UserData } from "@/types/userType";

export default async function createUser(user: UserData) {
  try {
    await User.create(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
  }
}
