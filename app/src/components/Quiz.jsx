export default function Quiz(props) {

    const { question, answers, toggle, selectedAnswerByUser } = props;
    
    

    const defaultStyle = {backgroundColor: "", border: "1px solid #D6DBF5"}
    const selectedStyle = {backgroundColor: "#D6DBF5", border: "none"}


    return(
        <div className="trivia-obj">
            <h2>{question}</h2>
            <ul>
                {answers.map((answer) => (
                    <li
                        key={answer.id}
                        onClick={() => toggle(answer)}
                        /* style={answer.id === selectedAnswerId ? selectedStyle : defaultStyle} */
                        style={selectedAnswerByUser.includes(answer.id) ? selectedStyle : defaultStyle}
                        >{answer.text}</li>
                ))}
            </ul>
        </div>
    )
}