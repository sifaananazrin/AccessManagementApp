import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";

import bcrypt from "bcryptjs";
const saltRounds = 10;


export const POST = async (NextRequest) => {
  const reqBody = await NextRequest.json();

  const { name, email, password } = reqBody;
await connect();

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.error("Error while checking existing user:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }

  if (existingUser) {
    return NextResponse.json(
      { message: "User with this email already exists" },
      { status: 400 }
    );
  }
  try {
    const newUser = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, saltRounds),
    });
    await newUser.save();

    return NextResponse.json(
      {
        message: "Successfully Signed Up",
        email: newUser.email,
        uid: newUser._id,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error during user creation:", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
