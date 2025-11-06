'use client';

import React from 'react';
import { useHelperStore } from '@/lib/helper';

const CommaHelper: React.FC = () => {
  const { helperVisible, helperMessage } = useHelperStore();

  if (!helperVisible || !helperMessage) {
    return null;
  }

  return (
    <div className="comma-helper">
      <p className="comma-helper-text">{helperMessage}</p>
    </div>
  );
};

export default CommaHelper;
