
import { Mail } from "lucide-react";

export default function NewsletterSection() {
  return (
    <section className="bg-(--background) px-6 py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-(--primary) px-6 py-14 text-center md:px-12">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-(--secondary)">
          <Mail size={28} />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-white md:text-4xl">
          Stay connected. Stay inspired.
        </h2>

        <p className="mx-auto mt-4 max-w-xl leading-7 text-white/75">
          Get updates about upcoming community events,
          inspiring stories, and opportunities to make
          a difference.
        </p>

        {/* Newsletter form - UI only */}
        <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email address"
            aria-label="Email address"
            className="min-w-0 flex-1 rounded-lg border border-white/20 bg-white px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-500 focus:ring-2 focus:ring-(--secondary)"
          />

          <button
            type="button"
            className="rounded-lg bg-(--secondary) px-6 py-3 text-sm font-semibold text-(--primary) transition hover:opacity-90"
          >
            Subscribe
          </button>
        </div>

        <p className="mt-4 text-xs text-white/50">
          Stay informed about the good happening around you.
        </p>

      </div>
    </section>
  );
}
