export const PageHeading = ({heading, children}) => {
  return (
    <div className="flex flex-wrap mb-16 md:mb-2 justify-between pb-1 h-10 border-b border-base-200 col-span-12 col-start-1">
      <h1 className="text-xl font-medium">{heading}</h1>

      <div className="flex gap-2 mt-2 md:mt-0">
        {children}
      </div>
    </div>
  );
};
