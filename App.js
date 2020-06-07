import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import { Questions } from './Components/Questions';

class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      screen: 'start',
      press: false,
      options: [],
      count: 1,
      selector: parseInt(Math.random()*15),
      selected: [],
      isCorrect: ['#1d1e22','#1d1e22','#1d1e22','#1d1e22'],
      score: 0
    }

    this.checkAnswer=this.checkAnswer.bind(this)
  }

  startquiz = () =>{
    this.setState({
      screen: 'quiz',
      question: Questions[this.state.selector].question,
      options: Questions[this.state.selector].options,
      answer: Questions[this.state.selector].answer,
      selected: [this.state.selector],
      selector: parseInt(Math.random()*15),
    })
  }

  proceed = () =>{
    if(this.state.selected.includes(this.state.selector)){
      this.setState({
        selector: parseInt(Math.random()*15),
      })
    }
    this.nextquestion()
  }

  nextquestion = () =>{
    for (let i = 0; i < 4; i++) {
      this.state.isCorrect[i] =  '#1d1e22'
    }
    if(this.state.count<=4 ){
      this.setState({
        question: Questions[this.state.selector].question,
        options: Questions[this.state.selector].options,
        answer: Questions[this.state.selector].answer,
        selected: [...this.state.selected, this.state.selector],
        selector: parseInt(Math.random()*15),
        press: false,
        count: this.state.count+1,
      })
    }
    else{
      this.setState({
        screen: 'finish',
      })
    }
  }

  finish = () =>{
    this.setState({
      screen: 'start',
      press: false,
      options: [],
      count: 1,
      selector: parseInt(Math.random()*15),
      selected: [],
      score: 0
    })
  }

  checkAnswer = (option) =>{
    if(option==this.state.answer){
      this.state.isCorrect[option]= 'green';
      this.setState({score: this.state.score+1});
    }
    else{
      this.state.isCorrect[option]= 'red';
      this.state.isCorrect[this.state.answer]= 'green';
    }
  }
  render(){
    if(this.state.screen==='start'){
      return(
          <View style={styles.starts}>
            <Text style={styles.headingText}> Welcome to Quiz App</Text>
            <TouchableOpacity 
            style={styles.startbutton}
            onPress={()=> this.startquiz()}>
              <Text style={styles.buttontext}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
      )
    }
    else if(this.state.screen==='finish'){
      return(
          <View style={styles.starts}>
            <Text style={styles.finalScore}>Your score is {this.state.score}/5</Text>
            <Text> </Text>
            <TouchableOpacity 
            style={styles.startbutton}
            onPress={()=> this.finish()}>
              <Text style={styles.buttontext}> Main Menu </Text>
            </TouchableOpacity>
          </View>
      )
    }
    else{
      let alias = this
      const allOptions = Object.keys(alias.state.options).map(function(obj){
        return(
        <TouchableOpacity 
        style={
          {backgroundColor: alias.state.isCorrect[obj],
           borderRadius: 50, 
           margin: 2,
           width: 300,
           height: 60
          }}
        onPress={()=> {alias.setState({press: true}), alias.checkAnswer(obj)}}
        disabled={alias.state.press===true}>
        <Text style={styles.opt}>{alias.state.options[obj]}</Text>
        </TouchableOpacity>
        )
      })
    return(
      <View >
        <View style={styles.header}>
          <Text style={styles.head}>Score: {this.state.score}</Text>
          <Text style={styles.head}>Question {this.state.count}/5</Text>
        </View>
          <View style={styles.container}>
            <Text style={styles.questiontext}>{this.state.question}</Text>
            {allOptions}
          </View>
          <View style={styles.end}>
            <TouchableOpacity 
              style={styles.next} 
              disabled={this.state.press===false}
              onPress={()=> this.proceed()}>
              <Text style={styles.nextText}> --> </Text>
            </TouchableOpacity>
          </View>
      </View>
    )}
  }
}

const styles = StyleSheet.create({
  finalScore: {
    fontSize: 30,
    paddingBottom: 20,
    color: '#d4d4dc'
  },
  background: {
    flex: 1,
  },
  headingText:{
    fontSize: 30,
    paddingBottom: 20,
    color: '#d4d4dc'
  },
  starts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1d1e22"
  },
  startbutton: {
    backgroundColor: '#feda6a',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 60,
    borderRadius: 50,
    marginTop: 30
  },
  buttontext: {
    fontSize: 24,
    color: '#1d1e22'
  },
  header: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: "#1d1e22"
  },
  head:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d4d4dc'
  },
  container: {
    display:'flex',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  questiontext: {
    padding: 20,
    marginBottom: 50,
    color: 'black',
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
 
  opt: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white',
    padding: 20,
  },
  end: {
    marginTop: 20,
    justifyContent: 'flex-end',
    alignItems:'flex-end'
  },
  next: {
    marginRight: 10,
    backgroundColor: '#feda6a',
    justifyContent: 'center',
    alignItems: "center",
    width: 100,
    height: 40,
    borderRadius: 20,
  },
  nextText: {
    fontSize: 20,
    color: '#1d1e22'
  }
});

export default App;