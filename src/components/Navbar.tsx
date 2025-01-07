import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-6 bg-[#32343d] text-white">
      <div>Second Brain</div>
      <div>
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button variant={'destructive'}>Logout</Button>
        </form>
      </div>
    </div>
  );
}
