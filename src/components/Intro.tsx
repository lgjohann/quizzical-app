import React from "react";

interface IntroProps {
	started: boolean;
	startClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Intro(props: IntroProps) {
	return (
		<div className="intro">
			<h1 className="title">Quizzical</h1>
			<p className="intro--text">
				Hello! this is a trivia quest game, press the button below to
				start!
			</p>
			<button
				className="intro--button"
				onClick={(e) => props.startClick(e)}
			>
				Start quiz
			</button>
		</div>
	);
}
