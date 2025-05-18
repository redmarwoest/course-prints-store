import { NextResponse } from "next/server";
import clientPromise from "../../../lib/db";

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clubID = searchParams.get("clubID");

    const client = await clientPromise;
    const db = client.db("golf-courses");
    const collection = db.collection("golf-courses");

    const pipeline = [
      { $unwind: "$clubs" },
      {
        $match: {
          "clubs.clubID": clubID,
        },
      },
      {
        $project: {
          _id: 0,
          clubID: "$clubs.clubID",
          clubName: "$clubs.clubName",
          city: "$clubs.city",
          state: "$clubs.state",
          country: "$clubs.country",
          address: "$clubs.address",
          courses: "$clubs.courses",
          timestampUpdated: "$clubs.timestampUpdated",
          distance: "$clubs.distance",
          measureUnit: "$clubs.measureUnit",
          latitude: "$clubs.latitude",
          longitude: "$clubs.longitude",
        },
      },
    ];

    const items = await collection.aggregate(pipeline).toArray();

    return NextResponse.json({ items });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
