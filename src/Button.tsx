function Button({
  handleClick,
  label,
  autofocus = false,
}: {
  handleClick: Function;
  label: string;
  autofocus?: boolean;
}) {
  return (
    <>
      <button
        className="my-5 mx-auto p-4 w-max bg-slate-200 rounded-md border border-1 border-gray-500 hover:bg-slate-300"
        onClick={() => handleClick()}
        autoFocus={autofocus}
      >
        {label}
      </button>
    </>
  );
}
export default Button;
