import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

function App() {
  return (
    <div className="bg-[#0f172a] text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 backdrop-blur-md bg-white/5 border-b border-white/10">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          BlogSphere
        </h1>

        <div className="flex items-center gap-6">
          <a
            href="#features"
            className="hidden md:block text-gray-300 hover:text-white"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="hidden md:block text-gray-300 hover:text-white"
          >
            Pricing
          </a>

          <SignInButton mode="modal">
            <button>Login</button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button>Register</button>
          </SignUpButton>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-28 px-6 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
        <h2 className="text-6xl font-extrabold leading-tight">
          Build Your{" "}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Audience
          </span>{" "}
          <br />
          With Premium Blogging
        </h2>

        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
          A modern SaaS blogging platform built for creators who want speed,
          security, and powerful analytics.
        </p>

        <div className="mt-10 flex justify-center gap-6">
          <SignedOut>
            <SignUpButton mode="modal">
              <button className="bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-4 rounded-2xl text-lg font-semibold hover:scale-105 transition">
                Start Free Trial
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <button className="bg-white text-black px-8 py-4 rounded-2xl text-lg font-semibold">
              Go to Dashboard
            </button>
          </SignedIn>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-8">
        <h3 className="text-4xl font-bold text-center mb-16">
          Why Choose BlogSphere?
        </h3>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            "Blazing Fast Performance",
            "Secure Clerk Authentication",
            "Advanced Analytics Dashboard",
          ].map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-purple-500 transition"
            >
              <h4 className="text-xl font-semibold mb-4">{feature}</h4>
              <p className="text-gray-400">
                Built with modern MERN stack for scalable and secure blogging.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-[#1e293b] text-center">
        <h3 className="text-4xl font-bold mb-16">Simple Pricing</h3>

        <div className="max-w-md mx-auto p-10 bg-white/5 rounded-3xl border border-white/10">
          <h4 className="text-2xl font-bold mb-4">Pro Plan</h4>
          <p className="text-5xl font-extrabold mb-6">
            $9<span className="text-lg">/month</span>
          </p>
          <ul className="space-y-3 text-gray-300 mb-8">
            <li>Unlimited Blogs</li>
            <li>Premium Analytics</li>
            <li>Priority Support</li>
          </ul>

          <SignedOut>
            <SignUpButton mode="modal">
              <button className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-3 rounded-xl font-semibold w-full">
                Start Now
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold w-full">
              Upgrade Plan
            </button>
          </SignedIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} BlogSphere. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
