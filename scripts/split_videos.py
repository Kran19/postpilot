import cv2
import os

input_video = r"c:\Users\Admin\Desktop\projects\postpilot\postpilot_meta_app_review_demo.mp4"
out_dir = r"c:\Users\Admin\Desktop\projects\postpilot\review_videos"
os.makedirs(out_dir, exist_ok=True)

cap = cv2.VideoCapture(input_video)
fps = cap.get(cv2.CAP_PROP_FPS) or 15
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

print(f"Reading {input_video}: {width}x{height}, FPS: {fps}, Total Frames: {total_frames}")

# Split into 3 segments based on timeline:
# Segment 1: Basic (Frames 0 to 180) ~ 12 sec
# Segment 2: Messages (Frames 181 to 370) ~ 12.5 sec
# Segment 3: Comments & Automations (Frames 371 to total_frames) ~ 12 sec

segments = [
    {
        "name": "1_instagram_business_basic.mp4",
        "start": 0,
        "end": 180,
    },
    {
        "name": "2_instagram_business_manage_messages.mp4",
        "start": 181,
        "end": 370,
    },
    {
        "name": "3_instagram_business_manage_comments.mp4",
        "start": 371,
        "end": total_frames,
    }
]

fourcc = cv2.VideoWriter_fourcc(*'mp4v')

for seg in segments:
    out_path = os.path.join(out_dir, seg["name"])
    out = cv2.VideoWriter(out_path, fourcc, fps, (width, height))
    cap.set(cv2.CAP_PROP_POS_FRAMES, seg["start"])
    
    current_f = seg["start"]
    while current_f <= seg["end"]:
        ret, frame = cap.read()
        if not ret:
            break
        out.write(frame)
        current_f += 1
    
    out.release()
    size_mb = os.path.getsize(out_path) / (1024 * 1024)
    duration = (seg["end"] - seg["start"] + 1) / fps
    print(f"Created {seg['name']}: {size_mb:.2f} MB, {duration:.1f}s")

cap.release()
print("All 3 separate videos generated successfully!")
