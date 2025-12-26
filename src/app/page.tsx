import { Input } from "@/components/Input";

export default async function Home() {

  return (
    <div className="flex items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="sm:p-10 p-2 text-center text-white flex gap-3 flex-col">
        <h1 className="text-4xl text-black">Alt Reader</h1>
        <span className="text-xl text-neutral-500">
          Simply put url of JW page and see all image descriptions</span>
        <Input />
      </main>
    </div>
  );
}
