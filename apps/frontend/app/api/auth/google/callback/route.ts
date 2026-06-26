import { BACKEND_URL } from "@/lib/constants";
import { createSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function GET(res:NextResponse){
    const {searchParams} = new URL(res.url)

    const accessToken = searchParams.get("accessToken");
    const userId = searchParams.get("userId");
    const name = searchParams.get("name");
    const avatar = searchParams.get("avatar");

    if(!accessToken || !userId || !name || !avatar){
        throw new Error("Google authentication failed");
    }

    const tokenRes = await fetch(`${BACKEND_URL}/auth/verify-token`,{
        headers: {
            authorization : `Bearer ${accessToken}`
        }
    })

    if (tokenRes.status === 401) throw new Error("Google authentication failed");
    console.log('accessTokenaccessToken',accessToken);
    
    await createSession({
        user : {
            id : Number(userId),
            name : name,
            avatar : avatar
        },
        accessToken : accessToken
    })

    redirect("/");

}