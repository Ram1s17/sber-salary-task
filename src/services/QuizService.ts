import $api from "../http"
import { Question } from "../types/quiz"

interface ApiResponse {
    status: number;
    statusText: string;
    data: Question[];
}

export default class QuizService {
    static async getQuestions(limit: number): Promise<ApiResponse> {
        return $api.get(`/questions?limit=${limit}`)
    }
}