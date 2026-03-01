import { useState, useRef, useEffect, useCallback } from "react";
// SVG paths inlined from Figma import (svg-d3g1k0f5xs)
const svgPaths = {
  // Tongue-out emoji sticker paths (from svg-3t4pbjcpgb)
  p3759ff80: "M10.0584 41.0579C21.2676 9.09081 56.2689 -7.73699 88.2361 3.47194C120.203 14.681 137.031 49.6823 125.822 81.6497C114.613 113.617 79.6117 130.446 47.6443 119.237C44.3813 118.092 41.2764 116.7 38.3425 115.088L35.3972 117.689C28.7496 123.556 18.6037 122.924 12.7361 116.277C6.86861 109.629 7.5008 99.4831 14.1482 93.6155L15.2058 92.6809C6.27269 77.6253 3.81247 58.8706 10.0584 41.0579Z",
  p20c8ea80: "M10.0584 41.0579L6.95061 39.9681L6.9506 39.9682L10.0584 41.0579ZM88.2361 3.47194L89.3258 0.364171L89.3258 0.364167L88.2361 3.47194ZM125.822 81.6497L128.93 82.7394L128.93 82.7394L125.822 81.6497ZM47.6443 119.237L46.5546 122.344H46.5546L47.6443 119.237ZM38.3425 115.088L39.928 112.202L37.8985 111.087L36.1628 112.619L38.3425 115.088ZM35.3972 117.689L37.5766 120.158L37.577 120.157L35.3972 117.689ZM12.7361 116.277L10.267 118.456L10.2671 118.456L12.7361 116.277ZM14.1482 93.6155L16.3276 96.0845L16.3289 96.0833L14.1482 93.6155ZM15.2058 92.6809L17.3865 95.1487L19.4287 93.3442L18.0381 91.0004L15.2058 92.6809ZM10.0584 41.0579L13.1661 42.1476C23.7735 11.8969 56.8955 -4.0274 87.1464 6.57971L88.2361 3.47194L89.3258 0.364167C55.6422 -11.4466 18.7617 6.28472 6.95061 39.9681L10.0584 41.0579ZM88.2361 3.47194L87.1464 6.5797C117.397 17.1869 133.321 50.309 122.714 80.56L125.822 81.6497L128.93 82.7394C140.741 49.0557 123.01 12.1751 89.3258 0.364171L88.2361 3.47194ZM125.822 81.6497L122.714 80.56C112.107 110.811 78.985 126.736 48.734 116.129L47.6443 119.237L46.5546 122.344C80.2385 134.155 117.119 116.423 128.93 82.7394L125.822 81.6497ZM47.6443 119.237L48.734 116.129C45.6433 115.045 42.7041 113.726 39.928 112.202L38.3425 115.088L36.7571 117.975C39.8487 119.673 43.1193 121.14 46.5546 122.344L47.6443 119.237ZM38.3425 115.088L36.1628 112.619L33.2175 115.22L35.3972 117.689L37.577 120.157L40.5223 117.557L38.3425 115.088ZM35.3972 117.689L33.2179 115.22C27.9338 119.884 19.869 119.381 15.2051 114.097L12.7361 116.277L10.2671 118.456C17.3383 126.467 29.5654 127.229 37.5766 120.158L35.3972 117.689ZM12.7361 116.277L15.2052 114.097C10.5412 108.813 11.0438 100.748 16.3276 96.0845L14.1482 93.6155L11.9688 91.1465C3.95781 98.2177 3.19599 110.445 10.267 118.456L12.7361 116.277ZM14.1482 93.6155L16.3289 96.0833L17.3865 95.1487L15.2058 92.6809L13.0251 90.2131L11.9675 91.1477L14.1482 93.6155ZM15.2058 92.6809L18.0381 91.0004C9.58041 76.7461 7.25596 59.0029 13.1661 42.1476L10.0584 41.0579L6.9506 39.9682C0.368975 58.7384 2.96498 78.5045 12.3736 94.3614L15.2058 92.6809Z",
  p3d9f9d70: "M38.5313 72.0945C42.2119 83.1803 46.6423 88.5273 59.7796 96.1678L35.3977 117.689C28.75 123.556 18.6044 122.924 12.7368 116.276C6.86927 109.628 7.50165 99.4829 14.1493 93.6153L38.5313 72.0945Z",
  p20403000: "M38.5313 72.0945C40.4747 77.9481 42.6272 82.2016 46.1602 86.0377M59.7796 96.1678C53.5792 92.5617 49.3182 89.4665 46.1602 86.0377M46.1602 86.0377L13.2275 116.554",
  // Original radio hardware paths
  p1c83bd80: "M38.5313 75.3885C42.2119 86.4744 46.6423 91.8214 59.7796 99.4619L35.3977 120.983C28.75 126.85 18.6044 126.218 12.7368 119.57C6.86927 112.923 7.50165 102.777 14.1493 96.9093L38.5313 75.3885Z",
  p1d99d340: "M42.1238 4.78619C44.0503 0.404418 50.2676 0.404422 52.1941 4.78619L61.0144 24.8477C61.3772 25.6728 62.1557 26.239 63.0525 26.3292L84.8581 28.5186C89.6208 28.9968 91.5415 34.9095 87.9695 38.0958L71.616 52.6837C70.9433 53.2837 70.6451 54.1993 70.8367 55.0801L75.4929 76.4942C76.5099 81.1715 71.4806 84.8257 67.3464 82.4131L48.4187 71.3672C47.6403 70.9132 46.6776 70.9132 45.8992 71.3672L26.9714 82.4131C22.8373 84.8257 17.808 81.1715 18.8249 76.4942L23.4812 55.0801C23.6727 54.1993 23.3745 53.2837 22.7019 52.6837L6.34838 38.0958C2.77635 34.9095 4.69705 28.9968 9.45971 28.5186L31.2654 26.3292C32.1622 26.239 32.9407 25.6728 33.3035 24.8477L42.1238 4.78619Z",
  p1e9dec80: "M43.4972 5.39009C44.8983 2.2033 49.4195 2.20331 50.8206 5.39009L59.6409 25.4516C60.2214 26.772 61.4679 27.6776 62.903 27.8217L84.7083 30.0109C88.1721 30.3587 89.5692 34.6586 86.9714 36.9759L70.6173 51.5638C69.541 52.524 69.0649 53.9892 69.3713 55.3987L74.0274 76.8132C74.7671 80.2149 71.1093 82.8724 68.1026 81.1178L49.175 70.0721C47.9293 69.3451 46.3886 69.3451 45.1428 70.0721L26.2152 81.1178C23.2086 82.8724 19.5508 80.2149 20.2904 76.8132L24.9465 55.3987C25.253 53.9892 24.7769 52.524 23.7005 51.5638L7.3465 36.9759C4.74866 34.6586 6.14579 30.3587 9.60957 30.0109L31.4148 27.8217C32.85 27.6776 34.0964 26.772 34.6769 25.4516L43.4972 5.39009Z",
  p1fd98c00: "M0 115.5H367.5M526 115.5H367.5M367.5 115.5V0",
  p20f17040: "M27.5669 27.3453C27.2415 27.7211 27.2415 28.2789 27.5669 28.6547L32.7441 34.6327C33.3502 35.3326 34.5 34.9039 34.5 33.978L34.5 22.022C34.5 21.0961 33.3502 20.6674 32.7441 21.3673L27.5669 27.3453Z",
  p2241bf80: "M7 18C7 12.4772 11.4772 8 17 8H57V48H17C11.4772 48 7 43.5228 7 38V18Z",
  p22fa1180: "M39.4489 7.09648L65.0632 46.5867C71.6516 56.7442 64.3616 70.1626 52.2546 70.1629C47.337 70.1629 42.7203 67.7942 39.8522 63.7996L38.235 61.5476L37.0495 63.3279C34.2026 67.598 29.4101 70.1628 24.278 70.1629C12.1055 70.1629 4.77527 56.6722 11.3991 46.4598L36.9313 7.09648L38.1901 5.15605L39.4489 7.09648Z",
  p3613b540: "M10.0584 44.3519L6.95061 43.2622L6.9506 43.2622L10.0584 44.3519ZM88.2361 6.76598L89.3258 3.65822L89.3258 3.65821L88.2361 6.76598ZM125.822 84.9437L128.93 86.0334L128.93 86.0334L125.822 84.9437ZM47.6443 122.531L46.5546 125.638H46.5546L47.6443 122.531ZM38.3425 118.382L39.928 115.496L37.8985 114.381L36.1628 115.914L38.3425 118.382ZM35.3972 120.983L37.5766 123.452L37.577 123.451L35.3972 120.983ZM12.7361 119.571L10.267 121.75L10.2671 121.75L12.7361 119.571ZM14.1482 96.9095L16.3276 99.3785L16.3289 99.3774L14.1482 96.9095ZM15.2058 95.975L17.3865 98.4428L19.4287 96.6382L18.0381 94.2945L15.2058 95.975ZM10.0584 44.3519L13.1661 45.4417C23.7735 15.1909 56.8955 -0.73335 87.1464 9.87375L88.2361 6.76598L89.3258 3.65821C55.6422 -8.15253 18.7617 9.57877 6.95061 43.2622L10.0584 44.3519ZM88.2361 6.76598L87.1464 9.87375C117.397 20.481 133.321 53.603 122.714 83.854L125.822 84.9437L128.93 86.0334C140.741 52.3497 123.01 15.4691 89.3258 3.65822L88.2361 6.76598ZM125.822 84.9437L122.714 83.854C112.107 114.105 78.985 130.03 48.734 119.423L47.6443 122.531L46.5546 125.638C80.2385 137.449 117.119 119.717 128.93 86.0334L125.822 84.9437ZM47.6443 122.531L48.734 119.423C45.6433 118.339 42.7041 117.02 39.928 115.496L38.3425 118.382L36.7571 121.269C39.8487 122.967 43.1193 124.434 46.5546 125.638L47.6443 122.531ZM38.3425 118.382L36.1628 115.914L33.2175 118.514L35.3972 120.983L37.577 123.451L40.5223 120.851L38.3425 118.382ZM35.3972 120.983L33.2179 118.514C27.9338 123.178 19.869 122.675 15.2051 117.391L12.7361 119.571L10.2671 121.75C17.3383 129.761 29.5654 130.523 37.5766 123.452L35.3972 120.983ZM12.7361 119.571L15.2052 117.391C10.5412 112.107 11.0438 104.043 16.3276 99.3785L14.1482 96.9095L11.9688 94.4405C3.95781 101.512 3.19599 113.739 10.267 121.75L12.7361 119.571ZM14.1482 96.9095L16.3289 99.3774L17.3865 98.4428L15.2058 95.975L13.0251 93.5071L11.9675 94.4417L14.1482 96.9095ZM15.2058 95.975L18.0381 94.2945C9.58041 80.0402 7.25596 62.2969 13.1661 45.4416L10.0584 44.3519L6.9506 43.2622C0.368975 62.0324 2.96498 81.7985 12.3736 97.6555L15.2058 95.975Z",
  p3aea300: "M36.4331 27.3453C36.7585 27.7211 36.7585 28.2789 36.4331 28.6547L31.2559 34.6327C30.6498 35.3326 29.5 34.9039 29.5 33.978L29.5 22.022C29.5 21.0961 30.6498 20.6674 31.2559 21.3673L36.4331 27.3453Z",
  p3b349be0: "M38.5313 75.3885C40.4747 81.2421 42.6272 85.4957 46.1602 89.3317M59.7796 99.4619C53.5792 95.8557 49.3182 92.7605 46.1602 89.3317M46.1602 89.3317L13.2275 119.848",
  p3cdb3b00: "M10.0584 44.3519C21.2676 12.3849 56.2689 -4.44294 88.2361 6.76598C120.203 17.9751 137.031 52.9764 125.822 84.9437C114.613 116.911 79.6117 133.74 47.6443 122.531C44.3813 121.386 41.2764 119.994 38.3425 118.382L35.3972 120.983C28.7496 126.85 18.6037 126.218 12.7361 119.571C6.86861 112.923 7.5008 102.777 14.1482 96.9095L15.2058 95.975C6.27269 80.9193 3.81247 62.1647 10.0584 44.3519Z",
  p4ccef00: "M38.1901 7.91288L63.8047 47.4032C69.746 56.5629 63.1719 68.663 52.2541 68.663C47.8196 68.663 43.6566 66.527 41.0704 62.9247L38.1901 58.913L35.8018 62.4955C33.233 66.3486 28.9086 68.663 24.2778 68.663C13.2947 68.663 6.68125 56.4905 12.658 47.276L38.1901 7.91288Z",
  p779ca00: "M7 8H47C52.5228 8 57 12.4772 57 18V38C57 43.5228 52.5228 48 47 48H7V8Z",
};

const SONGS = [
  "Sorry - Justin Bieber",
  "Spider Dance - Toby Fox",
  "パジャマパーティーズのうた - Pajama Parties",
];

function DotRow({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", flexShrink: 0, width: "100%" }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ flexShrink: 0, width: 6, height: 6 }}>
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
            <circle cx="3" cy="3" r="3" fill="#7E7E7E" />
          </svg>
        </div>
      ))}
    </div>
  );
}

function SpeakerGrid() {
  const rows = Array(18).fill(32);
  return (
    <div
      style={{
        position: "absolute",
        left: 22,
        top: 119,
        width: 402,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {rows.map((count, i) => (
        <DotRow key={i} count={count} />
      ))}
    </div>
  );
}

function PowerButton({
  isOn,
  onClick,
  pressed,
}: {
  isOn: boolean;
  onClick: () => void;
  pressed: boolean;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: 361,
        top: 19,
        width: 64,
        height: 64,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-12.5%",
          left: "-10.94%",
          right: "-6.25%",
          bottom: "-12.5%",
        }}
      >
        <svg
          style={{ display: "block", width: "100%", height: "100%" }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 75 80"
        >
          <defs>
            <filter id="pwr-filter" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" width="75" height="80" x="0" y="0">
              <feFlood floodOpacity="0" result="bg" />
              <feColorMatrix in="SourceAlpha" result="ha1" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="ha1" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.52 0 0 0 0 0.52 0 0 0 0 0.52 0 0 0 0.25 0" />
              <feBlend in2="bg" result="s1" />
              <feColorMatrix in="SourceAlpha" result="ha2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-3" dy="-4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="ha2" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
              <feBlend in2="s1" result="s2" />
              <feBlend in="SourceGraphic" in2="s2" />
            </filter>
          </defs>
          <g filter="url(#pwr-filter)">
            <rect fill={pressed ? "#E9E9E9" : "#F0F0F0"} height="64" rx="32" width="64" x="7" y="8" />
            <circle cx="39" cy="40" fill={isOn ? "#00C853" : "#0C89B3"} r="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function PrevButton({ onClick, pressed }: { onClick: () => void; pressed: boolean }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: 20,
        top: 378,
        width: 50,
        height: 40,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-14%",
          right: "-4%",
          bottom: "-20%",
        }}
      >
        <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 59 56">
          <defs>
            <filter id="prev-filter" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" width="59" height="56" x="0" y="0">
              <feFlood floodOpacity="0" result="bg" />
              <feColorMatrix in="SourceAlpha" result="ha1" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-2" dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="ha1" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.52 0 0 0 0 0.52 0 0 0 0 0.52 0 0 0 0.25 0" />
              <feBlend in2="bg" result="s1" />
              <feColorMatrix in="SourceAlpha" result="ha2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-3" dy="-4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="ha2" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
              <feBlend in2="s1" result="s2" />
              <feBlend in="SourceGraphic" in2="s2" />
            </filter>
          </defs>
          <g filter="url(#prev-filter)">
            <path d={svgPaths.p2241bf80} fill={pressed ? "#E9E9E9" : "#F0F0F0"} />
            <path d={svgPaths.p20f17040} fill="#B9B9B9" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function NextButton({ onClick, pressed }: { onClick: () => void; pressed: boolean }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        left: 78,
        top: 378,
        width: 50,
        height: 40,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-20%",
          left: "-14%",
          right: "-4%",
          bottom: "-20%",
        }}
      >
        <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 59 56">
          <defs>
            <filter id="next-filter" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" width="59" height="56" x="0" y="0">
              <feFlood floodOpacity="0" result="bg" />
              <feColorMatrix in="SourceAlpha" result="ha1" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-2" dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="ha1" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.52 0 0 0 0 0.52 0 0 0 0 0.52 0 0 0 0.25 0" />
              <feBlend in2="bg" result="s1" />
              <feColorMatrix in="SourceAlpha" result="ha2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-3" dy="-4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="ha2" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
              <feBlend in2="s1" result="s2" />
              <feBlend in="SourceGraphic" in2="s2" />
            </filter>
          </defs>
          <g filter="url(#next-filter)">
            <path d={svgPaths.p779ca00} fill={pressed ? "#E9E9E9" : "#F0F0F0"} />
            <path d={svgPaths.p3aea300} fill="#B9B9B9" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function VolumeSlider({
  volume,
  onChange,
}: {
  volume: number;
  onChange: (v: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const TRACK_LEFT = 225;
  const TRACK_WIDTH = 199;
  const THUMB_SIZE = 34;
  const TRACK_TOP = 388;
  const THUMB_TOP = 381;

  const thumbLeft = TRACK_LEFT + volume * (TRACK_WIDTH - THUMB_SIZE);

  const getVolumeFromEvent = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const usable = rect.width - (THUMB_SIZE * rect.width) / TRACK_WIDTH;
      const rawX = clientX - rect.left;
      const clamped = Math.max(0, Math.min(rawX, usable));
      onChange(Math.max(0, Math.min(1, clamped / usable)));
    },
    [onChange]
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    getVolumeFromEvent(e.clientX);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) getVolumeFromEvent(e.clientX); };
    const onUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [getVolumeFromEvent]);

  return (
    <>
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          left: TRACK_LEFT,
          top: TRACK_TOP,
          width: TRACK_WIDTH,
          height: 20,
          background: "#e0e0e0",
          borderRadius: 8,
          boxShadow: "inset 0px 2px 4px 0px rgba(39,39,39,0.25)",
          cursor: "pointer",
        }}
      />
      <div
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          left: thumbLeft,
          top: THUMB_TOP,
          width: THUMB_SIZE,
          height: THUMB_SIZE,
          background: "#f0f0f0",
          borderRadius: 57,
          boxShadow: "0px 2px 1.9px 0px rgba(132,132,132,0.25), inset 0px 4px 4px 0px rgba(255,255,255,0.25)",
          cursor: "grab",
          userSelect: "none",
        }}
      />
    </>
  );
}

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#@$?&%*~";

function Display({ isOn, songName }: { isOn: boolean; songName: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPx, setScrollPx] = useState(0);
  const [animDuration, setAnimDuration] = useState(8);

  const targetText = isOn ? songName : "No Signal...";
  const [shownText, setShownText] = useState(targetText);
  const [flickerOpacity, setFlickerOpacity] = useState(1);

  const animName = `mq-${Math.round(scrollPx)}`;

  // Flicker → scramble whenever power or song changes
  useEffect(() => {
    let cancelled = false;

    const runEffect = async () => {
      // Phase 1: rapid screen flicker (7 frames × 45ms ≈ 315ms)
      const flickerSeq = [0.06, 0.9, 0.04, 1.0, 0.08, 0.85, 0.05];
      for (const val of flickerSeq) {
        if (cancelled) return;
        await new Promise<void>(r => setTimeout(r, 45));
        setFlickerOpacity(val);
      }
      if (cancelled) return;
      setFlickerOpacity(1);

      // Phase 2: text scramble (14 steps × 38ms ≈ 530ms)
      const target = targetText;
      const steps = 14;
      for (let step = 0; step < steps; step++) {
        if (cancelled) return;
        await new Promise<void>(r => setTimeout(r, 38));
        const resolved = Math.floor((step / steps) * target.length);
        let scrambled = "";
        for (let i = 0; i < target.length; i++) {
          const ch = target[i];
          if (i < resolved || ch === " " || ch === "." || ch === "-") {
            scrambled += ch;
          } else {
            scrambled += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
        }
        setShownText(scrambled);
      }
      if (!cancelled) setShownText(target);
    };

    runEffect();
    return () => { cancelled = true; };
  }, [isOn, songName]); // eslint-disable-line react-hooks/exhaustive-deps

  // Inject dynamic keyframe for marquee scroll
  useEffect(() => {
    if (scrollPx === 0) return;
    const slideDuration = Math.max(2, scrollPx / 45);
    const pauseDuration = 1;
    const totalDuration = 2 * pauseDuration + 2 * slideDuration;
    const p1 = ((pauseDuration / totalDuration) * 100).toFixed(3);
    const p2 = (((pauseDuration + slideDuration) / totalDuration) * 100).toFixed(3);
    const p3 = (((pauseDuration + slideDuration + pauseDuration) / totalDuration) * 100).toFixed(3);
    const css = `
      @keyframes ${animName} {
        0% { transform: translateX(0px); animation-timing-function: linear; }
        ${p1}% { transform: translateX(0px); animation-timing-function: cubic-bezier(.58,.19,.56,.89); }
        ${p2}% { transform: translateX(-${scrollPx}px); animation-timing-function: linear; }
        ${p3}% { transform: translateX(-${scrollPx}px); animation-timing-function: cubic-bezier(.58,.19,.56,.89); }
        100% { transform: translateX(0px); }
      }
    `;
    const styleEl = document.createElement("style");
    styleEl.id = `mq-style-${animName}`;
    document.head.appendChild(styleEl);
    styleEl.textContent = css;
    setAnimDuration(totalDuration);
    return () => { styleEl.remove(); };
  }, [scrollPx, animName]);

  // Measure overflow for marquee — runs after scramble settles
  useEffect(() => {
    const check = () => {
      if (!textRef.current || !containerRef.current) return;
      const tw = textRef.current.scrollWidth;
      const cw = containerRef.current.clientWidth - 44;
      const overflow = tw - cw;
      if (overflow > 0) {
        setScrollPx(overflow + 16);
      } else {
        setScrollPx(0);
      }
    };
    const t = setTimeout(check, 400);
    return () => clearTimeout(t);
  }, [shownText, isOn]);

  const displayBg = isOn ? "#bee6dc" : "#aec1bc";

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        left: 20,
        top: 14,
        width: 305,
        height: 74,
        background: displayBg,
        borderRadius: 4,
        border: "1px solid #f4f4f4",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 22,
          right: 22,
          overflow: "hidden",
          height: 40,
          opacity: flickerOpacity,
        }}
      >
        <span
          ref={textRef}
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: 34,
            color: "#62797a",
            lineHeight: 1,
            whiteSpace: "nowrap",
            display: "inline-block",
            animation: scrollPx > 0 ? `${animName} ${animDuration}s linear infinite` : "none",
          }}
        >
          {shownText}
        </span>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 4,
          pointerEvents: "none",
          boxShadow: "inset 0px 3px 10px 0px rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );
}

function TongueSticker() {
  return (
    <div
      style={{
        position: "absolute",
        left: 344,
        top: 227,
        width: 160,
        height: 161,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: "rotate(17.42deg)" }}>
        <svg width="122" height="123" viewBox="0 0 132.587 132.589" fill="none">
          <defs>
            <filter id="tongue-f" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" x="-1.18071" y="0" width="133.768" height="134.899">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="3.29328" />
              <feGaussianBlur stdDeviation="1.64664" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
            </filter>
            <mask fill="black" id="tongue-m" maskUnits="userSpaceOnUse" x="2.58677" y="-3.99987" width="131" height="131">
              <rect fill="white" x="2.58677" y="-3.99987" width="131" height="131" />
              <path d={svgPaths.p3759ff80} />
            </mask>
            <clipPath id="tongue-clip">
              <rect fill="white" x="2.11257" width="127.182" height="128.313" />
            </clipPath>
          </defs>
          <g clipPath="url(#tongue-clip)" filter="url(#tongue-f)">
            <path d={svgPaths.p3759ff80} fill="#F9C86D" />
            <path d={svgPaths.p20c8ea80} fill="white" mask="url(#tongue-m)" />
            <path d={svgPaths.p3d9f9d70} fill="#F07373" />
            <path d={svgPaths.p20403000} stroke="#C32758" strokeWidth="0.82332" fill="none" />
            <circle cx="32.5762" cy="47.4035" r="7.82154" fill="#2C2929" />
            <circle cx="86.0897" cy="81.1425" r="7.82154" fill="#2C2929" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function StarSticker() {
  return (
    <div
      style={{
        position: "absolute",
        left: -55,
        top: 191,
        width: 130,
        height: 130,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: "rotate(-24.88deg)" }}>
        <svg width="90" height="87" viewBox="0 0 96 93" fill="none">
          <defs>
            <filter id="star-f" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" x="0" y="0" width="96" height="93">
              <feFlood floodOpacity="0" result="bg" />
              <feColorMatrix in="SourceAlpha" result="ha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="1" dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="ha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="bg" result="s" />
              <feBlend in="SourceGraphic" in2="s" />
            </filter>
          </defs>
          <g filter="url(#star-f)">
            <path d={svgPaths.p1e9dec80} fill="#FF85B2" />
            <path d={svgPaths.p1d99d340} stroke="white" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function HeartSticker() {
  return (
    <div
      style={{
        position: "absolute",
        left: 380,
        top: 101,
        width: 99,
        height: 94,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ transform: "rotate(-146.61deg)" }}>
        <svg width="70" height="78" viewBox="0 0 74 82" fill="none">
          <defs>
            <filter id="heart-f" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" x="0" y="0" width="74" height="82">
              <feFlood floodOpacity="0" result="bg" />
              <feColorMatrix in="SourceAlpha" result="ha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dx="-1" dy="4" />
              <feGaussianBlur stdDeviation="3.2" />
              <feComposite in2="ha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend in2="bg" result="s" />
              <feBlend in="SourceGraphic" in2="s" />
            </filter>
          </defs>
          <g filter="url(#heart-f)">
            <path d={svgPaths.p4ccef00} fill="#FA8DEA" />
            <path d={svgPaths.p22fa1180} stroke="white" strokeWidth="3" />
          </g>
        </svg>
      </div>
    </div>
  );
}

function TopDivider() {
  return (
    <div style={{ position: "absolute", left: -26, top: -15, height: 115.5, width: 526 }}>
      <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 526 116">
        <defs>
          <filter id="td-f" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" width="526" height="116.5" x="0" y="0">
            <feFlood floodOpacity="0" result="bg" />
            <feBlend in="SourceGraphic" in2="bg" result="shape" />
            <feColorMatrix in="SourceAlpha" result="ha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="0.5" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="ha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="shape" result="s1" />
            <feColorMatrix in="SourceAlpha" result="ha2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="0.2" />
            <feGaussianBlur stdDeviation="0.1" />
            <feComposite in2="ha2" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
            <feBlend in2="s1" />
          </filter>
        </defs>
        <g filter="url(#td-f)">
          <path d={svgPaths.p1fd98c00} stroke="#D1D1D1" />
        </g>
      </svg>
    </div>
  );
}

function BottomDivider() {
  return (
    <div style={{ position: "absolute", left: -26, top: 347, height: 1, width: 526 }}>
      <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 526 1">
        <defs>
          <filter id="bd-f" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" width="526" height="1.5" x="0" y="0">
            <feFlood floodOpacity="0" result="bg" />
            <feBlend in="SourceGraphic" in2="bg" result="shape" />
            <feColorMatrix in="SourceAlpha" result="ha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="0.5" />
            <feGaussianBlur stdDeviation="0.5" />
            <feComposite in2="ha" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend in2="shape" result="s1" />
            <feColorMatrix in="SourceAlpha" result="ha2" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="0.2" />
            <feGaussianBlur stdDeviation="0.1" />
            <feComposite in2="ha2" k2="-1" k3="1" operator="arithmetic" />
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.6 0" />
            <feBlend in2="s1" />
          </filter>
        </defs>
        <g filter="url(#bd-f)">
          <path d="M0 0.5H526" stroke="#D1D1D1" />
        </g>
      </svg>
    </div>
  );
}

export function RadioPlayer() {
  const [isOn, setIsOn] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [prevPressed, setPrevPressed] = useState(false);
  const [nextPressed, setNextPressed] = useState(false);
  const [powerPressed, setPowerPressed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePower = () => {
    setPowerPressed(true);
    setTimeout(() => setPowerPressed(false), 150);
    const nextOn = !isOn;
    setIsOn(nextOn);
    if (audioRef.current) {
      if (nextOn) {
        audioRef.current.src = `/${SONGS[songIndex]}.mp3`;
        audioRef.current.volume = volume;
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  const handlePrev = () => {
    if (!isOn) return;
    setPrevPressed(true);
    setTimeout(() => setPrevPressed(false), 150);
    const idx = (songIndex - 1 + SONGS.length) % SONGS.length;
    setSongIndex(idx);
    if (audioRef.current) {
      audioRef.current.src = `/${SONGS[idx]}.mp3`;
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
    }
  };

  const handleNext = () => {
    if (!isOn) return;
    setNextPressed(true);
    setTimeout(() => setNextPressed(false), 150);
    const idx = (songIndex + 1) % SONGS.length;
    setSongIndex(idx);
    if (audioRef.current) {
      audioRef.current.src = `/${SONGS[idx]}.mp3`;
      audioRef.current.volume = volume;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        {/* Radio body + standing shadow wrapper */}
        <div style={{ position: "relative", width: 450 }}>
          {/* Standing floor shadow — rendered FIRST so it paints behind the device */}
          <div
            style={{
              position: "absolute",
              bottom: -12,
              left: "50%",
              transform: "translateX(-50%)",
              width: 560,
              height: 27,
              pointerEvents: "none",
              mixBlendMode: "exclusion",
            }}
          >
            <svg style={{ display: "block", width: "100%", height: "100%" }} fill="none" preserveAspectRatio="none" viewBox="0 0 597 27">
              <g clipPath="url(#shadow-clip)">
                <g filter="url(#shadow-f)" opacity="0.44" style={{ mixBlendMode: "exclusion" }}>
                  <ellipse cx="298.5" cy="13.5" rx="298.5" ry="13.5" fill="url(#shadow-grad)" transform="matrix(1 0 0 -1 0 27)" />
                </g>
              </g>
              <defs>
                <filter id="shadow-f" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" x="-60" y="-60" width="717" height="147">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                  <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="28" />
                </filter>
                <linearGradient id="shadow-grad" gradientUnits="userSpaceOnUse" x1="326.774" y1="27" x2="326.774" y2="13.5">
                  <stop stopColor="#D9D9D9" stopOpacity="0" />
                  <stop offset="1" stopColor="#737373" />
                </linearGradient>
                <clipPath id="shadow-clip">
                  <rect fill="white" width="597" height="27" rx="12" ry="12" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Radio body */}
          <div
            style={{
              position: "relative",
              width: 450,
              height: 450,
              background: "#ebebeb",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <TopDivider />
            <BottomDivider />
            <PowerButton isOn={isOn} onClick={handlePower} pressed={powerPressed} />
            <Display isOn={isOn} songName={SONGS[songIndex]} />
            <SpeakerGrid />
            <PrevButton onClick={handlePrev} pressed={prevPressed} />
            <NextButton onClick={handleNext} pressed={nextPressed} />
            <VolumeSlider volume={volume} onChange={setVolume} />
            <StarSticker />
            <HeartSticker />
            <TongueSticker />
            {/* Neumorphic inset overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 8,
                pointerEvents: "none",
                boxShadow:
                  "inset 0px 4px 4px rgba(255,255,255,0.7), inset 0px -6px 9.7px rgba(0,0,0,0.1), inset -2px -3px 13.1px rgba(44,44,44,0.25), inset 5px 2px 12.9px rgba(255,255,255,0.7)",
              }}
            />
          </div>

        </div>

        {/* Footer left — pinned to left edge of viewport */}
        <div style={{ position: "fixed", bottom: 24, left: 28, display: "flex", flexDirection: "column" }}>
          <span style={{ fontFamily: "'STIX Two Text', serif", fontWeight: 500, fontSize: 14, color: "#626262" }}>
            Meme Radio
          </span>
          <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#989898" }}>
            28/02/2026
          </span>
        </div>

        {/* Footer right — pinned to right edge of viewport */}
        <div style={{ position: "fixed", bottom: 24, right: 28, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <span style={{ fontFamily: "'STIX Two Text', serif", fontWeight: 500, fontSize: 14, color: "#626262" }}>
            Made by Keyaan
          </span>
          <a
            href="https://x.com/kabubunotlabubu"
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: "sans-serif", fontSize: 12, color: "#989898", textDecoration: "none" }}
          >
            (@kabubunotlabubu)
          </a>
        </div>
      </div>
    </>
  );
}
