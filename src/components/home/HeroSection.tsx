import { Sparkles, Zap, Film, TrendingUp } from "lucide-react";

export function HeroSection() {
  return (
    <div className="text-center mb-12 animate-fade-in">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-6">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium">
          <span className="text-primary">Free & Open Source</span>
          <span className="text-muted-foreground"> • Local AI Processing</span>
        </span>
      </div>

      {/* Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
        <span className="text-foreground">Turn Long Videos into</span>
        <br />
        <span className="gradient-text">Viral Shorts</span>
        <span className="text-foreground"> Automatically</span>
      </h1>

      {/* Subtitle */}
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        AI-powered video clipping that finds the best moments, 
        adds dynamic captions, and exports perfect 9:16 shorts for 
        TikTok, YouTube Shorts, and Instagram Reels.
      </p>

      {/* Feature pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {[
          { icon: Zap, label: "Instant Processing" },
          { icon: Film, label: "Smart Face Tracking" },
          { icon: TrendingUp, label: "Viral Score Detection" },
          { icon: Sparkles, label: "MrBeast-Style Captions" },
        ].map((feature) => (
          <div 
            key={feature.label}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm"
          >
            <feature.icon className="w-4 h-4 text-primary" />
            <span className="text-foreground/80">{feature.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
