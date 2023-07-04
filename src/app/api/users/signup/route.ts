import {NextRequest,NextResponse } from "next/server";


export async function POST(request: NextRequest){
  try {
    const reqBody = await request.json();
    const name = reqBody.name;
    const email = reqBody.email;
    const password = reqBody.password;
    return NextResponse.json({ message: `signup successfull for ${name}` , status: 200},{status:200});
  } catch (error) {    
    console.log(error);
    return NextResponse.json({ error: error },{status:400});
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


