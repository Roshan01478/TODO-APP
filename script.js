const inputBox = document.getElementById("taskInput");
const listContainer = document.getElementById("taskList");
const clearAllTask = document.getElementById("clearAllTask");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
  toggleClearAllButton(); // Ensure button is visible after adding tasks
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      if (!e.target.classList.contains("checked")) {
        e.target.classList.add("checked");
        blastConfetti(); // Corrected function name
      } else {
        e.target.classList.remove("checked");
      }
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
      toggleClearAllButton(); // Ensure button updates when a task is removed
    }
  },
  false
);

// Toggle Clear All button visibility
function toggleClearAllButton() {
  if (listContainer.innerHTML !== "") {
    clearAllTask.style.display = "block";
  } else {
    clearAllTask.style.display = "none";
  }
}

clearAllTask.addEventListener("click", function () {
  listContainer.innerHTML = "";
  saveData();
  toggleClearAllButton(); // Hide the button when all tasks are cleared
});

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  toggleClearAllButton(); // Ensure button visibility when tasks are loaded from local storage
}
showTask();

// Confetti animation (corrected name)
const blastConfetti = () => {
  const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};
