import SearchForm from "./components/searchForm";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block text-center justify-center">
        <SearchForm />
      </div>
      <div>{children}</div>
    </section>
  );
}
