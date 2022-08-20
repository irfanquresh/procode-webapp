import { useEffect } from "react";
import PropTypes from "prop-types";

function PageLayout({ children }) {
  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      // e.preventDefault();
    });
  }, []);
  return <>{children}</>;
}

PageLayout.defaultProps = {
  background: "default",
};

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageLayout;
