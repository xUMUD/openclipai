import { useState, useEffect } from "react";
import { Download, Search, Wand2, Film, CheckCircle2, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ProcessingStep {
  id: string;
  label: string;
  icon: React.ElementType;
  status: "pending" | "active" | "complete";
  progress: number;
}

interface ProcessingViewProps {
  isActive: boolean;
  onComplete: () => void;
}

export function ProcessingView({ isActive, onComplete }: ProcessingViewProps) {
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { id: "download", label: "Downloading Video", icon: Download, status: "pending", progress: 0 },
    { id: "transcribe", label: "Transcribing Audio", icon: Wand2, status: "pending", progress: 0 },
    { id: "analyze", label: "Finding Viral Moments", icon: Search, status: "pending", progress: 0 },
    { id: "render", label: "Rendering Clips", icon: Film, status: "pending", progress: 0 },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setSteps(prev => {
        const newSteps = [...prev];
        const currentStep = newSteps[currentStepIndex];
        
        if (!currentStep) {
          clearInterval(interval);
          onComplete();
          return prev;
        }

        if (currentStep.status === "pending") {
          currentStep.status = "active";
        }

        if (currentStep.progress < 100) {
          currentStep.progress = Math.min(currentStep.progress + Math.random() * 8 + 2, 100);
        } else if (currentStep.status === "active") {
          currentStep.status = "complete";
          if (currentStepIndex < newSteps.length - 1) {
            setCurrentStepIndex(prev => prev + 1);
          } else {
            clearInterval(interval);
            setTimeout(onComplete, 500);
          }
        }

        return newSteps;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isActive, currentStepIndex, onComplete]);

  useEffect(() => {
    const totalProgress = steps.reduce((acc, step) => acc + step.progress, 0) / steps.length;
    setOverallProgress(totalProgress);
  }, [steps]);

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in">
      <div className="glass rounded-2xl p-8 border border-border/50">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Processing Your Video</h2>
          <p className="text-muted-foreground">Our AI is analyzing and generating viral clips</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Overall Progress</span>
            <span className="font-mono text-primary">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} variant="glow" className="h-3" />
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.id}
                className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 ${
                  step.status === "active" 
                    ? "bg-primary/10 border border-primary/30" 
                    : step.status === "complete"
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : "bg-secondary/30 border border-transparent"
                }`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                  step.status === "active"
                    ? "bg-primary text-primary-foreground"
                    : step.status === "complete"
                    ? "bg-emerald-500 text-white"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {step.status === "complete" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : step.status === "active" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium ${
                      step.status === "pending" ? "text-muted-foreground" : "text-foreground"
                    }`}>
                      {step.label}
                    </span>
                    {step.status !== "pending" && (
                      <span className="text-sm font-mono text-muted-foreground">
                        {Math.round(step.progress)}%
                      </span>
                    )}
                  </div>
                  {step.status !== "pending" && (
                    <Progress 
                      value={step.progress} 
                      variant={step.status === "complete" ? "default" : "gradient"}
                      className="h-1.5"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
