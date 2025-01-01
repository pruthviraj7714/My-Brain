import Link from "next/link";
import { Button } from "./ui/button";
import { BrainCircuit } from 'lucide-react';

export default function AuthNavbar() {
  return (
    <div className="p-4 bg-[#4c1d95] flex items-center justify-between">
      <div>
        <Link href={"/"} className="flex items-center gap-1 text-white">
        <BrainCircuit className="size-8" />
        <span className="text-lg font-bold">Second Brain</span> 
        </Link>
      </div>
      <div className="flex items-center gap-1.5">
        <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] font-bold">
          <Link href={"/signup"}>Signup</Link>
        </Button>
        <Button  className="bg-[#8b5cf6] hover:bg-[#7c3aed] font-bold">
          <Link href={"/login"}>Login</Link>
        </Button>
      </div>
    </div>
  );
}
