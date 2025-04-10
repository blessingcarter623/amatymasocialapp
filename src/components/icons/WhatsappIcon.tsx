
import { SVGProps } from "react";

interface WhatsappIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export const WhatsappIcon = ({ size = 24, ...props }: WhatsappIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={size}
    height={size}
    {...props}
  >
    <path d="M17.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 11.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H6.625m10.875 0H6a3.375 3.375 0 0 0-3.375 3.375v1.5c0 .621.504 1.125 1.125 1.125h1.5M13 10.5h1.5m-1.5 3.75H15M6.75 17.25h.008v.008H6.75v-.008Z" />
    <circle cx="12" cy="12" r="11" />
  </svg>
);
