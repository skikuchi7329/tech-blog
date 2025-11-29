type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export const Textarea = ({ label, className = "", ...props }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-bold text-gray-700">{label}</label>
      )}
      <textarea
        className={`border border-gray-300 rounded p-2 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};
