let mobilenet;
let video;
let canvas;
let captureButton;

function setup() {
    canvas = createCanvas(640, 480);
    canvas.parent('canvasContainer');
    video = createCapture(VIDEO);
    video.hide();
    mobilenet = ml5.imageClassifier('MobileNet', modelReady);
    captureButton = select('#captureButton');
    captureButton.mousePressed(captureImage);
}

function modelReady() {
    console.log('Model is ready!');
}

function draw() {
    image(video, 0, 0, width, height);
}

function captureImage() {
    mobilenet.classify(canvas, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        let label = results[0].label;
        let confidence = nf(results[0].confidence * 100, 2, 2);
        alert(`Detected object: ${label}\nConfidence: ${confidence}%`);
    }
}
