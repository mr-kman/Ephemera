import { rantMessageToCanvasArray } from '../components/App';

export default function animateCanvas(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  let arrayIndex = rantMessageToCanvasArray.length;
  while (arrayIndex--) {
    if (rantMessageToCanvasArray[arrayIndex].state === 'Finished') {
      rantMessageToCanvasArray.splice(arrayIndex, 1);
    }
  }

  let maxVisibleTexts = 10;
  let i = rantMessageToCanvasArray.length;
  let drawn = 0;

  while (i--) {
    let message = rantMessageToCanvasArray[i];

    if (message.state !== 'FadeOut' && message.state !== 'Finished') {
      drawn++;
    };

    if (drawn > maxVisibleTexts && message.state === 'Solid') message.state = 'FadeOut';

    message.updateFrame(ctx.canvas.width, ctx.canvas.height);
    ctx.font = message.font;
    ctx.fillStyle = hexToRgbA(message.textColor, message.opacity);

    let wrappedText = wrapText(ctx, message.text, message.left, message.top, 500, 30);

        wrappedText.forEach((item) => {
            ctx.fillText(item[0], item[1], item[2]); 
            ctx.strokeText(item[0], item[1], item[2]);
        })
  }
}

function hexToRgbA(hex, opacity){
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length === 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',') + ',' + opacity + ')';
  }
  throw new Error('Bad Hex');
}

// Source: https://fjolt.com/article/html-canvas-how-to-wrap-text
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  let words = text.split(' ');
  let line = ''; 
  let testLine = '';
  let lineArray = [];

  for(let n = 0; n < words.length; n++) {
      testLine += `${words[n]} `;
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
          lineArray.push([line, x, y]);
          y += lineHeight;
          line = `${words[n]} `;
          testLine = `${words[n]} `;
      }
      else {
          line += `${words[n]} `;
      }
      if(n === words.length - 1) {
          lineArray.push([line, x, y]);
      }
  }

  return lineArray;
}

export class rantMessage {
  constructor(text, size, left, top) {
    this.text = text;
    this.fontSize = size;
    this.leftOffset = left;
    this.topOffset = top;

    this.fontFamily = 'Courier New';
    this.fontWeight = 900;
    this.textColor = '#8061CA';
    this.strokeColor = '#5D105C';
    this.strokeWidth = 1.5;

    this.font = this.fontWeight + ' ' + this.fontSize + 'px ' + this.fontFamily;

    this.state = 'FadeIn';
    this.opacity = 0;
  }

  updateFrame(canvasW, canvasH) {
    switch (this.state) {
        case 'FadeIn':
            this.opacity = Math.min(this.opacity + .01, 1);
            if (this.opacity === 1) { this.state = 'Solid'; }
            break;
        case 'Solid':
            break;
        case 'FadeOut':
            this.opacity = Math.max(this.opacity - .01, 0);
            if (this.opacity === 0) { this.state = 'Finished'; }
            break;
        default:
            break;
    }

    this.left = Math.floor(this.leftOffset * (canvasW - 300));
    this.top = Math.floor(this.topOffset * (canvasH - 60));
  }
}