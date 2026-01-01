import { useState } from "react";
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Download, Save, Volume2, Scissors } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface Clip {
  id: string;
  thumbnail: string;
  title: string;
  duration: string;
  viralScore: number;
  startTime: string;
  endTime: string;
}

interface ClipEditorProps {
  clip: Clip;
  onClose: () => void;
}

export function ClipEditor({ clip, onClose }: ClipEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [startTrim, setStartTrim] = useState(0);
  const [endTrim, setEndTrim] = useState(100);
  const [volume, setVolume] = useState([80]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const totalDuration = 30; // Example: 30 seconds clip

  return (
    <div className="w-full max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onClose} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Clips
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="glass" className="gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </Button>
          <Button variant="hero" className="gap-2">
            <Download className="w-4 h-4" />
            Export Clip
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr,320px] gap-6">
        {/* Video Preview */}
        <div className="space-y-4">
          <div className="glass rounded-2xl overflow-hidden border border-border/50">
            {/* Video container - 9:16 aspect ratio preview */}
            <div className="relative aspect-[9/16] max-h-[70vh] mx-auto bg-secondary flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
                <div className="w-24 h-24 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Play className="w-10 h-10 text-primary ml-1" />
                </div>
              </div>

              {/* Viral score overlay */}
              <div className="absolute top-4 right-4">
                <Badge variant="viral" className="text-sm">
                  {clip.viralScore}% Viral Score
                </Badge>
              </div>
            </div>

            {/* Playback controls */}
            <div className="p-4 border-t border-border/50">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button variant="ghost" size="icon">
                  <SkipBack className="w-5 h-5" />
                </Button>
                <Button 
                  variant="hero" 
                  size="icon" 
                  className="w-12 h-12"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <SkipForward className="w-5 h-5" />
                </Button>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <Slider
                  value={[currentTime]}
                  max={100}
                  step={0.1}
                  onValueChange={(value) => setCurrentTime(value[0])}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs font-mono text-muted-foreground">
                  <span>{formatTime((currentTime / 100) * totalDuration)}</span>
                  <span>{formatTime(totalDuration)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="space-y-4">
          {/* Clip Info */}
          <div className="glass rounded-xl p-4 border border-border/50">
            <h3 className="font-semibold mb-3">Clip Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Original Time</span>
                <span className="font-mono">{clip.startTime} - {clip.endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-mono">{clip.duration}</span>
              </div>
            </div>
          </div>

          {/* Trim Controls */}
          <div className="glass rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Scissors className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Trim Clip</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Start Point</span>
                  <span className="font-mono text-primary">{formatTime((startTrim / 100) * totalDuration)}</span>
                </div>
                <Slider
                  value={[startTrim]}
                  max={endTrim - 5}
                  step={0.5}
                  onValueChange={(value) => setStartTrim(value[0])}
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">End Point</span>
                  <span className="font-mono text-primary">{formatTime((endTrim / 100) * totalDuration)}</span>
                </div>
                <Slider
                  value={[endTrim]}
                  min={startTrim + 5}
                  max={100}
                  step={0.5}
                  onValueChange={(value) => setEndTrim(value[0])}
                />
              </div>

              <div className="pt-2 border-t border-border/50">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New Duration</span>
                  <span className="font-mono font-semibold text-foreground">
                    {formatTime(((endTrim - startTrim) / 100) * totalDuration)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Volume Control */}
          <div className="glass rounded-xl p-4 border border-border/50">
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-4 h-4 text-primary" />
              <h3 className="font-semibold">Audio</h3>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Volume</span>
                <span className="font-mono text-primary">{volume[0]}%</span>
              </div>
              <Slider
                value={volume}
                max={100}
                step={1}
                onValueChange={setVolume}
              />
            </div>
          </div>

          {/* Caption Preview */}
          <div className="glass rounded-xl p-4 border border-border/50">
            <h3 className="font-semibold mb-3">Caption Style</h3>
            <div className="bg-secondary/50 rounded-lg p-4 text-center">
              <span className="text-2xl font-black text-primary uppercase tracking-wide drop-shadow-lg">
                VIRAL MOMENT
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              MrBeast-style animated captions will be applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
