import React from "react";

interface QuestionProps {
	question: string;
	incorrectAnswers: string[];
	correctAnswer: string;
	handleClick: (questionId: string, answer: string) => void;
	checkAnswersBoolean: boolean;
	selectedAnswer: string | undefined;
	id: string;
}

export default function Question(props: QuestionProps): JSX.Element {
	let answers: string[] = [...props.incorrectAnswers, props.correctAnswer];

	function shuffle(array: string[]) {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	}

	const [shuffledAnswers] = React.useState<string[]>(shuffle(answers));

	const styles = {
		wrongAnswer: {
			backgroundColor: "#F8BCBC",
		} as React.CSSProperties,

		rightAnswer: {
			backgroundColor: "#94D7A2",
		} as React.CSSProperties,

		notSelected: {
			opacity: 0.5,
		} as React.CSSProperties,
	};

	const style = (resposta: string): React.CSSProperties | undefined => {
		if (resposta === props.selectedAnswer) {
			if (resposta === props.correctAnswer) {
				return styles.rightAnswer;
			} else {
				return { ...styles.wrongAnswer, opacity: 0.5 };
			}
		} else {
			if (resposta === props.correctAnswer) {
				return styles.rightAnswer;
			}
			return styles.notSelected;
		}
	};

	return (
		<div className="question--container">
			<h1 className="main-text">{props.question}</h1>
			<div
				className="answers"
				id={props.id}
			>
				{shuffledAnswers.map((answer, idx) => (
					<input
						key={idx}
						type="button"
						value={answer}
						onClick={() => props.handleClick(props.id, answer)}
						disabled={props.checkAnswersBoolean}
						style={
							props.checkAnswersBoolean
								? style(answer)
								: props.selectedAnswer === answer
								? { backgroundColor: "#D6DBF5" } 
								: undefined
						}
					/>
				))}
			</div>
			<hr className="line" />
		</div>
	);
}
