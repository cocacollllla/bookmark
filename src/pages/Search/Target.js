import React, { useRef, useEffect } from "react";
import Loading from "../../components/Loading";

const Target = ({ loading, setPage }) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const fetchMoreObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((page) => page + 1);
      }
    });

    fetchMoreObserver.observe(targetRef.current);
  }, [setPage]);

  return (
    <div id="fetchMore" ref={targetRef}>
      {loading && <Loading mini />}
    </div>
  );
};

export default Target;
