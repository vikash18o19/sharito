import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/controllers/DbConnect";
import bcryptjs from "bcryptjs";
import User from "@/models/Users";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const name = reqBody.name;
    const email = reqBody.email;
    const password = reqBody.password;

    const user = User.find({ email: email });

    if (user) {
      return NextResponse.json(
        { message: `user already exists with email ${email}`, status: 400 },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json(
      { message: `signup successfull for ${name}`, status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 400 });
  }
}

// export async function POST(request: NextRequest){
//   try {

//     const reqBody = await request.formData();
//     const name = reqBody.get("name");
//     const email = reqBody.get("email");
//     const password = reqBody.get("password");
//     return NextResponse.json({ message: name + " "  + email + " " + password },{status:200});
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error: error },{status:400});
//   }

// }
