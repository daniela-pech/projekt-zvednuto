import { Link } from 'react-router-dom';

export const StickmanFront = ({ selectedPart, handleClick, isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="stickman">
      <svg
        width="200"
        height="500"
        viewBox="0 0 200 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="stickman"
        style={{ display: 'block', margin: '0 auto' }}
      >
        <circle
          cx="100"
          cy="60"
          r="20"
          stroke="white"
          strokeWidth="4"
          fill="none"
          onClick={() => handleClick('head')}
          className={selectedPart === 'head' ? 'selected' : ''}
        />
        <Link to="upper">
          <rect
            x="50"
            y="100"
            width="16"
            height="60"
            rx="5"
            stroke="white"
            strokeWidth="4"
            fill="none"
            onClick={() => handleClick('left-arm')}
            className={selectedPart === 'left-arm' ? 'selected' : ''}
          />
        </Link>
        <Link to="upper">
          <rect
            x="134"
            y="100"
            width="16"
            height="60"
            rx="5"
            stroke="white"
            strokeWidth="4"
            fill="none"
            onClick={() => handleClick('right-arm')}
            className={selectedPart === 'right-arm' ? 'selected' : ''}
          />
        </Link>
        <Link to="upper">
          <rect
            x="75"
            y="100"
            width="50"
            height="30"
            rx="10"
            stroke="white"
            strokeWidth="4"
            fill="none"
            onClick={() => handleClick('chest')}
            className={selectedPart === 'chest' ? 'selected' : ''}
          />
        </Link>
        <Link to="core">
          <rect
            x="80"
            y="140"
            width="40"
            height="60"
            rx="10"
            stroke="white"
            strokeWidth="4"
            fill="none"
            onClick={() => handleClick('core')}
            className={selectedPart === 'core' ? 'selected' : ''}
          />
        </Link>
        <Link to="lower">
          <rect
            x="75"
            y="210"
            width="20"
            height="70"
            rx="8"
            stroke="white"
            strokeWidth="4"
            fill="none"
            onClick={() => handleClick('left-leg')}
            className={selectedPart === 'left-leg' ? 'selected' : ''}
          />
        </Link>
        <Link to="lower">
          <rect
            x="105"
            y="210"
            width="20"
            height="70"
            rx="8"
            stroke="white"
            strokeWidth="4"
            fill="none"
            onClick={() => handleClick('right-leg')}
            className={selectedPart === 'right-leg' ? 'selected' : ''}
          />
        </Link>
      </svg>
    </div>
  );
};
