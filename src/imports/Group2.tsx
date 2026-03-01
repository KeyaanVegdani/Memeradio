export default function Group() {
  return (
    <div className="mix-blend-exclusion relative size-full">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 597 27">
        <g clipPath="url(#clip0_2_1549)" id="Group 2" style={{ mixBlendMode: "exclusion" }}>
          <g filter="url(#filter0_f_2_1549)" id="Ellipse 21" opacity="0.44">
            <ellipse cx="298.5" cy="13.5" fill="url(#paint0_linear_2_1549)" rx="298.5" ry="13.5" transform="matrix(1 0 0 -1 0 27)" />
          </g>
        </g>
        <defs>
          <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="73.2" id="filter0_f_2_1549" width="643.2" x="-23.1" y="-23.1">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur_2_1549" stdDeviation="11.55" />
          </filter>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_2_1549" x1="326.774" x2="326.774" y1="27" y2="13.5">
            <stop stopColor="#D9D9D9" stopOpacity="0" />
            <stop offset="1" stopColor="#737373" />
          </linearGradient>
          <clipPath id="clip0_2_1549">
            <rect fill="white" height="27" width="597" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}