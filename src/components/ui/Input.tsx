type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = ({ label, className = "", ...props }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-bold text-gray-700">{label}</label>
      )}
      <input
        className={`border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    </div>
  );
};
