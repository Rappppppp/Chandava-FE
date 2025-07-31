interface ButtonProps {
    type: "submit" | "button";
    loading: boolean;
    onClick?: () => void;
    label: string;

}

const Button = ({ type, loading, onClick, label }: ButtonProps) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 transition-all duration-300 text-white">
            {loading ? "Loading..." : label}
        </button>
    );
}

export default Button;