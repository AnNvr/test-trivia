import { useState, useEffect } from "react";
import he, { decode } from "he";
import { nanoid } from "nanoid";
import Quiz from "./components/Quiz";

const decodeHTML = (html) => {
  return he.decode(html)
}

function App() {
  const [quiz, setQuiz] = useState([])
  const [selectedAnswerId, setSelectedAnswerId] = useState("")
  const [selectedAnswerByUser, setSelectedAnswerByUser] = useState([])

  // TODO:
  // 1. Initialise state to hold the selectedAnswersByUser
  // 2. Create a function to update state and pass it to Child component
  // 3. Update State on User Interaction
  // 4. Pass the selected answer as a props to child component

  useEffect(() => {
      async function getData() {
          try {
              const res = await fetch("https://opentdb.com/api.php?amount=10")
              const data = await res.json()

              const quizWithIds = data.results.map(question => {
                const incorrectAnswers = question.incorrect_answers.map(answer => ({
                  id: nanoid(),
                  text: decodeHTML(answer),
                  isCorrect: false,
                }));
                
                const correctAnswer = {
                  id: nanoid(),
                  text: decodeHTML(question.correct_answer),
                  isCorrect: true,
                };

                const answers = [...incorrectAnswers, correctAnswer]

                return {
                  ...question,
                  answers
                }
              })
              console.log('Data from API:', data);
              console.log('Quiz with IDs:', quizWithIds);

              setQuiz(quizWithIds) // This is my state!
          } catch (error) {
              console.log("Error fetching data: ", error)
          }
      }
      getData()
  }, [])

  // TODO: function toggle() to conditionally render style props on clicked answers
/*   function toggle(answer) {
    console.log("Clicked answer:", answer)
    setSelectedAnswerId(answer.id)
  } */

  function toggle(answer) {
    console.log("Clicked answer:", answer);
  
    // Check if the answer is already selected
    const isSelected = selectedAnswerByUser.includes(answer.id);
  
    // If selected, remove it; otherwise, add it to the array
    setSelectedAnswerByUser(prevSelectedAnswers => {
      return isSelected
        ? prevSelectedAnswers.filter(id => id !== answer.id)
        : [...prevSelectedAnswers, answer.id];
    });
  
    setSelectedAnswerId(answer.id);
  }
  

  const quizElements = quiz.map(obj => (
    <Quiz
        key={obj.id}
        id={obj.id}
        question={decodeHTML(obj.question)}
        answers={obj.answers} // Pass the entire answers array to Quiz
        toggle={toggle}
        selectedAnswerId={selectedAnswerId}
        selectedAnswerByUser={selectedAnswerByUser}
        />
  ))

  return (
    <div className="quiz-page">
      {quizElements}
    </div>
  )
}

export default App
