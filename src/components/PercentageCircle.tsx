import "./PercentageCircle.css";

const PercentageCircle = ({ percentage }) => {
  const strokeDasharray = `${percentage}, 100`;

  return (
    <div className="circle-container">
      <svg viewBox="0 0 36 36" className="circle">
        <path
          className="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="circle-fg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          style={{ strokeDasharray }}
        />
      </svg>
      <span className="circle-text">{percentage}%</span>
    </div>
  );
};

export default PercentageCircle;
