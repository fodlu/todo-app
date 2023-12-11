const cross = document.querySelectorAll(".cross");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
const body = document.body;
let tasks = [...document.querySelectorAll(".task")];
const taskLenght = document.querySelector(".taskLenght");
const taskBody = document.querySelector(".taskBody");
const taskInput = document.querySelector(".taskInput");
const taskContent = document.querySelector(".tasks");
const action = document.querySelectorAll(".action");
const actionBody = document.querySelectorAll(".actions");
let list = tasks.length;

//funtions
const toggleTheme = () => {
  sun.classList.toggle("hidden");
  moon.classList.toggle("hidden");
  body.classList.toggle("light");
};

//events
taskLenght.textContent = list;
sun.addEventListener("click", toggleTheme);
moon.addEventListener("click", toggleTheme);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const div = document.createElement("div");
    taskContent.prepend(div);
    div.classList.add("task");
    div.innerHTML = `
    <div class="circle"></div>
    <p class="taskToPerform">
      ${taskInput.value}
    </p>
    <img src="images/icon-cross.svg" class="cross" alt="cross" />`;
    taskLenght.textContent = ++list;
    taskInput.value = "";
    tasks.unshift(div);
  }
});

taskBody.addEventListener("click", (e) => {
  const clicked = e.target.closest(".task");
  e.preventDefault();

  if (e.target.classList.contains("cross")) {
    clicked.remove();
    taskLenght.textContent = --list;
    tasks.shift();
  }
  if (clicked && !e.target.classList.contains("cross")) {
    clicked.classList.toggle("complete");
  }

  if (e.target.textContent === "Active") {
    tasks.forEach((task) => {
      if (task.classList.contains("complete")) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    });
  }

  if (e.target.textContent === "Completed") {
    tasks.forEach((task) => {
      if (!task.classList.contains("complete")) {
        task.classList.add("hidden");
      } else {
        task.classList.remove("hidden");
      }
    });
  }

  if (e.target.textContent === "All") {
    tasks.forEach((task) => {
      task.classList.remove("hidden");
    });
  }

  if (e.target.textContent === "Clear Completed") {
    tasks.forEach((task) => task.remove());
    tasks = [];
    list = 0;
    taskLenght.textContent = list;
  }
});

action.forEach((actions, index) => {
  actions.addEventListener("click", (e) => {
    e.preventDefault();
    action.forEach((n) => n.classList.remove("active"));
    action[index].classList.add("active");
  });
});
