 export const Wrapper = (Component, idName) =>
  function HOC() {
    return (
      <section className={`max-w-7xl mx-auto relative z-0 sm:overflow-hidden`}>
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        <Component />
      </section>
    ); 
  };

  // export const Wrapper