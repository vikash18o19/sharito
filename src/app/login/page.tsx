import Link from "next/link";
import "@/app/login/styles.css";
import LoginCard from "./components/LoginCard";
import Image from "next/image";
import logo from "./assets/logo.png";

("@/app/login/components/LoginCard");
export default function LoginPage() {
  return (
    <div className="h-screen flex gap-5 justify-center items-center main">
      <Image src={logo} width={500} height={500} alt="Logo"></Image>
      <LoginCard />
    </div>
  );
}

//  --->   /login/change-password
