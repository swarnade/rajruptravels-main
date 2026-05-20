export type ItineraryDraft = {
  day: number;
  title: string;
  description: string;
};

export type PackageDraft = {
  name: string;
  category: "domestic" | "international";
  destination: string;
  price: number;
  durationDays: number;
  rating: number;
  reviews: number;
  featured: boolean;
  description: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDraft[];
};

export function slugifyPackageName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function parseList(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") {
    return [] as string[];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.map((item) => String(item).trim()).filter(Boolean)
      : [];
  } catch {
    return [] as string[];
  }
}

export function parseItinerary(value: FormDataEntryValue | null) {
  if (!value || typeof value !== "string") {
    return [] as ItineraryDraft[];
  }

  try {
    const parsed = JSON.parse(value) as Array<Partial<ItineraryDraft>>;
    return Array.isArray(parsed)
      ? parsed
          .map((item, index) => ({
            day: Number(item.day || index + 1),
            title: String(item.title || "").trim(),
            description: String(item.description || "").trim(),
          }))
          .filter((item) => item.day > 0 && item.title && item.description)
      : [];
  } catch {
    return [] as ItineraryDraft[];
  }
}
