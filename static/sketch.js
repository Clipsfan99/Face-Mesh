let facemesh;
let video;
let predictions = [];

let modelIsReady = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video, modelReady);

  facemesh.on("predict", (results) => {
    predictions = results;
  });
  video.hide();
}

function modelReady() {
  console.log("Model ready!");
  modelIsReady = true;
}

function draw() {
  if (!modelIsReady) {
    image(video, 0, 0, width, height);
  } else {
    background(255);
    drawKeypoints();
    printAnnotations();
  }
}

function printAnnotations() {
  if (predictions.length > 0) {
    console.log(Object.keys(predictions[0].annotations));

    const midEyes = predictions[0].annotations.midwayBetweenEyes[0];
    let x = midEyes[0];
    let y = predictions[0].annotations.midwayBetweenEyes[0][1];
    console.log(midEyes);
    fill(255, 0, 0);
    ellipse(x, y, 10, 10);

    const noseTip = predictions[0].annotations.noseTip[0];
    let x1 = noseTip[0];
    let y1 = noseTip[1];

    fill(255, 0, 0);
    ellipse(x1, y1, 10, 10);
  }
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const keypoints = predictions[i].scaledMesh;
    // Draw facial keypoints.
    for (let j = 0; j < keypoints.length; j += 1) {
      const [x, y] = keypoints[j];
      fill(0, 255, 0);
      ellipse(x, y, 5, 5);
    }
  }
}
