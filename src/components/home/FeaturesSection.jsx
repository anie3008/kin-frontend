
import {
  MapPin,
  Users,
  CalendarPlus,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: MapPin,
    title: "Discover Local Events",
    description:
      "Find meaningful community activities and opportunities happening around you.",
  },
  {
    icon: Users,
    title: "Connect with People",
    description:
      "Meet like-minded people who share your passion for helping others.",
  },
  {
    icon: CalendarPlus,
    title: "Create Events",
    description:
      "Turn your ideas into action by organizing events for your community.",
  },
  {
    icon: HeartHandshake,
    title: "Make an Impact",
    description:
      "Join local initiatives and contribute to positive changes in society.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-(--background) px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-(--primary)">
            Why KIN?
          </span>

          <h2 className="mt-3 text-3xl font-bold text-(--foreground) md:text-4xl">
            Small actions, meaningful connections
          </h2>

          <p className="mt-4 leading-7 text-(--muted)">
            KIN makes it easier for people to come together,
            support their communities, and create lasting impact.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-(--border) bg-(--surface) p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-(--background) text-(--primary)">
                  <Icon size={25} />
                </div>

                <h3 className="mb-3 text-lg font-semibold text-(--foreground)">
                  {feature.title}
                </h3>

                <p className="text-sm leading-6 text-(--muted)">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
