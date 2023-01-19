import React from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
// react component used to create alerts
// react-bootstrap components
const Quiz = () => {
    const questions = [
        {
            questionText: 'Y a-t-il de mutation?',
            answerOptions: [
                { answerText: 'Oui', isCorrect: true },
                { answerText: 'Non', isCorrect: false },
            ],
        },

        {
            questionText: 'Sensible a la pyridoxine?',
            answerOptions: [
                { answerText: 'Sensible ', isCorrect: true },
                { answerText: 'Non sensible ', isCorrect: false },

            ],
        },

    ];

    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [showrusult, setShowresult] = React.useState(false);
    const [result, setResult] = React.useState('Greffe Rénale');
    const [results, setResults] = React.useState('Greffe Hépatorénale');


    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setShowresult(result);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else if (isCorrect) { setShowresult(result) } else {
            setShowresult(results);
        }
    };

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
    const location = useParams();
    return (
        <div className='app'>
            <div class="topnav" id="myTopnav">
                <a href={"/patient/dossier/" + location.id} class="active">Upload file</a>
                <a href={"/patient/dossier/quiz/" + location.id} class="active">Questionnaire</a>
                <a href={"/patient/dossier/adadose/" + location.id} class="active">Adaptation du dose</a>
                <a href={"/patient/dossier/ListNote/" + location.id} className="active">Notebook</a>

            </div>
            {showrusult ? (

                <div className='score-section'>
                    <h4 className="title">                    Résultat                </h4>
                    <Card className="card-header">

                        <Card.Body>   {showrusult}</Card.Body></Card>
                </div>
            ) : (
                <>
                    <h4 className="title">Questionnaire</h4>
                    <Card className="card-header">
                        <Card.Body>
                            <div className='question-section'>
                                <div className='question-count'>
                                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                                </div>
                                <hr></hr>
                                <div className='question-text'>{questions[currentQuestion].questionText}</div>
                            </div>
                            <br></br>
                            <div className='answer-section'>
                                {questions[currentQuestion].answerOptions.map((answerOption) => (
                                    <Button className="btn btn-info mr-1" onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</Button>
                                ))}
                            </div></Card.Body></Card>
                </>
            )}
        </div>


    )
}

export default Quiz