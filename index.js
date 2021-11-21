const canvas = document.querySelector('#draw');
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth - 100;
    // this is to set the canvas to be the innerwidth of the window minus 100
    canvas.height = window.innerHeight - 100;
    ctx.strokeStyle = 'red';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 20;
    // make the line color to be red and line start to be round and end to be round too
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    // the hue color set to 0, can go up to 360 for all different colors
    let direction = true;
    //this is to set the direction so that line width can change from small to big than from big to small
    
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
    //   if (ctx.lineWidth >= 60 || ctx.lineWidth <=1){
    //     direction = !direction
    //   }
    //   if (direction == true) {
    //     ctx.lineWidth++
    //   } else {
    //     ctx.lineWidth--
    //   }
      // if linewidth is bigger than 60, then flip the direction and do --, when linewidth is smaller than 1, then flip the direction again and do ++
    }

    function brushSize(number){ctx.lineWidth = number}
    
    canvas.addEventListener('mousemove',draw)
    canvas.addEventListener('mousedown', (e) => {isDrawing = true; [lastX, lastY] = [e.offsetX, e.offsetY]})
    // as soon as we press the mousedown, the lastX will be updated to the current offsetX
    canvas.addEventListener('mouseup', () => isDrawing = false)
    canvas.addEventListener('mouseout', () => isDrawing = false)
    
    