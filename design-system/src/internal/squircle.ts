/**
 * Creates a squircle mask for an element using dynamic SVG masking
 * Based on the approach from https://codepen.io/
 */
interface SquircleOptions {
  cornerSize?: number;
  curvature?: number;
}

/**
 * Applies a squircle mask to the given element
 * @param element The element to apply the squircle mask to
 * @param options Optional parameters for customizing the squircle
 */
export function makeSquircle(
  element: HTMLElement,
  options: SquircleOptions = {},
): void {
  // Get options from element attributes or use defaults
  let cornerSize = options.cornerSize;
  let curvature = options.curvature;

  // Use CSS variables if available, otherwise use provided options or defaults
  if (!cornerSize) {
    const cornerSizeVar = getComputedStyle(element)
      .getPropertyValue("--squircle-corner-size")
      .trim();
    cornerSize = cornerSizeVar ? parseInt(cornerSizeVar, 10) : 18;
  }

  if (!curvature) {
    const curvatureVar = getComputedStyle(element)
      .getPropertyValue("--squircle-curvature")
      .trim();
    curvature = curvatureVar ? parseInt(curvatureVar, 10) : 6;
  }

  // Get element dimensions
  const height = element.offsetHeight;
  const width = element.offsetWidth;

  // Calculate the midpoint of the shortest side
  const half = height > width ? width / 2 : height / 2;

  // Make sure corner size isn't bigger than half the shortest dimension
  const cornerAnchor = half < cornerSize ? half : cornerSize;

  // Calculate the length of the straight horizontal and vertical paths
  const hSides = width - cornerAnchor * 2;
  const vSides = height - cornerAnchor * 2;

  // Generate SVG mask for the squircle
  const svgMask = `url("data:image/svg+xml,<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xml:space='preserve' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'><path d='M0,${cornerAnchor} C0,${curvature} ${curvature},0 ${cornerAnchor},0 h${hSides} c${
    cornerAnchor - curvature
  },0 ${cornerAnchor},${curvature} ${cornerAnchor},${cornerAnchor} v${vSides} c0,${
    cornerAnchor - curvature
  } -${curvature},${cornerAnchor} -${cornerAnchor},${cornerAnchor} h-${hSides} c-${
    cornerAnchor - curvature
  },0 -${cornerAnchor},-${curvature} -${cornerAnchor},-${cornerAnchor} v-${vSides}Z'></path></svg>")`;

  // Apply the mask as a CSS variable
  element.style.setProperty("--squircle-mask", svgMask);

  // Add the mask-squircle class if it doesn't exist
  if (!element.classList.contains("mask-squircle")) {
    element.classList.add("mask-squircle");
  }
}

/**
 * Applies squircle masks to all elements with the 'squircle' class
 * Optional: Add a mutation observer to handle dynamically added elements
 */
export function applySquirclesToElements(): void {
  // Select all elements with the squircle class
  const elements = document.querySelectorAll(
    ".squircle",
  ) as NodeListOf<HTMLElement>;

  // Apply squircle to each element
  elements.forEach((element) => {
    makeSquircle(element);
  });
}

// For debugging in browser console
if (typeof window !== "undefined") {
  (window as any).makeSquircle = makeSquircle;
  (window as any).applySquirclesToElements = applySquirclesToElements;
}
