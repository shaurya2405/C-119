function setup()
{
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}

function preload()
{
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw()
{
    // Set stroke weight to 13
    strokeWeight(13);
    // set stroke color to black
    stroke(0);
    // If mouse is pressed, draw a line between previous current mouse positions
    if (mouseIsPressed)
    {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas()
{
    classifier.classify(canvas, gotResults)
}

function gotResults(error, results)
{
    if(error) {
        console.error(error);
    }

    console.log(results);
    document.getElementById("label").innerHTML = "Label: " + results[0].label;

    document.getElementById("confidence").innerHTML = "Confidence: " + Math.round(results[0].confidence * 100) + "%";

    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}

function clearCanvas()
{
    background("white");
}