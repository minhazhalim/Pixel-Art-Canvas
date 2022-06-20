const guide = document.getElementById('guide');
const colorInput = document.getElementById('colorInput');
const toggleGuide = document.getElementById('toggleGuide');
const clearButton = document.getElementById('clearButton');
const canvas = document.getElementById('canvas');
const drawingContext = canvas.getContext('2d');
const cell_side_count = 5;
const colorHistory = {};
const cellPixelLength = canvas.width / cell_side_count;
colorInput.value = '#009578';
drawingContext.fillStyle = '#ffffff';
drawingContext.fillRect(0,0,canvas.width,canvas.height);
{
     guide.style.width = `${canvas.width}px`;
     guide.style.height = `${canvas.height}px`;
     guide.style.gridTemplateColumns = `repeat(${cell_side_count},1fr)`;
     guide.style.gridTemplateRows = `repeat(${cell_side_count},1fr)`;
     [...Array(cell_side_count ** 2)].forEach(() => {
          guide.insertAdjacentHTML('beforeend','<div></div>');
     });
}
function fillCell(cellX,cellY){
     const startX = cellX * cellPixelLength;
     const startY = cellY * cellPixelLength;
     drawingContext.fillStyle = colorInput.value;
     drawingContext.fillRect(startX,startY,cellPixelLength,cellPixelLength);
     colorHistory[`${cellX}_${cellY}`] = colorInput.value;
}
function handleCanvasMousedown(event){
     if(event.button !== 0) return;
     const canvasBoundingRect = canvas.getBoundingClientRect();
     const x = event.clientX - canvasBoundingRect.left;
     const y = event.clientY - canvasBoundingRect.top;
     const cellX = Math.floor(x / cellPixelLength);
     const cellY = Math.floor(y / cellPixelLength);
     const currentColor = colorHistory[`${cellX}_${cellY}`];
     if(event.ctrlKey){
          if(currentColor){
               colorInput.value = currentColor;
          }
     }else{
          fillCell(cellX,cellY);
     }
}
function handleClearButtonClick(){
     const yes = confirm('Are You Sure You Wish to Clear the Canvas ?');
     if(!yes) return;
     drawingContext.fillStyle = '#ffffff';
     drawingContext.fillRect(0,0,canvas.width,canvas.height);
}
function handleToggleGuideChange(){
     guide.style.display = toggleGuide.checked ? null : 'none';
}
canvas.addEventListener('mousedown',handleCanvasMousedown);
clearButton.addEventListener('click',handleClearButtonClick);
toggleGuide.addEventListener('change',handleToggleGuideChange);