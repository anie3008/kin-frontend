
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";


const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    image: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, image } = formData;

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
    return alert("Password must contain at least one uppercase letter");
  }

  if (!/[0-9]/.test(password)) {
    return alert("Password must contain at least one number");
  }
    try {
      setLoading(true);

      const { error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
        image,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Registration failed.");
        return;
      }
toast.success("Account created successfully! Welcome to Kin 🎉");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error("Registration error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubSignUp = async () => {
  await authClient.signIn.social({
    provider: "github",
    callbackURL: "/",
  });
};

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl bg-white shadow-lg md:grid-cols-2">

        {/* Left Side */}
        <div className="flex flex-col justify-center bg-[#466060] p-8 text-white md:p-12">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-[#e5c46b]">
            Welcome to Kin
          </p>

          <h1 className="text-3xl font-bold leading-tight md:text-4xl">
            Small actions.
            <br />
            Meaningful changes.
          </h1>

          <p className="mt-5 leading-7 text-gray-200">
            Join a community of people who believe that
            together, we can make our neighborhoods better.
          </p>

          <div className="mt-10 space-y-4 text-sm text-gray-100">
            <p>✓ Discover local community events</p>
            <p>✓ Participate in meaningful activities</p>
            <p>✓ Make a positive difference</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-[#263b3b]">
            Create an account
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Start your community journey with Kin.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                autoComplete="name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#466060] focus:ring-2 focus:ring-[#466060]/20"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#466060] focus:ring-2 focus:ring-[#466060]/20"
              />
            </div>

            <div>
  <label
    htmlFor="image"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Profile Image URL
    <span className="ml-1 text-gray-400">(Optional)</span>
  </label>

  <input
    id="image"
    name="image"
    type="url"
    value={formData.image}
    onChange={handleChange}
    placeholder="https://example.com/your-image.jpg"
    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#466060] focus:ring-2 focus:ring-[#466060]/20"
  />
</div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                required
                minLength={8}
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-[#466060] focus:ring-2 focus:ring-[#466060]/20"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#466060] px-4 py-3 font-semibold text-white transition hover:bg-[#354c4c] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

<div className="relative my-6">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-gray-200" />
  </div>
  <div className="relative flex justify-center text-sm">
    <span className="bg-white px-3 text-gray-500">
      Or continue with
    </span>
  </div>
</div>

<button
  type="button"
  onClick={handleGitHubSignUp}
  className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 px-4 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
>
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 1.98 3.25 1.51.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.27-2.6 5.21-5.08 5.49.4.34.75 1.02.75 2.06v3.05c0 .3.2.65.76.54A11.1 11.1 0 0 0 12 .9Z" />
  </svg>
  Continue with GitHub
</button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#a37803] hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
