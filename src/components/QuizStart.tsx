import { FC } from "react"
import styled from "styled-components"
import { Button, InputNumber, InputNumberProps, Space } from "antd"
import useAppSelector from "../hooks/useAppSelector"
import useAppDispatch from "../hooks/useAppDispatch"
import { changeQuestionCount, changeQuizStatus } from "../store/reducers/quizReducer"
import { QuizStatus } from "../types/quiz"

const PageWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const QuizStartBlock = styled.div`
    background: #CBFFE4;
    padding: 10px 15px;
    margin: 10px;
    border: 1px solid #000;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 3px rgba(34, 60, 80, 0.2);
`

const Title = styled.div`
    text-align: center;
`

const StartButton = styled(Button)`
    background: #CBE4FF;
    border: 1px solid #000;
`


const QuizStart: FC = () => {
    const { questionCount } = useAppSelector(state => state.quiz)
    const dispatch = useAppDispatch()

    const onChange: InputNumberProps['onChange'] = (value) => {
        const numericValue = Number(value)
        if (isNaN(numericValue)) {
            return
        }
        const questionCountValue = numericValue || 5
        dispatch(changeQuestionCount(questionCountValue))
    }

    return (
        <PageWrapper>
            <QuizStartBlock>
                <Space
                    direction="vertical"
                    size="middle"
                    align="center"
                >
                    <Title>
                        Select the number of questions:
                    </Title>
                    <InputNumber
                        min={5}
                        max={20}
                        value={questionCount}
                        onChange={onChange}
                    />
                    <StartButton onClick={() => dispatch(changeQuizStatus(QuizStatus.PROGRESS))}>
                        Start quiz
                    </StartButton>
                </Space>
            </QuizStartBlock>
        </PageWrapper>
    )
}

export default QuizStart