# Coded By @Ic3zy
# Copyright (C) 2024 Ic3zy.

# Licensed under the GPL-3.0 License;
# you may not use this file except in compliance with the License.

# Text-Maker - Ic3zy

from PIL import Image, ImageDraw, ImageFont
import os
import sys
def webpbase(text, savepath="plugins\\temp"):
    font_size = 80
    text_color_options = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 0), (255, 0, 255), (0, 255, 255)]
    frame_duration = 200 
    current_directory = os.path.dirname(os.path.abspath(__file__))
    save_directory = os.path.join(current_directory, savepath)
    file_name = "attp.webp"
    save_path = os.path.join(save_directory, file_name)
    if not os.path.exists(save_directory):
        os.makedirs(save_directory)
    font = ImageFont.truetype("arial.ttf", font_size)
    image_width = 600
    image_height = 600
    def wrap_text(text, max_width, font):
        lines = []
        words = text.split()
        current_line = words[0]
        for word in words[1:]:
            temp_line = f"{current_line} {word}"
            temp_width, _ = font.getbbox(temp_line)[2:4]
            if temp_width <= max_width - 40:
                current_line = temp_line
            else:
                lines.append(current_line)
                current_line = word
        lines.append(current_line)
        return lines
    lines = wrap_text(text, image_width, font)
    frames = []
    for frame_index in range(10):
        img = Image.new("RGBA", (image_width, image_height), (0, 0, 0, 0))  
        draw = ImageDraw.Draw(img)
        text_color = text_color_options[frame_index % len(text_color_options)]
        y_offset = (image_height - (len(lines) * font_size)) / 2 
        for line in lines:
            text_width, _ = font.getbbox(line)[2:4]
            x_position = (image_width - text_width) / 2
            draw.text((x_position, y_offset), line, font=font, fill=text_color)
            y_offset += font_size
        frames.append(img)
    frames[0].save(save_path, save_all=True, append_images=frames[1:], duration=frame_duration, loop=0, format="WEBP")
    print(f"WebP Üretildi Ve =>'{save_path}': Konumuna Kaydedildi!: By owner Ic3zy")
if __name__ == "__main__":
    if len(sys.argv) > 1:
        text = " ".join(sys.argv[1:]) 
        webpbase(text)
    else:
        print("Lütfen bir metin girin.")
