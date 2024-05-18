import { FC, useEffect } from "react"
import useAppSelector from "../hooks/useAppSelector"
import useAppDispatch from "../hooks/useAppDispatch"
import { fetchQuestions } from "../store/reducers/actionCreators"

const QuizQuestion: FC = () => {
    const { questionCount, isLoading, error, questions } = useAppSelector(state => state.quiz)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchQuestions(questionCount))
    }, [])

    if (isLoading) {
        return <div>Loading...</div>
    }
    else if (!!error) {
        return <div>{error}</div>
    }
    return (
        <div>{JSON.stringify(questions[0])}</div>
    )
}

export default QuizQuestion