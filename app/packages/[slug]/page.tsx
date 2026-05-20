import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { TravelPackage, type TravelPackageType } from "@/lib/models/TravelPackage";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Params = { slug: string };

export default async function PackageDetailsPage({ params }: { params: Promise<Params> }) {
  await connectToDatabase();
  const { slug } = await params;

  const travelPackage = (await TravelPackage.findOne({ slug }).lean()) as TravelPackageType | null;

  if (!travelPackage) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/20">
          <div className="relative h-[420px]">
            <img
              src={travelPackage.coverImage}
              alt={travelPackage.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 space-y-3 p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                {travelPackage.category} package
              </p>
              <h1 className="text-3xl font-bold sm:text-5xl">{travelPackage.name}</h1>
              <p className="max-w-3xl text-sm leading-6 text-slate-200 sm:text-base">
                {travelPackage.destination} · {travelPackage.durationDays} Days · ⭐ {travelPackage.rating} · {travelPackage.reviews} reviews
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <Card title="Overview">
              <p className="text-sm leading-7 text-slate-300 sm:text-base">{travelPackage.description}</p>
            </Card>

            <Card title="Highlights">
              <div className="flex flex-wrap gap-3">
                {travelPackage.highlights.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100">
                    {item}
                  </span>
                ))}
              </div>
            </Card>

            <Card title="Itinerary">
              <div className="space-y-4">
                {travelPackage.itinerary.map((item) => (
                  <div key={item.day} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Day {item.day}</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card title="Quick facts">
              <dl className="space-y-4 text-sm">
                <Fact label="Price" value={`₹${travelPackage.price.toLocaleString("en-IN")}`} />
                <Fact label="Duration" value={`${travelPackage.durationDays} Days`} />
                <Fact label="Category" value={travelPackage.category} />
                <Fact label="Featured" value={travelPackage.featured ? "Yes" : "No"} />
              </dl>
            </Card>

            <Card title="Inclusions">
              <ul className="space-y-2 text-sm text-slate-300">
                {travelPackage.inclusions.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{item}</li>
                ))}
              </ul>
            </Card>

            <Card title="Exclusions">
              <ul className="space-y-2 text-sm text-slate-300">
                {travelPackage.exclusions.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">{item}</li>
                ))}
              </ul>
            </Card>
          </aside>
        </section>

        {travelPackage.gallery.length > 0 ? (
          <Card title="Gallery">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {travelPackage.gallery.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={travelPackage.name}
                  className="h-56 w-full rounded-2xl object-cover"
                />
              ))}
            </div>
          </Card>
        ) : null}
      </div>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/20">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
      <dt className="text-slate-400">{label}</dt>
      <dd className="font-semibold text-white">{value}</dd>
    </div>
  );
}
