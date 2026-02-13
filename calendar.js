const daysElement = document.getElementById("calendarDays");
const fullDate1Element = document.getElementById("fullDate1");
const fullDate2Element = document.getElementById("fullDate2");

const japaneseMonths = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"];
const japaneseDays = ["月", "火", "水", "木", "金", "土", "日"];

const previousMonthButton = document.getElementById("prev-month");
const nextMonthButton = document.getElementById("next-month");
let currentDate1 = new Date();

const clockElementLeft = document.getElementById("clock-left");
const clockElementRight = document.getElementById("clock-right");

const fixedFullDateYear = currentDate1.getFullYear();
const fixedFullDateMonth = currentDate1.getMonth() + 1;
const fixedFullDateDay = currentDate1.getDate();
const fixedJapaneseDay = japaneseDays[currentDate1.getDay() - 1];

fullDate2Element.textContent = `日付: ${fixedFullDateYear}年${fixedFullDateMonth}月${fixedFullDateDay}日 (${fixedJapaneseDay})`;

// ✅ CONFIG DEL EVENTO (20 de febrero)
const EVENT_DAY = 20;
const EVENT_MONTH_INDEX = 1; // Febrero = 1 (Enero = 0)
const EVENT_LINK = "https://dice.fm/event/l8omew-oval-userband-riuka-20th-feb-sala-meteoro-barcelona-tickets"; //
const EVENT_IMAGE_URL = "./event.png";


function generateCalendar(year, month, day) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const today = new Date().getDate();

  const japaneseMonthName = japaneseMonths[month];

  fullDate1Element.textContent = `${year}年${month + 1}月`;
  document.getElementById("japanese-month").textContent = japaneseMonthName;

  daysElement.innerHTML = "";

  // Semana empezando en lunes
  const firstDayOfWeek = (firstDay + 6) % 7;

  // Huecos al inicio del mes
  for (let i = 0; i < firstDayOfWeek; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("day");
    daysElement.appendChild(emptyDay);
  }

  // Días del mes
  for (let d = 1; d <= daysInMonth; d++) {
    const dayElement = document.createElement("div");
    dayElement.classList.add("day");

    // Número del día (lo usamos tanto en día normal como en el evento)
    const dayNumber = document.createElement("div");
    dayNumber.textContent = d;

    // ✅ EVENTO: 20 de febrero con imagen + link
     if (d === EVENT_DAY && month === EVENT_MONTH_INDEX) {
  dayElement.classList.add("has-event");
  dayElement.style.backgroundImage = `url("${EVENT_IMAGE_URL}")`;

  // Añadimos el número normalmente
  dayElement.appendChild(dayNumber);

  // Creamos un link invisible que cubra todo el cuadrado
  const a = document.createElement("a");
  a.href = EVENT_LINK;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.classList.add("day-link");

  dayElement.appendChild(a);
} else {
      // Día normal
      dayElement.appendChild(dayNumber);
    }

    // Resaltar hoy (solo en el mes actual)
    if (d === today && month === fixedFullDateMonth - 1) {
      dayElement.classList.add("highlight");
    }

    daysElement.appendChild(dayElement);
  }

  // Resaltar el día de la semana actual (solo en el mes actual)
  const dayOfWeekElements = document.querySelectorAll(".day-of-week");
  dayOfWeekElements.forEach(el => el.classList.remove("highlight2"));

  if (month === fixedFullDateMonth - 1) {
    const dow = new Date(year, month, day).getDay(); // 0=dom...6=sáb
    const indexMonFirst = (dow + 6) % 7; // 0=lun...6=dom
    dayOfWeekElements[indexMonFirst].classList.add("highlight2");
  }
}

function navigatePreviousMonth() {
  currentDate1 = new Date(currentDate1.getFullYear(), currentDate1.getMonth() - 1, 1);
  generateCalendar(currentDate1.getFullYear(), currentDate1.getMonth(), currentDate1.getDate());
}

function navigateNextMonth() {
  currentDate1 = new Date(currentDate1.getFullYear(), currentDate1.getMonth() + 1, 1);
  generateCalendar(currentDate1.getFullYear(), currentDate1.getMonth(), currentDate1.getDate());
}

previousMonthButton.addEventListener("click", navigatePreviousMonth);
nextMonthButton.addEventListener("click", navigateNextMonth);

generateCalendar(currentDate1.getFullYear(), currentDate1.getMonth(), currentDate1.getDate());

function updateClocks() {
  const now = new Date();

  const localTimeOptions = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  const localTime = now.toLocaleTimeString(undefined, localTimeOptions);
  clockElementLeft.textContent = `here: ${localTime}`;

  const jstTimeOptions = { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false };
  const jstTime = now.toLocaleTimeString(undefined, jstTimeOptions);
  clockElementRight.textContent = `jst: ${jstTime}`;
}

updateClocks();
setInterval(updateClocks, 1000);
