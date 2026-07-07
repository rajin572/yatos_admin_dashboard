import { cn } from "@/lib/utils";

export interface ReuseTabOption {
  label: string;
  value: string;
}

interface ReuseTabsProps {
  options: ReuseTabOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ReuseTabs: React.FC<ReuseTabsProps> = ({ options, value, onChange, className }) => {
  return (
    <div className={cn("inline-flex items-center gap-1 rounded-full bg-background-color p-1", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer",
            value === option.value
              ? "bg-primary-color text-base-color shadow-sm"
              : "text-secondbase-color hover:text-base-color"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ReuseTabs;
