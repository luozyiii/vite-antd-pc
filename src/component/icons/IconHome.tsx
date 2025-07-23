import type { SVGProps } from 'react';

const Component = (props: SVGProps<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="16" height="16" fill="node" />
    <g clipPath="url(#clip0_11783_1332)">
      <rect
        x="2.3335"
        y="2.33334"
        width="4.33333"
        height="4.33333"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="9.3335"
        y="2.33334"
        width="4.33333"
        height="4.33333"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="2.3335"
        y="9.33334"
        width="4.33333"
        height="4.33333"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="9.3335"
        y="9.33334"
        width="4.33333"
        height="4.33333"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_11783_1332">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

Component.displayName = 'IconHome';

export default Component;
