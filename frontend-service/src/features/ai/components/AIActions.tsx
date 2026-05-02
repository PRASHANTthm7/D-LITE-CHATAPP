"use client";

import { Copy, RefreshCw, ThumbsUp } from "lucide-react";
import { IconButton } from "@/shared/components/IconButton";
import { useToast } from "@/shared/hooks/use-toast";

export function AIActions() {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText("Mock copied text");
    toast({ title: "Copied!", description: "Response copied to clipboard.", type: "success" });
  };

  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
      <IconButton size="sm" variant="ghost" className="text-gray-400 hover:text-brand-500 hover:bg-brand-50" onClick={handleCopy} tooltip="Copy text">
        <Copy size={14} />
      </IconButton>
      <IconButton size="sm" variant="ghost" className="text-gray-400 hover:text-brand-500 hover:bg-brand-50" tooltip="Regenerate">
        <RefreshCw size={14} />
      </IconButton>
      <IconButton size="sm" variant="ghost" className="text-gray-400 hover:text-brand-500 hover:bg-brand-50" tooltip="Good response">
        <ThumbsUp size={14} />
      </IconButton>
      <div className="flex-1 text-right text-xs text-gray-400">
        Generated in 1.2s
      </div>
    </div>
  );
}
