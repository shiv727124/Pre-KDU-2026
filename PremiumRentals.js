import { useEffect, useState } from "react";

function MovieCard({ title, onWatchNow }) {
  const INITIAL_TIME = 10;

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime === 1) {
          clearInterval(intervalId);
          setIsRunning(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const startCountdown = () => {
    setIsRunning(true);
  };

  const resetCountdown = () => {
    setIsRunning(false);
    setTimeLeft(INITIAL_TIME);
  };

  return (
    <div>
      <h3>{title}</h3>

      {timeLeft === 0 ? (
        <button onClick={() => onWatchNow(title)}>
          Watch Now
        </button>
      ) : (
        <>
          <p>{timeLeft}</p>

          {!isRunning ? (
            <button onClick={startCountdown}>
              Start Countdown
            </button>
          ) : (
            <button onClick={resetCountdown}>
              Reset
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default function PremiumRentals() {
  const [playingMovie, setPlayingMovie] = useState(null);

  if (playingMovie) {
    return (
      <div>
        <h2>{playingMovie}</h2>
        <p>Now Playing: {playingMovie}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Premium Rentals</h2>

      <MovieCard title="Inception" onWatchNow={setPlayingMovie} />
      <MovieCard title="Interstellar" onWatchNow={setPlayingMovie} />
      <MovieCard title="The Dark Knight" onWatchNow={setPlayingMovie} />
    </div>
  );
}
