import { Button } from "@/components/ui/button"
import type { CodeFile } from "@/lib/filesystem"

interface FileGridProps {
  files: CodeFile[]
  onFileSelect: (file: CodeFile) => void
}

export function FileGrid({ files, onFileSelect }: FileGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {files.map((file, index) => (
        <Button
          key={index}
          variant="outline"
          onClick={() => onFileSelect(file)}
          className="w-full h-full p-6 text-left border border-zinc-800 bg-gradient-to-br from-gray-900 via-zinc-900 to-black rounded-xl
            transition-all duration-300 ease-in-out overflow-hidden
            hover:scale-105 hover:border-gray-700 hover:shadow-lg hover:shadow-gray-800/20"
        >
          <div className="w-full">
            <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-zinc-400 truncate">
              {file.path}
            </h2>
            <p className="text-gray-300 mt-2 transition-colors truncate">
              Click to edit and run code
            </p>
          </div>
        </Button>
      ))}
    </div>
  )
}