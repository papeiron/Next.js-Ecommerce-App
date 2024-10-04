'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

type DateRangePickerProps = {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
};

function DatePicker({ dateRange, setDateRange }: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`font-normal", flex justify-start text-left ${!dateRange} && "text-muted-foreground w-full rounded-md border p-2`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, 'LLL dd, y')} -{' '}
                {format(dateRange.to, 'LLL dd, y')}
              </>
            ) : (
              format(dateRange.from, 'LLL dd, y')
            )
          ) : (
            <span>Pick a date</span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          defaultMonth={dateRange?.from}
          selected={dateRange}
          onSelect={setDateRange}
          initialFocus
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
export default DatePicker;
