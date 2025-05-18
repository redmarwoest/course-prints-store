import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const client = await clientPromise;
    const db = client.db("golf-courses");
    const collection = db.collection("golf-courses");

    // Unwind the clubs array to access individual clubs
    const pipeline = [
      { $unwind: "$clubs" },
      {
        $match: search
          ? { "clubs.clubName": { $regex: search, $options: "i" } }
          : {},
      },
      {
        $project: {
          clubID: "$clubs.clubID",
          clubName: "$clubs.clubName",
          _id: 0,
        },
      },
      { $limit: 10 },
    ];

    const clubs = await collection.aggregate(pipeline).toArray();
    return NextResponse.json({ clubs });
  } catch (error: unknown) {
    console.error("Query error:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
