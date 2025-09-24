// src/components/common/PageHeader.js
'use client';

export default function PageHeader({ 
  title, 
  subtitle, 
  actions,
  extra 
}) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          {subtitle && (
            <p className="text-lg text-gray-600">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex space-x-3">
            {actions}
          </div>
        )}
      </div>
      {extra && (
        <div className="mt-6">
          {extra}
        </div>
      )}
    </div>
  );
}