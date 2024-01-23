- DEPENDANCIES: nanoid for generating unique IDs and 'he' for decoding HTML entities of Trivial API DB.

- ARCHITECTURE: The project is built on simple React State since it involves two pages, organised in 3 main components: App, Menu, and Question. APP is the smart component that nests the entire state managment:
    * isStarted: controls wheter the quiz has started
    * questions: stores the fetched trivia objects in an array
    * count: counter state to trigger new trivia rounds
    * checked: indicates if the user has submitted all the answers
    * correct: it counts the number or correct answers

The API Open Trivia DB is fetched with useEffect, which updates the state when the component mounts or the count state changes.
Also, it hosts the logic for shuffling the answers for each question and store them in the state questions.

- HANDLING USER INTERACTIONS:
    * handleCheckAnswers: the function checks if all the questions have been answered and marks them as checked. Finally it calculate the total correct answers. The logic is as following; it starts assuming all the answers are selected (this is purely to flip a boolean value), iterate over the questions array and for each question check if any answer is not selected accessing to the isSelected property value. If the user hasn't selected an answer it leaves that answer on false and exit the function. If any question hasn't been selected at all it exits the function until the user select them all. Once all the questions are checked, map over the questions array and update the isChecked property to true, updating the state question accordingly. Finally, the calculation for correct answers out of the checked. Iterating over the updated questions array, for each question if the question selected is the question with the property is correct set to true, the correct value increase of +1 and update the state correct.
    * handlePlayAgain: reset the game updating the count state for tracking the previous result, and update the checked state to the default.
    * handleClickAnswer: updates the selected answer for each question. It takes 2 parameters, the id of the question and the selected answer. It updates the questions state mapping the previous state of things and returning an object (question) for which the selected object matches with its object id, and doing so, its isSelected property flips to true.

    QUESTION is a "dummy" component, although it hosts a few logics. It doesn't have any state, instead, it takes props from the App component. It's an element that render the question and the related answers. It maps over the answers array to render a button for each answer. Each button listens and triggers the function handleClick, which triggers another function handleClickAnswer from App to update the selected answer.
    
- STYLING TROUBLESHOOTING: the "dimmed" class is applied at first upfront to all the answers that are not correct when isChecked === true. Doing so, it allows the correct rendering of the class props that did not work in the conditional statement straightafter.
Only after this step, specific classes for correct and incorrect answers are applied. Is this order that ensure that "dimmed" is the default state for all non-correct answers once checked. Finally, the selected class is applied only when the question is not checked.