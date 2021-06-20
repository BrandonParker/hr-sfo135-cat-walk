import React from 'react';
import QuestionsList from './QuestionsList.jsx';
import SearchBox from './SearchBox.jsx';
import axios from 'axios';
import Modal from './Modal.jsx';
import style from './QA_CSS/QA.module.css';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product_id: this.props.product_id,
      visibleQuestions: [],
      allQuestions: [],
      count: 2,
      filteredQuestions: [],
      filterON: false,

      modal: false
    };
    this.maxPerPage = 50;
    this.nextPage = 1;
    this.doneFetch = false;

    this.prevVisible = null;
    this.prevCount = 2;

    this.getQuestions = this.getQuestions.bind(this);

    this.handleLoadQuestionsClick = this.handleLoadQuestionsClick.bind(this);

    this.handleSearchBarInputChange = this.handleSearchBarInputChange.bind(this);
    this.filterQuestions = this.filterQuestions.bind(this);

    this.handleAddQuestionSubmit = this.handleAddQuestionSubmit.bind(this);

    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  modalOpen() {
    this.setState({
      modal: true
    })
  }

  modalClose() {
    this.setState({
      modal: false
    })
  }

  handleAddQuestionSubmit(e) {
      e.preventDefault(e);

      var body = document.getElementById("body").value;
      var name = document.getElementById("name").value;
      var email = document.getElementById("email").value;

      axios({
        method: "post",
        url: "/qa/questions",
        data: {
          "product_id": this.state.product_id,
          "body": body,
          "name": name,
          "email": email
        }
      })
      .then(res => {
        console.log(res.status);
        this.modalClose();
      })
      .catch(err => {console.log(err);})
  }

  filterQuestions(searchTerm) {
    var questions = this.state.allQuestions;
    var filtered = [];

    for (var i = 0; i < questions.length; i++) {
      if (questions[i].question_body.toUpperCase().indexOf(searchTerm) > -1) {
        filtered.push(questions[i]);
      }
    }

    this.setState({
      filteredQuestions: filtered,
      count: 2,
      visibleQuestions: filtered.slice(0, 2)
    })
  }

  handleSearchBarInputChange(e) {
    var searchTerm = e.target.value.toUpperCase();

    this.prevVisible = this.prevVisible || this.state.visibleQuestions;

    if (searchTerm.length >= 3) {
      this.setState({
        filterON: true
      })
      this.filterQuestions(searchTerm);
    } else {
      this.setState({
        filterON: false,
        filteredQuestions: [],
        count: this.prevVisible.length,
        visibleQuestions: this.prevVisible
      })
    }
  }

  handleLoadQuestionsClick() {
    this.setState({
      count: this.state.count + 2
    }, () => {
      this.setState({
        visibleQuestions: (this.state.filterON) ? this.state.filteredQuestions.slice(0, this.state.count) : this.state.allQuestions.slice(0, this.state.count)
      })
    })
  }

  getQuestions() {
    const options = {
      'method': 'GET',
      'url': `/qa/questions/${this.state.product_id}/${this.nextPage}/${this.maxPerPage}`
    }
    axios(options)
      .then(response => {
        this.nextPage++;
        this.doneFetch = response.data.length < this.maxPerPage;

        if (this.state.visibleQuestions.length === 0) {
          this.setState({
            visibleQuestions: response.data.slice(0, this.state.count)
          });
        }

        this.setState({
          allQuestions: this.state.allQuestions.concat(response.data)
        }, () => {
          if (!this.doneFetch) {
            this.getQuestions();
          }
        })
      })
  }

  componentDidMount() {
    this.getQuestions();
  }

  render() {
    return (
      <div className={style.QuestionsAndAnswers}>

        <h3>{'QUESTIONS & ANSWERS'} </h3>

        <SearchBox handleInputChange={this.handleSearchBarInputChange}/>

        <QuestionsList questions={this.state.visibleQuestions} product_id={this.state.product_id}/>

        {(this.state.modal) ? <Modal handleSubmit={this.handleAddQuestionSubmit} handleClose={this.modalClose} /> : null}

        <div className={style.questionbuttons}>
          {(((!this.state.filterON) ? this.state.allQuestions.length : this.state.filteredQuestions.length) > this.state.count) ? <button id="questions-load-button" onClick={this.handleLoadQuestionsClick}> MORE ANSWERED QUESTIONS </button> : <></>}

          <button id="questions-add-button" onClick={this.modalOpen}> ADD A QUESTION + </button>
        </div>

      </div>
    )
  }
}

export default QuestionsAndAnswers;