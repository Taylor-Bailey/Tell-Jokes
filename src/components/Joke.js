import React, { Component } from 'react';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const btn ={backgroundColor: '#88D4F8'};
const btn2 ={backgroundColor: 'rgb(49, 49, 49)'};


function JokeSetup(props){
    return(
        <Card body inverse style={{ backgroundColor: 'rgb(49, 49, 49)', border: 'none', borderRadius: 0 }}>
         {props.jokeLoaded ?
            <span>
               <CardTitle>How About a {props.jokeType.charAt(0).toUpperCase() + props.jokeType.slice(1)} Joke?</CardTitle>
               <CardText>{props.jokeSetup}</CardText>
               {/*<Button color="info" onClick={props.showClicked}>TELL ME</Button>*/}
            </span>
            :
            <CardTitle>Getting a Joke</CardTitle>
         }
         {props.showResult ?
            <div> </div>
            :
            <Button color= "#4aa4ce" style={btn} bsClass="btn" onClick={() => { props.showClicked(props.index) }}>TELL ME</Button>
         }
      </Card>
    )
}

function Punchline(props){
    if(props.showResult){
        return(
            <div>
                <h5>{props.punch}</h5>
                <Button color="secondary" style={btn2} bsClass="btn2" onClick={props.getAnotherClicked}>Show Another</Button>
            </div>
        )
    }else{
        return null;
    }
}

class Joke extends Component { 

    constructor(props){
        super(props);

        this.state = {
            jokeLoaded: false,
            objREsult: {},
            showResult: false,
            error: null
        }

        //without this binding, showClicked calling this.setState is not available
        this.showClicked = this.showClicked.bind(this);
        this.getAnotherClicked = this.getAnotherClicked.bind(this);
    }

    componentDidMount(){
        //lifecycle hook
        console.log("componentDidMount");
        //now go get the joke
        this.getJoke();
    }

    showClicked(){
        console.log("showClicked");
        this.setState({
            showResult: true
        })
    }

    getAnotherClicked(){
        console.log("getAnother");
        this.setState({
            jokeLoaded: false,
            objResult: {},
            showResult: false,
            error: null
        }, this.getJoke());
    }

    getJoke(){
        console.log("getJoke");
        fetch("https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke")
        .then(res => res.json())
        .then(
            (result) => {
                console.log("result", result);
                this.setState({
                    jokeLoaded: true,
                    objResult: result,
                });
            },
            (error) => {
                this.setState ({
                    isLoaded: true,
                    error: error,
                });
            }
        )
    }

    render(){
        const {error, jokeLoaded, objResult, showResult} = this.state;
        if(error){
            return(
                <div>
                    <div>Error: {error.Message}</div>
                </div>
            )
        }else if(!jokeLoaded){
            return <h5>Loading...</h5> //only one line so does not need parentheses//
        }else{
            return(
                <div>
                    <JokeSetup jokeLoaded={jokeLoaded}
                    jokeSetup={objResult.setup}
                    jokeType={objResult.type}
                    showResult={showResult}
                    showClicked={this.showClicked} />
                    <Punchline showResult={showResult}
                    punch={objResult.punchline} 
                    getAnotherClicked={this.getAnotherClicked} />
                </div>
            )
        }
    };
}
export default Joke;