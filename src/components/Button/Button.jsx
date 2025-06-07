import './Button.css';

export const Button = ({ text, color }) => {

    return (
      <div>
        <button className="button">
          {text}
        </button>
      </div>
    );
  };