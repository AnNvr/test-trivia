export default function Menu(props) {
    return (
        <div className="menu">
            <h1>Quizzical</h1>
            <span className="page-description"
                >Test your skills about pop culture questions!
                </span>
            <button className="start-btn" onClick={() => props.start()}>Start Trivia</button>
        </div>
    )
}