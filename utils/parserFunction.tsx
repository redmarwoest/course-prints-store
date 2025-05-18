export const updateSvgColors = (
  svgString: string,
  colors: Record<string, string>
) => {
  // Only run this function on the client side
  if (typeof window === "undefined") {
    return svgString;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");

  Object.keys(colors).forEach((key) => {
    const elements = doc.querySelectorAll(`#${key}, #${key} *`);

    elements.forEach((element) => {
      if (
        element.tagName === "path" ||
        element.tagName === "polygon" ||
        element.tagName === "circle" ||
        element.tagName === "text" ||
        element.tagName === "rect" ||
        element.tagName === "line" ||
        element.tagName === "polyline"
      ) {
        // Set fill if not already set and not a polyline
        if (element.tagName !== "polyline" && element.hasAttribute("fill")) {
          element.setAttribute("fill", colors[key] || "");
        }

        // Set stroke if not already set
        if (element.hasAttribute("stroke")) {
          element.setAttribute("stroke", colors[key] || "");
        }
      }
    });
  });

  return new XMLSerializer().serializeToString(doc);
};
