/*attribute*/
var ballWidth = 60;
var layoutSize = 500;
var initMaxMove = layoutSize - 2 * ballWidth;
var ahtml = '';
var xMove = [];
var yMove = [];
var xDir = [];
var yDir = [];
var minimumSpeed = 1;
var speedConst = 2;
var speedNum = [];
var t;
var ctnInnerWidth = document.querySelector('.inner').clientWidth;
var ctnInnerHeight = document.querySelector('.inner').clientHeight;

// initial code : 각 볼에 랜덤하게 숫자를 넣고 방향을 지정한다.
for (let i = 0; i < 45; i++) {
  ahtml += '<div>' + (i + 1) + '</div>';
  xMove.push(Math.floor(Math.random() * initMaxMove) + ballWidth);
  yMove.push(Math.floor(Math.random() * initMaxMove) + ballWidth);
  speedNum.push(Math.ceil(Math.random() * speedConst) + minimumSpeed);
  if (Math.ceil(Math.random() * (layoutSize - ballWidth)) % 2 == 0) {
    xDir.push(1);
  } else {
    xDir.push(-1);
  }
  if (Math.ceil(Math.random() * (layoutSize - ballWidth)) % 2 == 0) {
    yDir.push(1);
  } else {
    yDir.push(-1);
  }
}
document.querySelector('.inner').innerHTML = ahtml;

function ball() {
  for (let i = 0; i < 45; i++) {
    // console.log(speedNum)
    if (ctnInnerWidth <= xMove[i] + ballWidth || xMove[i] <= 0) {
      // console.log(xMove+' 빙고')
      xDir[i] = xDir[i] * -1;
    }
    if (ctnInnerHeight <= yMove[i] + ballWidth || yMove[i] <= 0) {
      yDir[i] = yDir[i] * -1;
    }
    xMove[i] = xMove[i] + speedNum[i] * xDir[i];
    yMove[i] = yMove[i] + speedNum[i] * yDir[i];
    document.querySelectorAll('.inner div')[i].style.left = xMove[i] + 'px';
    document.querySelectorAll('.inner div')[i].style.top = yMove[i] + 'px';
  }
}

t = setInterval(ball, 5);

var numArray = [];
var checkNum = 0;
function randomNum() {
  //배열 중복 확인 코드 작성하기
  let num = Math.floor(Math.random() * 45) + 1; // 1 ~ 45 사이 난수
  if (numArray.includes(num)) {
    return null;
  } else {
    numArray.push(num);
    return num;
  }
}

function getNumber() {
  // 배경색을 변경해주는 함수
  if (numArray.length < 7) {
    // 번호 7개를 모두 뽑을 조건
    let num = randomNum();
    if (num === null) {
      alert('이미 뽑힌 번호입니다.');
      return;
    }
    document
      .querySelectorAll('.inner > div')
      [num - 1].setAttribute('class', 'selected');
    document
      .querySelector('.get-number')
      .prepend(
        document.querySelectorAll('.inner > div')[num - 1].cloneNode(true)
      );
    document.querySelector('.get-number > div').removeAttribute('style'); // 랜던으로 들어간 left top 값을 초기화하기 위해서 속성을 삭제
    if (numArray.length === 7) {
      //마지막 공 색상표기
      document
        .querySelectorAll('.get-number .selected')[0]
        .classList.add('bonus');
    }
  } else {
    alert('7개번호를 모두 뽑았습니다.');
  }
}
