import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { URLInput } from "@/components/home/URLInput";
import { ProcessingView } from "@/components/home/ProcessingView";
import { ClipGallery } from "@/components/home/ClipGallery";
import { BackgroundEffects } from "@/components/home/BackgroundEffects";
import { generateClips, getTaskStatus, type TaskStatus, type GeneratedClip } from "@/lib/api";
import { toast } from "sonner";

type AppState = "input" | "processing" | "gallery";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("input");
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [processingStatus, setProcessingStatus] = useState<TaskStatus | null>(null);
  const [clips, setClips] = useState<GeneratedClip[]>([]);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const handleURLSubmit = async (url: string) => {
    setIsLoading(true);
    
    try {
      const response = await generateClips({ url, style: "mrbeast" });
      setTaskId(response.task_id);
      setAppState("processing");
      toast.success("Processing started!");
    } catch (error) {
      console.error("Failed to start processing:", error);
      toast.error("Failed to connect to backend. Make sure the API is running.");
    } finally {
      setIsLoading(false);
    }
  };

  // Poll for task status
  useEffect(() => {
    if (!taskId || appState !== "processing") return;

    const pollStatus = async () => {
      try {
        const status = await getTaskStatus(taskId);
        setProcessingStatus(status);

        if (status.status === "completed" && status.clips) {
          setClips(status.clips);
          setAppState("gallery");
          toast.success(`Generated ${status.clips.length} clips!`);
        } else if (status.status === "failed") {
          toast.error(status.error || "Processing failed");
          setAppState("input");
        }
      } catch (error) {
        console.error("Failed to get status:", error);
      }
    };

    pollingRef.current = setInterval(pollStatus, 2000);
    pollStatus(); // Initial call

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [taskId, appState]);

  const handleProcessingComplete = () => {
    setAppState("gallery");
  };

  // Map clips to gallery format
  const galleryClips = clips.map((clip) => ({
    id: clip.id,
    thumbnail: clip.thumbnailUrl || "",
    title: clip.title,
    duration: clip.duration,
    viralScore: clip.viralScore,
    startTime: formatTime(clip.startTime),
    endTime: formatTime(clip.endTime),
  }));

  return (
    <div className="min-h-screen bg-background relative">
      <BackgroundEffects />
      <Header />
      
      <main className="container mx-auto px-6 pt-24 pb-16">
        {appState === "input" && (
          <div className="max-w-4xl mx-auto pt-16">
            <HeroSection />
            <URLInput onSubmit={handleURLSubmit} isLoading={isLoading} />
            
            {/* Features grid */}
            <div className="grid md:grid-cols-3 gap-6 mt-20">
              {[
                {
                  title: "AI-Powered Detection",
                  description: "Our algorithm analyzes audio spikes, keywords, and engagement patterns to find the most viral-worthy moments.",
                },
                {
                  title: "Smart Face Tracking",
                  description: "Automatic 9:16 cropping that follows the speaker's face using MediaPipe, perfect for talking-head content.",
                },
                {
                  title: "Dynamic Captions",
                  description: "Word-level timestamps with MrBeast-style animated captions that pop and grab attention.",
                },
              ].map((feature, index) => (
                <div 
                  key={feature.title}
                  className="glass rounded-2xl p-6 border border-border/50 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {appState === "processing" && (
          <div className="pt-16">
            <ProcessingView 
              isActive={true} 
              onComplete={handleProcessingComplete}
              status={processingStatus}
            />
          </div>
        )}

        {appState === "gallery" && (
          <div className="pt-8">
            <ClipGallery clips={galleryClips} />
          </div>
        )}
      </main>
    </div>
  );
};

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default Index;
