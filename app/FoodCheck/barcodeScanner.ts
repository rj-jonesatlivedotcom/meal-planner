// Camera ownership and cancellation are shared by native and fallback decoding.
const formats = ["ean_13", "ean_8", "upc_a", "upc_e", "code_128"];

type NativeDetector = {
  detect(video: HTMLVideoElement): Promise<Array<{ rawValue?: string }>>;
};
type NativeDetectorConstructor = {
  new (options: { formats: string[] }): NativeDetector;
  getSupportedFormats?: () => Promise<string[]>;
};

export function createBarcodeScanner(
  video: HTMLVideoElement,
  onDetected: (barcode: string) => void,
  onError: (message: string) => void,
) {
  let active = true;
  let started = false;
  let stream: MediaStream | null = null;
  let timer: number | undefined;
  let deadline: number | undefined;
  let cancelPlayback: (() => void) | undefined;

  function stop() {
    active = false;
    window.clearTimeout(timer);
    window.clearTimeout(deadline);
    cancelPlayback?.();
    stream?.getTracks().forEach((track) => track.stop());
    stream = null;
    video.pause();
    video.srcObject = null;
  }

  function fail(message: string) {
    if (!active) return;
    stop();
    onError(message);
  }

  async function playPreview() {
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.srcObject = stream;
    // Wait for actual playback/readiness, with cancellation and a bounded wait.
    await new Promise<void>((resolve, reject) => {
      let playing = false;
      let settled = false;
      const timeout = window.setTimeout(() => finish(new Error("preview")), 10000);
      function finish(error?: unknown) {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeout);
        video.removeEventListener("loadeddata", ready);
        video.removeEventListener("error", failed);
        cancelPlayback = undefined;
        if (error) reject(error);
        else resolve();
      }
      function ready() {
        if (playing && video.readyState >= 2) finish();
      }
      function failed() { finish(new Error("preview")); }
      cancelPlayback = () => finish();
      video.addEventListener("loadeddata", ready);
      video.addEventListener("error", failed);
      void video.play().then(() => { playing = true; ready(); }, failed);
    });
  }

  async function fallbackDecoder() {
    const [browser, library] = await Promise.all([
      import("@zxing/browser"),
      import("@zxing/library"),
    ]);
    const reader = new browser.BrowserMultiFormatReader();
    reader.possibleFormats = [
      library.BarcodeFormat.EAN_13, library.BarcodeFormat.EAN_8,
      // UPC-A shares EAN-13 bars with a leading zero. Read it through EAN-13
      // rather than enabling ZXing's UPC-A conversion that removes that zero.
      library.BarcodeFormat.UPC_E,
      library.BarcodeFormat.CODE_128,
    ];
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("decoder");
    // Decode single frames on our own loop: no independent ZXing stream or timer.
    return () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);
      try {
        return reader.decodeFromCanvas(canvas).getText();
      } catch (error) {
        if (error instanceof library.NotFoundException ||
            error instanceof library.ChecksumException ||
            error instanceof library.FormatException) return undefined;
        throw error;
      }
    };
  }

  async function start() {
    if (started || !active) return;
    started = true;
    if (!window.isSecureContext) {
      fail("Camera scanning needs HTTPS. Open RenalPlan using a secure HTTPS address, or enter the barcode manually.");
      return;
    }
    if (!navigator.mediaDevices?.getUserMedia) {
      fail("Camera access is unavailable in this browser. Try Safari or Chrome on an HTTPS connection, or enter the barcode manually.");
      return;
    }

    let stage: "camera" | "preview" | "decoder" = "camera";
    try {
      let acquired: MediaStream;
      try {
        acquired = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
      } catch (error) {
        // Retry selection/constraint failures only, never permission denial.
        if (!active) return;
        const name = error instanceof Error ? error.name : "";
        if (!["OverconstrainedError", "ConstraintNotSatisfiedError", "NotFoundError"].includes(name)) throw error;
        acquired = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }
      if (!active) {
        acquired.getTracks().forEach((track) => track.stop());
        return;
      }
      stream = acquired;
      stage = "preview";
      await playPreview();
      if (!active) return;
      stage = "decoder";
      let detector: NativeDetector | undefined;
      const Native = (window as typeof window & { BarcodeDetector?: NativeDetectorConstructor }).BarcodeDetector;
      if (typeof Native === "function") {
        try {
          const supported = await Native.getSupportedFormats?.();
          if (!active) return;
          if (!supported || formats.every((format) => supported.includes(format))) {
            detector = new Native({ formats });
          }
        } catch {
          // A present but unusable native API must not prevent fallback scanning.
        }
      }
      if (!active) return;
      let decode = detector ? undefined : await fallbackDecoder();
      if (!active) return;
      deadline = window.setTimeout(() => fail("No readable barcode found. Try better lighting and hold a retail barcode steady, then scan again or enter it manually."), 45000);

      async function scan() {
        if (!active) return;
        try {
          if (video.readyState >= 2 && video.videoWidth > 0) {
            let value: string | undefined;
            if (detector) {
              try {
                value = (await detector.detect(video)).find((item) => item.rawValue)?.rawValue;
              } catch {
                if (!active) return;
                detector = undefined;
                decode = await fallbackDecoder();
              }
            } else {
              value = decode?.();
            }
            if (!active) return;
            // Retail lookup accepts numeric identifiers; never convert to Number.
            if (value && /^\d+$/.test(value)) {
              stop(); // Release camera before the product network request starts.
              onDetected(value);
              return;
            }
          }
          if (active) timer = window.setTimeout(() => { void scan(); }, 200);
        } catch {
          fail("Barcode decoding failed. Close and reopen the scanner, or enter the barcode manually.");
        }
      }
      void scan();
    } catch (error) {
      if (!active) return;
      const name = error instanceof Error ? error.name : "";
      if (stage === "preview") {
        fail("The camera preview could not start. Close and reopen the scanner in Safari or Chrome, allow camera access, or enter the barcode manually.");
      } else if (stage === "decoder") {
        fail("The barcode decoder could not start. Check your connection and reopen the scanner, or enter the barcode manually.");
      } else if (["NotAllowedError", "PermissionDeniedError"].includes(name)) {
        fail("Camera permission was denied. Allow camera access for RenalPlan in your browser settings, then try again, or enter the barcode manually.");
      } else if (name === "NotFoundError") {
        fail("No camera was found. Connect or enable a camera, or enter the barcode manually.");
      } else if (name === "NotReadableError" || name === "TrackStartError") {
        fail("The camera is busy or unavailable. Close other apps using it and try again, or enter the barcode manually.");
      } else {
        fail("The camera could not start. Check camera permissions and use HTTPS, then try again or enter the barcode manually.");
      }
    }
  }

  return { start, stop };
}
