
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-(--border) bg-(--surface)">

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <Link href="/" className="text-2xl font-bold text-[#a37803]">
            kin<span className="text-[#466060]">.</span>
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-(--muted)">
            Discover local events, connect with your community,
            and make a difference together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-4 font-semibold text-(--foreground)">
            Quick Links
          </h3>

          <ul className="space-y-3 text-sm text-(--muted)">
            <li><Link href="/" className="hover:text-(--primary)">Home</Link></li>
            <li><Link href="/events" className="hover:text-(--primary)">Events</Link></li>
            <li><Link href="/about" className="hover:text-(--primary)">About Us</Link></li>
          </ul>
        </div>

        {/* Get Involved */}
        <div>
          <h3 className="mb-4 font-semibold text-(--foreground)">
            Get Involved
          </h3>

          <ul className="space-y-3 text-sm text-(--muted)">
            <li><Link href="/events" className="hover:text-(--primary)">Explore Events</Link></li>
            <li><Link href="/dashboard/create-event" className="hover:text-(--primary)">Create an Event</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="mb-4 font-semibold text-(--foreground)">
            Follow Us
          </h3>

          <div className="flex gap-4">
  <a href="#" aria-label="Facebook">
    <FaFacebookF size={20} />
  </a>
  <a href="#" aria-label="Twitter">
    <FaXTwitter size={20} />
  </a>

  <a href="#" aria-label="Instagram">
    <FaInstagram size={20} />
  </a>

  <a href="#" aria-label="LinkedIn">
    <FaLinkedinIn size={20} />
  </a>
</div>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-(--border) px-6 py-5 text-center text-sm text-(--muted)">
        © {new Date().getFullYear()} KIN. All rights reserved.
      </div>

    </footer>
  );
}
