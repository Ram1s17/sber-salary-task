import { FC } from "react"
import useAppSelector from "./hooks/useAppSelector"
import { QuizStatus } from "./types/quiz"
import QuizStart from "./components/QuizStart"


const App: FC = () => {
  const { status } = useAppSelector(state => state.quiz)

  if (status === QuizStatus.START) {
    return <QuizStart />
  }
  else if (status === QuizStatus.PROGRESS) {
    return <div>Quiz is in progress</div>
  }
  return (
    <div>Quiz is finished</div>
  )
}

export default App
