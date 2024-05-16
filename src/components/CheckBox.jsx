export const CheckBox = ({ text }) => {
  return (
    <label className="label cursor-pointer flex justify-start gap-x-4">
      <span className="label-text font-normal">{text}</span>
      <input type="checkbox" className="checkbox checkbox-sm" />
    </label>
  );
};
