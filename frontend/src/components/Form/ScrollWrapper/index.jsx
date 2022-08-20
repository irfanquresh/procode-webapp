import { useRef } from "react";
import { sleep } from "utils/promise.util";

const ScrollWrapper = ({ onScroll, children }) => {
  const tableBodyRef = useRef();

  const onListScroll = async () => {
    if (tableBodyRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tableBodyRef.current;
      if (scrollTop > 0) {
        const diffHight = scrollHeight - (scrollTop + clientHeight);
        const approaxDiffHeight = diffHight < 0 ? -1 * diffHight : diffHight;
        if (approaxDiffHeight <= 1) {
          await sleep(500);
          onScroll();
        }
      }
    }
  };

  return (
    <div
      className="overflow-auto h-[55vh]"
      onScroll={() => onListScroll()}
      ref={tableBodyRef}
    >
      {children}
    </div>
  );
};

export default ScrollWrapper;
