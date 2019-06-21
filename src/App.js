import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';

const newQuiz = [{
  name: "Food Quiz",
  author: "Joel",
  questions: [
    {
      questionName: "What do you like most?",
      answers: [
        {
          text: "Bananas"
        },
        {
          text: "Apples"
        },
        {
          text: "Grapes"
        }
      ]
    },
    {
      questionName: "What do you like most?",
      answers: [
        {
          text: "Chicken"
        },
        {
          text: "Beef"
        },
        {
          text: "Pork"
        }
      ]
    },
    {
      questionName: "What do you like most?",
      answers: [
        {
          text: "Cucumber"
        },
        {
          text: "Carrot"
        },
        {
          text: "Potato"
        }
      ]
    }
  ]
}]

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quizzes: newQuiz
    }
  }
  // componentDidMount() {
  //   fetch('http://localhost:8080/get-all-quizzes')
  //     .then(response => {
  //       return response.json();
  //     })
  //     .then(myJson => {
  //       console.log(myJson);
  //       this.setState({
  //         quizzes: myJson,
  //       }, () => {
  //         console.log(this.state.quizzes);
  //       })
  //       console.log(this.state.quizzes);
  //     });
  // }


  handleAddQuiz = (e) => {
    e.preventDefault(); //Without this, method will execute as soon as button is rendered
    fetch('http://localhost:8080/add-quiz', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newQuiz),
    })
      .then(res => { // res can be anything (Stands for result)
        if (res.status === 200) {
          console.log("Quiz Added")
        } else {
          console.log("Something died")
        }
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    return (
      <div className="App">

        <nav class="navbar navbar-light bg-light">
          <span class="navbar-brand mb-0 h1">New Quiz</span>

          <i class="far fa-plus-square add-icon" onClick={e => this.handleAddQuiz(e)}></i>
        </nav>
        <div class="container">
          {this.state.quizzes.map((quiz, index) => {
            return (
              <div key={index}>
                <p>Quiz Name: {quiz.name}</p>
                <p>Author: {quiz.author}</p>
                {
                  quiz.questions.map((question, index) => {
                    return (
                      <div key={index}>
                        <p>Question {index + 1}: {question.questionName}</p>
                        {question.answers.map((answer, index) => {
                          return (
                            <p key={index}>
                              {answer.text}
                            </p>
                          )
                        })}
                      </div>
                    )
                  })
                }
                <hr />
              </div>
            )
          })}
        </div>
      </div>
    );
  }


}



export default App;
