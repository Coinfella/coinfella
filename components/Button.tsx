'use client';

import { cva, VariantProps } from 'cva';
import { FCC } from '@/lib/types';
import useRipple from 'use-ripple-hook';
import { Spinner } from './Spinner';
import { cn } from '@/lib/utils';

const buttonStyles = cva(
  'bg-btn-fill text-btn-text p-4 rounded-lg font-medium relative',
  {
    variants: {
      size: {
        small: '',
        full: 'w-full',
        medium: '',
        large: 'min-w-[300px]',
        xLarge: 'min-w-[350px]',
      },
      color: {
        primary: 'bg-primary',
        white: 'bg-white text-black',
        google: 'bg-white text-[#7A8494]',
        facebook: 'bg-[#1877F2] text-white',
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
};

export const Button: FCC<ButtonProps> = ({
  children,
  size,
  color,
  font,
  isLoading,
  type = 'button',
  className,
  onClick,
}) => {
  const [ripple, event] = useRipple();

  return (
    <button
      ref={ripple}
      onMouseDown={event}
      type={type}
      onClick={onClick}
      className={cn(buttonStyles({ size, color, font }), className)}
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
