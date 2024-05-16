export const CheckBox = ({text}) => {
  return (
    <label class="label cursor-pointer flex justify-start gap-x-4">
      <span class="label-text font-normal">{text}</span>
      <input type="checkbox" class="checkbox checkbox-sm" />
    </label>
  );
};
