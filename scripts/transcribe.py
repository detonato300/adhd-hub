from faster_whisper import WhisperModel
import sys
import os

def transcribe(audio_path, output_path):
    print(f"[i] Loading model: tiny...")
    # Use 'tiny' for speed, CPU for local execution, int8 for low memory
    model = WhisperModel("tiny", device="cpu", compute_type="int8")

    print(f"[i] Transcribing {audio_path}...")
    segments, info = model.transcribe(audio_path, beam_size=5, language="pl")

    print(f"[+] Detected language '{info.language}' with probability {info.language_probability:.2f}")

    with open(output_path, "w", encoding="utf-8") as f:
        for segment in segments:
            print(f"[{segment.start:.2f}s -> {segment.end:.2f}s] {segment.text}")
            f.write(segment.text + " ")

    print(f"[OK] Transcription saved to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python transcribe.py <audio_path> <output_path>")
        sys.exit(1)
    
    transcribe(sys.argv[1], sys.argv[2])
