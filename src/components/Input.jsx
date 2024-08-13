import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef } from "react";
import CreateSelect from "react-select/creatable";

const Label = ({ label, required }) => {
  return (
    <label className="text-gray-700 font-medium text-sm pr-4 w-32 flex-shrink-0">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export const TextInput = ({
  type,
  value,
  onChange,
  label,
  disabled,
  required,
  placeholder,
  inputFlexSize,
}) => {
  return (
    <div className="flex items-center mb-4">
      <Label label={label} required={required} />
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`flex-${inputFlexSize || "1"} bg-white border border-gray-300 rounded-md pl-4 py-2 h-10 outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-700 text-sm`}
      />
    </div>
  );
};

export const CustomInput = ({ label, required, children }) => {
  return (
    <div className="flex items-center mb-4">
      <Label label={label} required={required} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export const SelectInput = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  disabled,
  required,
}) => {
  return (
    <div className="flex w-full items-center mb-4">
      <Label label={label} required={required} />
      <select
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-white border border-gray-300 rounded-md pl-4 py-2 h-10 outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-700 text-sm"
      >
        <option value="">{placeholder}</option>
        {options &&
          options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export const ToggleInput = ({
  label,
  checked,
  onChange,
  required,
  disabled,
}) => {
  return (
    <div className="flex items-center mb-4">
      <Label label={label} required={required} />
      <div className="flex-1 flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export const CustomCreateSelect = ({
  options,
  placeholder,
  value,
  onChange,
  label,
  required,
  disabled,
}) => {
  const styles = {
    control: (provided) => ({
      ...provided,
      height: "42px",
      borderRadius: "0.375rem",
      borderColor: disabled ? "#D1D5DB" : "#E5E7EB",
      "&:hover": {
        borderColor: disabled ? "#D1D5DB" : "#9CA3AF",
      },
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
      color: "#374151",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "0.875rem",
      color: "#9CA3AF",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 0.75rem",
    }),
  };

  const rawOptions = options.map((option) => ({
    label: option,
    value: option,
  }));

  return (
    <div className="flex items-center mb-4">
      <Label label={label} required={required} />
      <div className="flex-1">
        <CreateSelect
          options={rawOptions}
          placeholder={placeholder}
          disabled={disabled}
          styles={styles}
          value={{ label: value, value: value }}
          onChange={(selectedOption) => onChange(selectedOption.value)}
        />
      </div>
    </div>
  );
};

export const FileInput = ({
  id,
  accept,
  label,
  bgColor = "blue-600",
  textColor = "white",
  text = "Upload",
  icon,
  onFileSelect,
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    const selectedFile = fileInputRef.current.files[0];
    onFileSelect(selectedFile);
  };

  return (
    <div className="flex items-center mb-4">
      <div className="flex-grow">
        <label
          htmlFor={id}
          className={`flex items-center justify-center gap-2 pl-4 py-2 text-sm rounded-md cursor-pointer bg-${bgColor} text-${textColor}`}
        >
          {icon && <Icon icon={icon} className={`text-${textColor} text-lg`} />}
          {text}
        </label>
        <input
          type="file"
          id={id}
          accept={accept}
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
};
