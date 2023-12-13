import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("search");
  const res = await fetch(
    `https://perenual.com/api/species-list?key=${process.env.API_KEY_PERENUAL}&q=${searchTerm}`
  );
  const data = await res.json();
  return NextResponse.json({ data });
}
