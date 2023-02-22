import { FCC } from '@/lib/types';
import { cn } from '@/lib/utils';
import React from 'react';

interface TextProps {
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export const Text: FCC<TextProps> = ({
  children,
  as = 'div',
  className = '',
}) => {
  const Tag = as;
  let _className = '';
  switch (Tag) {
    case 'h1':
      _className =
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl';
      break;
    case 'h2':
      _className =
        'mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 dark:border-b-slate-700';
      break;
    case 'h3':
      _className =
        'mt-8 scroll-m-20 text-2xl font-semibold tracking-tight';
      break;
    case 'h4':
      _className = 'mt-8 scroll-m-20 text-xl font-semibold tracking-tight';
      break;
    case 'p':
      _className = 'leading-7 [&:not(:first-child)]:mt-6';
      break;
  }
  return <Tag className={cn(_className, className)}>{children}</Tag>;
};
