const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://liniest-jasiah-unaccusingly.ngrok-free.dev';

export interface GenerateClipsRequest {
  url: string;
  style: string;
}

export interface GenerateClipsResponse {
  task_id: string;
  status: string;
}

export interface TaskStatus {
  task_id: string;
  status: 'pending' | 'downloading' | 'transcribing' | 'analyzing' | 'rendering' | 'completed' | 'failed';
  progress: number;
  current_step?: string;
  clips?: GeneratedClip[];
  error?: string;
}

export interface GeneratedClip {
  id: string;
  title: string;
  duration: string;
  viralScore: number;
  thumbnailUrl?: string;
  videoUrl?: string;
  startTime: number;
  endTime: number;
}

export async function generateClips(request: GenerateClipsRequest): Promise<GenerateClipsResponse> {
  const response = await fetch(`${API_BASE_URL}/generate-clips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Failed to start clip generation: ${response.statusText}`);
  }

  return response.json();
}

export async function getTaskStatus(taskId: string): Promise<TaskStatus> {
  const response = await fetch(`${API_BASE_URL}/status/${taskId}`);

  if (!response.ok) {
    throw new Error(`Failed to get task status: ${response.statusText}`);
  }

  return response.json();
}

export async function downloadClip(clipId: string): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}/clips/${clipId}/download`);

  if (!response.ok) {
    throw new Error(`Failed to download clip: ${response.statusText}`);
  }

  return response.blob();
}
