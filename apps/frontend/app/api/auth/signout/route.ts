import { clearSession } from "@/lib/session";

export async function GET() {
    await clearSession()
}

