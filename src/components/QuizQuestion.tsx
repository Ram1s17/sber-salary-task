import { FC, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import type { GetProp } from 'antd'
import { Button, Checkbox, Flex, Radio, RadioChangeEvent, Space } from "antd"
import useAppSelector from "../hooks/useAppSelector"
import useAppDispatch from "../hooks/useAppDispatch"
import { fetchQuestions } from "../store/reducers/actionCreators"
import LoadingSpinner from "./LoadingSpinner"
import { changeCurrentQuestionIndex, changeQuizStatus, checkAnswer } from "../store/reducers/quizReducer"
import { QuizStatus } from "../types/quiz"

const ErrorBlock = styled.span`
    margin: 10px;
    color: red;
    text-align: center;
`

const QuestionContainer = styled.div`
    background: #CBE4FF;
    padding: 10px 15px;
    margin: 10px;
    border: 1px solid #000;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 3px rgba(34, 60, 80, 0.2);
`
const QuestionBlock = styled.div`
    width: 100%;
    background: #FFF;
    padding: 10px 15px;
    border-radius: 10px;
    font-weight: bold;
    border: 1px solid #000;
`

const CheckboxGroup = styled(Checkbox.Group)`
    width: 100%;
`

const RadioGroup = styled(Radio.Group)`
    width: 100%;
`

const AnswerBlock = styled.div`
    width: 100%;
    background: #FFF;
    padding: 10px 15px;
    border-radius: 10px;
    margin-bottom: 10px;
    
    & label {
        width: 100%;
    }
`

const AnswerButton = styled(Button)`
    background: #CBFFE4;
    border: 1px solid #000;
`

const QuizQuestion: FC = () => {
    const { questionCount, isLoading, error, questions, currentQuestionIndex } = useAppSelector(state => state.quiz)
    const dispatch = useAppDispatch()
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

    useEffect(() => {
        dispatch(fetchQuestions(questionCount))
    }, [])

    const Answers = useMemo(() => {
        return Object.entries(questions[currentQuestionIndex]?.answers || {})
            .map((el) => ({
                label: el[1],
                value: el[0]
            }))
    }, [questions, currentQuestionIndex])

    const onCheckboxChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        setSelectedAnswers(checkedValues as string[])
    }

    const onRadioChange = (e: RadioChangeEvent) => {
        setSelectedAnswers([e.target.value])
    }

    const answerQuestion = () => {
        dispatch(checkAnswer({
            difficulty: questions[currentQuestionIndex].difficulty,
            userAnswers: selectedAnswers,
            correctAnswers: questions[currentQuestionIndex].correct_answers
        }))
        if (currentQuestionIndex + 1 < questionCount) {
            dispatch(changeCurrentQuestionIndex(currentQuestionIndex + 1))
            setSelectedAnswers([])
        }
        else {
            dispatch(changeQuizStatus(QuizStatus.FINISH))
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }
    else if (!!error) {
        return <ErrorBlock>{error}</ErrorBlock>
    }
    return (
        <QuestionContainer>
            <Space
                direction="vertical"
                size="middle"
            >
                <Flex justify="center">
                    <div>{currentQuestionIndex + 1} / {questionCount}</div>
                </Flex>
                <QuestionBlock>
                    {questions[currentQuestionIndex]?.question}
                </QuestionBlock>
                {questions[currentQuestionIndex]?.multiple_correct_answers
                    ? (
                        <CheckboxGroup onChange={onCheckboxChange}>
                            {
                                Answers.map(answer => (
                                    <AnswerBlock key={answer.value}>
                                        <Checkbox value={answer.value}>
                                            {answer.label}
                                        </Checkbox>
                                    </AnswerBlock>
                                ))
                            }
                        </CheckboxGroup>
                    )
                    : (
                        <RadioGroup
                            value={selectedAnswers[0]}
                            onChange={onRadioChange}
                        >
                            {
                                Answers.map(answer => (
                                    <AnswerBlock key={answer.value}>
                                        <Radio value={answer.value}>
                                            {answer.label}
                                        </Radio>
                                    </AnswerBlock>
                                ))
                            }
                        </RadioGroup>
                    )
                }
                <Flex justify="flex-end">
                    <AnswerButton
                        onClick={answerQuestion}
                        disabled={!selectedAnswers.length}
                    >
                        Answer
                    </AnswerButton>
                </Flex>
            </Space>
        </QuestionContainer>
    )
}

export default QuizQuestion