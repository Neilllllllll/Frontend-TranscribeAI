export type JobStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

// Base commune à toutes les réponses
interface BaseJobData {
  job_id: string;
  status: JobStatus;
}

// Cas spécifiques
interface PendingData extends BaseJobData {
  status: "PENDING";
  position: number;
}

interface ProcessingData extends BaseJobData {
  status: "PROCESSING";
}

interface CompletedData extends BaseJobData {
  status: "COMPLETED";
  result: {
    transcription: string;
  };
  transcription_time: number;
}

interface FailedData extends BaseJobData {
  status: "FAILED";
  error_message?: string;
}

// L'Union Discriminante : Le type final
export type TranscriptionJobData = 
  | PendingData 
  | ProcessingData 
  | CompletedData 
  | FailedData;

export interface APIResponse {
  status: "success" | "error";
  data: TranscriptionJobData;
}