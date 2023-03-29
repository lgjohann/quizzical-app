import React from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import he from "he";
import { nanoid } from "nanoid";

function App() {
	const [checkAnswersController, setCheckAnswersController] =
		React.useState(false);
	const [correctAnswersCounter, setCorrectAnswersCounter] = React.useState(0);
	const [endGame, setEndGame] = React.useState(false);
	const [start, setStart] = React.useState(false);
	const [questions, setQuestions] = React.useState<
		[
			{
				correctAnswer: string;
				incorrectAnswers: string[];
				question: string;
				id: string;
			}
		]
	>([
		{
			correctAnswer: "",
			incorrectAnswers: [""],
			question: "",
			id: "",
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
	}, []);

	const questionsComponents = questions.map((question) => {
		return (
			<Question
				question={question.question}
				incorrectAnswers={question.incorrectAnswers}
				correctAnswer={question.correctAnswer}
				key={question.id}
				handleClick={handleClick}
				checkAnswersController={checkAnswersController}
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
			} else {
				input.style.backgroundColor = "#f5f7fbd7";
			}
		});
	}

	function checkAnswers(e: any) {
		// Acessa os componentes Question renderizados
		let childNodes = e.currentTarget.parentElement.childNodes;
		let questionsComponents = [...childNodes];
		questionsComponents.pop();
		questionsComponents.pop();
		setCheckAnswersController(!checkAnswersController);

		if (e.currentTarget.innerText === "Check answers") {
			// Mapeia os compopnentes Question para buscar a resposta que foi selecionada
			questionsComponents.map((questionComponent, questionIndex) => {
				// Acessa as respostas do componente Question
				const childNodes = questionComponent.childNodes[1].childNodes;
				const childNodesArray = [...childNodes];

				// Verifica quais das respostas possuem a classe selected, e passa essa resposta para o array de respostas selecionadas.
				childNodesArray.map((answer) => {
					if (answer.className === "selected") {
						// Verifica se a resposta é correta e define a cor do botão de acordo
						answer.value === questions[questionIndex].correctAnswer
							? ((answer.style.backgroundColor = "#94D7A2"),
							  setCorrectAnswersCounter(
									(prevCorrectAnswersCounter) =>
										prevCorrectAnswersCounter + 1
							  ))
							: (answer.style.backgroundColor = "#F8BCBC");
					} else {
						answer.style.opacity = 0.5;
						if (
							answer.value ===
							questions[questionIndex].correctAnswer
						) {
							answer.style.backgroundColor = "#94D7A2";
						}
					}
				});
			});
		} else {
			setEndGame(!endGame);
		}
	}

	return (
		<main>
			{start ? (
				<div className="app--container">
					{questionsComponents}
					<h1 className="main-text">{`You scored ${correctAnswersCounter}/5 correct answers!`}</h1>
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
