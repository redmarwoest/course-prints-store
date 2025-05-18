import { exec } from "child_process";
import fs from "fs";
import { JSDOM } from "jsdom";
import path from "path";
import { ColorScheme, ColorSchemes } from "../../../app/types/types";
import { colorSchemes } from "../../../constants/cp-color-scheme/cp-color-scheme";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      selectedSize,
      colorScheme,
      selectedCourseMap,
      date,
      orientation,
      title,
      subTitle,
    } = body;

    const formattedSize = selectedSize
      .replace(" cm", "") // Remove ' cm'
      .split(" x ") // Split into [ '21', '29.7' ]
      .map(Number) // Convert to numbers
      .map((n: number) => Math.round(n * 10)) // Convert cm to mm
      .join("x"); // Join with 'x'2

    const color: ColorScheme = colorSchemes[colorScheme as keyof ColorSchemes];
    if (!color) {
      throw new Error(`Invalid color scheme: ${colorScheme}`);
    }

    function hexToRgb(hex: string): [number, number, number] {
      const normalizedHex = hex.replace("#", "");
      const bigint = parseInt(normalizedHex, 16);
      const r = (bigint >> 16) & 255;
      const g = (bigint >> 8) & 255;
      const b = bigint & 255;
      return [r, g, b];
    }

    const backgroundRGB = hexToRgb(color.backgroundColor);
    const outlineRGB = hexToRgb(color.outlineColor);
    const textRGB = hexToRgb(color.textColor);

    const fileName = `cp-canvas__${
      orientation ? "horizontal" : "vertical"
    }__${formattedSize}.ai`;

    const svgPath = path.resolve(
      "/Users/redmarwoest/Documents/selected-course-map.svg"
    );

    // Update SVG colors based on the selected color scheme
    const dom = new JSDOM(selectedCourseMap, { contentType: "image/svg+xml" });
    const doc = dom.window.document;

    const selectedColors: ColorScheme =
      colorSchemes[colorScheme as keyof ColorSchemes];

    // Apply colors based on element IDs
    Object.keys(selectedColors).forEach((key) => {
      const elements = doc.querySelectorAll(`#${key}, #${key} *`);

      elements.forEach((element: Element) => {
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
            element.setAttribute(
              "fill",
              selectedColors[key as keyof ColorScheme]
            );
          }

          // Set stroke if not already set
          if (element.hasAttribute("stroke")) {
            element.setAttribute(
              "stroke",
              selectedColors[key as keyof ColorScheme]
            );
          }
        }
      });
    });

    const updatedSvg = dom.serialize();
    fs.writeFileSync(svgPath, updatedSvg);

    const jsxContent = `
        var file = new File("/Users/redmarwoest/Documents/${fileName}");
        var doc = app.open(file);

        doc.textFrames.getByName("title").contents = "${title}";
        doc.textFrames.getByName("subtitle").contents = "${subTitle}";
        doc.textFrames.getByName("date").contents = "${date}";

        function makeRGB(r, g, b) {
          var color = new RGBColor();
          color.red = r;
          color.green = g;
          color.blue = b;
          return color;
        }

        // Color both background layer and background element
        var backgroundColor = makeRGB(${backgroundRGB.join(",")});
        try {
            doc.layers.getByName("background").fillColor = backgroundColor;
        } catch(e) {
            console.log("Background layer not found");
        }
        
        try {
            doc.pageItems.getByName("background").fillColor = backgroundColor;
        } catch(e) {
            console.log("Background element not found");
        }

        var outlineColor = makeRGB(${outlineRGB.join(",")});
        for (var i = 0; i < doc.pageItems.length; i++) {
            if (doc.pageItems[i].name.indexOf("outline") !== -1) {
                doc.pageItems[i].strokeColor = outlineColor;
            }
        }

        var textColor = makeRGB(${textRGB.join(",")});
        doc.textFrames.getByName("title").textRange.fillColor = textColor;
        doc.textFrames.getByName("subTitle").textRange.fillColor = textColor;
        doc.textFrames.getByName("date").textRange.fillColor = textColor;

        // Open the SVG file as a separate document
        var svgFile = new File("/Users/redmarwoest/Documents/selected-course-map.svg");
        var svgDoc = app.open(svgFile);
        
        // Select all items in the SVG document
        svgDoc.selection = null; // Clear any existing selection
        svgDoc.selectObjectsOnActiveArtboard();
        
        
        // Copy the selected items using the proper API method
        app.copy();
        
        // Close the SVG document
        svgDoc.close(SaveOptions.DONOTSAVECHANGES);
        
        // Get the map layer and the map element
        var mapLayer = doc.layers.getByName("map");
        var mapElement = doc.pageItems.getByName("map");
        
        // Activate the target document and select the map element
        doc.activate();
        doc.selection = null;
        mapElement.selected = true;
        
        // Paste the copied items into the map element
        app.paste();
        
        // Get all pasted items and group them
        var pastedItems = doc.selection;
        if (pastedItems.length > 0) {
            app.executeMenuCommand('group');
            var groupedMap = doc.selection[0];
          

            // Get the map element's bounds
            var mapBounds = groupedMap.geometricBounds;
            var mapWidth = mapBounds[2] - mapBounds[0];
            var mapHeight = mapBounds[1] - mapBounds[3];
            
            // Get the target map element's bounds
            var mapElement = doc.pageItems.getByName("map");
            mapElement.filled = false; // Make the map element transparent
            var mapElementBounds = mapElement.geometricBounds;
            var mapElementWidth = mapElementBounds[2] - mapElementBounds[0];
            var mapElementHeight = mapElementBounds[1] - mapElementBounds[3];
            
            // Calculate scale based on the map element's dimensions
            var scaleX = mapElementWidth / mapWidth;
            var scaleY = mapElementHeight / mapHeight;
            var scale = Math.min(scaleX, scaleY);
            
            // Resize the map
            groupedMap.resize(scale * 100, scale * 100);
            
            // Get the map element's center point
            var mapElementCenterX = (mapElementBounds[0] + mapElementBounds[2]) / 2;
            var mapElementCenterY = (mapElementBounds[1] + mapElementBounds[3]) / 2;
            
            // Get the grouped map's new bounds
            var newBounds = groupedMap.geometricBounds;
            var newWidth = newBounds[2] - newBounds[0];
            var newHeight = newBounds[1] - newBounds[3];
            
            // Calculate center position
            var centerX = mapElementCenterX - (newWidth / 2);
            var centerY = mapElementCenterY + (newHeight / 2);
            
            // Position the map
            groupedMap.position = [centerX, centerY];
        }

        var exportFolder = Folder("/Users/redmarwoest/course-prints/exports");
        if (!exportFolder.exists) {
          exportFolder.create();
        }

        var exportFile = new File(exportFolder.fsName + "/poster.pdf");

        var saveOptions = new PDFSaveOptions();
        saveOptions.compatibility = PDFCompatibility.ACROBAT5;
        saveOptions.generateThumbnails = true;
        saveOptions.preserveEditability = false;
        saveOptions.viewAfterSaving = false;
        saveOptions.optimization = true;
        saveOptions.pDFPreset = "[High Quality Print]"; // You can also create a custom preset in Illustrator and use its name here

        doc.saveAs(exportFile, saveOptions);

        // Close the document after saving
        doc.close(SaveOptions.SAVECHANGES);

        // Add a delay to ensure the save process completes
        $.sleep(2000);
          `;

    const jsxPath = path.resolve("./src/scripts/generatePoster.jsx");
    fs.writeFileSync(jsxPath, jsxContent);

    exec(
      `osascript -e 'tell application "Adobe Illustrator" to do javascript POSIX file "${jsxPath}"'`,
      (error, stdout) => {
        if (error) {
          console.error("Illustrator script failed:", error);
          return Response.json(
            {
              success: false,
              error: "Poster creation failed",
              details: error.message,
            },
            { status: 500 }
          );
        } else {
          console.log("Illustrator script ran:", stdout);
          return Response.json(
            {
              success: true,
              message: "Poster created successfully",
              filePath: `/exports/poster.pdf`,
              fileName: fileName,
            },
            { status: 200 }
          );
        }
      }
    );
  } catch (error) {
    console.error("Poster creation failed:", error);
    return Response.json(
      {
        success: false,
        error: "Poster creation failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
