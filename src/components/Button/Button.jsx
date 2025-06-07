import './Button.css';

export const Button = ({ text, color, onClick }) => {

    return (
      <div>
        <button onClick={onClick} className="button">
          {text}
        </button>
      </div>
    );
  };