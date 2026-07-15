export default function PropertiesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <div className="h-8 w-56 rounded-md animate-pulse mb-2" style={{ backgroundColor: "var(--secondary)" }} />
        <div className="h-4 w-72 rounded-md animate-pulse" style={{ backgroundColor: "var(--secondary)" }} />
      </div>

      <div
        className="h-28 rounded-2xl animate-pulse mb-6"
        style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden animate-pulse"
            style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="h-48 w-full" style={{ backgroundColor: "var(--secondary)" }} />
            <div className="p-4 flex flex-col gap-2.5">
              <div className="h-4 w-3/4 rounded" style={{ backgroundColor: "var(--secondary)" }} />
              <div className="h-3 w-1/2 rounded" style={{ backgroundColor: "var(--secondary)" }} />
              <div className="h-3 w-full rounded" style={{ backgroundColor: "var(--secondary)" }} />
              <div className="h-3 w-full rounded" style={{ backgroundColor: "var(--secondary)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}