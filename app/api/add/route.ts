import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const first = parseFloat(searchParams.get("first") || "0");
  const second = parseFloat(searchParams.get("second") || "0");
  const sum = first + second;

  return NextResponse.json({ sum });
}
