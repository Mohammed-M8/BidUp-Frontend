const ComponentScroller = ({children }) => {
  return (
    <section className="space-y-3">
      <div className="flex gap-4 overflow-x-auto pb-3">
        {children}
      </div>
    </section>
  );
};

export default ComponentScroller