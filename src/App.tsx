import { FC } from "react"
import styled from "styled-components"
import useAppSelector from "./hooks/useAppSelector"
import { QuizStatus } from "./types/quiz"
import QuizStart from "./components/QuizStart"
import QuizQuestion from "./components/QuizQuestion"
import QuizResult from "./components/QuizResult"

const PageWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const App: FC = () => {
  const { status } = useAppSelector(state => state.quiz)

  if (status === QuizStatus.START) {
    return (
      <PageWrapper>
        <QuizStart />
      </PageWrapper>
    )
  }
  else if (status === QuizStatus.PROGRESS) {
    return (
      <PageWrapper>
        <QuizQuestion />
      </PageWrapper>
    )
  }
  return (
    <PageWrapper>
      <QuizResult />
    </PageWrapper>
  )
}

export default App
