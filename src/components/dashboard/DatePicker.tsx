"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerWithRangeProps = {
  className?: React.HTMLAttributes<HTMLDivElement>;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  showDatePicker: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DatePickerWithRange({
  className,
  date,
  setDate,
  showDatePicker,
  setShowDatePicker,
}: DatePickerWithRangeProps) {
  // const [date, setDate] = React.useState<DateRange | undefined>({
  //   from: new Date(2022, 0, 20),
  //   to: addDays(new Date(2022, 0, 20), 20),
  // });

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}