import { FC } from "react"
import { Button, Flex, Space } from "antd"
import styled from "styled-components"
import useAppSelector from "../hooks/useAppSelector"
import useAppDispatch from "../hooks/useAppDispatch"
import { restartQuiz } from "../store/reducers/quizReducer"


const QuizResultBlock = styled.div`
    background: #CBFFE4;
    padding: 10px 15px;
    margin: 10px;
    border: 1px solid #000;
    border-radius: 10px;
    box-shadow: 5px 5px 10px 3px rgba(34, 60, 80, 0.2);
`

const Title = styled.div`
    font-weight: bold;
`
const ResultItem = styled.div`
    display: flex;
    align-items: center;
    & > div:first-child {
        margin-right: 5px;
        font-weight: bold;
    }
`

const RestartButton = styled(Button)`
    background: #CBE4FF;
    border: 1px solid #000;
`

const QuizResult: FC = () => {
    const { result } = useAppSelector(state => state.quiz)
    const dispatch = useAppDispatch()

    return (
        <QuizResultBlock>
            <Space
                direction="vertical"
                size="middle"
            >
                <Flex justify="center">
                    <Title>
                        Result
                    </Title>
                </Flex>
                {Object.entries(result).map(resultItem => (
                    <ResultItem key={resultItem[0]}>
                        <div>{resultItem[0]}:</div>
                        <div>{resultItem[1].correct} / {resultItem[1].total}</div>
                    </ResultItem>
                ))}
                <Flex justify="center">
                    <RestartButton onClick={() => dispatch(restartQuiz())}>
                        Restart
                    </RestartButton>
                </Flex>
            </Space>
        </QuizResultBlock>
    )
}

export default QuizResult