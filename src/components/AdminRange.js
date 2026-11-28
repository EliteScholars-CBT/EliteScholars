import React from 'react';

// The same six time ranges everywhere in the dashboards. The server turns the key into Nigerian-time dates.
export const PERIODS = [['today', 'Today'], ['week', 'This week'], ['month', 'This month'], ['lastmonth', 'Last month'], ['year', 'This year'], ['all', 'All time']];

export default function RangePills({ value, onChange, className = 'adm-pills', children }) {
  return (
    <div className={className}>
      {PERIODS.map(([k, l]) => <button key={k} className={value === k ? 'on' : ''} onClick={() => onChange(k)}>{l}</button>)}
      {children}
    </div>
  );
}
