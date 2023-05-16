interface DynamicCircleProps {
  number: number;
}

const DynamicCircle: React.FC<DynamicCircleProps> = ({ number }) => {
  const minNumber = 1000;
  const maxNumber = 2000;
  const minSize = 50; // minimum size of the circle in pixels
  const maxSize = 200; // maximum size of the circle in pixels

  // Normalize the number to a value between 0 and 1
  const normalizedNumber = (number - minNumber) / (maxNumber - minNumber);

  // Determine the size of the circle based on the normalized number
  const size = minSize + (maxSize - minSize) * normalizedNumber;

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          backgroundColor: "blue",
        }}
      />
      <div className="mt-2">{number}</div>
    </div>
  );
};

export default DynamicCircle;
