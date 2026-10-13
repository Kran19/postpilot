import os
import sys
import time
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

BASE_URL = "https://postpilot.vardaansmartsolutions.com"
OUTPUT_MP4 = r"c:\Users\Admin\Desktop\projects\postpilot\postpilot_meta_app_review_demo.mp4"
WIDTH = 1366
HEIGHT = 768
FPS = 15

print(f"Setting up Selenium Chrome recorder at {WIDTH}x{HEIGHT}...")
options = Options()
options.add_argument("--headless=new")
options.add_argument(f"--window-size={WIDTH},{HEIGHT}")
options.add_argument("--disable-gpu")
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("--hide-scrollbars")

driver = webdriver.Chrome(options=options)
driver.set_window_size(WIDTH, HEIGHT)

fourcc = cv2.VideoWriter_fourcc(*'mp4v')
out = cv2.VideoWriter(OUTPUT_MP4, fourcc, FPS, (WIDTH, HEIGHT))

total_frames = 0

def add_banner(cv_img, title, permission_tag):
    """Draws a clean professional top banner explaining the permission being demonstrated to Meta reviewers."""
    h, w, _ = cv_img.shape
    # Overlay top bar (height 42px)
    overlay = cv_img.copy()
    cv2.rectangle(overlay, (0, 0), (w, 42), (20, 25, 25), -1)
    # Blend overlay with 90% opacity
    cv2.addWeighted(overlay, 0.92, cv_img, 0.08, 0, cv_img)
    # Bottom border line of banner (green/emerald)
    cv2.line(cv_img, (0, 42), (w, 42), (60, 180, 75), 2)
    
    # Left text: PostPilot | Title
    text_left = f"PostPilot App Review  |  {title}"
    cv2.putText(cv_img, text_left, (16, 27), cv2.FONT_HERSHEY_DUPLEX, 0.65, (255, 255, 255), 1, cv2.LINE_AA)
    
    # Right badge: Permission Tag
    if permission_tag:
        badge_text = f"Permission: {permission_tag}"
        text_size = cv2.getTextSize(badge_text, cv2.FONT_HERSHEY_DUPLEX, 0.55, 1)[0]
        bx1 = w - text_size[0] - 28
        by1 = 8
        bx2 = w - 12
        by2 = 34
        cv2.rectangle(cv_img, (bx1, by1), (bx2, by2), (35, 110, 50), -1)
        cv2.putText(cv_img, badge_text, (bx1 + 8, 26), cv2.FONT_HERSHEY_DUPLEX, 0.55, (240, 255, 240), 1, cv2.LINE_AA)
    return cv_img

def capture_frame(title="", permission_tag="", hold_seconds=0.1):
    global total_frames
    screenshot_png = driver.get_screenshot_as_png()
    nparr = np.frombuffer(screenshot_png, np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if frame.shape[0] != HEIGHT or frame.shape[1] != WIDTH:
        frame = cv2.resize(frame, (WIDTH, HEIGHT))
    
    if title or permission_tag:
        frame = add_banner(frame, title, permission_tag)
    
    num_repeats = max(1, int(round(hold_seconds * FPS)))
    for _ in range(num_repeats):
        out.write(frame)
        total_frames += 1

try:
    # -------------------------------------------------------------
    # SCENE 1: PostPilot Dashboard Overview
    # -------------------------------------------------------------
    print("Recording Scene 1: Dashboard Overview...")
    driver.get(f"{BASE_URL}/app/dashboard")
    time.sleep(3)
    capture_frame("Workspace Dashboard", "instagram_business_basic", hold_seconds=2.0)
    
    # Scroll down smoothly
    for i in range(1, 4):
        driver.execute_script(f"window.scrollBy(0, 150);")
        time.sleep(0.1)
        capture_frame("Reviewing Platform Analytics & Channels", "instagram_business_basic", hold_seconds=0.5)
    
    driver.execute_script("window.scrollTo(0, 0);")
    time.sleep(0.5)
    capture_frame("Dashboard Ready", "instagram_business_basic", hold_seconds=1.5)

    # -------------------------------------------------------------
    # SCENE 2: Integrations Hub & Connected Instagram Account
    # -------------------------------------------------------------
    print("Recording Scene 2: Integrations Hub (instagram_business_basic)...")
    driver.get(f"{BASE_URL}/app/channels")
    time.sleep(2.5)
    capture_frame("Meta Connected Assets Hub", "instagram_business_basic", hold_seconds=2.5)
    
    # Scroll slightly to center the Karan Speak card
    driver.execute_script("window.scrollBy(0, 80);")
    capture_frame("Karan Speak Official (@karanspeak07) Connected", "instagram_business_basic", hold_seconds=3.0)

    # Click "Connect Meta Asset" Modal to show OAuth workflow
    print("Recording Scene 3: Connect Meta Asset Modal...")
    try:
        connect_btn = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, "//button[contains(., 'Connect Meta Asset')]"))
        )
        driver.execute_script("arguments[0].click();", connect_btn)
        time.sleep(1)
        capture_frame("Connect Meta Asset - OAuth Authorization Modal", "instagram_business_basic", hold_seconds=3.0)
        
        # Click Cancel
        cancel_btn = driver.find_element(By.XPATH, "//button[contains(., 'Cancel')]")
        driver.execute_script("arguments[0].click();", cancel_btn)
        time.sleep(0.8)
        capture_frame("Channels Hub Active", "instagram_business_basic", hold_seconds=1.5)
    except Exception as e:
        print("Note on modal interaction:", e)

    # -------------------------------------------------------------
    # SCENE 3: Unified Inbox & Customer Messaging
    # -------------------------------------------------------------
    print("Recording Scene 4: Unified Inbox (instagram_business_manage_messages)...")
    driver.get(f"{BASE_URL}/app/inbox")
    time.sleep(2.5)
    capture_frame("Unified Inbox - Centralized Meta DMs", "instagram_business_manage_messages", hold_seconds=2.0)

    # Filter by Instagram
    try:
        ig_filter = driver.find_element(By.XPATH, "//button[contains(., 'Instagram')] | //span[contains(., 'Instagram')]")
        ig_filter.click()
        time.sleep(0.8)
        capture_frame("Filtering Direct Messages by Instagram Channel", "instagram_business_manage_messages", hold_seconds=2.0)
    except Exception as e:
        print("Filter click note:", e)

    # Click first customer chat
    try:
        chat_card = driver.find_element(By.XPATH, "//*[contains(text(), 'IG Customer') or contains(text(), 'Sarah Jenkins')]")
        chat_card.click()
        time.sleep(0.8)
        capture_frame("Viewing Live Instagram DM Thread", "instagram_business_manage_messages", hold_seconds=2.5)
    except Exception as e:
        print("Chat select note:", e)

    # Type reply into composer
    try:
        inputs = driver.find_elements(By.XPATH, "//input[@placeholder] | //textarea")
        reply_box = None
        for inp in inputs:
            placeholder = inp.get_attribute("placeholder") or ""
            if "reply" in placeholder.lower() or "message" in placeholder.lower() or "instagram" in placeholder.lower():
                reply_box = inp
                break
        
        if reply_box:
            reply_box.click()
            demo_msg = "Hello! PostPilot connects to your Instagram account to automate customer support and DMs."
            typed_so_far = ""
            # Animate typing in chunks
            for chunk in demo_msg.split(" "):
                typed_so_far += chunk + " "
                reply_box.clear()
                reply_box.send_keys(typed_so_far.strip())
                capture_frame("Replying to Instagram DM in Real Time", "instagram_business_manage_messages", hold_seconds=0.18)
            
            capture_frame("Message Ready to Dispatch", "instagram_business_manage_messages", hold_seconds=1.5)
            
            # Click Send button
            send_btn = driver.find_element(By.XPATH, "//button[contains(., 'Send')]")
            send_btn.click()
            time.sleep(1)
            capture_frame("Instagram DM Delivered via Meta Graph API", "instagram_business_manage_messages", hold_seconds=2.5)
    except Exception as e:
        print("Reply typing note:", e)

    # -------------------------------------------------------------
    # SCENE 4: Automations Builder & Keyword Comment Rules
    # -------------------------------------------------------------
    print("Recording Scene 5: Automations Builder (instagram_business_manage_comments)...")
    driver.get(f"{BASE_URL}/app/automations")
    time.sleep(2.5)
    capture_frame("Automations Engine - Keyword & Comment Rules", "instagram_business_manage_comments", hold_seconds=2.5)
    
    # Scroll down to show rule conditions
    driver.execute_script("window.scrollBy(0, 220);")
    time.sleep(0.5)
    capture_frame("Trigger: Instagram Comment 'PRICE' -> Action: Instant DM", "instagram_business_manage_comments", hold_seconds=3.0)

    # -------------------------------------------------------------
    # SCENE 5: Compliance Footer (Privacy & Data Deletion)
    # -------------------------------------------------------------
    print("Recording Scene 6: Compliance and Settings...")
    driver.get(f"{BASE_URL}/privacy")
    time.sleep(1.5)
    capture_frame("Meta Compliance: Privacy Policy & Data Deletion", "Meta Policy Compliance", hold_seconds=2.5)

    print("Finalizing video...")
finally:
    driver.quit()
    out.release()

file_size_mb = os.path.getsize(OUTPUT_MP4) / (1024 * 1024)
duration_sec = total_frames / FPS
print(f"\n=======================================================")
print(f"SCREEN RECORDING COMPLETED SUCCESSFULLY!")
print(f"File: {OUTPUT_MP4}")
print(f"Total Frames: {total_frames} | Duration: {duration_sec:.1f} seconds")
print(f"File Size: {file_size_mb:.2f} MB")
print(f"=======================================================")
