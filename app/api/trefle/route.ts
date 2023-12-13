import { NextResponse } from "next/server";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const searchTerm = searchParams.get("search");
  try {
    const response = await fetch(
      `http://trefle.io/api/v1/plants/search?token=${process.env.API_KEY_TREFLE}&q=${searchTerm}`
    );
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "SSL certificate has expired" },
      { status: 500 }
    );
    // Handle other errors as needed
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
