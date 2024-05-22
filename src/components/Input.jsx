import { Icon } from "@iconify/react/dist/iconify.js";
import { useRef } from "react";
import CreateSelect from "react-select/creatable";

export const TextInput = ({
  type,
  value,
  onChange,
  label,
  rowStart,
  colStart,
  disabled,
  required,
  placeholder,
  inputColSize,
}) => {
  return (
    <div className={`row-span-1 col-span-12 xl:col-span-4 grid grid-cols-12 xl:${rowStart ? rowStart : ""} xl:${colStart ? colStart : ""}`}>
      <Label label={label} required={required} />
      <input
        type={type}
        value={value}
        disabled={disabled ? disabled : false}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? placeholder : ''}
        className={`bg-white border-[1px] col-span-${inputColSize ? inputColSize : "3"} border-gray-300 rounded-md pl-3 h-[42px] outline-blue-700 text-gray-500 font-manrope w-full text-sm`}
      />
    </div>
  );
};

export const CustomInput = ({
  type,
  value,
  onChange,
  label,
  rowStart,
  colStart,
  disabled,
  required,
  placeholder,
  inputColSize,
  children
}) => {
  return (
    <div className={`row-span-1 col-span-12 xl:col-span-4 grid grid-cols-12 xl:${rowStart ? rowStart : ""} xl:${colStart ? colStart : ""}`}>
      <Label label={label} required={required} />
      <div className="col-span-3">
        {children}
      </div>
    </div>
  );
};

// SelectInput.js
export const SelectInput = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  disabled,
  rowStart,
  required,
  colStart,
}) => {
  return (
    <div className={`row-span-1 col-span-12 xl:col-span-4 grid grid-cols-12 ${rowStart ? rowStart : ""} ${colStart ? colStart : ""}`}>
      <Label label={label} required={required} />
      <select
        disabled={disabled ? disabled : false}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-white border-[1px] col-span-3 border-gray-300 outline-none rounded-md h-[42px] text-gray-500 font-manrope w-full text-sm`}
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
  colStart,
  required,
  disabled,
  rowStart,
}) => {
  return (
    <div
      className={`col-span-12 xl:col-span-4 grid grid-cols-12 lg:${rowStart ? rowStart : ""
        } lg:${colStart ? colStart : ""}`}
    >
      <Label label={label} required={required} />
      <input
        type="checkbox"
        checked={checked}
        className="col-span-3"
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled ? disabled : false}
      />
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
  rowStart,
  colStart,
}) => {
  const styles = {
    control: (provided) => ({
      ...provided,
      height: "42px",
      padding: 0,
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "14px",
      margin: 0,
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "14px",
      color: "#6b7280",
      paddingTop: 0,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#6b7280",
      fontSize: "14px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0px",
      paddingLeft: "2px",
      height: "42px",
      "&css-1ftr8wv-Input2": {
        marginTop: "0px",
      },
      "&css-y4b4ky-Input2": {
        height: "42px",
      },
    }),
    input: (provided) => ({
      ...provided,
      marginTop: "0px",
      margin: "0px",
      padding: "0px",
    }),
  };

  const rawOptions = options.map(option => ({
    label: option,
    value: option
  }));
  return (
    <div
      className={`col-span-12 xl:col-span-4 grid grid-cols-12 lg:${rowStart ? rowStart : ""} lg:${colStart ? colStart : ""}`}>
      <Label required={required} label={label} />
      <div className="col-span-3">
        <CreateSelect
          options={rawOptions}
          placeholder={placeholder}
          disabled={disabled ? disabled : false}
          styles={styles}
          value={{ label: value, value: value }}
          onChange={(selectedOption) => onChange(selectedOption.value)}
        />
      </div>
    </div>
  );
};

export const FileInput = ({ id, accept, label, bgColor, textColor, text, icon, onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    // Access the selected file using the ref
    const selectedFile = fileInputRef.current.files[0];

    // Pass the selected file to the parent component or perform other actions
    onFileSelect(selectedFile);
  };

  return (
    <>
      <div
        className={`row-span-1 col-span-12 xl:col-span-5 grid grid-cols-12`}>
        <label htmlFor={id} className={`flex border rounded-md items-center gap-2 col-span-2 col-start-11 pl-4 py-3 text-xs outline font-manrope font-normal tracking-tight w-auto text-${textColor} px-2 bg-${bgColor} cursor-pointer`}>
          {icon && (<Icon icon={icon} className={`text-${textColor} text-md`} />)}
          {label}
        </label>
        <input type='file' onChange={handleFileSelect} accept={accept} className='hidden' id={id} ref={fileInputRef} />
      </div>
    </>

  );
};

const Label = ({ label, required }) => {
  return (
    <label className="text-gray-500 col-span-3 font-medium text-base text-end mr-20">
      {label} {required ? <span className="text-red-500">*</span> : <></>}
    </label>
  );
};
