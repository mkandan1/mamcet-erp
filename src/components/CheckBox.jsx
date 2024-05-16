export const CheckBox = ({ text }) => {
  return (
    <label class="label cursor-pointer flex justify-start gap-x-2">
      <input type="checkbox" class="checkbox checkbox-sm" />
      <span class="label-text font-normal">{text}</span>
    </label>
  );
};
