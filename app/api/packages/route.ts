import { NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { uploadFileToS3 } from "@/lib/s3";
import { TravelPackage } from "@/lib/models/TravelPackage";
import { parseItinerary, parseList, slugifyPackageName } from "@/lib/package-form";

async function makeUniqueSlug(baseSlug: string) {
  let slug = baseSlug;
  let suffix = 2;

  while (await TravelPackage.findOne({ slug }).select({ _id: 1 }).lean()) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

export async function GET() {
  await connectToDatabase();

  const packages = await TravelPackage.find().sort({ createdAt: -1 }).lean();

  return Response.json({ success: true, data: packages });
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const category = String(formData.get("category") || "domestic") as
      | "domestic"
      | "international";
    const destination = String(formData.get("destination") || "").trim();
    const price = Number(formData.get("price") || 0);
    const durationDays = Number(formData.get("durationDays") || 1);
    const rating = Number(formData.get("rating") || 4.8);
    const reviews = Number(formData.get("reviews") || 0);
    const featured = String(formData.get("featured") || "false") === "true";
    const description = String(formData.get("description") || "").trim();
    const highlights = parseList(formData.get("highlights"));
    const inclusions = parseList(formData.get("inclusions"));
    const exclusions = parseList(formData.get("exclusions"));
    const itinerary = parseItinerary(formData.get("itinerary"));

    const coverImageValue = formData.get("coverImage");
    if (!(coverImageValue instanceof File) || coverImageValue.size === 0) {
      return Response.json({ success: false, message: "Cover image is required." }, { status: 400 });
    }

    if (!name || !destination || !description || !price || !durationDays) {
      return Response.json(
        { success: false, message: "Please fill all required package fields." },
        { status: 400 }
      );
    }

    const galleryFiles = formData
      .getAll("galleryFiles")
      .filter((item): item is File => item instanceof File && item.size > 0);

    const baseSlug = slugifyPackageName(name);
    const slug = await makeUniqueSlug(baseSlug);

    const [coverImage, gallery] = await Promise.all([
      uploadFileToS3(coverImageValue, "packages/cover-images"),
      Promise.all(galleryFiles.map((file) => uploadFileToS3(file, "packages/gallery"))),
    ]);

    const createdPackage = await TravelPackage.create({
      name,
      slug,
      category,
      destination,
      coverImage,
      price,
      durationDays,
      rating,
      reviews,
      featured,
      description,
      highlights,
      gallery,
      itinerary,
      inclusions,
      exclusions,
    });

    return Response.json({ success: true, data: createdPackage }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to create package.";
    return Response.json({ success: false, message }, { status: 500 });
  }
}
