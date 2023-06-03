import { useContext, CSSProperties } from "react";
import { DotLoader } from "react-spinners";

const override: CSSProperties = {
  position: "absolute",
  left: "45%",
  top: "40%",
  zIndex: "1",
};

const LoadingSpinner = ({ children }) => {
  return (
    <>
      <DotLoader color={"#73a9ad"} cssOverride={override} size={70} />
    </>
  );
};

export default LoadingSpinner;
