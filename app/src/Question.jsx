import { nanoid } from "nanoid"
import he from "he";

const decodeHTML = (html) => {
    return he.decode(html);
};


export default function Question(props) {
    const { question, handleClickAnswer } = props
    const { answers, isChecked, isSelected, isCorrect } = question

    function handleClick(answer) {
        if (!isChecked) {
            handleClickAnswer(question.id, answer);
        }
    }

    const answerElement = answers.map(answer => {
        let buttonClass = "answer"

        // Apply 'dimmed' class if the question is checked and the answer is not the correct one
        if (isChecked && answer !== isCorrect) {
            buttonClass += " dimmed"
        }

        // Apply 'correct' or 'incorrect' classes based on the answer status
        if (isChecked) {
            if (isCorrect === answer) {
                buttonClass += " correct"
            } else if (isSelected === answer) {
                buttonClass += " incorrect"
            }
        } else if (isSelected === answer) {
            buttonClass += " selected"
        }

        return (
            <button
                key={nanoid()}
                className={buttonClass}
                onClick={() => handleClick(answer)}
                >
                    {decodeHTML(answer)}
                </button>
        )
    })



    return (
        <div className="quiz-container">
            <h3 className="question">{decodeHTML(question.question)}</h3>
            <div className="answer-container">
                {answerElement}
            </div>
        </div>
    )
}