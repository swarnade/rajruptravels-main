import Link from "next/link";
import { connectToDatabase } from "@/lib/mongodb";
import { TravelPackage, type TravelPackageType } from "@/lib/models/TravelPackage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function PackagesPage() {
  await connectToDatabase();
  const packages = (await TravelPackage.find().sort({ createdAt: -1 }).lean()) as TravelPackageType[];

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">
            Packages
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-2">
              <h1 className="text-3xl font-bold sm:text-4xl">Travel packages from MongoDB</h1>
              <p className="text-sm text-slate-300 sm:text-base">
                This route reads packages from the database and links into the public detail page.
              </p>
            </div>
            <Link
              href="/admin/packages"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.01]"
            >
              Add a package
            </Link>
          </div>
        </header>

        {packages.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-300">
            No packages found yet. Create the first one from the admin page.
          </div>
        ) : (
          <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {packages.map((travelPackage) => (
              <article
                key={travelPackage.slug}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl shadow-black/20"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={travelPackage.coverImage}
                    alt={travelPackage.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                  {travelPackage.featured ? (
                    <span className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold text-slate-950">
                      Featured
                    </span>
                  ) : null}
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        {travelPackage.category}
                      </p>
                      <h2 className="mt-1 text-xl font-semibold text-white">{travelPackage.name}</h2>
                    </div>
                    <p className="rounded-2xl bg-amber-400/10 px-3 py-2 text-sm font-semibold text-amber-300">
                      ₹{travelPackage.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <p className="line-clamp-3 text-sm leading-6 text-slate-300">
                    {travelPackage.description}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs text-slate-200">
                    <Badge>{travelPackage.durationDays} Days</Badge>
                    <Badge>{travelPackage.highlights.length} Highlights</Badge>
                    <Badge>{travelPackage.itinerary.length} Itinerary Days</Badge>
                    <Badge>⭐ {travelPackage.rating}</Badge>
                  </div>

                  <Link
                    href={`/packages/${travelPackage.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-amber-300 transition hover:text-amber-200"
                  >
                    View details →
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{children}</span>;
}
