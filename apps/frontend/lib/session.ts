import { jwtVerify, SignJWT } from "jose"
import { redirect } from "next/navigation";
import { cookies } from "next/headers"

export type userType ={
    name? : string,
    email : string,
    avatar? : string    
}

export type Session ={
    user : userType,
    accessToken : string
}


const secretKey = process.env.NEXT_PUBLIC_JWT_SECRET_KEY!
const encodedKey = new TextEncoder().encode(secretKey);

export async function signToken(payload: Session) {
 const session = await new SignJWT(payload)
  .setProtectedHeader({ alg: "HS256" }).setIssuedAt()
  .setExpirationTime("7d")
  .sign(encodedKey);

const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days in milliseconds

(await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
})
  
}


export async function getSession() {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(cookie, encodedKey,{
            algorithms: ["HS256"],
        });
        return payload as Session;
    } catch (error) {
        console.error("Invalid token:", error);
        redirect("/auth/signin");
        return null;
    }
}

export async function clearSession() {
   await (await cookies()).delete("session" );
}