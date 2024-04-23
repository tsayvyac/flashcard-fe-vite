type BlockSize = "icon" | "xm" | "default";
type BlockVariant = "default" | "outline";

interface BlockProps {
  children: React.ReactNode;
  size?: BlockSize;
  variant?: BlockVariant;
}

const styles: { [key in BlockSize]: string } = {
  icon: "h-10 w-10",
  xm: "h-6 rounded-md px-2",
  default: "h-10 px-4 py-2",
};

const variants: { [key in BlockVariant]: string } = {
  outline:
    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  default: "bg-primary text-primary-foreground hover:bg-primary/90",
};

function Block({
  children,
  variant = "default",
  size = "default",
}: BlockProps) {
  const sizeStyle = styles[size];
  const variantStyle = variants[variant];
  return (
    <div
      className={`${sizeStyle} ${variantStyle} inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
    >
      {children}
    </div>
  );
}

export default Block;
