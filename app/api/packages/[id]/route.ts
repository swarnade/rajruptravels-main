import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { TravelPackage } from "@/lib/models/TravelPackage";

type Params = { id: string };

export async function GET(_request: NextRequest, context: { params: Promise<Params> }) {
  await connectToDatabase();
  const { id } = await context.params;

  const travelPackage = await TravelPackage.findById(id).lean();

  if (!travelPackage) {
    return Response.json({ success: false, message: "Package not found." }, { status: 404 });
  }

  return Response.json({ success: true, data: travelPackage });
}

export async function DELETE(_request: NextRequest, context: { params: Promise<Params> }) {
  await connectToDatabase();
  const { id } = await context.params;

  const deleted = await TravelPackage.findByIdAndDelete(id).lean();

  if (!deleted) {
    return Response.json({ success: false, message: "Package not found." }, { status: 404 });
  }

  return Response.json({ success: true, message: "Package deleted." });
}
