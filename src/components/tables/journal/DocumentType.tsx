'use client';
import { JournalDocumentType } from '@/app/generated/prisma/client';
import React from 'react';
import { useJournalDocumentTypes } from './icon-renderer';

const DocumentType = ({
  type,
  iconClassName = 'h-6 w-6',
}: {
  type: JournalDocumentType;
  iconClassName?: string;
}) => {
  const docTypes = useJournalDocumentTypes();
  const docType = docTypes.find(docType => docType.value === type)!;

  return (
    <div className='flex items-center gap-1'>
      {docType.icon &&
        React.cloneElement(docType.icon, {
          className: 'text-muted-foreground' + iconClassName,
        })}
      <span className='text-sm'>{docType.label}</span>
    </div>
  );
};

export default DocumentType;
