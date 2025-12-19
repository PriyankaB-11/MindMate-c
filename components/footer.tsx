import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-700 text-gray-300">
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Small About Section */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">About Us</h3>
          <p className="text-sm leading-relaxed">
            At MindMate, we believe everyone deserves to feel heard and
            supported. We make mental health care accessible, professional, and
            compassionate.
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">
            Subscribe to Our Newsletter
          </h3>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="Email *"
              className="px-4 py-2 rounded-md border border-gray-600 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="accent-primary" />
              Yes, subscribe me to your newsletter.
            </label>
            <button
              type="submit"
              className="mt-2 px-4 py-2 rounded-md bg-primary text-black font-medium hover:bg-primary/90 transition"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Quick Links (Right Column but Centered Content) */}
        <div className="flex flex-col items-center md:items-center">
          <h3 className="text-lg font-bold mb-4 text-white">For Individuals</h3>
          <ul className="text-sm space-y-1 text-center">
            <li>
              <Link href="#">Book Free Consultation</Link>
            </li>

            <li>
              <Link href="#">Blogs and Articles</Link>
            </li>
            <li>
              <Link href="#">Book Therapist</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-xs text-gray-400">
        &copy; {new Date().getFullYear()} MindMate. All rights reserved.
      </div>
    </footer>
  );
}
