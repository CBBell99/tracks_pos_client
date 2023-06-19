import React from 'react';

type Props = {
  children: string;
  onClick: () => void;
};

function PinPadButton({ children, onClick }: Props) {
  return (
    <div className='bg-white border border-black text-black w-15 h-15 flex justify-center content-center' onClick={onClick}>
      {children}
    </div>
  );
}

export default PinPadButton;
