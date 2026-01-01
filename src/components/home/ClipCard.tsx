import { Play, Download, Clock, TrendingUp, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ClipCardProps {
  clip: {
    id: string;
    thumbnail: string;
    title: string;
    duration: string;
    viralScore: number;
    startTime: string;
    endTime: string;
  };
  onEdit: (id: string) => void;
  onDownload: (id: string) => void;
}

export function ClipCard({ clip, onEdit, onDownload }: ClipCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-primary";
    if (score >= 40) return "text-amber-400";
    return "text-muted-foreground";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Viral";
    if (score >= 60) return "High";
    if (score >= 40) return "Medium";
    return "Low";
  };

  return (
    <div className="group relative glass rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
      {/* Thumbnail */}
      <div className="relative aspect-[9/16] bg-secondary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
        
        {/* Placeholder for video thumbnail */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Play className="w-8 h-8 text-primary ml-1" />
          </div>
        </div>

        {/* Play overlay on hover */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <Button variant="hero" size="lg" className="gap-2">
            <Play className="w-5 h-5" />
            Preview
          </Button>
        </div>

        {/* Duration badge */}
        <div className="absolute top-3 left-3 z-20">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm border-border/50">
            <Clock className="w-3 h-3 mr-1" />
            {clip.duration}
          </Badge>
        </div>

        {/* Viral score badge */}
        <div className="absolute top-3 right-3 z-20">
          <Badge variant="score" className={`${getScoreColor(clip.viralScore)} bg-background/80 backdrop-blur-sm`}>
            <TrendingUp className="w-3 h-3 mr-1" />
            {clip.viralScore}%
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-medium ${getScoreColor(clip.viralScore)}`}>
            {getScoreLabel(clip.viralScore)} Potential
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            {clip.startTime} - {clip.endTime}
          </span>
        </div>
        
        <h3 className="font-semibold text-foreground line-clamp-2 mb-4 leading-snug">
          {clip.title}
        </h3>

        <div className="flex gap-2">
          <Button 
            variant="glass" 
            size="sm" 
            className="flex-1"
            onClick={() => onEdit(clip.id)}
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </Button>
          <Button 
            variant="hero" 
            size="sm" 
            className="flex-1"
            onClick={() => onDownload(clip.id)}
          >
            <Download className="w-4 h-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
