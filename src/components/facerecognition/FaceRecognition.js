import './facerecognition.css';

// Set WASM path at module level - BEFORE component
// setWasmPaths('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-wasm@4.22.0/dist/');

const FaceRecognition = ({ imageSrc, boxes, setBoxes, setStatus }) => {
  const imgRef = useRef();
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [tfReady, setTfReady] = useState(false);

  // Initialize TensorFlow FIRST
  useEffect(() => {
    const initTensorFlow = async () => {
      try {
        setStatus('Initializing TensorFlow...');
        
        // REMOVE setWasmPaths from here - it's now at the top
            
     // Use CPU backend (most reliable for production)
        await tf.setBackend('cpu');
        await tf.ready();
        console.log(`✅ TensorFlow initialized with CPU backend`);
        
        setTfReady(true);
        setStatus('TensorFlow ready');
      } catch (err) {
        console.error('TensorFlow initialization failed:', err);
        setStatus('TensorFlow initialization failed');
      }
    };
    
    initTensorFlow();
  }, [setStatus]);

  // Load face-api models AFTER TensorFlow is ready
  useEffect(() => {
    if (!tfReady) return;
    
    const loadModels = async () => {
      try {
        setStatus('Loading face detection model...');
        await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
        setModelsLoaded(true);
        setStatus('Model loaded - ready to detect faces!');
      } catch (err) {
        console.error('Model loading failed:', err);
        setStatus('Failed to load model');
      }
    };
    
    loadModels();
  }, [tfReady, setStatus]);

  // Scale boxes to displayed image size
  const scaleBoxesToDisplaySize = useCallback((detections, img) => {
    const { width: displayWidth, height: displayHeight } = img;
    const { naturalWidth, naturalHeight } = img;

    const scaleX = displayWidth / naturalWidth;
    const scaleY = displayHeight / naturalHeight;

    return detections.map(det => {
      if (!det?.box) return { leftCol: 0, topRow: 0, rightCol: 0, bottomRow: 0 };
      const { x, y, width, height } = det.box;
      return {
        leftCol: x * scaleX,
        topRow: y * scaleY,
        rightCol: (x + width) * scaleX,
        bottomRow: (y + height) * scaleY,
      };
    });
  }, []);

  // Run detection after image load
  const handleImageLoad = async () => {
    if (!imgRef.current || !modelsLoaded || !tfReady) return;
    const img = imgRef.current;
    if (!img.naturalWidth || !img.naturalHeight) return;

    try {
      setDetecting(true);
      setStatus('Detecting faces...');

      const detections = await faceapi.detectAllFaces(
        img,
        new faceapi.SsdMobilenetv1Options({ minConfidence: 0.2 })
      );

      if (!detections.length) {
        setBoxes([]);
        setStatus('No faces detected');
      } else {
        const scaledBoxes = scaleBoxesToDisplaySize(detections, img);
        setBoxes(scaledBoxes);
        setStatus(`Detected ${scaledBoxes.length} face(s)`);
      }
    } catch (err) {
      console.error('Face detection error:', err);
      setStatus('Error detecting faces: ' + err.message);
    } finally {
      setDetecting(false);
    }
  };

  return (
    <div className="facerecognition-wrapper">
      {imageSrc && (
        <div className="image-container">
          <img
            ref={imgRef}
            src={imageSrc}
            alt="face detection"
            crossOrigin={/^https?:\/\//.test(imageSrc) ? 'anonymous' : undefined}
            onLoad={handleImageLoad}
          />

          {boxes.map((box, i) => (
            <div
              key={i}
              className="bounding-box"
              style={{
                top: box.topRow || 0,
                left: box.leftCol || 0,
                width: (box.rightCol - box.leftCol) || 0,
                height: (box.bottomRow - box.topRow) || 0,
              }}
            />
          ))}

          {detecting && (
            <div className="detecting-overlay">
              Detecting...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
























































































