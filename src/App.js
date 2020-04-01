import React from 'react';
import './App.css';

class BreakLength extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.changeBreak(e)
  }

  render(){  
    return(
      <div className="col-6 mr-auto ml-auto">
        <h2 id="break-label">Break Length</h2>
        <h2 id="break-length">{this.props.breakLength}</h2>
          <button id="break-decrement" className="btn btn-info" onClick={this.handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"   className="feather feather-arrow-down"><line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline></svg>
          </button>
          <button id="break-increment" className="btn btn-info" onClick={this.handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"   className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12">
            </polyline></svg>
          </button>
        </div>
    )
  }
}

class SessionLength extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.changeSession(e)
  }

  render() {
    return(
      <div className="col-6 mr-auto ml-auto">
      <h2 id="session-label">Session Length</h2>
    <h2 id="session-length">{this.props.sessionLength}</h2>
      <button id="session-decrement" className="btn btn-info" onClick={this.handleClick}>
        <svg id="session-decrement" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down"><line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline></svg>
      </button>
      <button id="session-increment" className="btn btn-info" onClick={this.handleClick}>
      <svg id="session-increment" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-up"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12">
          </polyline></svg>
      </button>
    </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timeLeft: 0
    }

    this.initaliseClock = this.initaliseClock.bind(this);
    this.changeBreak = this.changeBreak.bind(this);
    this.changeSession = this.changeSession.bind(this);
    this.startStopClick = this.startStopClick.bind(this);
    this.resetClick = this.resetClick.bind(this);
  }

  initaliseClock(timeLeft) {
    let timeNow = new Date();

    // let m = timeNow.getMinutes();
    // let s = timeNow.getSeconds();
    // setTimeout(alert("CLOCK INITIALISED"),3000);
  }

  changeBreak(e) {
    if(e.currentTarget.id==='break-decrement' && this.state.breakLength===1)
      this.setState({ breakLength: 1 })
    else if(e.currentTarget.id==='break-increment' && this.state.breakLength===60)
      this.setState({ breakLength: 60 })
    else 
      e.currentTarget.id==='break-decrement' ? this.setState({ breakLength: --this.state.breakLength }) : this.setState({ breakLength: ++this.state.breakLength });
  }

  changeSession(e) {
    if(e.currentTarget.id==='session-decrement' && this.state.sessionLength===1)
      this.setState({ sessionLength: 1 })
    else if(e.currentTarget.id==='session-increment' && this.state.sessionLength===60)
      this.setState({ sessionLength: 60 })
    else 
      e.currentTarget.id==='session-decrement' ? this.setState({ sessionLength: --this.state.sessionLength }) : this.setState({ sessionLength: ++this.state.sessionLength });
  }

  componentDidMount() {
      // this.setState({
        // timeLeft
      // })
      // this.initaliseClock();
  }

  startStopClick() {

  }

  resetClick() {
    this.setState({ breakLength: 5, sessionLength: 25 })
  }
    
  render() {
    return(
      <div id="app-container" className="container bg-info mt-5 pt-5 text-center text-white">
        <div> 
          <h1>Pomodoro Clock</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10">
            </circle><polyline points="12 6 12 12 16 14"></polyline></svg>
        </div>
        <div className="row py-4">
          <BreakLength  breakLength={this.state.breakLength} changeBreak={this.changeBreak}/>
          <SessionLength sessionLength={this.state.sessionLength} changeSession={this.changeSession}/>
        </div>
        <div className="pt-4 pb-2">
          <h1 id="timer-label" className>Session</h1>
          <h1 id="time-left">{this.state.timeLeft}</h1>
        </div>
        <div className="row pb-5">
          <div className="col-6 text-right">
            <button id="start_stop" className="btn btn-info" onClick={this.startStopClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play">
                <polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause">
                <rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            </button>
          </div>
          <div className="col-6 text-left">
            <button id="reset" className="btn btn-info" onClick={this.resetClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10">
              </polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
