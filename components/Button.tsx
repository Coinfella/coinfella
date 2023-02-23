'use client';

import { cva, VariantProps } from 'cva';
import { FCC } from '../lib/types';
import useRipple from 'use-ripple-hook';
import { Spinner } from './Spinner';

const buttonStyles = cva(
  'bg-btn-fill text-btn-text p-4 rounded-md font-medium relative',
  {
    variants: {
      size: {
        small: '',
        full: 'w-full',
        medium: '',
        large: 'min-w-[300px]',
      },
      color: {
        primary: 'bg-primary',
        white: 'bg-white text-black',
      },
      font: {
        bold: 'font-bold',
      },
    },
  }
);

export type ButtonProps = VariantProps<typeof buttonStyles> & {
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  [key: string]: any;
};

export const Button: FCC<ButtonProps> = ({
  children,
  size,
  color,
  font,
  isLoading,
  type = 'button',
  ...props
}) => {
  const [ripple, event] = useRipple();

  return (
    <button
      ref={ripple}
      onMouseDown={event}
      type={type}
      onClick={props?.onClick}
      className={buttonStyles({ size, color, font })}
    >
      {children}
      {isLoading && (
        <div className="absolute top-0 bottom-0 right-3 flex items-center">
          <Spinner fill="white" />
        </div>
      )}
    </button>
  );
};
