const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current-date");
const prevIcon = document.getElementById("prev");
const nextIcon = document.getElementById("next");

// getting new date, current year and month
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Storing lembretes data
let lembretesData = [];

const renderCalendar = () => {
  let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // getting first day of month
  let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // getting last date of month
  let lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month

  let liTags = '';

  // Creating li of previous month's last days
  for (let i = firstDayOfMonth; i > 0; i--) {
    let day = lastDateOfLastMonth - i + 1;
    liTags += `<li class="inactive">${day}</li>`;
  }

  // Creating li of all days of current month
  for (let i = 1; i <= lastDateOfMonth; i++) {
    let isToday = i === date.getDate() && currMonth === date.getMonth() && currYear === date.getFullYear();
    let hasReminder = hasReminderOnDay(currYear, currMonth, i);

    let liClass = isToday ? 'active' : '';
    liClass += hasReminder ? ' has-reminder' : '';

    liTags += `<li class="${liClass}">${i}</li>`;
  }

  // Creating li of next month's first days
  for (let i = 1; liTags.split('</li>').length % 7 !== 0; i++) {
    liTags += `<li class="inactive">${i}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTags;
};

function hasReminderOnDay(year, month, day) {
  const formattedDate = getDateKey(year, month, day);
  return lembretesData.some((lembrete) => lembrete.data === formattedDate);
}

function getDateKey(year, month, day) {
  const formattedMonth = String(month + 1).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");
  return `${year}-${formattedMonth}-${formattedDay}`;
}

prevIcon.addEventListener('click', () => {
  currMonth -= 1;

  if (currMonth < 0) {
    currMonth = 11; // go to previous year
    currYear -= 1;
  } else if (currMonth > 11) {
    currMonth = 0; // go to next year
    currYear += 1;
  }

  renderCalendar();
});

nextIcon.addEventListener('click', () => {
  currMonth += 1;

  if (currMonth < 0) {
    currMonth = 11; // go to previous year
    currYear -= 1;
  } else if (currMonth > 11) {
    currMonth = 0; // go to next year
    currYear += 1;
  }

  renderCalendar();
});

renderCalendar();
