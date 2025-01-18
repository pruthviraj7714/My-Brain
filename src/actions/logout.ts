import { signOut } from "@/lib/auth"


export const logOut = async () => {
    await signOut({redirectTo : '/'})
}