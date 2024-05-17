export const PageHeading = ({heading, children}) => {
  return (
    <div className="my-3 flex justify-between pb-4 border-b border-base-200">
      <h1 className="text-xl font-medium">{heading}</h1>

      <div className="flex gap-2">
        {children}
      </div>
    </div>
  );
};
