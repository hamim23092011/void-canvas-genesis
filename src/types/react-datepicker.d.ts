declare module 'react-datepicker' {
  import React from 'react';
  
  interface DatePickerProps {
    selected?: Date | null;
    onChange: (date: Date | null) => void;
    dateFormat?: string;
    placeholderText?: string;
    className?: string;
    showTimeSelect?: boolean;
    timeFormat?: string;
    timeIntervals?: number;
    minDate?: Date;
    maxDate?: Date;
    [key: string]: any;
  }
  
  const DatePicker: React.FC<DatePickerProps>;
  export default DatePicker;
}