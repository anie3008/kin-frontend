
import Image from "next/image";
import Link from "next/link";
import Hero from "@/assets/Hero.jpg"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-(--primary) text-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">

        {/* Hero content */}
        <div>
          <span className="mb-5 inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-(--secondary)">
            Together, we make a difference
          </span>

          <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Small acts.
            <span className="block text-(--secondary)">
              Lasting impact.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-white/75 md:text-lg">
            Discover local community events, connect with
            people who care, and turn small actions into
            meaningful change.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/events"
              className="rounded-lg bg-(--secondary) px-6 py-3 font-semibold text-(--primary) transition hover:opacity-90"
            >
              Explore Events
            </Link>

            <Link
              href="/register"
              className="rounded-lg border border-white/40 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Get Involved
            </Link>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative">
  <Image
    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
    alt="Team members stacking hands to show collaboration and community support"
    width={1000}
    height={700}
    priority
    className="h-320px w-full rounded-2xl object-cover md:h-440px"
  />
</div>

      </div>
    </section>
  );
}
