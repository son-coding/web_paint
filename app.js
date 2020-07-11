const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "black";
const CANVAS_SIZE = 700;
///////////////////////////////////////////////////////
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//처음 시작시 기본 배경색 설정
ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_SIZE,CANVAS_SIZE);
//////////////////////////
// default color
ctx.strokeStyle = INITIAL_COLOR;
// default linewidth
ctx.linewidth = 1;
ctx.fillStyle = INITIAL_COLOR;

// mouse event down below
let painting = false;
let filling = false;

function stopPainting(){
  painting = false;
}

function startPainting(){
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;

}

function handleRangeChange(event){
  const lineSize = event.target.value;
  ctx.lineWidth = lineSize;
  // console.log(event.target.value);
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(){
  if(filling){
    //x, y, width, height
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }

}

function handleCM(event){
  //캔버스 안에 우클릭 저장 방지 기능
  event.preventDefault();
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "nice_image";
  link.click();
}

if(canvas){
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM)
}
// e는 array에 item를 대표하고 기능은 없다. 아무 이름도 괜찮다.
Array.from(colors).forEach(e =>
  e.addEventListener("click", handleColorClick)
);

if(range){
  range.addEventListener("input", handleRangeChange);
}

if(mode){
  mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
  saveBtn.addEventListener("click", handleSaveClick);
}
