import React from 'react';
import './App.css';

const INTIALSTATE = {
  breakLength: 5,
  sessionLength: 25,
  sessionTimeLeft: 25*1000*60, 
  sessionTimer: 0, 
  breakTimeLeft: 5*1000*60, 
  breakTimer: 0, 
  isRunning: false,
}

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
    this.state = INTIALSTATE

    this.getTimeLeft = this.getTimeLeft.bind(this);
    this.initSessionClock = this.initSessionClock.bind(this);
    this.initBreakClock = this.initBreakClock.bind(this);
    this.changeBreak = this.changeBreak.bind(this);
    this.changeSession = this.changeSession.bind(this);
    this.startStopClick = this.startStopClick.bind(this);
    this.resetClick = this.resetClick.bind(this);
  }

  getTimeLeft(time_ms) {
    let m = Math.floor((time_ms % (1000 * 60 * 60)) / (1000 * 60));
    let s = Math.floor((time_ms % (1000 * 60)) / 1000);
    
    if(time_ms===60*1000*60)
      return `60:00`;
    else if(m>=0 && m<10)
      return s>=0 && s<10 ? `0${m}:0${s}` : `0${m}:${s}`;
    else
      return s>=0 && s<10 ? `${m}:0${s}` : `${m}:${s}`;
  }

  initSessionClock(time_ms) {
    let timer = setInterval(() => {
      time_ms -= 1000;
  
      this.setState({ sessionTimeLeft: time_ms }); 

      if(this.state.sessionTimeLeft===0) {}
        this.audio.play();
      if(this.state.sessionTimeLeft<0) {
        clearInterval(this.state.sessionTimer);
        this.setState({ breakTimer: this.initBreakClock(this.state.breakLength*60*1000)}); 
      }
    }, 1000)
    return timer;
  }

  initBreakClock(time_ms) {
    let timer = setInterval(() => {
      time_ms -= 1000;
      
      this.setState({ breakTimeLeft: time_ms}); 
      
      if(this.state.breakTimeLeft===0) {
        this.audio.play();
      }
      if(this.state.breakTimeLeft<0) {
        this.setState({ sessionTimer: this.initSessionClock(this.state.sessionLength*60*1000), sessionTimeLeft:this.state.sessionLength*60*1000 }); 
        clearInterval(this.state.breakTimer);
      }
    }, 1000)
    return timer;
  }

  changeBreak(e) {
    if(e.currentTarget.id==='break-decrement' && this.state.breakLength<=1)
      this.setState({ breakLength: 1, breakTimeLeft: 1*1000*60 })
    else if(e.currentTarget.id==='break-increment' && this.state.breakLength>=60)
      this.setState({ breakLength: 60, breakTimeLeft: 60*1000*60 })
    else 
      e.currentTarget.id==='break-decrement' ? this.setState({ breakLength: this.state.breakLength-1, breakTimeLeft: (this.state.breakLength-1)*1000*60 }) : 
                                                this.setState({ breakLength: this.state.breakLength+1, breakTimeLeft: (this.state.breakLength+1)*1000*60 });
  }

  changeSession(e) {
    if(!this.state.isRunning)
      if(e.currentTarget.id==='session-decrement' && this.state.sessionLength<=1)
        this.setState({ sessionLength: 1, sessionTimeLeft: 1*1000*60 })
      else if(e.currentTarget.id==='session-increment' && this.state.sessionLength>=60)
        this.setState({ sessionLength: 60, sessionTimeLeft: 60*1000*60 })
      else 
        e.currentTarget.id==='session-decrement' ? this.setState({ sessionLength: this.state.sessionLength-1, sessionTimeLeft: (this.state.sessionLength-1)*1000*60 }) : 
                                                    this.setState({ sessionLength: this.state.sessionLength+1, sessionTimeLeft: (this.state.sessionLength+1)*1000*60 });
  }  
  
  startStopClick() {
    if(!this.state.isRunning && this.state.sessionTimeLeft>=0) { 
      this.setState({ sessionTimer: this.initSessionClock(this.state.sessionTimeLeft) });
    }
    else if(!this.state.isRunning && this.state.breakTimeLeft>=0) { 
      this.setState({ breakTimer: this.initBreakClock(this.state.breakTimeLeft) });
    }
    else {
      clearInterval(this.state.sessionTimer);
      clearInterval(this.state.breakTimer);
    }

    this.setState({ isRunning: !this.state.isRunning });
  }
  
  resetClick() {
    clearInterval(this.state.sessionTimer);
    clearInterval(this.state.breakTimer);
    this.setState(INTIALSTATE);

    this.audio.pause();
    this.audio.currentTime = 0;
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
          { this.state.sessionTimeLeft>=0 || this.state.breakTimeLeft<0 ?
            <div>
              <h1 id="timer-label">Session</h1> 
              <h1 id="time-left">{this.getTimeLeft(this.state.sessionTimeLeft)}</h1> 
            </div> :
            <div> 
            <h1 id="timer-label">Break</h1> 
            <h1 id="time-left">{this.getTimeLeft(this.state.breakTimeLeft)}</h1>
            </div> 
          }
          <audio id="beep" src="./BeepSound.wav" ref={(aud) => { this.audio = aud; }}></audio>
        </div>
        <div className="row pb-5">
          <div className="col-6 text-right">
            <button id="start_stop" className="btn btn-info" onClick={this.startStopClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-play">
                <polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pause">
                <rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            </button>
          </div>
          <div className="col-6 text-left">
            <button id="reset" className="btn btn-info" onClick={this.resetClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-refresh-cw"><polyline points="23 4 23 10 17 10">
              </polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default App;