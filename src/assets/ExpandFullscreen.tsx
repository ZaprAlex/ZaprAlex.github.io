import * as React from 'react';
import type { SVGProps } from 'react';

const ExpandFullscreen = (props: SVGProps<SVGSVGElement>) => (
  <svg width="96px" height="96px" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title />
    <g>
      <path d="M30,0H6A5.9966,5.9966,0,0,0,0,6V30a6,6,0,0,0,12,0V12H30A6,6,0,0,0,30,0Z" />
      <path d="M90,0H66a6,6,0,0,0,0,12H84V30a6,6,0,0,0,12,0V6A5.9966,5.9966,0,0,0,90,0Z" />
      <path d="M30,84H12V66A6,6,0,0,0,0,66V90a5.9966,5.9966,0,0,0,6,6H30a6,6,0,0,0,0-12Z" />
      <path d="M90,60a5.9966,5.9966,0,0,0-6,6V84H66a6,6,0,0,0,0,12H90a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,90,60Z" />
    </g>
  </svg>
);

export default ExpandFullscreen;