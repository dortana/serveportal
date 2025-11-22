'use client';

import * as React from 'react';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface StepProps {
  title: string;
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
  icon?: React.ReactNode;
}

const Step: React.FC<StepProps> = ({
  title,
  description,
  isCompleted,
  isActive,
  icon,
}) => {
  return (
    <div className='flex items-center'>
      <div className='relative flex items-center justify-center'>
        <div
          className={cn(
            'w-10 h-10 rounded-full border-1 flex items-center justify-center p-1.5',
            isCompleted
              ? 'border-primary bg-primary text-primary-foreground'
              : isActive
                ? 'border-brand-blue'
                : 'border-muted-foreground',
          )}
        >
          {isCompleted ? <Check className='w-6 h-6' /> : icon}
        </div>
      </div>
      <div className='ml-2'>
        <p
          className={cn(
            'text-sm font-medium w-max',
            isActive || isCompleted
              ? 'text-foreground'
              : 'text-muted-foreground',
          )}
        >
          {title}
        </p>
        {description && (
          <p className='text-sm text-muted-foreground w-max'>{description}</p>
        )}
      </div>
    </div>
  );
};

interface StepperProps {
  steps: Array<StepProps>;
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className='w-full max-w-3xl mx-auto'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
        {steps.map((step, index) => (
          <div key={step.title} className='relative mr-2'>
            <Step
              title={step.title}
              description={step.description}
              isCompleted={index < currentStep}
              isActive={index === currentStep}
              icon={step.icon}
            />
            {index < steps.length - 1 && (
              <ChevronRight className='hidden md:block w-4 h-4 text-muted-foreground absolute -right-5 top-3' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
