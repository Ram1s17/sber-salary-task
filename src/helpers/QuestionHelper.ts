import { Question } from "../types/quiz"

export default class QuestionHelper {
    static getProcessedQuestions(questions: Question[]) {
        return questions
            .map(question => {
                const processedAnswers: Record<string, string> = {}
                for (let key in question.answers) {
                    if (question.answers[key] !== null) {
                        processedAnswers[key] = question.answers[key]!
                    }
                }
                const processedCorrectAnswers: Record<string, boolean> = {}
                for (let key in question.correct_answers) {
                    let processedKey = key.replace('_correct', '')
                    processedCorrectAnswers[processedKey] = question.correct_answers[key]
                }
                return {
                    ...question,
                    answers: processedAnswers,
                    correct_answers: processedCorrectAnswers
                }
            })
    }

    static getInitialResult(questions: Question[]) {
        return questions
            .reduce((acc, question) => {
                return {
                    ...acc,
                    [question.difficulty]: {
                        ...acc[question.difficulty],
                        total: acc[question.difficulty].total + 1
                    }
                }
            }, {
                Easy: {
                    correct: 0,
                    total: 0
                },
                Medium: {
                    correct: 0,
                    total: 0
                },
                Hard: {
                    correct: 0,
                    total: 0
                }
            })
    }

    static checkAnswer(userAnswers: string[], correctAnswers: Record<string, boolean>) {
        return userAnswers
            .every(answer => correctAnswers[answer])
    }
}