import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/security/admin-auth";
import { listStoredContacts, deleteStoredContact } from "@/lib/storage/user-submissions";
import { apiError } from "@/lib/api-error";

export const runtime = "nodejs";

const errorDiag = () => ({ vercel: process.env.VERCEL === "1", nodeEnv: process.env.NODE_ENV });

export async function GET(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const contacts = await listStoredContacts();
    return NextResponse.json({ contacts });
  } catch (error) {
    return apiError(error, { route: "admin/contacts", shape: "error", extra: errorDiag() });
  }
}

export async function DELETE(request: Request) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const id = new URL(request.url).searchParams.get("id")?.trim();
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    await deleteStoredContact(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return apiError(error, { route: "admin/contacts", shape: "error", extra: errorDiag() });
  }
}
