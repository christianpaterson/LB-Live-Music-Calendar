import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  fromUnixTime,
  getUnixTime,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";

const bandInfo = [
  {
    id: 1,
    name: "piano",
    image: "assets/piano.jpg",
  },
  {
    id: 2,
    name: "saxophone",
    image: "assets/saxophone.jpg",
  },
  {
    id: 3,
    name: "trumpet",
    image: "assets/trumpet.jpg",
  },
];

const datePickerButton = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const datePickerHeader = document.querySelector(".current-month");
const previousMonthButton = document.querySelector(".prev-month-button");
const nextMonthButton = document.querySelector(".next-month-button");
const dateGrid = document.querySelector(".date-picker-grid-dates");
const bandContainer = document.querySelector("#band");
let currentDate = new Date();

datePickerButton.addEventListener("click", () => {
  let initialDate = currentDate;
  datePicker.classList.toggle("show");
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  currentDate = selectedDate;
  let isAugust = selectedDate.getUTCMonth() === 7;

  if (initialDate.getUTCDate() !== currentDate.getUTCDate() && isAugust) {
    // Render band images
    bandContainer.innerHTML = "";
    const bandImg = document.createElement("img");
    bandImg.width = 300;
    if (selectedDate.getUTCDate() === 10 && isAugust) {
      bandImg.src = "http://localhost:1234/saxophone.cb4a420e.jpg";
      bandContainer.appendChild(bandImg);
    } else if (currentDate.getUTCDate() === 11 && isAugust) {
      bandImg.src = "http://localhost:1234/trumpet.617e49f3.jpg";
      bandContainer.appendChild(bandImg);
    } else if (currentDate.getUTCDate() === 12 && isAugust) {
      bandImg.src = "//localhost:1234/piano.aa1e6821.jpg";
      bandContainer.appendChild(bandImg);
    }
  }

  setupDatePicker(selectedDate);
});

setDate(new Date());

function setDate(date) {
  datePickerButton.innerText = format(date, "MMMM do, y");
  datePickerButton.dataset.selectedDate = getUnixTime(date);
}

function setupDatePicker(selectedDate) {
  datePickerHeader.innerText = format(currentDate, "MMMM - y");
  setupDates(selectedDate);
}

function setupDates(selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currentDate));
  const lastWeekEnd = endOfWeek(endOfMonth(currentDate));
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  dateGrid.innerHTML = "";

  dates.forEach(date => {
    const dateElement = document.createElement("button");
    dateElement.classList.add("date");
    dateElement.innerText = date.getDate();
    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add("other-month-date");
    }
    if (isSameDay(date, selectedDate)) {
      dateElement.classList.add("selected");
    }

    dateElement.addEventListener("click", () => {
      setDate(date);
      datePicker.classList.remove("show");
    });

    dateGrid.appendChild(dateElement);
  });
}

nextMonthButton.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  currentDate = addMonths(currentDate, 1);
  setupDatePicker(selectedDate);
});
previousMonthButton.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate);
  currentDate = subMonths(currentDate, 1);
  setupDatePicker(selectedDate);
});
