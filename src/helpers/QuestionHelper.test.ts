import { describe, expect, test } from '@jest/globals';
import QuestionHelper from "./QuestionHelper"

describe('QuestionHelper', () => {
  test('Должны удаляться поля с значением null в поле answers и удаляться приписка _correct у поля answer_*_correct', () => {
    const qestionsFromAPI = [
      {
        "id": 343,
        "question": "What is the Ping of Death?",
        "answers": {
          "answer_a": "The Ping of Death is an occurrence when sending packets are reassembled, are too large for the system to understand.",
          "answer_b": "The Ping of Death is capturing and deciphering traffic on a network.",
          "answer_c": "The Ping of Death can be set in wordpress under admin settings.",
          "answer_d": null,
          "answer_e": null,
          "answer_f": null
        },
        "multiple_correct_answers": "false",
        "correct_answers": {
          "answer_a_correct": "true",
          "answer_b_correct": "false",
          "answer_c_correct": "false",
          "answer_d_correct": "false",
          "answer_e_correct": "false",
          "answer_f_correct": "false"
        },
        "difficulty": "Medium"
      },
      {
        "id": 1012,
        "question": "What is the most common type of container runtime used in Kubernetes?",
        "answers": {
          "answer_a": "rkt",
          "answer_b": "Docker",
          "answer_c": "containerd",
          "answer_d": "lxd",
          "answer_e": null,
          "answer_f": null
        },
        "multiple_correct_answers": "false",
        "correct_answers": {
          "answer_a_correct": "false",
          "answer_b_correct": "true",
          "answer_c_correct": "false",
          "answer_d_correct": "false",
          "answer_e_correct": "false",
          "answer_f_correct": "false"
        },
        "difficulty": "Medium"
      }
    ]
    const processedQestionsFromAPI = JSON.parse(JSON.stringify(qestionsFromAPI), (_, v) => v === "true" ? true : v === "false" ? false : v)
    const processedQuestions = QuestionHelper.getProcessedQuestions(processedQestionsFromAPI)
    expect(processedQuestions).toStrictEqual([
      {
        "id": 343,
        "question": "What is the Ping of Death?",
        "answers": {
          "answer_a": "The Ping of Death is an occurrence when sending packets are reassembled, are too large for the system to understand.",
          "answer_b": "The Ping of Death is capturing and deciphering traffic on a network.",
          "answer_c": "The Ping of Death can be set in wordpress under admin settings."
        },
        "multiple_correct_answers": false,
        "correct_answers": {
          "answer_a": true,
          "answer_b": false,
          "answer_c": false,
          "answer_d": false,
          "answer_e": false,
          "answer_f": false
        },
        "difficulty": "Medium"
      },
      {
        "id": 1012,
        "question": "What is the most common type of container runtime used in Kubernetes?",
        "answers": {
          "answer_a": "rkt",
          "answer_b": "Docker",
          "answer_c": "containerd",
          "answer_d": "lxd"
        },
        "multiple_correct_answers": false,
        "correct_answers": {
          "answer_a": false,
          "answer_b": true,
          "answer_c": false,
          "answer_d": false,
          "answer_e": false,
          "answer_f": false
        },
        "difficulty": "Medium"
      }
    ])
  }),

    test('Должно подчитываться количество вопросов каждого уровня сложности', () => {
      const qestionsFromAPI = [
        {
          "id": 343,
          "question": "What is the Ping of Death?",
          "answers": {
            "answer_a": "The Ping of Death is an occurrence when sending packets are reassembled, are too large for the system to understand.",
            "answer_b": "The Ping of Death is capturing and deciphering traffic on a network.",
            "answer_c": "The Ping of Death can be set in wordpress under admin settings.",
            "answer_d": null,
            "answer_e": null,
            "answer_f": null
          },
          "multiple_correct_answers": "false",
          "correct_answers": {
            "answer_a_correct": "true",
            "answer_b_correct": "false",
            "answer_c_correct": "false",
            "answer_d_correct": "false",
            "answer_e_correct": "false",
            "answer_f_correct": "false"
          },
          "difficulty": "Medium"
        },
        {
          "id": 504,
          "question": "Which HTML tag would be used to display power in expression (A+B)2 ?",
          "description": null,
          "answers": {
            "answer_a": "<sup>",
            "answer_b": "<p>",
            "answer_c": "<b>",
            "answer_d": "<sub>",
            "answer_e": null,
            "answer_f": null
          },
          "multiple_correct_answers": "false",
          "correct_answers": {
            "answer_a_correct": "true",
            "answer_b_correct": "false",
            "answer_c_correct": "false",
            "answer_d_correct": "false",
            "answer_e_correct": "false",
            "answer_f_correct": "false"
          },
          "correct_answer": "answer_a",
          "explanation": null,
          "tip": null,
          "tags": [
            {
              "name": "HTML"
            }
          ],
          "category": "Code",
          "difficulty": "Easy"
        }
      ]
      const processedQestionsFromAPI = JSON.parse(JSON.stringify(qestionsFromAPI), (_, v) => v === "true" ? true : v === "false" ? false : v)
      const initialResult = QuestionHelper.getInitialResult(processedQestionsFromAPI)
      expect(initialResult).toStrictEqual({
        Easy: {
          correct: 0,
          total: 1
        },
        Medium: {
          correct: 0,
          total: 1
        },
        Hard: {
          correct: 0,
          total: 0
        }
      })
    }),

    test('Подсчет количества вопросов по уровням сложности при получении пустого списка из API', () => {
      const processedQestionsFromAPI = JSON.parse(JSON.stringify([]), (_, v) => v === "true" ? true : v === "false" ? false : v)
      const initialResult = QuestionHelper.getInitialResult(processedQestionsFromAPI)
      expect(initialResult).toStrictEqual({
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
    }),

    test('Пользователь правильно ответил на вопрос с одним вариантом ответа', () => {
      const userAnswers = [
        'answer_a'
      ]
      const correctAnswers = {
        answer_a: true,
        answer_b: false,
        answer_c: false,
        answer_d: false,
        answer_e: false,
        answer_f: false,
      }
      const checkedAnswer = QuestionHelper.checkAnswer(userAnswers, correctAnswers)
      expect(checkedAnswer).toBe(true)
    }),

    test('Пользователь неправильно ответил на вопрос с одним вариантом ответа', () => {
      const userAnswers = [
        'answer_a'
      ]
      const correctAnswers = {
        answer_a: false,
        answer_b: false,
        answer_c: true,
        answer_d: false,
        answer_e: false,
        answer_f: false,
      }
      const checkedAnswer = QuestionHelper.checkAnswer(userAnswers, correctAnswers)
      expect(checkedAnswer).toBe(false)
    }),

    test('Пользователь правильно ответил на вопрос с несколькими вариантами ответа', () => {
      const userAnswers = [
        'answer_a',
        'answer_b'
      ]
      const correctAnswers = {
        answer_a: true,
        answer_b: true,
        answer_c: false,
        answer_d: false,
        answer_e: false,
        answer_f: false,
      }
      const checkedAnswer = QuestionHelper.checkAnswer(userAnswers, correctAnswers)
      expect(checkedAnswer).toBe(true)
    }),

    test('Пользователь выбрал не все правильные варианты ответа на вопросе с несколькими вариантами ответа', () => {
      const userAnswers = [
        'answer_a',
        'answer_b'
      ]
      const correctAnswers = {
        answer_a: true,
        answer_b: true,
        answer_c: true,
        answer_d: false,
        answer_e: false,
        answer_f: false,
      }
      const checkedAnswer = QuestionHelper.checkAnswer(userAnswers, correctAnswers)
      expect(checkedAnswer).toBe(false)
    }),

    test('Пользователь выбрал все правильные варианты ответа и 1 неправильный на вопросе с несколькими вариантами ответа', () => {
      const userAnswers = [
        'answer_a',
        'answer_b',
        'answer_c'
      ]
      const correctAnswers = {
        answer_a: true,
        answer_b: true,
        answer_c: false,
        answer_d: false,
        answer_e: false,
        answer_f: false,
      }
      const checkedAnswer = QuestionHelper.checkAnswer(userAnswers, correctAnswers)
      expect(checkedAnswer).toBe(false)
    })
})
