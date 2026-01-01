import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { URLInput } from "@/components/home/URLInput";
import { ProcessingView } from "@/components/home/ProcessingView";
import { ClipGallery } from "@/components/home/ClipGallery";
import { BackgroundEffects } from "@/components/home/BackgroundEffects";

type AppState = "input" | "processing" | "gallery";

// Demo clips data
const demoClips = [
  {
    id: "1",
    thumbnail: "",
    title: "\"You won't BELIEVE what happens next!\" - Peak reaction moment",
    duration: "0:28",
    viralScore: 94,
    startTime: "12:34",
    endTime: "13:02",
  },
  {
    id: "2", 
    thumbnail: "",
    title: "Epic fail compilation with hilarious commentary",
    duration: "0:45",
    viralScore: 87,
    startTime: "24:15",
    endTime: "25:00",
  },
  {
    id: "3",
    thumbnail: "",
    title: "Mind-blowing revelation that shocked everyone",
    duration: "0:32",
    viralScore: 82,
    startTime: "45:20",
    endTime: "45:52",
  },
  {
    id: "4",
    thumbnail: "",
    title: "Unexpected plot twist moment",
    duration: "0:22",
    viralScore: 75,
    startTime: "1:02:10",
    endTime: "1:02:32",
  },
  {
    id: "5",
    thumbnail: "",
    title: "Crowd goes wild during this play",
    duration: "0:38",
    viralScore: 68,
    startTime: "1:15:45",
    endTime: "1:16:23",
  },
  {
    id: "6",
    thumbnail: "",
    title: "Funny moment that everyone is talking about",
    duration: "0:18",
    viralScore: 55,
    startTime: "1:30:00",
    endTime: "1:30:18",
  },
];

const Index = () => {
  const [appState, setAppState] = useState<AppState>("input");
  const [isLoading, setIsLoading] = useState(false);

  const handleURLSubmit = (url: string) => {
    console.log("Processing URL:", url);
    setIsLoading(true);
    
    // Simulate brief loading then show processing
    setTimeout(() => {
      setIsLoading(false);
      setAppState("processing");
    }, 500);
  };

  const handleProcessingComplete = () => {
    setAppState("gallery");
  };

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
            <ProcessingView isActive={true} onComplete={handleProcessingComplete} />
          </div>
        )}

        {appState === "gallery" && (
          <div className="pt-8">
            <ClipGallery clips={demoClips} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
