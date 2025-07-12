// Base64-encoded SVG placeholder for profile image
const defaultAvatarSVG = `
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="200" height="200" fill="#E5E7EB"/>
  <path d="M100 90C113.807 90 125 78.8071 125 65C125 51.1929 113.807 40 100 40C86.1929 40 75 51.1929 75 65C75 78.8071 86.1929 90 100 90Z" fill="#9CA3AF"/>
  <path d="M100 100C66.6667 100 40 126.667 40 160H160C160 126.667 133.333 100 100 100Z" fill="#9CA3AF"/>
</svg>
`;

const defaultAvatarDataUrl = `data:image/svg+xml;base64,${btoa(defaultAvatarSVG)}`;

export default defaultAvatarDataUrl;
