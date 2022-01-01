export default function Skeletion(props) {
  const loaderStyles = {
    backgroundColor: "#eee",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    borderRadius: "5px",
    ...props.extraStyles,
  };

  const loaderSwipeStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    animation: "loaderSwipeAnim 1s cubic-bezier(0.4, 0.0, 0.2, 1) infinite",
    height: "100%",
    background: "linear-gradient(to right, #eee 10%, #ddd 50%, #eee 90%)",
  };

  return (
    <div style={loaderStyles}>
      <div style={loaderSwipeStyle}></div>
    </div>
  );
}
