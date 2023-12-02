import React from "react";

export class Exam extends React.Component {
    public componentDidMount() {
        document.title = "Exam - My React Application";
    }

    public render(): JSX.Element {
        return (
            <div>
                <h2>Exam</h2>
                <div>
                    <span> Here is where your work goes! </span>
                </div>
            </div>
        );
    }
}
