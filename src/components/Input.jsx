export const TextInput = ({
  type,
  value,
  onChange,
  label,
  rowStart,
  colStart,
  required,
  inputColSize,
}) => {
  return (
    <>
      <div
        className={`col-span-5 grid grid-rows-1 grid-cols-5 row-start-${
          rowStart ? rowStart : ""
        } col-start-${colStart ? colStart : ""}`}
      >
        <Label label={label} required={required} />
        <input
          type={type}
          value={value}
          onChange={(e)=>onChange(e.target.value)}
          className={`bg-white border-[1px] col-span-${
            inputColSize ? inputColSize : "2"
          } border-gray-300 rounded-md h-[42px] text-gray-500 font-manrope w-full text-sm`}
        ></input>
      </div>
    </>
  );
};

export const SelectInput = ({
  value,
  onChange,
  options,
  placeholder,
  label,
  rowStart,
  required,
  colStart,
}) => {
  return (
    <>
      <div
        className={`row-span-1 col-span-5 grid grid-rows-1 grid-cols-5 row-start-${
          rowStart ? rowStart : ""
        } col-start-${colStart ? colStart : ""}`}
      >
        <Label label={label} required={required}/>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)} // Ensure you pass the selected value to the parent component
          className={`bg-white border-[1px] col-span-2 border-gray-300 outline-none rounded-md h-[42px] text-gray-500 font-manrope w-full text-sm`}
        >
          <option value="">
            {placeholder}
          </option>
          {options &&
            options.map((option, i) => (
              <option key={i} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};

const Label = ({ label, required }) => {
  return (
    <label className="text-gray-500 col-span-2 font-medium text-base text-start">
      {label} {required ? <span className="text-red-500">*</span> : <></>}
    </label>
  );
};
