import AirportForm from "@/components/AirportForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 py-24 px-4">
      <div className="w-full flex flex-col gap-6 justify-center items-center">
        <p className="text-xl uppercase text-zinc-400 text-center font-bold tracking-[0.3em]">
          Where are you flying from?
        </p>
        <AirportForm />
      </div>
    </main>
  );
}
