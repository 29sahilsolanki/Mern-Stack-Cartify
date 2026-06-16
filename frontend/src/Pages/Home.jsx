import { Link, useNavigate } from "react-router-dom";
import {
  FaLaptop,
  FaCouch,
  FaGem,
  FaTshirt,
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaAward,
  FaArrowRight,
} from "react-icons/fa";
import { useLogin } from "../Context/LoginContext";

export default function Home() {
  const { token } = useLogin();
  const navigate = useNavigate();

  const targetShopUrl = token ? "/customer-dashboard/shop" : "/shop";

  return (
    <div className="bg-slate-50 text-gray-900 font-sans antialiased selection:bg-indigo-600 selection:text-white mt-5">
      {/* 1. HERO SECTION (ULTRA MODERN & IMMERSIVE) */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950 text-white ">
        {/* Soft Premium Light Blobs */}
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-150 h-150 bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Subtle Background Grid Line Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 text-center space-y-10">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-indigo-500/20 text-indigo-300">
            ⚡ Premium Collection 2026
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight max-w-5xl mx-auto leading-[0.95] text-transparent bg-clip-text bg-linear-to-b from-white via-neutral-200 to-neutral-400">
            Elevating Everyday Essentials.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            A meticulously curated ecosystem of high-end electronics, bespoke
            fashion, luxury furniture, and fine jewellery.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              to={targetShopUrl}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 hover:shadow-indigo-600/30 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-3 group"
            >
              Explore Collection
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to={targetShopUrl}
              className="w-full sm:w-auto bg-neutral-900/80 hover:bg-neutral-900 text-neutral-300 border border-neutral-800 px-10 py-5 rounded-2xl font-bold backdrop-blur-md transition-all active:scale-95 text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRENDING CATEGORIES (MODERN BENTO-GRID LAYOUT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              The Portfolio
            </span>
            <h2 className="text-4xl font-black tracking-tight text-zinc-900 sm:text-5xl">
              Shop by Category
            </h2>
          </div>
          <Link
            to={targetShopUrl}
            className="inline-flex items-center gap-2 font-bold text-sm text-indigo-600 hover:text-indigo-700 group"
          >
            See All Containers{" "}
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid Construction */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 h-auto md:h-162">
          {/* Electronics Card (Large Wide) */}
          <div
            onClick={() => navigate(targetShopUrl)}
            className="md:col-span-4 group relative rounded-3xl overflow-hidden cursor-pointer border border-neutral-200/50 shadow-sm bg-zinc-900"
          >
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop"
              alt="Electronics"
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white z-10">
              <div className="p-3 bg-white/10 backdrop-blur-md w-fit rounded-xl mb-4 text-xl">
                <FaLaptop />
              </div>
              <h3 className="text-2xl font-bold">Electronics</h3>
              <p className="text-sm text-neutral-300 font-light mt-1">
                1,200+ Architectural Pieces
              </p>
            </div>
          </div>

          {/* Jewellery Card (Vertical Tall) */}
          <div
            onClick={() => navigate(targetShopUrl)}
            className="md:col-span-2 group relative rounded-3xl overflow-hidden cursor-pointer border border-neutral-200/50 shadow-sm bg-zinc-900"
          >
            <img
              src="https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop"
              alt="Jewellery"
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white z-10">
              <div className="p-3 bg-white/10 backdrop-blur-md w-fit rounded-xl mb-4 text-xl">
                <FaGem />
              </div>
              <h3 className="text-2xl font-bold">Jewellery</h3>
              <p className="text-sm text-neutral-300 font-light mt-1">
                430+ Luxury Curations
              </p>
            </div>
          </div>

          {/* Furniture Card (Vertical Tall) */}
          <div
            onClick={() => navigate(targetShopUrl)}
            className="md:col-span-2 group relative rounded-3xl overflow-hidden cursor-pointer border border-neutral-200/50 shadow-sm bg-zinc-900"
          >
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop"
              alt="Furniture"
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white z-10">
              <div className="p-3 bg-white/10 backdrop-blur-md w-fit rounded-xl mb-4 text-xl">
                <FaCouch />
              </div>
              <h3 className="text-2xl font-bold">Furniture</h3>
              <p className="text-sm text-neutral-300 font-light mt-1">
                850+ Premium Fits
              </p>
            </div>
          </div>

          {/* Fashion Card (Large Wide) */}
          <div
            onClick={() => navigate(targetShopUrl)}
            className="md:col-span-4 group relative rounded-3xl overflow-hidden cursor-pointer border border-neutral-200/50 shadow-sm bg-zinc-900"
          >
            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop"
              alt="Fashion"
              className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 text-white z-10">
              <div className="p-3 bg-white/10 backdrop-blur-md w-fit rounded-xl mb-4 text-xl">
                <FaTshirt />
              </div>
              <h3 className="text-2xl font-bold">Fashion</h3>
              <p className="text-sm text-neutral-300 font-light mt-1">
                2,400+ Avant-Garde Looks
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PREMIUM METRICS / COUNTERS FLOOR */}
      <section className="bg-white border-y border-gray-200 py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center divide-x-0 sm:divide-x sm:divide-gray-100">
            {[
              ["50K+", "Happy Customers"],
              ["10K+", "Premium Products"],
              ["500+", "Global Brands"],
              ["4.8★", "Average Rating"],
            ].map(([num, label]) => (
              <div key={label} className="space-y-1 px-4">
                <h3 className="text-5xl font-black tracking-tight text-gray-900">
                  {num}
                </h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (CLEAN FLOATING CARD ARCHITECTURE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            The Standards
          </span>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">
            Built for Elite Commerce
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            [
              <FaShippingFast />,
              "Priority Shipping",
              "White-glove worldwide shipping completely integrated at zero added cost.",
            ],
            [
              <FaShieldAlt />,
              "Secure Checkout",
              "End-to-end encrypted financial protocols ensuring complete transaction protection.",
            ],
            [
              <FaHeadset />,
              "Concierge Desk",
              "Direct live channel to elite corporate customer service professionals 24/7.",
            ],
            [
              <FaAward />,
              "Certified Quality",
              "Every catalog node passes rigorous individual physical quality assessments.",
            ],
          ].map(([icon, title, desc], i) => (
            <div
              key={i}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 group"
            >
              <div className="text-2xl text-indigo-600 w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {icon}
              </div>
              <h3 className="font-bold text-xl text-gray-900 mt-6 tracking-tight">
                {title}
              </h3>
              <p className="text-gray-500 text-sm mt-3 leading-relaxed font-light">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. MINIMALIST PROMOTIONAL CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-linear-to-br from-indigo-900 via-indigo-950 to-neutral-950 text-white p-12 sm:p-24 shadow-2xl">
          <div className="absolute top-0 right-0 w-100 h-100 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-block text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/10 px-3 py-1 rounded-full text-indigo-300">
              Limited Period Privilege
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
              The Midsummer Sale.
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
              Acquire unmatched seasonal catalog nodes with tier reductions
              touching up to{" "}
              <span className="text-white font-semibold underline decoration-indigo-500 decoration-2 underline-offset-4">
                50% OFF
              </span>
              .
            </p>

            <div className="pt-4">
              <button
                onClick={() => navigate(targetShopUrl)}
                className="bg-white text-zinc-950 hover:bg-neutral-100 px-8 py-4 rounded-2xl font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2 text-sm uppercase tracking-wider"
              >
                Access Deals <FaArrowRight className="text-xs" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BRAND LOGOS (HIGH-VISIBILITY CLEAN TILES) */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              The Network
            </span>
            <h3 className="text-xl font-bold text-gray-500 tracking-tight">
              Authorized Global Distributors
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {["Apple", "Samsung", "Nike", "Sony", "Adidas"].map((brand) => (
              <div
                key={brand}
                className="bg-slate-50/50 border border-gray-100 rounded-2xl py-8 px-4 text-center transition-all duration-300 group hover:bg-white hover:border-indigo-300 hover:shadow-md cursor-default select-none"
              >
                <span className="text-2xl font-black text-gray-400 group-hover:text-indigo-600 tracking-tighter transition-colors duration-300">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. HIGH-END TESTIMONIALS EDITOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            The Reviews
          </span>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">
            Trusted by Connoisseurs
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            [
              "Rahul M.",
              "Collector Node",
              "The precision grade architectural integrity of the furniture selection was stellar. Logistics flawlessly managed.",
            ],
            [
              "Priya S.",
              "Direct Consumer",
              "Incredible fulfillment speed on complex systems. Cartify has radically transformed my luxury acquisition frameworks.",
            ],
            [
              "Aman K.",
              "Premium Appraiser",
              "Transparent authentication tokens provided per item. Highly responsive concierge desks available instantly.",
            ],
          ].map(([name, role, quote]) => (
            <div
              key={name}
              className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col justify-between relative shadow-sm"
            >
              <div className="space-y-4">
                <div className="text-amber-400 tracking-wider text-xs">
                  ★★★★★
                </div>
                <p className="text-gray-600 text-sm leading-relaxed font-light">
                  "{quote}"
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 font-bold text-indigo-600 flex items-center justify-center text-sm">
                  {name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{name}</h4>
                  <span className="text-gray-400 text-xs font-medium">
                    {role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEWSLETTER CONSOLE (MINIMAL & SHARP) */}
      <section className="bg-linear-to-b from-transparent to-indigo-50/40 border-t border-gray-200/60 py-32">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8 space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Intel Streams
          </span>
          <h2 className="text-4xl font-black tracking-tight text-gray-900">
            Subscribe to Insights
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm font-light leading-relaxed">
            Acquire instant operational notifications on limited product drops
            and private seasonal clearout access tokens.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mt-8 max-w-md mx-auto bg-white p-2 rounded-2xl shadow-sm border border-gray-200">
            <input
              type="email"
              placeholder="Enter corporate email address"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none rounded-xl"
            />
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-6 py-4 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
