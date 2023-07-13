import * as React from 'react';
import type { SVGProps } from 'react';

const Cross = (props: SVGProps<SVGSVGElement>) => (
  <svg className="svg-icon" style={{width: '18px', height: '18px', verticalAlign: 'middle', fill: 'currentColor', overflow: 'hidden'}}
    viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M602.512147 511.99738l402.747939-402.747939a63.999673 63.999673 0 0 0-90.509537-90.509537L512.00261 421.487843 109.254671 18.749904a63.999673 63.999673 0 0 0-90.509537 90.509537L421.493073 511.99738 18.755134 914.745319a63.999673 63.999673 0 0 0 90.509537 90.509537L512.00261 602.506917l402.747939 402.747939a63.999673 63.999673 0 0 0 90.509537-90.509537z"/>
  </svg>
);

export default Cross;
