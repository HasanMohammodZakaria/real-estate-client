import { HiOutlineShieldCheck, HiOutlineCurrencyDollar, HiOutlineChatAlt2, HiOutlineClock } from "react-icons/hi";

const FEATURES = [
  { icon: HiOutlineShieldCheck, title: "Verified Listings", desc: "Every property is reviewed before it goes live." },
  { icon: HiOutlineCurrencyDollar, title: "Transparent Pricing", desc: "No hidden fees, ever. See the full picture upfront." },
  { icon: HiOutlineChatAlt2, title: "Direct Communication", desc: "Connect directly with property owners and agents." },
  { icon: HiOutlineClock, title: "Fast Process", desc: "List or find your next property in minutes, not weeks." },
];

export function WhyChooseUs() {
  return (
    <section className="py-16" style={{ backgroundColor: "var(--secondary)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="font-heading text-2xl sm:text-3xl font-medium mb-10 text-center" style={{ color: "var(--secondary-foreground)" }}>
          Why Choose EstateHub
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-3 p-4">
              <div
                className="h-14 w-14 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <Icon size={26} style={{ color: "var(--primary-foreground)" }} />
              </div>
              <h3 className="font-medium" style={{ color: "var(--secondary-foreground)" }}>{title}</h3>
              <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}