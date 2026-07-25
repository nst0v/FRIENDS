const STORAGE_KEY = "sobralis-state-v1";
const STATE_VERSION = 1;

const FRIENDS = [
  { id: "denchik-banshe", name: "Дэнчик Баньше", initials: "ДБ", color: "#5edcff" },
  { id: "egron4", name: "ЕГРОН4", initials: "Е4", color: "#c8ff3d" },
  { id: "lenchik", name: "Ленчик", initials: "Л", color: "#ff8f85" },
  { id: "klim", name: "Клим", initials: "К", color: "#b494ff" },
  { id: "andrey", name: "Андрей", initials: "А", color: "#ffb21c" },
  { id: "mot", name: "Мот", initials: "М", color: "#70e6b1" },
  { id: "vitek", name: "Витек", initials: "В", color: "#f17bb1" },
  { id: "nikita", name: "Никита", initials: "Н", color: "#5edcff" },
  { id: "denchik-andreev", name: "Дэнчик Андреев", initials: "ДА", color: "#c8ff3d" },
  { id: "zheka", name: "Жека", initials: "Ж", color: "#ff9f43" },
  { id: "serega", name: "Серёга", initials: "С", color: "#8eafff" },
];

const TYPES = {
  game: {
    label: "Игры",
    shortLabel: "Играем",
    color: "#5edcff",
  },
  cinema: {
    label: "Кино",
    shortLabel: "Смотрим",
    color: "#ff665a",
  },
  pub: {
    label: "Пиво",
    shortLabel: "Отдыхаем",
    color: "#ffb21c",
  },
  other: {
    label: "Свой план",
    shortLabel: "Собираемся",
    color: "#b494ff",
  },
};

const TEMPLATES = {
  game: {
    type: "game",
    title: "Катка до победного",
    place: "Discord / у кого-нибудь дома",
    details: "Выбираем игру и выясняем, кто опять всё заруинил.",
  },
  cinema: {
    type: "cinema",
    title: "Кино и попкорн",
    place: "Кинотеатр — решим в чате",
    details: "Премьера, классика или фильм настолько плохой, что уже хороший.",
  },
  pub: {
    type: "pub",
    title: "По одной, ага",
    place: "Любимый бар",
    details: "Бар, паб или стратегический запас у кого-нибудь дома.",
  },
  other: {
    type: "other",
    title: "",
    place: "",
    details: "Настолки, шашлык, прогулка или внезапный великий план.",
  },
};

const RANDOM_IDEAS = [
  { type: "game", title: "Турнир без права на лив", details: "Берём игру, собираем команды и играем до финального «ещё одну»." },
  { type: "game", title: "Кооперативный вечер", details: "Сегодня мы вроде бы одна команда. Проверим, надолго ли." },
  { type: "cinema", title: "Плохое кино, хорошая компания", details: "Выбираем фильм с сомнительным рейтингом и комментируем как профессионалы." },
  { type: "cinema", title: "Ночная премьера", details: "Большой экран, много попкорна и никаких спойлеров в чате." },
  { type: "pub", title: "Проверка нового бара", details: "Разведывательная вылазка. Стол бронируем заранее — мы учимся." },
  { type: "pub", title: "По одной после работы", details: "Классическая формулировка, последствия которой всем известны." },
  { type: "other", title: "Шашлык и великие планы", details: "Находим мангал, покупаем всё нужное и не забываем уголь." },
  { type: "other", title: "Настолки без дипломатии", details: "Дружба дружбой, а победные очки — отдельно." },
];

const ICONS = {
  game: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.5 8h9a4.5 4.5 0 0 1 4.2 6.1l-1.1 3a2.6 2.6 0 0 1-4.3 1l-1.8-1.8h-3L8.7 18a2.6 2.6 0 0 1-4.3-1l-1.1-3A4.5 4.5 0 0 1 7.5 8Z"/>
      <path d="M7 11v4M5 13h4M15.5 11.7h.1M18 14.2h.1"/>
    </svg>`,
  cinema: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 7h18v13H3zM3 11h18M6 4l2.5 3M11 4l2.5 3M16 4l2.5 3"/>
    </svg>`,
  pub: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 5h11v15H5zM16 8h2a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-2M8 9v7M12 9v7"/>
    </svg>`,
  other: `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4"/>
    </svg>`,
  time: `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="7"/><path d="M10 6v4l3 2"/>
    </svg>`,
  location: `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 18s5-5.2 5-10a5 5 0 1 0-10 0c0 4.8 5 10 5 10Z"/><circle cx="10" cy="8" r="1.7"/>
    </svg>`,
  share: `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="15" cy="5" r="2"/><circle cx="5" cy="10" r="2"/><circle cx="15" cy="15" r="2"/>
      <path d="m6.8 9 6.3-3M6.8 11l6.3 3"/>
    </svg>`,
  calendar: `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 4h12v13H4zM4 8h12M7 2v4M13 2v4"/>
    </svg>`,
  edit: `
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="m4 16 1-4L14 3l3 3-9 9-4 1ZM12.5 4.5l3 3"/>
    </svg>`,
};

const ui = {
  filter: "all",
  time: "upcoming",
};

let storageAvailable = true;
let pendingSharedActivity = null;
let toastTimer = null;
let confirmResolver = null;
let state = loadState();

const elements = {
  nextEvent: document.querySelector("#next-event"),
  upcomingCount: document.querySelector("#upcoming-count"),
  eventsGrid: document.querySelector("#activities-grid"),
  resultsMeta: document.querySelector("#results-meta"),
  friendsGrid: document.querySelector("#friends-grid"),
  headerUserName: document.querySelector("#header-user-name"),
  headerAvatar: document.querySelector("#header-avatar"),
  mobileAvatar: document.querySelector("#mobile-avatar"),
  eventDialog: document.querySelector("#event-dialog"),
  eventForm: document.querySelector("#event-form"),
  eventDialogKicker: document.querySelector("#event-dialog-kicker"),
  eventDialogTitle: document.querySelector("#event-dialog-title"),
  deleteEvent: document.querySelector("#delete-event"),
  memberDialog: document.querySelector("#member-dialog"),
  memberPicker: document.querySelector("#member-picker"),
  dataDialog: document.querySelector("#data-dialog"),
  storageSummary: document.querySelector("#storage-summary"),
  importFile: document.querySelector("#import-file"),
  shareDialog: document.querySelector("#share-dialog"),
  shareAccent: document.querySelector("#share-preview-accent"),
  sharedType: document.querySelector("#shared-event-type"),
  sharedTitle: document.querySelector("#shared-event-title"),
  sharedMeta: document.querySelector("#shared-event-meta"),
  sharedNote: document.querySelector("#shared-event-note"),
  importSharedButton: document.querySelector("#import-shared-event"),
  confirmDialog: document.querySelector("#confirm-dialog"),
  confirmTitle: document.querySelector("#confirm-title"),
  confirmCopy: document.querySelector("#confirm-copy"),
  confirmYes: document.querySelector("#confirm-yes"),
  toast: document.querySelector("#toast"),
  toastMessage: document.querySelector("#toast-message"),
};

init();

function init() {
  populateOrganizerOptions();
  bindEvents();
  renderAll();
  window.setTimeout(checkSharedHash, 80);

  if (!storageAvailable) {
    showToast("Браузер запретил хранилище — изменения останутся до перезагрузки", "!");
  }
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const createButton = event.target.closest('[data-action="create"]');
    if (createButton) {
      openEventDialog();
      return;
    }

    const closeButton = event.target.closest("[data-close-dialog]");
    if (closeButton) {
      closeDialog(closeButton.closest("dialog"));
      return;
    }

    const templateButton = event.target.closest("[data-template]");
    if (templateButton) {
      openEventDialog(null, TEMPLATES[templateButton.dataset.template]);
    }
  });

  document.querySelector("#random-idea").addEventListener("click", () => {
    const idea = RANDOM_IDEAS[Math.floor(Math.random() * RANDOM_IDEAS.length)];
    const base = TEMPLATES[idea.type];
    openEventDialog(null, { ...base, ...idea });
    showToast("Идея выбрана случайно. Судьба решила.", "✦");
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      renderActivities();
    });
  });

  document.querySelectorAll("[data-time]").forEach((button) => {
    button.addEventListener("click", () => {
      ui.time = button.dataset.time;
      document.querySelectorAll("[data-time]").forEach((item) => {
        item.classList.toggle("active", item === button);
      });
      renderActivities();
    });
  });

  [elements.eventsGrid, elements.nextEvent].forEach((container) => {
    container.addEventListener("click", handleEventAction);
  });

  elements.friendsGrid.addEventListener("click", (event) => {
    const friendButton = event.target.closest("[data-select-friend]");
    if (friendButton) {
      selectCurrentUser(friendButton.dataset.selectFriend);
    }
  });

  elements.memberPicker.addEventListener("click", (event) => {
    const friendButton = event.target.closest("[data-select-friend]");
    if (friendButton) {
      selectCurrentUser(friendButton.dataset.selectFriend);
      closeDialog(elements.memberDialog);
    }
  });

  ["#user-button", "#mobile-user-button"].forEach((selector) => {
    document.querySelector(selector).addEventListener("click", () => {
      renderMemberPicker();
      openDialog(elements.memberDialog);
    });
  });

  ["#data-button", "#open-data-secondary", "#footer-data"].forEach((selector) => {
    document.querySelector(selector).addEventListener("click", openDataDialog);
  });

  elements.eventForm.addEventListener("submit", saveEventFromForm);
  elements.deleteEvent.addEventListener("click", deleteCurrentEvent);

  document.querySelector("#export-data").addEventListener("click", exportData);
  document.querySelector("#import-data").addEventListener("click", () => elements.importFile.click());
  elements.importFile.addEventListener("change", importData);
  document.querySelector("#reset-data").addEventListener("click", resetData);

  document.querySelector("#dismiss-share").addEventListener("click", dismissSharedEvent);
  document.querySelector("#cancel-share").addEventListener("click", dismissSharedEvent);
  elements.importSharedButton.addEventListener("click", importSharedEvent);

  document.querySelector("#confirm-cancel").addEventListener("click", () => resolveConfirmation(false));
  elements.confirmYes.addEventListener("click", () => resolveConfirmation(true));
  elements.confirmDialog.addEventListener("cancel", (event) => {
    event.preventDefault();
    resolveConfirmation(false);
  });

  window.addEventListener("storage", (event) => {
    if (event.key !== STORAGE_KEY || !event.newValue) return;

    try {
      const incoming = normalizeState(JSON.parse(event.newValue));
      if (!incoming) return;
      state = incoming;
      renderAll();
      showToast("Планы обновились из другой вкладки");
    } catch {
      // Ignore malformed changes from another tab.
    }
  });

  window.addEventListener("hashchange", checkSharedHash);
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = normalizeState(JSON.parse(raw));
      if (parsed) return parsed;
    }

    const fresh = createInitialState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
  } catch {
    storageAvailable = false;
    return createInitialState();
  }
}

function normalizeState(raw) {
  if (!raw || typeof raw !== "object" || !Array.isArray(raw.activities)) return null;

  const activities = raw.activities
    .slice(0, 250)
    .map((activity) => sanitizeActivity(activity))
    .filter(Boolean);

  return {
    version: STATE_VERSION,
    currentUser: getFriend(raw.currentUser) ? raw.currentUser : "nikita",
    activities,
  };
}

function createInitialState() {
  const now = new Date();
  const createdAt = now.toISOString();
  const timezone = getTimezone();

  return {
    version: STATE_VERSION,
    currentUser: "nikita",
    activities: [
      {
        id: "demo-game-night",
        title: "Катка до победного",
        type: "game",
        date: toDateInput(addDays(now, 2)),
        time: "20:30",
        place: "Discord / у Никиты",
        details: "Выбираем игру в чате. Проигравшие организуют следующую встречу.",
        organizer: "nikita",
        responses: {
          nikita: "yes",
          klim: "yes",
          vitek: "yes",
          egron4: "maybe",
        },
        timezone,
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: "demo-cinema-night",
        title: "Плохое кино, хорошая компания",
        type: "cinema",
        date: toDateInput(addDays(now, 5)),
        time: "19:40",
        place: "Кинотеатр — решим в чате",
        details: "Сначала выбираем фильм, потом спорим, кто выбрал его хуже всех.",
        organizer: "lenchik",
        responses: {
          lenchik: "yes",
          andrey: "yes",
          mot: "maybe",
        },
        timezone,
        createdAt,
        updatedAt: createdAt,
      },
      {
        id: "demo-pub-night",
        title: "По одной, ага",
        type: "pub",
        date: toDateInput(addDays(now, 8)),
        time: "20:00",
        place: "Бар выберем голосованием",
        details: "Без сложной повестки. Просто увидеться и обсудить великие планы.",
        organizer: "zheka",
        responses: {
          zheka: "yes",
          serega: "yes",
          "denchik-andreev": "maybe",
        },
        timezone,
        createdAt,
        updatedAt: createdAt,
      },
    ],
  };
}

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    storageAvailable = true;
    return true;
  } catch {
    storageAvailable = false;
    showToast("Не удалось сохранить изменения в браузере", "!");
    return false;
  }
}

function renderAll() {
  renderCurrentUser();
  renderHero();
  renderActivities();
  renderFriends();
  renderMemberPicker();
  updateStorageSummary();
}

function renderCurrentUser() {
  const friend = getFriend(state.currentUser) || FRIENDS[7];
  elements.headerUserName.textContent = friend.name;

  [elements.headerAvatar, elements.mobileAvatar].forEach((avatar) => {
    avatar.textContent = friend.initials;
    avatar.style.setProperty("--avatar", friend.color);
  });
}

function renderHero() {
  const upcoming = getActivitiesByTime("upcoming");
  elements.upcomingCount.textContent = String(upcoming.length);

  if (!upcoming.length) {
    elements.nextEvent.innerHTML = `
      <div class="ticket-empty">
        <span class="ticket-empty-icon">✦</span>
        <h2>Пока тихо</h2>
        <p>Подозрительно тихо. Создайте первый движ, пока все не разошлись.</p>
        <button class="button button-dark" data-action="create" type="button">Исправить это</button>
      </div>`;
    return;
  }

  const activity = upcoming[0];
  const type = TYPES[activity.type];
  const going = getResponders(activity, "yes");
  const currentStatus = activity.responses[state.currentUser];
  const date = parseActivityDate(activity);

  elements.nextEvent.innerHTML = `
    <div class="ticket-content">
      <div class="ticket-main">
        <div class="ticket-topline">
          <span class="ticket-type">${ICONS[activity.type]}<span data-ticket-type></span></span>
          <div class="ticket-date">
            <strong data-ticket-day></strong>
            <span data-ticket-month></span>
          </div>
        </div>
        <div class="ticket-title-block">
          <small data-ticket-relative></small>
          <h2 data-ticket-title></h2>
          <p class="ticket-place">${ICONS.location}<span data-ticket-place></span></p>
        </div>
      </div>
      <div class="ticket-stub">
        <div class="ticket-going">
          <small data-ticket-going-label></small>
          <div class="avatar-stack" data-ticket-avatars></div>
        </div>
        <button
          class="button ticket-rsvp${currentStatus === "yes" ? " is-going" : ""}"
          data-card-action="rsvp"
          data-status="yes"
          data-event-id="${activity.id}"
          type="button"
        >${currentStatus === "yes" ? "Вы в деле ✓" : "Я в деле"}</button>
      </div>
    </div>`;

  elements.nextEvent.querySelector("[data-ticket-type]").textContent = type.label;
  elements.nextEvent.querySelector("[data-ticket-day]").textContent = String(date.getDate()).padStart(2, "0");
  elements.nextEvent.querySelector("[data-ticket-month]").textContent = getMonthName(date, "long");
  elements.nextEvent.querySelector("[data-ticket-relative]").textContent = `${formatRelative(activity)} · ${activity.time}`;
  elements.nextEvent.querySelector("[data-ticket-title]").textContent = activity.title;
  elements.nextEvent.querySelector("[data-ticket-place]").textContent = activity.place || "Место решим в чате";
  elements.nextEvent.querySelector("[data-ticket-going-label]").textContent =
    going.length > 0 ? `${going.length} ${plural(going.length, "человек идёт", "человека идут", "человек идут")}` : "Пока никто не отметился";
  renderAvatarStack(elements.nextEvent.querySelector("[data-ticket-avatars]"), going, activity.type);
}

function renderActivities() {
  let activities = getActivitiesByTime(ui.time);
  if (ui.filter !== "all") {
    activities = activities.filter((activity) => activity.type === ui.filter);
  }

  const label = ui.time === "upcoming" ? "предстоящих" : "прошедших";
  elements.resultsMeta.textContent = `${activities.length} ${plural(
    activities.length,
    label === "предстоящих" ? "предстоящая встреча" : "прошедшая встреча",
    label === "предстоящих" ? "предстоящие встречи" : "прошедшие встречи",
    label === "предстоящих" ? "предстоящих встреч" : "прошедших встреч",
  )}`;

  elements.eventsGrid.replaceChildren();

  if (!activities.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    const filtered = ui.filter !== "all";
    empty.innerHTML = `
      <div>
        <span class="empty-state-icon" aria-hidden="true">${filtered ? "⌁" : "✦"}</span>
        <h3>${filtered ? "Здесь пока пусто" : ui.time === "past" ? "Архив ещё пуст" : "Подозрительно тихо"}</h3>
        <p>${
          filtered
            ? "Попробуйте другой фильтр или придумайте новый повод."
            : ui.time === "past"
              ? "Прошедшие встречи появятся здесь сами."
              : "Создайте первый движ, пока все не разошлись по своим делам."
        }</p>
        ${ui.time === "upcoming" ? '<button class="button button-primary" data-action="create" type="button">Создать движ</button>' : ""}
      </div>`;
    elements.eventsGrid.append(empty);
    return;
  }

  const fragment = document.createDocumentFragment();
  activities.forEach((activity) => fragment.append(createEventCard(activity)));
  elements.eventsGrid.append(fragment);
}

function createEventCard(activity) {
  const card = document.createElement("article");
  const date = parseActivityDate(activity);
  const type = TYPES[activity.type];
  const yes = getResponders(activity, "yes");
  const maybe = getResponders(activity, "maybe");
  const currentStatus = activity.responses[state.currentUser] || "";

  card.className = `event-card type-${activity.type}`;
  card.dataset.eventId = activity.id;
  card.innerHTML = `
    <div class="event-top">
      <span class="event-type-badge">${ICONS[activity.type]}<span data-card-type></span></span>
      <span class="relative-badge" data-card-relative></span>
    </div>
    <div class="event-main">
      <div class="event-date-box">
        <strong data-card-day></strong>
        <span data-card-month></span>
      </div>
      <div class="event-copy">
        <h3 data-card-title></h3>
        <div class="event-meta">
          <span>${ICONS.time}<span data-card-time></span></span>
          <span>${ICONS.location}<span data-card-place></span></span>
        </div>
        <p class="event-details" data-card-details></p>
      </div>
    </div>
    <div class="attendance-row">
      <div class="avatar-stack" data-card-avatars></div>
      <div class="attendance-copy">
        <strong data-card-going></strong>
        <small data-card-maybe></small>
      </div>
    </div>
    <div class="rsvp-row" role="group" data-card-rsvp></div>
    <div class="event-actions">
      <button
        class="card-action"
        data-card-action="share"
        data-event-id="${activity.id}"
        type="button"
        aria-label="Кинуть встречу в чат"
      >
        ${ICONS.share}<span>Кинуть в чат</span>
      </button>
      <button
        class="card-action"
        data-card-action="calendar"
        data-event-id="${activity.id}"
        type="button"
        aria-label="Добавить встречу в календарь"
      >
        ${ICONS.calendar}<span>В календарь</span>
      </button>
      <button
        class="card-action"
        data-card-action="edit"
        data-event-id="${activity.id}"
        type="button"
        aria-label="Изменить встречу"
      >
        ${ICONS.edit}<span>Изменить</span>
      </button>
    </div>`;

  card.querySelector("[data-card-type]").textContent = type.label;
  card.querySelector("[data-card-relative]").textContent = formatRelative(activity);
  card.querySelector("[data-card-day]").textContent = String(date.getDate()).padStart(2, "0");
  card.querySelector("[data-card-month]").textContent = getMonthName(date, "short");
  card.querySelector("[data-card-title]").textContent = activity.title;
  card.querySelector("[data-card-time]").textContent = activity.time;
  card.querySelector("[data-card-place]").textContent = activity.place || "Решим в чате";
  card.querySelector("[data-card-details]").textContent = activity.details || "Без длинного описания. Просто собираемся.";
  card.querySelector("[data-card-going]").textContent =
    yes.length > 0 ? `${yes.length} ${plural(yes.length, "в деле", "в деле", "в деле")}` : "Никто не ответил";
  card.querySelector("[data-card-maybe]").textContent =
    maybe.length > 0 ? `${maybe.length} ${plural(maybe.length, "думает", "думают", "думают")}` : "Ждём остальных";

  renderAvatarStack(card.querySelector("[data-card-avatars]"), yes, activity.type);
  renderRsvpButtons(card.querySelector("[data-card-rsvp]"), activity, currentStatus);

  return card;
}

function renderRsvpButtons(container, activity, currentStatus) {
  const options = [
    ["yes", "В деле"],
    ["maybe", "Думаю"],
    ["no", "Пас"],
  ];
  const friend = getFriend(state.currentUser);

  options.forEach(([status, label]) => {
    const button = document.createElement("button");
    button.className = "rsvp-button";
    button.type = "button";
    button.dataset.cardAction = "rsvp";
    button.dataset.eventId = activity.id;
    button.dataset.status = status;
    button.setAttribute("aria-pressed", String(currentStatus === status));
    button.setAttribute("aria-label", `${friend.name}: ${label}`);
    button.textContent = label;
    container.append(button);
  });
}

function renderAvatarStack(container, friendIds, activityType) {
  container.replaceChildren();
  container.style.setProperty("--card-bg", container.closest(".next-ticket") ? "#c8ff3d" : "#171a1f");

  if (!friendIds.length) {
    const placeholder = document.createElement("span");
    placeholder.className = "stack-avatar stack-more";
    placeholder.textContent = "…";
    placeholder.title = "Пока никто";
    container.append(placeholder);
    return;
  }

  friendIds.slice(0, 5).forEach((friendId) => {
    const friend = getFriend(friendId);
    if (!friend) return;
    const avatar = document.createElement("span");
    avatar.className = "stack-avatar";
    avatar.textContent = friend.initials;
    avatar.title = friend.name;
    avatar.style.setProperty("--avatar", friend.color);
    container.append(avatar);
  });

  if (friendIds.length > 5) {
    const more = document.createElement("span");
    more.className = "stack-avatar stack-more";
    more.textContent = `+${friendIds.length - 5}`;
    more.title = `И ещё ${friendIds.length - 5}`;
    container.append(more);
  }
}

function renderFriends() {
  const upcoming = getActivitiesByTime("upcoming");
  const fragment = document.createDocumentFragment();

  FRIENDS.forEach((friend) => {
    const count = upcoming.filter((activity) => activity.responses[friend.id] === "yes").length;
    const card = document.createElement("button");
    card.type = "button";
    card.className = `friend-card${friend.id === state.currentUser ? " is-current" : ""}`;
    card.dataset.selectFriend = friend.id;
    card.style.setProperty("--friend-accent", friend.color);
    card.setAttribute("aria-pressed", String(friend.id === state.currentUser));
    card.setAttribute("aria-label", `${friend.name}. ${count ? `${count} встреч впереди.` : "Пока без планов."} Выбрать себя.`);

    const avatar = document.createElement("span");
    avatar.className = "friend-avatar";
    avatar.textContent = friend.initials;

    const name = document.createElement("strong");
    name.textContent = friend.name;

    const status = document.createElement("small");
    status.textContent =
      friend.id === state.currentUser
        ? "ЭТО ВЫ"
        : count
          ? `${count} ${plural(count, "ВСТРЕЧА", "ВСТРЕЧИ", "ВСТРЕЧ")}`
          : "ЖДЁТ ПЛАНОВ";

    card.append(avatar, name, status);
    fragment.append(card);
  });

  elements.friendsGrid.replaceChildren(fragment);
}

function renderMemberPicker() {
  const fragment = document.createDocumentFragment();

  FRIENDS.forEach((friend) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `member-choice${friend.id === state.currentUser ? " is-current" : ""}`;
    button.dataset.selectFriend = friend.id;
    button.style.setProperty("--member-accent", friend.color);

    const avatar = document.createElement("span");
    avatar.className = "mini-avatar";
    avatar.textContent = friend.initials;

    const name = document.createElement("strong");
    name.textContent = friend.name;
    button.append(avatar, name);

    if (friend.id === state.currentUser) {
      const check = document.createElement("span");
      check.className = "member-check";
      check.textContent = "✓";
      check.setAttribute("aria-label", "Выбрано");
      button.append(check);
    }

    fragment.append(button);
  });

  elements.memberPicker.replaceChildren(fragment);
}

function populateOrganizerOptions() {
  const select = document.querySelector("#event-organizer");
  const fragment = document.createDocumentFragment();

  FRIENDS.forEach((friend) => {
    const option = document.createElement("option");
    option.value = friend.id;
    option.textContent = friend.name;
    fragment.append(option);
  });

  select.replaceChildren(fragment);
}

function openEventDialog(eventId = null, preset = null) {
  elements.eventForm.reset();
  document.querySelector("#event-title").setCustomValidity("");
  document.querySelector("#event-id").value = "";
  elements.deleteEvent.classList.add("hidden");
  elements.eventDialogKicker.textContent = "Новый движ";
  elements.eventDialogTitle.textContent = "Собираем своих";
  document.querySelector("#save-event").textContent = "Сохранить движ";

  const tomorrow = addDays(new Date(), 1);
  document.querySelector("#event-date").value = toDateInput(tomorrow);
  document.querySelector("#event-time").value = "20:00";
  document.querySelector("#event-organizer").value = state.currentUser;

  if (eventId) {
    const activity = state.activities.find((item) => item.id === eventId);
    if (!activity) return;

    document.querySelector("#event-id").value = activity.id;
    document.querySelector(`input[name="type"][value="${activity.type}"]`).checked = true;
    document.querySelector("#event-title").value = activity.title;
    document.querySelector("#event-date").value = activity.date;
    document.querySelector("#event-time").value = activity.time;
    document.querySelector("#event-place").value = activity.place;
    document.querySelector("#event-details").value = activity.details;
    document.querySelector("#event-organizer").value = activity.organizer;
    elements.deleteEvent.classList.remove("hidden");
    elements.eventDialogKicker.textContent = "Редактирование";
    elements.eventDialogTitle.textContent = "Правим план";
    document.querySelector("#save-event").textContent = "Сохранить изменения";
  } else if (preset) {
    document.querySelector(`input[name="type"][value="${preset.type}"]`).checked = true;
    document.querySelector("#event-title").value = preset.title || "";
    document.querySelector("#event-place").value = preset.place || "";
    document.querySelector("#event-details").value = preset.details || "";
  }

  openDialog(elements.eventDialog);
  window.setTimeout(() => document.querySelector("#event-title").focus(), 60);
}

function saveEventFromForm(event) {
  event.preventDefault();
  const formData = new FormData(elements.eventForm);
  const titleInput = document.querySelector("#event-title");
  const title = String(formData.get("title") || "").trim();

  titleInput.setCustomValidity(title ? "" : "Придумайте короткое название встречи.");
  if (!elements.eventForm.reportValidity()) return;

  const existingId = String(formData.get("id") || "");
  const existingIndex = state.activities.findIndex((activity) => activity.id === existingId);
  const existing = existingIndex >= 0 ? state.activities[existingIndex] : null;
  const now = new Date().toISOString();
  const organizer = getFriend(String(formData.get("organizer"))) ? String(formData.get("organizer")) : state.currentUser;
  const responses = existing ? { ...existing.responses } : { [organizer]: "yes" };

  if (!responses[organizer]) responses[organizer] = "yes";

  const activity = {
    id: existing?.id || createId(),
    title,
    type: TYPES[formData.get("type")] ? String(formData.get("type")) : "other",
    date: String(formData.get("date")),
    time: String(formData.get("time")),
    place: String(formData.get("place") || "").trim(),
    details: String(formData.get("details") || "").trim(),
    organizer,
    responses,
    timezone: existing?.timezone || getTimezone(),
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  };

  const safeActivity = sanitizeActivity(activity);
  if (!safeActivity) {
    showToast("Проверьте дату и время встречи", "!");
    return;
  }

  if (existingIndex >= 0) {
    state.activities.splice(existingIndex, 1, safeActivity);
  } else {
    state.activities.push(safeActivity);
  }

  persistState();
  closeDialog(elements.eventDialog);
  renderAll();
  showToast(existing ? "План обновлён" : "Движ готов. Теперь киньте его в чат.");
}

async function deleteCurrentEvent() {
  const eventId = document.querySelector("#event-id").value;
  const activity = state.activities.find((item) => item.id === eventId);
  if (!activity) return;

  const confirmed = await askConfirmation(
    "Удалить этот движ?",
    `«${activity.title}» исчезнет из этого браузера.`,
    "Удалить",
  );
  if (!confirmed) return;

  state.activities = state.activities.filter((item) => item.id !== eventId);
  persistState();
  closeDialog(elements.eventDialog);
  renderAll();
  showToast("Встреча удалена", "×");
}

function handleEventAction(event) {
  const button = event.target.closest("[data-card-action]");
  if (!button) return;
  const activity = state.activities.find((item) => item.id === button.dataset.eventId);
  if (!activity) return;

  switch (button.dataset.cardAction) {
    case "rsvp":
      setRsvp(activity.id, button.dataset.status);
      break;
    case "share":
      shareActivity(activity);
      break;
    case "calendar":
      downloadCalendar(activity);
      break;
    case "edit":
      openEventDialog(activity.id);
      break;
  }
}

function setRsvp(eventId, status) {
  const activity = state.activities.find((item) => item.id === eventId);
  if (!activity || !["yes", "maybe", "no"].includes(status)) return;

  const currentStatus = activity.responses[state.currentUser];
  if (currentStatus === status) {
    delete activity.responses[state.currentUser];
  } else {
    activity.responses[state.currentUser] = status;
  }

  activity.updatedAt = new Date().toISOString();
  persistState();
  renderAll();

  const messages = {
    yes: "Отмечено: вы в деле. Ответ сохранён только у вас.",
    maybe: "Отмечено: вы думаете. Не забудьте определиться.",
    no: "Отмечено: в этот раз пас.",
  };
  showToast(currentStatus === status ? "Ответ снят" : messages[status]);
}

function selectCurrentUser(friendId) {
  const friend = getFriend(friendId);
  if (!friend) return;
  state.currentUser = friend.id;
  persistState();
  renderAll();
  showToast(`Теперь вы — ${friend.name}`);
}

async function shareActivity(activity) {
  const url = buildShareUrl(activity);
  const date = formatFullDate(activity);
  const text = `${activity.title}\n${date}, ${activity.time}${activity.place ? `\n${activity.place}` : ""}`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: `СОБРАЛИСЬ. — ${activity.title}`,
        text,
        url,
      });
      return;
    } catch (error) {
      if (error?.name === "AbortError") return;
    }
  }

  const copied = await copyText(`${text}\n\nОткрыть план: ${url}`);
  showToast(copied ? "План скопирован — кидайте в чат" : "Не удалось скопировать ссылку", copied ? "✓" : "!");
}

function buildShareUrl(activity) {
  const payload = encodeBase64Url(JSON.stringify({ version: STATE_VERSION, activity }));
  return `${window.location.href.split("#")[0]}#event=${payload}`;
}

function checkSharedHash() {
  const match = window.location.hash.match(/^#event=([A-Za-z0-9_-]+)$/);
  if (!match) return;

  try {
    if (match[1].length > 24000) throw new Error("Payload is too large");
    const raw = JSON.parse(decodeBase64Url(match[1]));
    const activity = sanitizeActivity(raw?.activity);
    if (!activity) throw new Error("Invalid activity");

    pendingSharedActivity = activity;
    const existing = state.activities.find((item) => item.id === activity.id);
    const type = TYPES[activity.type];

    elements.shareAccent.className = `share-preview-accent type-${activity.type}`;
    elements.sharedType.textContent = type.label;
    elements.sharedType.style.color = type.color;
    elements.sharedTitle.textContent = activity.title;
    elements.sharedMeta.textContent = `${formatFullDate(activity)} · ${activity.time} · ${activity.place || "место решат в чате"}`;
    elements.sharedNote.textContent = existing
      ? "Эта встреча уже есть у вас. Объединим ответы из ссылки с вашей версией."
      : "Ссылка содержит снимок встречи. После добавления он сохранится только в этом браузере.";
    elements.importSharedButton.textContent = existing ? "Объединить ответы" : "Добавить план";
    openDialog(elements.shareDialog);
  } catch {
    clearShareHash();
    showToast("Эта ссылка на встречу повреждена или устарела", "!");
  }
}

function importSharedEvent() {
  if (!pendingSharedActivity) return;
  const incoming = pendingSharedActivity;
  const index = state.activities.findIndex((activity) => activity.id === incoming.id);

  if (index >= 0) {
    const existing = state.activities[index];
    state.activities[index] = {
      ...incoming,
      responses: { ...existing.responses, ...incoming.responses },
      createdAt: existing.createdAt || incoming.createdAt,
      updatedAt:
        new Date(incoming.updatedAt).getTime() >= new Date(existing.updatedAt).getTime()
          ? incoming.updatedAt
          : existing.updatedAt,
    };
  } else {
    state.activities.push(incoming);
  }

  persistState();
  pendingSharedActivity = null;
  closeDialog(elements.shareDialog);
  clearShareHash();
  ui.time = "upcoming";
  document.querySelectorAll("[data-time]").forEach((button) => {
    button.classList.toggle("active", button.dataset.time === "upcoming");
  });
  renderAll();
  showToast(index >= 0 ? "Ответы из ссылки объединены" : "Встреча добавлена в ваш штаб");
  document.querySelector("#activities").scrollIntoView({ behavior: "smooth", block: "start" });
}

function dismissSharedEvent() {
  pendingSharedActivity = null;
  closeDialog(elements.shareDialog);
  clearShareHash();
}

function clearShareHash() {
  try {
    history.replaceState(null, "", window.location.href.split("#")[0]);
  } catch {
    window.location.hash = "";
  }
}

function downloadCalendar(activity) {
  const start = `${activity.date.replaceAll("-", "")}T${activity.time.replace(":", "")}00`;
  const endDate = new Date(parseActivityDate(activity).getTime() + 2 * 60 * 60 * 1000);
  const end = formatIcsLocal(endDate);
  const timezone = /^[A-Za-z0-9_+\-/]{1,80}$/.test(activity.timezone || "") ? activity.timezone : "";
  const timezoneParam = timezone ? `;TZID=${timezone}` : "";
  const attendees = getResponders(activity, "yes").map((id) => getFriend(id)?.name).filter(Boolean).join(", ");
  const description = [activity.details, attendees ? `В деле: ${attendees}` : ""].filter(Boolean).join("\\n\\n");
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//SOBRALIS//Friends Hub//RU",
    timezone ? `X-WR-TIMEZONE:${timezone}` : "",
    "BEGIN:VEVENT",
    `UID:${icsEscape(activity.id)}@sobralis.local`,
    `DTSTAMP:${stamp}`,
    `DTSTART${timezoneParam}:${start}`,
    `DTEND${timezoneParam}:${end}`,
    `SUMMARY:${icsEscape(activity.title)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    `LOCATION:${icsEscape(activity.place)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ]
    .filter(Boolean)
    .join("\r\n");

  downloadBlob(
    new Blob([ics], { type: "text/calendar;charset=utf-8" }),
    `${safeFileName(activity.title) || "vstrecha"}.ics`,
  );
  showToast("Файл календаря готов");
}

function openDataDialog() {
  updateStorageSummary();
  openDialog(elements.dataDialog);
}

function updateStorageSummary() {
  elements.storageSummary.textContent = `${state.activities.length} ${plural(
    state.activities.length,
    "встреча",
    "встречи",
    "встреч",
  )}`;
}

function exportData() {
  const backup = {
    version: STATE_VERSION,
    exportedAt: new Date().toISOString(),
    currentUser: state.currentUser,
    activities: state.activities,
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json;charset=utf-8" });
  downloadBlob(blob, `sobralis-backup-${toDateInput(new Date())}.json`);
  showToast("Резервная копия скачана");
}

async function importData() {
  const file = elements.importFile.files?.[0];
  elements.importFile.value = "";
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) {
    showToast("Файл слишком большой. Максимум — 2 МБ.", "!");
    return;
  }

  try {
    const raw = JSON.parse(await file.text());
    if (!raw || !Array.isArray(raw.activities)) throw new Error("Invalid backup");

    const imported = raw.activities
      .slice(0, 250)
      .map((activity) => sanitizeActivity(activity))
      .filter(Boolean);

    if (!imported.length && raw.activities.length) throw new Error("No valid activities");

    let added = 0;
    let updated = 0;
    imported.forEach((incoming) => {
      const index = state.activities.findIndex((activity) => activity.id === incoming.id);
      if (index >= 0) {
        state.activities[index] = incoming;
        updated += 1;
      } else {
        state.activities.push(incoming);
        added += 1;
      }
    });

    persistState();
    renderAll();
    showToast(`Готово: добавлено ${added}, обновлено ${updated}`);
  } catch {
    showToast("Не удалось прочитать резервную копию", "!");
  }
}

async function resetData() {
  const confirmed = await askConfirmation(
    "Очистить все планы?",
    "Встречи и ответы исчезнут из этого браузера. Сначала можно скачать копию.",
    "Очистить всё",
  );
  if (!confirmed) return;

  state.activities = [];
  persistState();
  closeDialog(elements.dataDialog);
  renderAll();
  showToast("Локальные планы очищены", "×");
}

function askConfirmation(title, copy, buttonLabel) {
  if (confirmResolver) {
    confirmResolver(false);
    confirmResolver = null;
  }

  elements.confirmTitle.textContent = title;
  elements.confirmCopy.textContent = copy;
  elements.confirmYes.textContent = buttonLabel;
  openDialog(elements.confirmDialog);

  return new Promise((resolve) => {
    confirmResolver = resolve;
  });
}

function resolveConfirmation(value) {
  closeDialog(elements.confirmDialog);
  const resolve = confirmResolver;
  confirmResolver = null;
  if (resolve) resolve(value);
}

function sanitizeActivity(raw) {
  if (!raw || typeof raw !== "object") return null;

  const title = cleanText(raw.title, 80);
  const type = TYPES[raw.type] ? raw.type : "other";
  const date = String(raw.date || "");
  const time = String(raw.time || "");
  if (!title || !isValidDate(date) || !isValidTime(time)) return null;

  let id = String(raw.id || "");
  if (!/^[A-Za-z0-9_-]{1,100}$/.test(id)) id = createId();

  const responses = {};
  if (raw.responses && typeof raw.responses === "object" && !Array.isArray(raw.responses)) {
    Object.entries(raw.responses).forEach(([friendId, status]) => {
      if (getFriend(friendId) && ["yes", "maybe", "no"].includes(status)) {
        responses[friendId] = status;
      }
    });
  }

  const now = new Date().toISOString();
  const organizer = getFriend(raw.organizer) ? raw.organizer : "nikita";

  return {
    id,
    title,
    type,
    date,
    time,
    place: cleanText(raw.place, 120),
    details: cleanText(raw.details, 500),
    organizer,
    responses,
    timezone: cleanText(raw.timezone, 80) || getTimezone(),
    createdAt: isValidTimestamp(raw.createdAt) ? raw.createdAt : now,
    updatedAt: isValidTimestamp(raw.updatedAt) ? raw.updatedAt : now,
  };
}

function cleanText(value, maxLength) {
  return String(value ?? "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, maxLength);
}

function getActivitiesByTime(time) {
  const now = Date.now();
  return state.activities
    .filter((activity) => {
      const eventTime = parseActivityDate(activity).getTime();
      return time === "upcoming" ? eventTime >= now : eventTime < now;
    })
    .sort((a, b) => {
      const difference = parseActivityDate(a) - parseActivityDate(b);
      return time === "upcoming" ? difference : -difference;
    });
}

function getResponders(activity, status) {
  return FRIENDS.filter((friend) => activity.responses[friend.id] === status).map((friend) => friend.id);
}

function getFriend(friendId) {
  return FRIENDS.find((friend) => friend.id === friendId);
}

function parseActivityDate(activity) {
  const [year, month, day] = activity.date.split("-").map(Number);
  const [hour, minute] = activity.time.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, 0, 0);
}

function isValidDate(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;
  const [, year, month, day] = match.map(Number);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function isValidTime(value) {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) return false;
  return Number(match[1]) >= 0 && Number(match[1]) <= 23 && Number(match[2]) >= 0 && Number(match[2]) <= 59;
}

function isValidTimestamp(value) {
  return typeof value === "string" && Number.isFinite(new Date(value).getTime());
}

function addDays(date, days) {
  const result = new Date(date);
  result.setHours(12, 0, 0, 0);
  result.setDate(result.getDate() + days);
  return result;
}

function toDateInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatRelative(activity) {
  const target = parseActivityDate(activity);
  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const days = Math.round((startTarget - startToday) / 86400000);

  if (days === 0) return "Сегодня";
  if (days === 1) return "Завтра";
  if (days === -1) return "Вчера";
  if (days > 1 && days < 7) return `Через ${days} ${plural(days, "день", "дня", "дней")}`;
  if (days < -1 && days > -7) return `${Math.abs(days)} ${plural(Math.abs(days), "день назад", "дня назад", "дней назад")}`;
  return new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "short" })
    .format(target)
    .replace(".", "");
}

function formatFullDate(activity) {
  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "long",
  })
    .format(parseActivityDate(activity))
    .replace(/^./, (letter) => letter.toUpperCase());
}

function getMonthName(date, style) {
  return new Intl.DateTimeFormat("ru-RU", { month: style }).format(date).replace(".", "");
}

function plural(number, one, few, many) {
  const mod10 = number % 10;
  const mod100 = number % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function getTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Europe/Moscow";
  } catch {
    return "Europe/Moscow";
  }
}

function createId() {
  if (crypto?.randomUUID) return crypto.randomUUID();
  return `event-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function formatIcsLocal(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
    "T",
    String(date.getHours()).padStart(2, "0"),
    String(date.getMinutes()).padStart(2, "0"),
    "00",
  ].join("");
}

function icsEscape(value) {
  return String(value || "")
    .replaceAll("\\", "\\\\")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function safeFileName(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-zа-яё0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function encodeBase64Url(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) {
    binary += String.fromCharCode(bytes[index]);
  }
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/g, "");
}

function decodeBase64Url(value) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    return copied;
  }
}

function openDialog(dialog) {
  if (!dialog || dialog.open) return;
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

function closeDialog(dialog) {
  if (!dialog || !dialog.open) return;
  if (typeof dialog.close === "function") {
    dialog.close();
  } else {
    dialog.removeAttribute("open");
  }
}

function showToast(message, icon = "✓") {
  window.clearTimeout(toastTimer);
  elements.toastMessage.textContent = message;
  elements.toast.querySelector(".toast-icon").textContent = icon;
  elements.toast.classList.add("show");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("show"), 3600);
}
