from PIL import Image
import os
from moviepy.editor import ImageSequenceClip
def convert_webp_to_mp4(input_path):
    img = Image.open(input_path)
    temp_dir = "temp_frames"
    os.makedirs(temp_dir, exist_ok=True)
    frames = []
    output_path = "plugins/temp/converted.mp4" 
    outpng_path = "plugns/temp/convert.png"
    if img.is_animated:
        for frame in range(img.n_frames):
            img.seek(frame)
            frame_path = os.path.join(temp_dir, f"frame_{frame:04d}.png")
            img.save(frame_path)
            frames.append(frame_path)
        clip = ImageSequenceClip(frames, fps=10)
        clip.write_videofile(output_path, codec='libx264')
        for frame in frames:
            os.remove(frame)
        os.rmdir(temp_dir)
    else:
        img = img.convert("RGB")
        frame_path = os.path.join("plugins\\temp", "convert.png")
        img.save(frame_path)
        clip = ImageSequenceClip([frame_path], fps=10)
        clip.write_videofile(outpng_path, codec='libx264')
if __name__ == "__main__":
    import sys
    if len(sys.argv) != 2:
        print("Kullanım: python convert.py <input_path>")
        sys.exit(1)
    input_path = sys.argv[1]
    convert_webp_to_mp4(input_path)
try:
    os.remove("temp_frames")
except:
    pass
