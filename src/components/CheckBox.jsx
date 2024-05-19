export const CheckBox = ({ text }) => {
  return (
    <label className="label cursor-pointer flex justify-start gap-x-4">
      <input type="checkbox" className="checkbox checkbox-sm" />
      <span className="label-text font-normal">{text}</span>
    </label>
  );
};
