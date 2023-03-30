import React from "react";

interface QuestionProps {
	question: string;
	incorrectAnswers: string[];
	correctAnswer: string;
	handleClick: (e: any) => void;
	checkAnswersController: boolean;
	selectedAnswer: string;
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
		// se a resposta estiver selecionada e errada = wronganswer
		// se a resposta estiver selecionada e correta = right answer
		// se a resposta não estiver selecionada e for correta = opacity 0.5 + right answer
		// se a resposta não estiver selecionada e for errada = opacity 0.5
		let useStyle;

		if (resposta === props.selectedAnswer) {
			if (resposta === props.correctAnswer) {
				useStyle = styles.rightAnswer;
			} else {
				useStyle = styles.wrongAnswer;
			}
		} // else {
		// 	return styles.notSelected;
		// }
		return useStyle;
	};

	return (
		<div className="question--container">
			<h1 className="main-text">{props.question}</h1>
			<div className="answers">
				<input
					type="button"
					value={shuffledAnswers[0]}
					onClick={
						!props.checkAnswersController
							? (e) => props.handleClick(e)
							: () => console.log("disabled")
					}
					style={
						props.checkAnswersController
							? style(shuffledAnswers[0])
							: undefined
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
					style={
						props.checkAnswersController
							? style(shuffledAnswers[1])
							: undefined
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
					style={
						props.checkAnswersController
							? style(shuffledAnswers[2])
							: undefined
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
					style={
						props.checkAnswersController
							? style(shuffledAnswers[3])
							: undefined
					}
				/>
			</div>
			<hr className="line" />
		</div>
	);
}
