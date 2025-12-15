import React from 'react';
import { clsx } from 'clsx';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden',
        hover && 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={clsx('px-6 py-4 border-b border-gray-100', className)}>
    {children}
  </div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={clsx('px-6 py-4', className)}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={clsx('px-6 py-4 border-t border-gray-100', className)}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;