const LAYOUTS = {
  horizontal: "flex-row overflow-x-auto pb-3",
  vertical: "flex-col overflow-y-auto pr-3 max-h-96",
};

const ComponentScroller = ({ children, orientation = "horizontal" }) => {
  return (
    <section className="min-w-0 max-w-full space-y-3">
      <div className={`flex gap-4 ${LAYOUTS[orientation]}`}>
        {children}
      </div>
    </section>
  );
};

export default ComponentScroller;