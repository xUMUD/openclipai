import { useState } from "react";
import { Filter, SortDesc, Grid3X3, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ClipCard } from "./ClipCard";
import { ClipEditor } from "./ClipEditor";

interface Clip {
  id: string;
  thumbnail: string;
  title: string;
  duration: string;
  viralScore: number;
  startTime: string;
  endTime: string;
}

interface ClipGalleryProps {
  clips: Clip[];
}

export function ClipGallery({ clips }: ClipGalleryProps) {
  const [selectedClip, setSelectedClip] = useState<Clip | null>(null);
  const [sortBy, setSortBy] = useState<"score" | "time">("score");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const sortedClips = [...clips].sort((a, b) => {
    if (sortBy === "score") return b.viralScore - a.viralScore;
    return a.startTime.localeCompare(b.startTime);
  });

  const handleEdit = (id: string) => {
    const clip = clips.find(c => c.id === id);
    if (clip) setSelectedClip(clip);
  };

  const handleDownload = (id: string) => {
    console.log("Downloading clip:", id);
    // In real app, trigger download
  };

  const handleCloseEditor = () => {
    setSelectedClip(null);
  };

  if (selectedClip) {
    return <ClipEditor clip={selectedClip} onClose={handleCloseEditor} />;
  }

  return (
    <div className="w-full animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-1">Generated Clips</h2>
          <p className="text-muted-foreground">
            Found <span className="text-primary font-semibold">{clips.length}</span> viral moments
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 glass rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <LayoutList className="w-4 h-4" />
            </Button>
          </div>

          <Button variant="glass" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>

          <Button 
            variant="glass" 
            size="sm" 
            className="gap-2"
            onClick={() => setSortBy(sortBy === "score" ? "time" : "score")}
          >
            <SortDesc className="w-4 h-4" />
            {sortBy === "score" ? "By Score" : "By Time"}
          </Button>
        </div>
      </div>

      {/* Score legend */}
      <div className="flex items-center gap-4 mb-6 text-sm">
        <span className="text-muted-foreground">Viral Score:</span>
        <div className="flex gap-3">
          <Badge variant="success">80-100% Viral</Badge>
          <Badge variant="score">60-79% High</Badge>
          <Badge variant="warning">40-59% Medium</Badge>
          <Badge variant="outline">0-39% Low</Badge>
        </div>
      </div>

      {/* Grid */}
      <div className={`grid gap-6 ${
        viewMode === "grid" 
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
          : "grid-cols-1 max-w-2xl"
      }`}>
        {sortedClips.map((clip, index) => (
          <div 
            key={clip.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <ClipCard 
              clip={clip} 
              onEdit={handleEdit}
              onDownload={handleDownload}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
