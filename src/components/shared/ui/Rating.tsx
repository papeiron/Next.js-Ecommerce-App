'use client';

import { FaStar } from 'react-icons/fa';

type RatingProps = {
  el?: string;
  value: number;
  editable: boolean;
  size: number;
  onValueChange?: (value: number) => void;
  starHw?: { h: string; w: string };
};

function Rating({
  el = 'Star',
  value,
  editable,
  size,
  onValueChange,
  starHw,
}: RatingProps) {
  const handleClick = (index: number) => {
    if (editable && onValueChange) {
      onValueChange(index);
    }
  };

  const getTooltipText = () => {
    // if (value === -1) return 'No rating';
    return `${value.toFixed(1)}/${size} ${el}${value !== 1 ? 's' : ''}`;
  };


  return (
    <div>
      {value !== -1 && (
        <div className="flex items-center gap-0.5" title={getTooltipText()}>
          {Array.from({ length: size }, (_, index) => (
            <span key={index} onClick={() => handleClick(index)}>
              <FaStar
                key={index}
                className={`${
                  index <= value - 1 ? 'fill-yellow-300' : ''
                } cursor-pointer text-gray-200 ${starHw ? starHw.h + ' ' + starHw.w : 'h-4 w-4'}`}
              />
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Rating;
