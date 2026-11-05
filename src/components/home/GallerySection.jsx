
import Image from "next/image";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800",
    alt: "People working together to protect the environment",
    title: "Protecting Nature",
  },
  {
    src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
    alt: "Volunteers helping with food donations",
    title: "Sharing Food",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    alt: "Community members participating in an outdoor activity",
    title: "Community Action",
  },
  {
    src: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
    alt: "Children participating in a learning activity",
    title: "Supporting Education",
  },
  {
    src: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800",
    alt: "Volunteers working together",
    title: "Working Together",
  },
  {
    src: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
    alt: "People participating in a community initiative",
    title: "Making a Difference",
  },
];

export default function GallerySection() {
  return (
    <section className="bg-(--surface) px-6 py-20">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-(--primary)">
            Our Community
          </span>

          <h2 className="mt-3 text-3xl font-bold text-(--foreground) md:text-4xl">
            Together, we make a difference
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-(--muted)">
            Every small act of kindness creates a ripple of positive
            change. Here are some ways communities can make an impact.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryImages.map((image) => (
            <div
              key={image.title}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-4">
                <h3 className="font-semibold text-white">
                  {image.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
