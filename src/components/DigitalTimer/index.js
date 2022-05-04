// Write your code here
import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    timerCount: 25,
    timerSeconds: 1500,
    playMode: false,
    timerStarted: false,
  }

  onDecreaseCount = () => {
    this.setState(prevState => ({
      timerCount: prevState.timerCount - 1,
      timerSeconds: prevState.timerSeconds - 60,
    }))
  }

  onIncreaseCount = () => {
    this.setState(prevState => ({
      timerCount: prevState.timerCount + 1,
      timerSeconds: prevState.timerSeconds + 60,
    }))
  }

  onPlayClick = () => {
    this.intervalId = setInterval(() => {
      this.setState(prevState => {
        if (prevState.timerSeconds === 0) {
          clearInterval(this.intervalId)
          this.setState({
            timerCount: 25,
            timerSeconds: 1500,
            playMode: false,
            timerStarted: false,
          })
        }
        return {
          timerSeconds: prevState.timerSeconds - 1,
          playMode: true,
          timerStarted: true,
        }
      })
    }, 1000)
  }

  onPauseClick = () => {
    clearInterval(this.intervalId)
    this.setState({playMode: false, timerStarted: true})
  }

  onResetClick = () => {
    clearInterval(this.intervalId)
    this.setState({
      timerCount: 25,
      timerSeconds: 1500,
      playMode: false,
      timerStarted: false,
    })
  }

  render() {
    const {timerCount, timerSeconds, playMode, timerStarted} = this.state
    const minutes = Math.floor(timerSeconds / 60)
    const seconds = Math.floor(timerSeconds % 60)
    const minutesDisplay =
      String(minutes).length === 1 ? `0${minutes}` : `${minutes}`
    const secondsDisplay =
      String(seconds).length === 1 ? `0${seconds}` : `${seconds}`

    const controlCom = playMode ? (
      <div className="control-con">
        <button
          type="button"
          className="control-button"
          onClick={this.onPauseClick}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
            alt="pause icon"
            className="icon"
          />
          Pause
        </button>
      </div>
    ) : (
      <div className="control-con">
        <button
          type="button"
          className="control-button"
          onClick={this.onPlayClick}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
            alt="play icon"
            className="icon"
          />
          Start
        </button>
      </div>
    )
    return (
      <div className="app-con">
        <div className="content-con">
          <h1>Digital Timer</h1>
          <div className="stopwatch-con">
            <div className="timer-con">
              <div className="timer">
                <h1 className="time">
                  {minutesDisplay}: {secondsDisplay}
                </h1>
                <p className="timer-status">
                  {playMode ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="timer-controls-con">
              <div className="controls">
                {controlCom}
                <div className="control-con">
                  <button type="button" className="control-button">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      alt="reset icon"
                      className="icon"
                      onClick={this.onResetClick}
                    />
                    Reset
                  </button>
                </div>
              </div>
              <p>Set timer limit</p>
              <div className="set-timer-con">
                <button
                  type="button"
                  className="set-timer-button"
                  onClick={this.onDecreaseCount}
                  disabled={timerStarted && true}
                >
                  -
                </button>
                <div className="timer-display">
                  <p>{timerCount}</p>
                </div>
                <button
                  type="button"
                  className="set-timer-button"
                  onClick={this.onIncreaseCount}
                  disabled={timerStarted && true}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
