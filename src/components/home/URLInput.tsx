import { useState } from "react";
import { Link, Sparkles, Youtube, Twitch, Play, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export function URLInput({ onSubmit, isLoading }: URLInputProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const detectPlatform = (url: string) => {
    if (url.includes("youtube") || url.includes("youtu.be")) return "youtube";
    if (url.includes("twitch")) return "twitch";
    if (url.includes("kick")) return "kick";
    return null;
  };

  const platform = detectPlatform(url);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 via-accent/50 to-primary/50 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 group-focus-within:opacity-80 transition-opacity duration-500" />
        
        <div className="relative glass rounded-2xl p-2 border border-border/50 group-focus-within:border-primary/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 pl-4">
              {platform === "youtube" && (
                <Youtube className="w-5 h-5 text-red-500 animate-scale-in" />
              )}
              {platform === "twitch" && (
                <Twitch className="w-5 h-5 text-purple-500 animate-scale-in" />
              )}
              {platform === "kick" && (
                <Play className="w-5 h-5 text-green-500 animate-scale-in" />
              )}
              {!platform && (
                <Link className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            
            <Input
              type="url"
              placeholder="Paste YouTube, Twitch, or Kick URL..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 text-lg placeholder:text-muted-foreground/60"
            />
            
            <Button 
              type="submit" 
              variant="hero" 
              size="lg"
              disabled={!url.trim() || isLoading}
              className="shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Clips
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
      
      <p className="text-center text-sm text-muted-foreground mt-4">
        Supports YouTube videos, Twitch VODs, and Kick streams • AI-powered viral moment detection
      </p>
    </div>
  );
}
