import { createFileSystem } from "@/lib/filesystem"
import { FileEditor } from "@/components/FileEditor"
import Wallet from "@/components/Wallet"
export default function Home() {
  const fileSystem = createFileSystem();
  const files = fileSystem.getAllFiles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-zinc-900 to-black p-8">
      <main className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-zinc-400 mb-4 mt-8">
            Virtual AI Hack 03
          </h1>
          <div className="fixed top-2 right-2 flex justify-center">
            <Wallet />
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore <span className="text-zinc-400 font-semibold">{files.length} agentic</span>{' '}
            <span className="text-gray-400 font-semibold">reusable and composable</span> workflows built with{' '}
            <span className="text-yellow-400 font-semibold">Markdown</span> to supercharge your AI development.
          </p>
        </div>

        <FileEditor files={files} />
      </main>
    </div>
  );
}
