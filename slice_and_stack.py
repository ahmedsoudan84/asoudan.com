import os
import sys
import argparse
from PIL import Image

def is_column_empty(img, x, bg_color, alpha_bg, tolerance=10):
    # Crop a 1-pixel wide vertical slice
    col = img.crop((x, 0, x+1, img.height))
    colors = col.getcolors(img.height)
    
    if not colors:
        return False
        
    for count, pixel in colors:
        # Check transparency first if alpha_bg is True
        if alpha_bg and len(pixel) == 4 and pixel[3] < 10:
            continue # transparent pixel, it's background
            
        # Check color difference
        if isinstance(pixel, tuple):
            diff = sum(abs(p - b) for p, b in zip(pixel[:3], bg_color[:3]))
        else:
            diff = abs(pixel - bg_color)
            
        if diff > tolerance:
            return False
            
    return True

def slice_horizontal_flow(image_path, output_dir):
    try:
        img = Image.open(image_path).convert("RGBA")
    except FileNotFoundError:
        print(f"Error: {image_path} not found in the current directory.")
        sys.exit(1)
        
    width, height = img.size
    
    # Assume background color is the top-left pixel
    bg_color = img.getpixel((0, 0))
    is_alpha_bg = len(bg_color) == 4 and bg_color[3] < 10

    print("Analyzing image columns to find gaps. This may take a few seconds...")
    
    # Find columns containing content
    content_columns = []
    for x in range(width):
        if not is_column_empty(img, x, bg_color, is_alpha_bg):
            content_columns.append(x)
            
    if not content_columns:
        print("Error: Image appears to be entirely empty or background color.")
        sys.exit(1)
        
    # Group continuous columns into regions (screens)
    regions = []
    start = content_columns[0]
    prev = content_columns[0]
    
    # We consider a gap as > 5px of pure background 
    # to avoid slicing inside minor artifacts
    gap_threshold = 5 
    
    for col in content_columns[1:]:
        if col > prev + gap_threshold:
            regions.append((start, prev))
            start = col
        prev = col
    regions.append((start, prev))
    
    os.makedirs(output_dir, exist_ok=True)
    
    screen_filenames = []
    for idx, (startX, endX) in enumerate(regions):
        # We enforce a minimum width so we don't slice out tiny vertical lines
        if (endX - startX) < 50: 
            continue
            
        cropped = img.crop((startX, 0, endX + 1, height))
        
        filename = f"screen_{idx + 1}.png"
        filepath = os.path.join(output_dir, filename)
        cropped.save(filepath)
        screen_filenames.append(filename)
        print(f"✅ Saved isolated screen to: {filepath}")
        
    return screen_filenames

def generate_html(output_dir, screen_filenames):
    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Journey Flow</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Hide scrollbar for a cleaner swipe experience */
        .no-scrollbar::-webkit-scrollbar {{
            display: none;
        }}
        .no-scrollbar {{
            -ms-overflow-style: none;
            scrollbar-width: none;
        }}
    </style>
</head>
<body class="bg-gray-50 min-h-screen p-4 md:p-8 lg:p-12 font-sans overflow-x-hidden">
    <div class="max-w-[95vw] lg:max-w-max mx-auto">
        <h1 class="text-2xl md:text-3xl font-bold mb-8 text-gray-800 tracking-tight">User Journey Flow</h1>
        
        <!-- 
          Desktop: flex-row, side-by-side, horizontally scrollable
          Mobile: flex-col, vertically stacked, standard mobile scrolling 
        -->
        <div class="flex flex-col lg:flex-row gap-6 md:gap-10 overflow-x-auto pb-12 no-scrollbar lg:snap-x lg:snap-mandatory pr-[5vw]">
"""
    for filename in screen_filenames:
        html_content += f"""
            <div class="flex-none w-full lg:w-auto lg:snap-center shadow-xl lg:shadow-2xl rounded-2xl overflow-hidden bg-white border border-gray-100 flex justify-center max-h-[85vh]">
                <img src="{filename}" alt="Flow Screen" class="w-full lg:w-auto lg:max-h-full object-contain" />
            </div>
"""
            
    html_content += """
        </div>
    </div>
</body>
</html>
"""
    
    html_path = os.path.join(output_dir, "index.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"🎉 Generated Responsive HTML Viewer at: {html_path}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Slice and stack wide flow diagram into individual mobile screens.")
    parser.add_argument("--input", default="flow_diagram.png", help="Input image file (default: flow_diagram.png)")
    parser.add_argument("--output", default="output", help="Output directory (default: output)")
    args = parser.parse_args()
    
    print(f"Processing '{args.input}' -> slicing out gaps...")
    filenames = slice_horizontal_flow(args.input, args.output)
    
    if filenames:
        generate_html(args.output, filenames)
        print("\\nDone! Open the viewer by double-clicking the generated index.html or running:")
        print(f"  open {args.output}/index.html")
    else:
        print("\\nNo screens produced. Check your image format or background uniformity.")
