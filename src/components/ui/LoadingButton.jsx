import { Loader2 } from "lucide-react";

const LoadingButton = ({ isLoading, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`rounded-lg bg-[#FECB0A] text-black font-semibold w-75 md:w-80 h-10 text-sm flex items-center justify-center transition-all ${
        isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-yellow-500 cursor-pointer"
      } ${props.className || ''}`}
    >
      {isLoading ? (
        <Loader2 className="animate-spin w-5 h-5" />
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
