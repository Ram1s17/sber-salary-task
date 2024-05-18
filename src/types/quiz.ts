export enum QuizStatus {
    START = 'start',
    PROGRESS = 'progress',
    FINISH = 'finish'
}

export type Difficulty = 'Easy' | 'Medium' | 'Hard'

export interface Question {
    id: number;
    question: string;
    answers: Record<string, string>;
    multiple_correct_answers: boolean;
    correct_answers: Record<string, boolean>;
    difficulty: Difficulty;
}