/*redofunction*/
window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const newTodoForm = document.querySelector('#toDoForm');


	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todoList'); //grab todoList from HTML file
	todoList.innerHTML = ""; //set it to blank

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label'); 
		const input = document.createElement('input');// user input
		const span = document.createElement('span');
		const content = document.createElement('div'); //list content
		const actions = document.createElement('div'); //edit and delete

		const edit = document.createElement('button'); // edit
		const deleteButton = document.createElement('button'); //delete

		content.classList.add('todo-content'); //the running list that surrounds user input
		actions.classList.add('actions'); //action buttons

		edit.classList.add('edit'); //edit button
		deleteButton.classList.add('delete'); //delete button
		

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

		deleteButton.innerHTML = 'Delete'; //delete button text
		edit.innerHTML = 'Edit'; //edit button text

		//adds all
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);
		todoList.appendChild(todoItem);


		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		// user input, stores in as json in local storage
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		// edit button
		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()

			})
		})


		//delete button
		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}


/* Audio functions */
let rain = document.getElementById("rain");
let coffee = document.getElementById("coffee");
let waves = document.getElementById("waves")
let fire = document.getElementById("fire")

let playAudio = () => {
  rain.play();
  coffee.play();
  waves.play();
  fire.play();
}

let pauseAudio = () => {
  rain.pause();
  coffee.pause();
  waves.pause();
  fire.pause();
}

/* Rain */
rain.volume = 0.0;

let rainSlider = document.getElementById('rainSlider');

rainSlider.addEventListener('input', (e) => {
  const value = e.target.value;

  rain.volume = value/100;
});

/* Coffee */
coffee.volume = 0.0;

let coffeeSlider = document.getElementById('coffeeSlider');

coffeeSlider.addEventListener('input', (e) => {
  const value = e.target.value;

  coffee.volume = value/100;
});

/* Waves */
waves.volume = 0.0;

let wavesSlider = document.getElementById('wavesSlider');

wavesSlider.addEventListener('input', (e) => {
  const value = e.target.value

  waves.volume = value/100;
});

/* Fire */
fire.volume = 0.0;

let fireSlider = document.getElementById('fireSlider');

fireSlider.addEventListener('input', (e) => {
  const value = e.target.value

  fire.volume = value/100;
});



/* hide div */
function hideColumn() {
  /* gets column and hides it */
  var i = document.getElementById("column")
  var j = document.getElementById("timerBox")
  if (i.style.width === "0%"){
    i.style.width = "25%";
    document.getElementById("toDoListBox").style.width = "22.5%";
    document.getElementById("ambientNoiseBox").style.width = "22.5%";
    j.style.width = "20.5%";
    j.style.padding = "10px 20px 0px 20px";
  } else {
    i.style.width = "0%";
    document.getElementById("toDoListBox").style.width = "0px";
    document.getElementById("ambientNoiseBox").style.width = "0px";
    j.style.width = "0px";
    j.style.padding = "0px";
  } 
}

/* change btn txt */
function changeTxt() {
  var btn = document.getElementById("hideButton")
  if(btn.innerHTML === "Hide") { 
    btn.innerHTML = "Show";
  } else {
    btn.innerHTML = "Hide";
  }
}


/* countdown timer functions */
let timerInterval

function startTimer() {
	const hoursInput = document.getElementById('hours');
	const minutesInput = document.getElementById('minutes');
	hours = parseInt(hoursInput.value);
	minutes = parseInt(minutesInput.value);

	/* if input is empty, assume hours and/or minutes are 0 */
	if (Number.isInteger(hours) == false) {
		hours = 0;
	}
	if (Number.isInteger(minutes) == false) {
		minutes = 0;
	}

	const totalSeconds = (hours * 60 * 60) + (minutes * 60);

	if (!totalSeconds || totalSeconds <= 0) {
		alert('Please enter a valid time.');
		return;
	}

	let seconds = totalSeconds;
	displayTime(seconds);

	timerInterval = setInterval(() => {
    seconds--;
    if (seconds < 0) {
        clearInterval(timerInterval);
        const timerBuzzer = document.getElementById('timerBuzzer');
        timerBuzzer.play();
        return;
    }
    displayTime(seconds);
  }, 1000);

}

function displayTime(seconds) {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;
	const display = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(remainingSeconds)}`;
	document.getElementById('countdownClock').textContent = display;
}

function formatTime(time) {
	return time < 10 ? `0${time}` : time;
}

/* dropdown menu */
function changeVideo(videoUrl) {
	var videoPlayer = document.getElementById('video-player'); 
	var videoSource = document.getElementById('video-source'); 
  
	videoSource.src = videoUrl; 
	videoPlayer.load(); 
	videoPlayer.play();
}