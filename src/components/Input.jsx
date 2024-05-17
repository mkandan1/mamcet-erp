export const TextInput = ({ label, type, placeholder, required, onChange }) => {
  return (
    <div className="gap-x-4 items-center col-span-2 grid grid-cols-6">
      <Label label={label} required={required} />
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-1/5 col-span-4"
        onChange={onChange}
      />
    </div>
  );
};

export const SelectInput = ({
  label,
  options,
  placeholder,
  required,
  onChange,
}) => {
  return (
    <div className="gap-x-4 items-center col-span-2 grid grid-cols-6">
      <Label label={label} required={required} />
      <select class="select select-ghost max-w-xs input-bordered w-1/5 col-span-4">
        <option disabled selected>
          {placeholder}
        </option>
        <option>Svelte</option>
        <option>Vue</option>
        <option>React</option>
      </select>
    </div>
  );
};

const Label = ({ label, required }) => {
  return (
    <label className="text-md tracking-tight col-span-1 text-end">
      {label} {required ? <span className="text-red-500">*</span> : <></>}
    </label>
  );
};
