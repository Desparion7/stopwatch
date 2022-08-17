const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');
const historyBtn = document.querySelector('.history');
const stopwatch = document.querySelector('.stopwatch');
const time = document.querySelector('.time');
const timeList = document.querySelector('.time-list');
const infoBtn = document.querySelector('.info');
const modalShadow = document.querySelector('.modal-shadow');
const closeModalBtn = document.querySelector('.close');
const colorBtn = document.querySelector('.color-style');
const colorPanel = document.querySelector('.color-panel');
const btnRed = document.querySelector('.red');
const btnBlue = document.querySelector('.blue');
const btnGreen = document.querySelector('.green');
let root = document.documentElement;

let countTime;
let minutes = 0;
let seconds = 0;
let timeArr = [];
let num = 1;

const handleStart = () => {
	clearInterval(countTime);

	countTime = setInterval(() => {
		seconds++;
		if (seconds < 10) {
			stopwatch.textContent = `${minutes}:0${seconds}`;
		} else if (seconds > 9 && seconds < 59) {
			stopwatch.textContent = `${minutes}:${seconds}`;
		} else {
			minutes++;
			seconds = 0;
			stopwatch.textContent = `${minutes}:00`;
		}
	}, 1000);
};

const handlePause = () => {
	clearInterval(countTime);
};

const handleStop = () => {
	time.innerHTML = `Ostatni czas: ${stopwatch.textContent}`;
	if (stopwatch.textContent !== '0:00') {
		time.style.visibility = 'visible';
		timeArr.push(stopwatch.textContent);
	}

	if (timeList.hasChildNodes()) {
		showHistory();
	}
	clearStuff();
};
handleReset = () => {
	clearStuff();
	time.style.visibility = 'hidden';
	timeArr = [];
	time.textContent = `0:00`;
	timeList.innerHTML = '';
	num = 1;
};

const clearStuff = () => {
	clearInterval(countTime);
	minutes = 0;
	seconds = 0;
	stopwatch.textContent = `0:00`;
};
const showHistory = () => {
	timeArr.forEach((time) => {
		const newRecord = document.createElement('li');
		newRecord.innerHTML = `Pomiar nr ${num} wynosi <span>${time}</span>`;
		timeList.appendChild(newRecord);
		num++;
	});
	timeArr = [];
};

const checkArch = () => {
	if (!timeList.hasChildNodes()) {
		showHistory();
	} else {
		if (timeList.style.display === 'none') {
			timeList.style.display = 'block';
		} else timeList.style.display = 'none';
	}
};

const showModal = () => {
	if (!(modalShadow.style.display === 'block')) {
		modalShadow.style.display = 'block';
	} else {
		modalShadow.style.display = 'none';
	}
	modalShadow.classList.toggle('modal-animation');
};

const showPanel = () => {
	colorPanel.classList.toggle('color-panel-animation');
};

startBtn.addEventListener('click', handleStart);
pauseBtn.addEventListener('click', handlePause);
stopBtn.addEventListener('click', handleStop);
resetBtn.addEventListener('click', handleReset);
historyBtn.addEventListener('click', checkArch);
infoBtn.addEventListener('click', showModal);
closeModalBtn.addEventListener('click', showModal);
window.addEventListener('click', (e) =>
	e.target === modalShadow ? showModal() : false
);
colorBtn.addEventListener('click', showPanel);
btnRed.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(198, 57, 28)');
	root.style.setProperty('--hover-color', 'rgb(255, 51, 11)');
});
btnBlue.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(31, 96, 176)');
	root.style.setProperty('--hover-color', 'rgb(57, 132, 225)');
});
btnGreen.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(35, 153, 19)');
	root.style.setProperty('--hover-color', 'rgb(42, 223, 19)');
});
