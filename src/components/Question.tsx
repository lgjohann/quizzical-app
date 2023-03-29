import React from "react";

interface QuestionProps {
	question: string;
	incorrectAnswers: string[];
	correctAnswer: string;
	handleClick: (e: any) => void;
	checkAnswersController: boolean;
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

	return (
		<div className="question--container">
			<h1 className="main-text">{props.question}</h1>
			<div className="answers">
				<input
					type="button"
					value={shuffledAnswers[0]}
					onClick={
						props.checkAnswersController === false
							? (e) => props.handleClick(e)
							: () => console.log("disabled")
					}
				/>
				<input
					type="button"
					value={shuffledAnswers[1]}
					onClick={
						props.checkAnswersController === false
							? (e) => props.handleClick(e)
							: () => console.log("disabled")
					}
				/>
				<input
					type="button"
					value={shuffledAnswers[2]}
					onClick={
						props.checkAnswersController === false
							? (e) => props.handleClick(e)
							: () => console.log("disabled")
					}
				/>
				<input
					type="button"
					value={shuffledAnswers[3]}
					onClick={
						props.checkAnswersController === false
							? (e) => props.handleClick(e)
							: () => console.log("disabled")
					}
				/>
			</div>
			<hr className="line" />
		</div>
	);
}
