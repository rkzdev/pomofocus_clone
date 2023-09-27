import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

enum STATUS {
  POMODORO = 'pomodoro',
  SHORT_BREAK = 'shortBreak',
  LONG_BREAK = 'longBreak',
}

const settings = {
  pomodoro: {
    minutes: 25,
  },
  shortBreak: {
    minutes: 5,
  },
  longBreak: {
    minutes: 10,
  },
}

export default function RootPage() {
  const [status, setStatus] = useState(STATUS.POMODORO)
  const [minutes, setMinutes] = useState(settings.pomodoro.minutes)
  const [seconds, setSeconds] = useState(60)
  const [timerStatus, setTimerStatus] = useState<'started' | 'paused' | 'idle'>(
    'idle',
  )
  const timerRef = useRef(0)

  useEffect(() => {
    if (seconds === 0) {
      setSeconds(60)

      if (minutes !== 0) {
        setMinutes((prev) => prev - 1)
      }
    }
  }, [status, seconds, minutes])

  const handleChangeStatus = (status: STATUS) => {
    setStatus(status)

    clearInterval(timerRef.current)
    setTimerStatus('idle')

    switch (status) {
      case STATUS.POMODORO:
        setMinutes(settings.pomodoro.minutes)
        break
      case STATUS.SHORT_BREAK:
        setMinutes(settings.shortBreak.minutes)
        break
      case STATUS.LONG_BREAK:
        setMinutes(settings.longBreak.minutes)
        break
    }

    setSeconds(60)
  }

  const handleStartTimer = () => {
    if (timerStatus === 'idle') {
      setMinutes((prev) => prev - 1)
    }
    setTimerStatus('started')
    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev - 1)
    }, 1000)
  }

  const handlePauseTimer = () => {
    setTimerStatus('paused')
    clearInterval(timerRef.current)
  }

  const formatNumber = (value: number) => {
    return value < 10 ? `0${value}` : value === 60 ? '00' : value
  }

  return (
    <div className="antialiased max-w-xl mx-auto">
      <header className="h-16 flex justify-between items-center border-b border-teal-700">
        <h1 className="font-bold text-lg tracking-wide text-white">
          Pomofocus
        </h1>
        <nav>
          <ul className="flex gap-2 text-sm">
            <li>
              <button className="bg-opacity-20 bg-white text-white py-1 px-3 hover:bg-opacity-25 rounded">
                Report
              </button>
            </li>
            <li>
              <button className="bg-opacity-20 bg-white text-white py-1 px-3 hover:bg-opacity-25 rounded">
                Setting
              </button>
            </li>
            <li>
              <Link
                className="bg-opacity-20 bg-white text-white py-1 px-3 hover:bg-opacity-25 rounded inline-block"
                to={'/login'}
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <div className="max-w-md mx-auto bg-white bg-opacity-20 rounded my-10 text-center text-white py-8">
          <div>
            <button
              className={`py-1 px-2 rounded font-semibold ${status == STATUS.POMODORO
                  ? 'bg-black bg-opacity-30 font-bold'
                  : ''
                }`}
              onClick={() => handleChangeStatus(STATUS.POMODORO)}
            >
              Pomodoro
            </button>
            <button
              className={`py-1 px-2 rounded font-semibold ${status == STATUS.SHORT_BREAK
                  ? 'bg-black bg-opacity-30 font-bold'
                  : ''
                }`}
              onClick={() => handleChangeStatus(STATUS.SHORT_BREAK)}
            >
              Short Break
            </button>
            <button
              className={`py-1 px-2 rounded font-semibold ${status == STATUS.LONG_BREAK
                  ? 'bg-black bg-opacity-30 font-bold'
                  : ''
                }`}
              onClick={() => handleChangeStatus(STATUS.LONG_BREAK)}
            >
              Long Break
            </button>
            <div className="font-bold py-8 space-x-4">
              <span className="text-8xl inline-block w-32">
                {formatNumber(minutes)}
              </span>
              <span className="text-8xl inline-block">:</span>
              <span className="text-8xl inline-block w-32">
                {formatNumber(seconds)}
              </span>
            </div>

            {(timerStatus === 'idle' || timerStatus === 'paused') && (
              <button
                onClick={handleStartTimer}
                className="uppercase font-black mt-4 py-4 rounded px-16 bg-white text-xl text-teal-600 tracking-wide"
              >
                start
              </button>
            )}
            {timerStatus === 'started' && (
              <button
                onClick={handlePauseTimer}
                className="uppercase font-black mt-4 py-4 rounded px-16 bg-white text-xl text-teal-600 tracking-wide"
              >
                pause
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
