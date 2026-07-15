import { HiOutlineSearch, HiOutlineChatAlt2, HiOutlineCheckCircle } from "react-icons/hi";

const STEPS = [
  {
    icon: HiOutlineSearch,
    title: "Search",
    desc: "Browse listings using filters that match your needs — location, price, and category.",
  },
  {
    icon: HiOutlineChatAlt2,
    title: "Connect",
    desc: "View full details and reach out directly to the property owner or agent.",
  },
  {
    icon: HiOutlineCheckCircle,
    title: "Close the Deal",
    desc: "Finalize the deal with full transparency, no hidden fees, no middlemen.",
  },
];

export function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="font-heading text-2xl sm:text-3xl font-medium" style={{ color: "var(--foreground)" }}>
          How It Works
        </h2>
        <p className="text-sm mt-2" style={{ color: "var(--muted-foreground)" }}>
          Three simple steps to your next property
        </p>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
        
        <div
          className="hidden sm:block absolute top-8 left-0 right-0 h-px"
          style={{
            background: "var(--border)",
            marginLeft: "16.66%",
            marginRight: "16.66%",
          }}
        />

        {STEPS.map(({ icon: Icon, title, desc }, index) => (
          <div key={title} className="relative flex flex-col items-center text-center">
            <div
              className="relative z-10 h-16 w-16 rounded-full flex items-center justify-center mb-5 shadow-sm"
              style={{ backgroundColor: "var(--primary)" }}
            >
              <Icon size={28} style={{ color: "var(--primary-foreground)" }} />
            </div>

            <span
              className="text-xs font-medium mb-2 px-2.5 py-0.5 rounded-full"
              style={{ backgroundColor: "var(--secondary)", color: "var(--secondary-foreground)" }}
            >
              Step {index + 1}
            </span>

            <h3 className="font-heading text-lg font-medium mb-2" style={{ color: "var(--foreground)" }}>
              {title}
            </h3>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--muted-foreground)" }}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}