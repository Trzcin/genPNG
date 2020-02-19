const Jimp = require("jimp");
const white = Jimp.cssColorToHex("white");
const black = Jimp.cssColorToHex("black");

let blankImageData = [
  [white, white, white, white, white, white, white, white, white],
  [white, white, white, white, white, white, white, white, white],
  [white, white, white, white, white, white, white, white, white],
  [white, white, white, white, white, white, white, white, white],
  [white, white, white, white, white, white, white, white, white],
  [white, white, white, white, white, white, white, white, white],
  [white, white, white, white, white, white, white, white, white],
  [white, white, white, white, white, white, white, white, white],
  [white, white, white, white, white, white, white, white, white]
];

for (let i = 0; i < 200; i++) {
  let image = new Jimp(9, 9, function(err, image) {
    if (err) throw err;
    blankImageData = [
      [white, white, white, white, white, white, white, white, white],
      [white, white, white, white, white, white, white, white, white],
      [white, white, white, white, white, white, white, white, white],
      [white, white, white, white, white, white, white, white, white],
      [white, white, white, white, white, white, white, white, white],
      [white, white, white, white, white, white, white, white, white],
      [white, white, white, white, white, white, white, white, white],
      [white, white, white, white, white, white, white, white, white],
      [white, white, white, white, white, white, white, white, white]
    ];
    let ranomos = Math.random();
    if(ranomos <= 0.5){
      let imgData = genCircleData();

      imgData.forEach((row, y) => {
        row.forEach((color, x) => {
          image.setPixelColor(color, x, y);
        });
      });

      if(i < 10){
        image.write(`300${i}O.png`, err => {
          if (err) throw err;
        });
      }
      else if(i < 100){
        image.write(`30${i}O.png`, err => {
          if (err) throw err;
        });
      }
      else{
        image.write(`3${i}O.png`, err => {
          if (err) throw err;
        });
      }
    }
    else{
      let imgData = genCrossData();

      imgData.forEach((row, y) => {
        row.forEach((color, x) => {
          image.setPixelColor(color, x, y);
        });
      });

      if(i < 10){
        image.write(`300${i}X.png`, err => {
          if (err) throw err;
        });
      }
      else if(i < 100){
        image.write(`30${i}X.png`, err => {
          if (err) throw err;
        });
      }
      else{
        image.write(`3${i}X.png`, err => {
          if (err) throw err;
        });
      }
    }
  });
}

function genCrossData() {
  let xpos = Math.floor(Math.random() * 7 + 1);
  let ypos = Math.floor(Math.random() * 7 + 1);
  let line1 = { rightUp: 0, leftDown: 0 };
  let line2 = { rightDown: 0, leftUp: 0 };
  let crossData = blankImageData;
  crossData[ypos][xpos] = black;

  //line 1
  if (ypos > 8 - xpos) {
    line1.rightUp = 8 - xpos;
  } else {
    line1.rightUp = ypos;
  }

  if (8 - ypos > xpos) {
    line1.leftDown = xpos;
  } else {
    line1.leftDown = 8 - ypos;
  }

  //line 2
  if (8 - ypos > 8 - xpos) {
    line2.rightDown = 8 - xpos;
  } else {
    line2.rightDown = 8 - ypos;
  }

  if (ypos > xpos) {
    line2.leftUp = xpos;
  } else {
    line2.leftUp = ypos;
  }

  //randomize a bit
  line1.rightUp = Math.floor(Math.random() * line1.rightUp + 1);
  line1.leftDown = Math.floor(Math.random() * line1.leftDown + 1);
  line2.rightDown = Math.floor(Math.random() * line2.rightDown + 1);
  line2.leftUp = Math.floor(Math.random() * line2.leftUp + 1);

  // console.log(xpos);
  // console.log(ypos);
  // console.log(line1);
  // console.log(line2);

  for (let i = 1; i <= line1.rightUp; i++) {
    crossData[ypos - i][xpos + i] = black;
  }
  for (let i = 1; i <= line1.leftDown; i++) {
    crossData[ypos + i][xpos - i] = black;
  }
  for (let i = 1; i <= line2.rightDown; i++) {
    crossData[ypos + i][xpos + i] = black;
  }
  for (let i = 1; i <= line2.leftUp; i++) {
    crossData[ypos - i][xpos - i] = black;
  }

  return crossData;
}

function genCircleData() {
  let xpos = Math.floor(Math.random() * 7 + 1);
  let ypos = Math.floor(Math.random() * 7 + 1);
  let circleData = blankImageData;
  let upRange = ypos;
  let rightRange = 8 - xpos;
  let downRange = 8 - ypos;
  let leftRange = xpos;
  let availableCircles = [genCircle1, genCircle2];
  //check circles
  if(upRange >= 2 && rightRange >= 2 && downRange >= 2 && leftRange >= 2){
    availableCircles.push(genCircle3);
  }

  if(upRange >= 3 && rightRange >= 3 && downRange >= 3 && leftRange >= 3){
    availableCircles.push(genCircle4);
  }

  if(upRange >= 4 && rightRange >= 4 && downRange >= 4 && leftRange >= 4){
    availableCircles.push(genCircle5);
  }

  availableCircles[Math.floor(Math.random() * availableCircles.length)]();

  function genCircle1() {
    circleData[ypos - 1][xpos] = black;
    circleData[ypos][xpos + 1] = black;
    circleData[ypos + 1][xpos] = black;
    circleData[ypos][xpos - 1] = black;
  }

  function genCircle2() {
    if (upRange == 1 && rightRange == 1) {
      circleData[ypos - 1][xpos] = black;
      circleData[ypos - 1][xpos - 1] = black;
      circleData[ypos][xpos + 1] = black;
      circleData[ypos + 1][xpos + 1] = black;
      circleData[ypos + 2][xpos] = black;
      circleData[ypos + 2][xpos - 1] = black;
      circleData[ypos][xpos - 2] = black;
      circleData[ypos + 1][xpos - 2] = black;
    } else if (downRange == 1 && rightRange == 1) {
      circleData[ypos - 2][xpos] = black;
      circleData[ypos - 2][xpos - 1] = black;
      circleData[ypos][xpos + 1] = black;
      circleData[ypos - 1][xpos + 1] = black;
      circleData[ypos + 1][xpos] = black;
      circleData[ypos + 1][xpos - 1] = black;
      circleData[ypos][xpos - 2] = black;
      circleData[ypos - 1][xpos - 2] = black;
    } else if (downRange == 1 && leftRange == 1) {
      circleData[ypos - 2][xpos] = black;
      circleData[ypos - 2][xpos + 1] = black;
      circleData[ypos][xpos + 2] = black;
      circleData[ypos - 1][xpos + 2] = black;
      circleData[ypos + 1][xpos] = black;
      circleData[ypos + 1][xpos + 1] = black;
      circleData[ypos][xpos - 1] = black;
      circleData[ypos - 1][xpos - 1] = black;
    } else if (upRange == 1 && leftRange == 1) {
      circleData[ypos - 1][xpos] = black;
      circleData[ypos - 1][xpos + 1] = black;
      circleData[ypos][xpos + 2] = black;
      circleData[ypos + 1][xpos + 2] = black;
      circleData[ypos + 2][xpos] = black;
      circleData[ypos + 2][xpos + 1] = black;
      circleData[ypos][xpos - 1] = black;
      circleData[ypos + 1][xpos - 1] = black;
    } else if (upRange == 1) {
      if (Math.random() <= 0.5) {
        circleData[ypos - 1][xpos] = black;
        circleData[ypos - 1][xpos - 1] = black;
        circleData[ypos][xpos + 1] = black;
        circleData[ypos + 1][xpos + 1] = black;
        circleData[ypos + 2][xpos] = black;
        circleData[ypos + 2][xpos - 1] = black;
        circleData[ypos][xpos - 2] = black;
        circleData[ypos + 1][xpos - 2] = black;
      } else {
        circleData[ypos - 1][xpos] = black;
        circleData[ypos - 1][xpos + 1] = black;
        circleData[ypos][xpos + 2] = black;
        circleData[ypos + 1][xpos + 2] = black;
        circleData[ypos + 2][xpos] = black;
        circleData[ypos + 2][xpos + 1] = black;
        circleData[ypos][xpos - 1] = black;
        circleData[ypos + 1][xpos - 1] = black;
      }
    } else if (rightRange == 1) {
      if (Math.random() <= 0.5) {
        circleData[ypos - 1][xpos] = black;
        circleData[ypos - 1][xpos - 1] = black;
        circleData[ypos][xpos + 1] = black;
        circleData[ypos + 1][xpos + 1] = black;
        circleData[ypos + 2][xpos] = black;
        circleData[ypos + 2][xpos - 1] = black;
        circleData[ypos][xpos - 2] = black;
        circleData[ypos + 1][xpos - 2] = black;
      } else {
        circleData[ypos - 2][xpos] = black;
        circleData[ypos - 2][xpos - 1] = black;
        circleData[ypos][xpos + 1] = black;
        circleData[ypos - 1][xpos + 1] = black;
        circleData[ypos + 1][xpos] = black;
        circleData[ypos + 1][xpos - 1] = black;
        circleData[ypos][xpos - 2] = black;
        circleData[ypos - 1][xpos - 2] = black;
      }
    } else if (downRange == 1) {
      if (Math.random() <= 0.5) {
        circleData[ypos - 2][xpos] = black;
        circleData[ypos - 2][xpos - 1] = black;
        circleData[ypos][xpos + 1] = black;
        circleData[ypos - 1][xpos + 1] = black;
        circleData[ypos + 1][xpos] = black;
        circleData[ypos + 1][xpos - 1] = black;
        circleData[ypos][xpos - 2] = black;
        circleData[ypos - 1][xpos - 2] = black;
      } else {
        circleData[ypos - 2][xpos] = black;
        circleData[ypos - 2][xpos + 1] = black;
        circleData[ypos][xpos + 2] = black;
        circleData[ypos - 1][xpos + 2] = black;
        circleData[ypos + 1][xpos] = black;
        circleData[ypos + 1][xpos + 1] = black;
        circleData[ypos][xpos - 1] = black;
        circleData[ypos - 1][xpos - 1] = black;
      }
    } else if (leftRange == 1) {
      if (Math.random() <= 0.5) {
        circleData[ypos - 2][xpos] = black;
        circleData[ypos - 2][xpos + 1] = black;
        circleData[ypos][xpos + 2] = black;
        circleData[ypos - 1][xpos + 2] = black;
        circleData[ypos + 1][xpos] = black;
        circleData[ypos + 1][xpos + 1] = black;
        circleData[ypos][xpos - 1] = black;
        circleData[ypos - 1][xpos - 1] = black;
      } else {
        circleData[ypos - 1][xpos] = black;
        circleData[ypos - 1][xpos + 1] = black;
        circleData[ypos][xpos + 2] = black;
        circleData[ypos + 1][xpos + 2] = black;
        circleData[ypos + 2][xpos] = black;
        circleData[ypos + 2][xpos + 1] = black;
        circleData[ypos][xpos - 1] = black;
        circleData[ypos + 1][xpos - 1] = black;
      }
    } else {
      let rando = Math.random();
      if (rando <= 0.25) {
        circleData[ypos - 1][xpos] = black;
        circleData[ypos - 1][xpos - 1] = black;
        circleData[ypos][xpos + 1] = black;
        circleData[ypos + 1][xpos + 1] = black;
        circleData[ypos + 2][xpos] = black;
        circleData[ypos + 2][xpos - 1] = black;
        circleData[ypos][xpos - 2] = black;
        circleData[ypos + 1][xpos - 2] = black;
      } else if (rando > 0.25 && rando <= 0.5) {
        circleData[ypos - 2][xpos] = black;
        circleData[ypos - 2][xpos - 1] = black;
        circleData[ypos][xpos + 1] = black;
        circleData[ypos - 1][xpos + 1] = black;
        circleData[ypos + 1][xpos] = black;
        circleData[ypos + 1][xpos - 1] = black;
        circleData[ypos][xpos - 2] = black;
        circleData[ypos - 1][xpos - 2] = black;
      } else if (rando > 0.5 && rando <= 0.75) {
        circleData[ypos - 2][xpos] = black;
        circleData[ypos - 2][xpos + 1] = black;
        circleData[ypos][xpos + 2] = black;
        circleData[ypos - 1][xpos + 2] = black;
        circleData[ypos + 1][xpos] = black;
        circleData[ypos + 1][xpos + 1] = black;
        circleData[ypos][xpos - 1] = black;
        circleData[ypos - 1][xpos - 1] = black;
      } else {
        circleData[ypos - 1][xpos] = black;
        circleData[ypos - 1][xpos + 1] = black;
        circleData[ypos][xpos + 2] = black;
        circleData[ypos + 1][xpos + 2] = black;
        circleData[ypos + 2][xpos] = black;
        circleData[ypos + 2][xpos + 1] = black;
        circleData[ypos][xpos - 1] = black;
        circleData[ypos + 1][xpos - 1] = black;
      }
    }
  }

  function genCircle3() {
    //up
    circleData[ypos - 2][xpos - 1] = black;
    circleData[ypos - 2][xpos] = black;
    circleData[ypos - 2][xpos + 1] = black;
    //right
    circleData[ypos - 1][xpos + 2] = black;
    circleData[ypos][xpos + 2] = black;
    circleData[ypos + 1][xpos + 2] = black;
    //down
    circleData[ypos + 2][xpos + 1] = black;
    circleData[ypos + 2][xpos] = black;
    circleData[ypos + 2][xpos - 1] = black;
    //left
    circleData[ypos + 1][xpos - 2] = black;
    circleData[ypos][xpos - 2] = black;
    circleData[ypos - 1][xpos - 2] = black;
  }

  function genCircle4() {
    //up
    circleData[ypos - 3][xpos - 1] = black;
    circleData[ypos - 3][xpos] = black;
    circleData[ypos - 3][xpos + 1] = black;
    //up-right
    circleData[ypos - 2][xpos + 2] = black;
    //right
    circleData[ypos - 1][xpos + 3] = black;
    circleData[ypos][xpos + 3] = black;
    circleData[ypos + 1][xpos + 3] = black;
    //down-right
    circleData[ypos + 2][xpos + 2] = black;
    //down
    circleData[ypos + 3][xpos + 1] = black;
    circleData[ypos + 3][xpos] = black;
    circleData[ypos + 3][xpos - 1] = black;
    //down-left
    circleData[ypos + 2][xpos - 2] = black;
    //left
    circleData[ypos + 1][xpos - 3] = black;
    circleData[ypos][xpos - 3] = black;
    circleData[ypos - 1][xpos - 3] = black;
    //up-left
    circleData[ypos - 2][xpos - 2] = black
  }

  function genCircle5(){
    //up
    circleData[ypos - 4][xpos - 2] = black;
    circleData[ypos - 4][xpos - 1] = black;
    circleData[ypos - 4][xpos] = black;
    circleData[ypos - 4][xpos + 1] = black;
    circleData[ypos - 4][xpos + 2] = black;
    //up-right
    circleData[ypos - 3][xpos + 3] = black;
    //right
    circleData[ypos - 2][xpos + 4] = black;
    circleData[ypos - 1][xpos + 4] = black;
    circleData[ypos][xpos + 4] = black;
    circleData[ypos + 1][xpos + 4] = black;
    circleData[ypos + 2][xpos + 4] = black;
    //down-right
    circleData[ypos + 3][xpos + 3] = black;
    //down
    circleData[ypos + 4][xpos + 2] = black;
    circleData[ypos + 4][xpos + 1] = black;
    circleData[ypos + 4][xpos] = black;
    circleData[ypos + 4][xpos - 1] = black;
    circleData[ypos + 4][xpos - 2] = black;
    //down-left
    circleData[ypos + 3][xpos - 3] = black;
    //left
    circleData[ypos + 2][xpos - 4] = black;
    circleData[ypos + 1][xpos - 4] = black;
    circleData[ypos][xpos - 4] = black;
    circleData[ypos - 1][xpos - 4] = black;
    circleData[ypos - 2][xpos - 4] = black;
    //up-left
    circleData[ypos - 3][xpos - 3] = black;
  }

  return circleData;
}
