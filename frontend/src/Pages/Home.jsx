import { Link, useNavigate } from "react-router-dom";
import { FaLaptop, FaCouch, FaGem, FaTshirt } from "react-icons/fa";
import { useLogin } from "../Context/LoginContext";

export default function Home() {
  const { token } = useLogin();
  const navigate = useNavigate();
  const categories = [
    {
      name: "Electronics",
      icon: <FaLaptop size={28} />,
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Furniture",
      icon: <FaCouch size={28} />,
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Jewellery",
      icon: <FaGem size={28} />,
      img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=1200&auto=format&fit=crop",
    },
    {
      name: "Fashion",
      icon: <FaTshirt size={28} />,
      img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <div className="text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] sm:h-[90vh] w-full">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1600&auto=format&fit=crop"
          alt="hero"
          loading="eager"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
          <p className="text-indigo-400 tracking-[3px] sm:tracking-[5px] uppercase mb-3 text-sm sm:text-base">
            Premium Shopping Experience
          </p>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
            Upgrade Your Lifestyle With
            <span className="text-indigo-400"> Cartify Store</span>
          </h1>

          <p className="text-gray-300 mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg">
            Explore the latest fashion, furniture, jewellery & electronics with
            premium quality and unbeatable prices.
          </p>

          <div className="flex gap-4 mt-6 sm:mt-8 flex-wrap justify-center">
            <Link
              to={token ? "/customer-dashboard/shop" : "/shop"}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-indigo-500/30 hover:scale-105 text-center"
            >
              Shop Now
            </Link>

            <Link
              to={token ? "/customer-dashboard/shop" : "/shop"}
              className="w-full sm:w-auto border border-gray-400 hover:border-indigo-400 hover:text-indigo-400 px-6 sm:px-8 py-3 rounded-xl transition-all duration-300"
            >
              Explore More
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="bg-slate-700 mt-8 sm:mt-10 mb-8 sm:mb-10 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-6 py-6 sm:py-8">
        {[
          "Free Shipping",
          "Secure Payment",
          "24/7 Support",
          "Best Quality",
        ].map((item, i) => (
          <div
            key={i}
            className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-center border border-slate-700 hover:border-indigo-500 transition-all duration-300"
          >
            <h3 className="font-semibold text-indigo-400 text-sm sm:text-base">
              {item}
            </h3>
          </div>
        ))}
      </section>

      {/* CATEGORIES */}
      <section className="px-4 sm:px-6 md:px-14 py-12 sm:py-16 bg-slate-700 rounded-xl relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 sm:mb-10 gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center sm:text-left">
            Shop By <span className="text-indigo-400">Category</span>
          </h2>

          <Link
            to={token ? "/customer-dashboard/shop" : "/shop"}
            className="text-indigo-400 hover:text-indigo-300 transition text-sm sm:text-base"
          >
            View All →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="group bg-slate-800 rounded-3xl overflow-hidden border border-slate-600 hover:border-indigo-500 transition-all duration-300 hover:-translate-y-2 will-change-transform"
            >
              <div className="overflow-hidden h-40 sm:h-52 bg-slate-900">
                <img
                  loading="eager"
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-4 sm:p-6">
                <div className="text-indigo-400 mb-3 sm:mb-4">{cat.icon}</div>
                <h3 className="text-xl sm:text-2xl font-semibold">
                  {cat.name}
                </h3>
                <p className="text-gray-400 mt-2 text-sm leading-6">
                  Discover premium {cat.name.toLowerCase()} with modern designs
                  and latest trends.
                </p>
                <button
                  onClick={() =>
                    token
                      ? navigate("/customer-dashboard/shop")
                      : navigate("/shop")
                  }
                  className="mt-4 sm:mt-5 text-indigo-400 hover:text-indigo-300 transition text-sm sm:text-base"
                >
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BIG OFFER SECTION */}
      <section className="px-4 sm:px-6 md:px-1 py-8 sm:py-10">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-[30px] sm:rounded-[40px] p-8 sm:p-10 md:p-16 relative overflow-hidden">
          <div className="max-w-2xl z-10 relative">
            <p className="uppercase tracking-[2px] sm:tracking-[4px] text-indigo-200 mb-2 sm:mb-3 text-sm sm:text-base">
              Limited Time Offer
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              Up To 50% OFF
            </h2>
            <p className="mt-4 sm:mt-5 text-gray-200 text-base sm:text-lg">
              Grab exclusive discounts on premium collections.
            </p>
            <button
              onClick={() =>
                token ? navigate("/customer-dashboard/shop") : navigate("/shop")
              }
              className="mt-6 sm:mt-8 bg-white text-slate-900 px-6 sm:px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300"
            >
              Shop Deals
            </button>
          </div>
          <div className="absolute right-[-80px] sm:right-[-100px] top-[-40px] sm:top-[-50px] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-white/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 sm:px-6 md:px-14 mb-8 sm:mb-10 py-12 sm:py-16 bg-slate-800 rounded-xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12">
          Customer <span className="text-indigo-400">Reviews</span>
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            "Amazing quality products and super fast delivery!",
            "The UI and shopping experience feels premium.",
            "Best online store with affordable pricing.",
          ].map((review, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:border-indigo-500 transition-all duration-300"
            >
              <p className="text-gray-300 italic leading-7">"{review}"</p>

              <div className="mt-6 flex items-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-500"></div>

                <div>
                  <h4 className="font-semibold text-sm sm:text-base">
                    {["Rahul", "Priya", "Aman"][idx]}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Verified Buyer
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
