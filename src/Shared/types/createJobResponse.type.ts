// Schema de réponse lorsque l'on créer un job
interface data{
    job_uuid: string,
    status: string
}

export interface CreateJobAPIResponse{
    data : data,
    status: "success" | "error"
}