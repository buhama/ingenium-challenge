import { Button } from "@chakra-ui/react";
import React, { Fragment } from "react";

interface Props {
  value: string | boolean | number | undefined;
  options: { label: string; value: string | boolean | number }[];
  setValue: (text: string | boolean | number) => void;
  className?: string;
  label?: string;
  isDisabled?: boolean;
}

const ToggleRadio: React.FC<Props> = ({
  value,
  options = [],
  setValue,
  className,
  label,
  isDisabled = false,
}) => {
  return (
    <div className={className}>
      <div className="mb-1 text-sm font-bold">{label}</div>
      <div className="divide flex w-full gap-x-2 rounded-lg border p-1">
        {options.map((option, index) => (
          <Fragment key={index}>
            <div className="w-full">
              <Button
                onClick={() => setValue(option.value)}
                colorScheme={value === option.value ? "green" : "gray"}
                disabled={isDisabled}
                className="w-full"
              >
                {option.label}
              </Button>
            </div>
            {index < options.length - 1 && <div className="border-r-2" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ToggleRadio;
