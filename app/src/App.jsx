import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Menu from "./Menu";
import Question from "./Question";

function App() {
    const [isStarted, setIsStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [count, setCount] = useState(0); // state used to trigger a new trivia
    const [checked, setChecked] = useState(false);
    const [correct, setCorrect] = useState(0);

    useEffect(() => {
        const shuffleAnswers = (array) => array.sort(() => Math.random() - 0.5);
        const API_URL = "https://opentdb.com/api.php?amount=10";

        async function getData() {
            const res = await fetch(API_URL);
            const data = await res.json();
            // create an array of objects containing answers & question
            let dataArray = [];

            data.results.forEach((quiz) => {
                dataArray.push({
                    id: nanoid(),
                    answers: shuffleAnswers([
                        ...quiz.incorrect_answers,
                        quiz.correct_answer,
                    ]),
                    question: quiz.question,
                    isCorrect: quiz.correct_answer,
                    isSelected: null, // to track user interactions
                    isChecked: false, // for final score
                });
            });
            setQuestions(dataArray);
        }

        getData();
    }, [count]);

    function handleCheckAnswers() {
        // It starts by assuming all answers are selected
        let selected = true;

        // Check if any answer is not selected
        questions.forEach((question) => {
            if (question.isSelected === null) {
                // if the user hasn't selected an answer
                selected = false;
                return; // exit the function
            }
        });

        // If any question is not selected, exit until the user select an answer before proceeding
        if (!selected) {
            return;
        }

        // Mark all questions as checked
        setQuestions((questions) =>
            questions.map((question) => {
                return {
                    ...question,
                    isChecked: true, // update the property to true for each question
                };
            })
        );

        // Update the state for checked
        setChecked(true);

        // Count correct answers
        let correct = 0;
        questions.forEach((question) => {
            if (question.isCorrect === question.isSelected) {
                correct += 1;
            }
        });
        //Update count of correct answers
        setCorrect(correct);
    }

    function handlePlayAgain() {
        setCount((prevCount) => prevCount + 1);
        setChecked(false);
    }

    function handleClickAnswer(id, answer) {
        setQuestions((prevState) =>
            prevState.map((object) => {
                return object.id === id
                    ? { ...object, isSelected: answer }
                    : object;
            })
        );
    }

    function startTrivia() {
        setIsStarted((prevState) => !prevState);
    }

    const questionElement = questions
        ? questions.map((question) => {
            return (
                <Question
                    key={question.id}
                    id={question.id}
                    question={question}
                    handleClickAnswer={handleClickAnswer}
                />
            );
        })
        : [];

    return (
        <div>
            <div>
                {isStarted ? (
                    <div className="main-container">
                        {questionElement}
                        <div className="end-game-container">
                            {checked && (
                                <span className="score">
                                    You scored {correct}/10 correct answers
                                </span>
                            )}
                            <button
                                className="btn-score"
                                onClick={
                                    checked
                                        ? handlePlayAgain
                                        : handleCheckAnswers
                                }
                            >
                                {checked ? "Play Again" : "Check Answer"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <Menu start={startTrivia} />
                )}
            </div>
        </div>
    );
}

export default App;
