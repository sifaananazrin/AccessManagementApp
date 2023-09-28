import { connect } from "@/dbConfig/dbConfig";

var mongoose = require("mongoose");
var Users = mongoose.model("User");
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (NextRequest) => {
  await connect();

  const reqBody = await NextRequest.json();
  const { email, password } = reqBody;

  try {
    // Check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    // Check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    // Create token data
    const tokenData = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    // Create token
    const token = jwt.sign(tokenData, "MyKEY", { expiresIn: "1d" });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
