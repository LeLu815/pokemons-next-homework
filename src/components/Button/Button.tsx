import { cva, VariantProps } from "class-variance-authority";
import Link from "next/link";
import { ComponentProps } from "react";

const buttonVariant = cva(
  "rounded border font-semibold hover:brightness-90 active:brightness-75",
  {
    variants: {
      intent: {
        primary: "bg-blue-500 border-blue-500",
        danger: "bg-red-500 border-red-500",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-[15px]",
        lg: "px-5 py-2.5 text-[17px]",
      },
      outlined: {
        true: "bg-white",
        false: "text-white",
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        outlined: true,
        className: "text-blue-500",
      },
      {
        intent: "danger",
        outlined: true,
        className: "text-red-500",
      },
    ],
    defaultVariants: {
      intent: "primary",
      size: "md",
      outlined: false,
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariant>;
type ButtonProps = ButtonVariantProps &
  (
    | ({ href?: undefined } & ComponentProps<"button">)
    | ({ href: string } & ComponentProps<typeof Link>)
  );

function Button({ intent, outlined, size, children, ...props }: ButtonProps) {
  if (props.href) {
    const { href, ...restProps } = props;
    return (
      <Link
        href={href}
        className={buttonVariant({ intent, outlined, size })}
        {...restProps}
      >
        {children}
      </Link>
    );
  } else if (typeof props.href === "undefined") {
    return (
      <button className={buttonVariant({ intent, outlined, size })} {...props}>
        {children}
      </button>
    );
  }
}

export default Button;
