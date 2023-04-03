import React from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import he from "he";
import { nanoid } from "nanoid";

type question = {
	correctAnswer: string;
	incorrectAnswers: string[];
	question: string;
	id: string;
	selectedAnswer: string;
};

function App() {
	const [checkAnswersController, setCheckAnswersController] =
		React.useState(false);
	const [correctAnswersCounter, setCorrectAnswersCounter] = React.useState(0);
	const [endGame, setEndGame] = React.useState(false);
	const [start, setStart] = React.useState(false);
	const [questions, setQuestions] = React.useState<question[]>([
		{
			correctAnswer: "",
			incorrectAnswers: [""],
			question: "",
			id: "",
			selectedAnswer: "",
		},
	]);
	React.useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=4&type=multiple")
			.then((response) => response.json())
			.then((data) => {
				let questionsArray = data.results.map(
					(item: {
						correct_answer: string;
						incorrect_answers: string[];
						question: string;
					}) => {
						return {
							correctAnswer: he.decode(item.correct_answer),
							incorrectAnswers: item.incorrect_answers.map(
								(item: string) => he.decode(item)
							),
							question: he.decode(item.question),
							id: nanoid(),
						};
					}
				);

				return setQuestions(questionsArray);
			});
	}, [endGame]);

	const questionsComponents = questions.map((question) => {
		return (
			<Question
				question={question.question}
				incorrectAnswers={question.incorrectAnswers}
				correctAnswer={question.correctAnswer}
				key={question.id}
				id={question.id}
				handleClick={handleClick}
				checkAnswersController={checkAnswersController}
				selectedAnswer={question.selectedAnswer}
			/>
		);
	});

	function startClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault();
		setStart((prevStart) => !prevStart);
	}

	function handleClick(e: any) {
		let childNodes = e.currentTarget.parentElement.childNodes;
		let inputs = [...childNodes];
		inputs.map((input) => {
			if (input.value === e.currentTarget.value) {
				input.style.backgroundColor = "#D6DBF5";
				input.classList.add("selected");
				setQuestions((prevQuestions): question[] =>
					prevQuestions.map((question: question): question => {
						const QuestionComponentID = input.parentElement.id;
						return QuestionComponentID === question.id
							? {
									...question,
									selectedAnswer: input.value,
							  }
							: question;
					})
				);
			} else {
				input.style.backgroundColor = "#f5f7fbd7";
			}
		});
	}

	function checkAnswers() {
		numRightAnswers();
		setCheckAnswersController(!checkAnswersController);
		checkAnswersController
			? (setEndGame(!endGame), setCorrectAnswersCounter(0))
			: undefined;
	}

	function numRightAnswers() {
		questionsComponents.map((question) => {
			question.props.selectedAnswer === question.props.correctAnswer
				? setCorrectAnswersCounter(
						(prevCorrectAnswerController) =>
							prevCorrectAnswerController + 1
				  )
				: undefined;
		});
	}
	console.log("render");
	return (
		<main>
			{start ? (
				<div className="app--container">
					{questionsComponents}
					<h1 className="main-text">{`You scored ${
						checkAnswersController ? correctAnswersCounter : "0"
					}/4 correct answers!`}</h1>
					<button
						className="check--answers"
						onClick={checkAnswers}
					>
						{!checkAnswersController
							? "Check answers"
							: "Play again!"}
					</button>
				</div>
			) : (
				<Intro
					started={start}
					startClick={startClick}
				/>
			)}
		</main>
	);
}

export default App;
