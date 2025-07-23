import React from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import he from "he";
import { nanoid } from "nanoid";

type QuestionType = {
	correctAnswer: string;
	incorrectAnswers: string[];
	question: string;
	id: string;
	selectedAnswer?: string;
};

function App() {
	const [questions, setQuestions] = React.useState<QuestionType[]>([]);
	const [start, setStart] = React.useState(false);
	const [checkAnswers, setCheckAnswers] = React.useState(false);
	const [correctCount, setCorrectCount] = React.useState(0);
	const [endGame, setEndGame] = React.useState(false);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		fetch("https://opentdb.com/api.php?amount=4&type=multiple")
			.then((res) => res.json())
			.then((data) => {
				const questionsArray = data.results.map(
					(item: {
						correct_answer: string;
						incorrect_answers: string[];
						question: string;
					}) => ({
						correctAnswer: he.decode(item.correct_answer),
						incorrectAnswers: item.incorrect_answers.map(answer => he.decode(answer)),
						question: he.decode(item.question),
						id: nanoid(),
						selectedAnswer: "",
					})
				);
				setQuestions(questionsArray);
			}).finally(() => {
				setLoading(false);
			})
	}, [endGame]);

	function handleAnswer(questionId: string, answer: string) {
		setQuestions((prev) =>
			prev.map((q) =>
				q.id === questionId ? { ...q, selectedAnswer: answer } : q
				
			)
		);
		
	}

	function handleCheckAnswers() {
		if (!checkAnswers) {
			const count = questions.filter(
				(q) => q.selectedAnswer === q.correctAnswer
			).length;
			setCorrectCount(count);
			setCheckAnswers(true);
		} else {
			setEndGame((prev) => !prev);
			setLoading((prev) => !prev);
			setCheckAnswers(false);
			setCorrectCount(0);
		}
	}

	function handleStart() {
		setStart(true);
	}

	const questionElements = questions.map((q) => (
		<Question
			key={q.id}
			question={q.question}
			incorrectAnswers={q.incorrectAnswers}
			correctAnswer={q.correctAnswer}
			id={q.id}
			selectedAnswer={q.selectedAnswer}
			handleClick={handleAnswer}
			checkAnswersBoolean={checkAnswers}
		/>
	));

	if (loading) {
		return <div className="loading">
			<h1>Loading...</h1>
		</div>;
	}
	return (
		<main>
			{start ? (
				<div className="questions--container">
					{questionElements}
					<div className="actions">
						{checkAnswers && (
							<h1>
								You scored {correctCount}/{questions.length} correct answers!
							</h1>
						)}
						<button className="check--answers" onClick={handleCheckAnswers}>
							{checkAnswers ? "Play again!" : "Check answers"}
						</button>
					</div>
				</div>
			) : (
				<Intro started={start} startClick={handleStart} />
			)}
		</main>
	);
}

export default App;
