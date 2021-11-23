const canvas = document.querySelector('#draw');
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth*2/3;
    // this is to set the canvas to be the two thirds of the innerwidth of the window 
    canvas.height = window.innerHeight*3/4;
    ctx.strokeStyle = 'red';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 20;
    // make the line color to be red and line start to be round and end to be round too
    let isDrawing = false;
    let isErasing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    // the hue color set to 0, can go up to 360 for all different colors
    let direction = true;
    //this is to set the direction so that line width can change from small to big than from big to small
    let isStamp = false;
    let isBrush = false;
    let isEraser = false;
    let isImagebig = false

    function draw(e){
      if(!isDrawing) return;
      // the above code is to stopping drawing when this is set to false
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      // e.offsetX is from the event log, which is current X and Y location. So it is starting from lastX and end at e.offsetX
      ctx.stroke();
      lastX = e.offsetX;
      lastY = e.offsetY;
      // above code can also be [lastX, lastY] = [e.offsetX, e.offsetY]
      //update the lastX to be current offsetX so it will continuous
      hue++;
      if (hue >= 360 ){
        hue = 0
      }
      // the above if statement is to set when hue reach to 360 which is maximum, then go back to 0
  }

    function brushSize(number){
        ctx.lineWidth = number;
        isBrush = true;
        isStamp = false;
        isEraser = false
    }
    // this is to change the lineWidth according to the brushSize number
    // and also set the isStamp to false so there is no stamp when mouseup

    let image = new Image()
    function getImage(src){
        image.src = src;
        isStamp = true;
        isBrush = false;
        isEraser = false;
        isImagebig = false;
    }
    // this is to get the image.src to be the one from the clicked image
    // and set the isBrush to be false so there is no brush drawing when dragging the mouse for stamps

    let imageBig = new Image()
    function getImageBig(src){
        imageBig.src = src;
        isStamp = true;
        isBrush = false;
        isEraser = false;
        isImagebig = true
    }
  
    function addStamp(e) {
        if(!isImagebig){
            ctx.drawImage(image, e.offsetX, e.offsetY, 70,70);
        } else {
            ctx.drawImage(imageBig, e.offsetX, e.offsetY, 250,250);
        }
    }
    // ctx.drawImage(image, e.offsetX, e.offsetY, image.width/8, image.height/8); 
    //this is to stamp the image to be at e.offsetX and e.offsetY location and with the size of image.width/4 and image.height/4
    
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mousedown', (e) => {
        if(isBrush){
        isDrawing = true; 
        [lastX, lastY] = [e.offsetX, e.offsetY];
        }
    })
    // as soon as we press the mousedown, the lastX will be updated to the current offsetX
    canvas.addEventListener('mouseup', () => isDrawing = false)
    canvas.addEventListener('mouseout', () => isDrawing = false)
    canvas.addEventListener('click', (e) => {
        if(isStamp){
            addStamp(e)
        }}
        )

    function getEraser(){
        isEraser = true;
        isBrush = false;
        isStamp = false;
       
    }
    function erase(e){
        if(!isErasing) return;
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        lastX = e.offsetX;
        lastY = e.offsetY;
        ctx.lineWidth = 50; 
        
    }
    canvas.addEventListener('mousemove', (e) => {
        if(isEraser){
            erase(e);
            canvas.style.cursor= "url('https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/48/Actions-draw-eraser-icon.png') 15 15, auto";
        } else {
            canvas.style.cursor = 'auto'
        }
    })
    canvas.addEventListener('mousedown', (e) => {
        if(isEraser){
        isErasing = true; 
        canvas.style.cursor= "url('https://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/48/Actions-draw-eraser-icon.png') 15 15, auto";
        [lastX, lastY] = [e.offsetX, e.offsetY];
        }
        else {
            canvas.style.cursor = 'auto'
        }
    })
    canvas.addEventListener('mouseup', () => {
        isErasing = false;
        canvas.style.cursor='auto'
    })
    canvas.addEventListener('mouseout', () => isErasing = false)
        
    //saving drawings:
    function saveImage() {
        const data = canvas.toDataURL('drawing/png');
        const anchor = document.createElement('a');
        anchor.href= data;
        anchor.download = 'drawing/png';
        anchor.click()
    }
