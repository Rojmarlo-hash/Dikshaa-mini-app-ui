const htmlRoot = document.getElementById("htmlRoot");
const themeBtn = document.getElementById("themeBtn");
const themeText = document.getElementById("themeText");
const commandRoot = document.getElementById("commandRoot");
const adminPanel = document.getElementById("adminPanel");
const detailPanel = document.getElementById("detailPanel");
const toast = document.getElementById("toast");

const commandSections = [
  {
    title: "Best Features",
    icon: "⭐",
    accent: "var(--gold)",
    commands: [
      { cmd: "/spyreport", desc: "Group chugli/activity report", emoji: "🕵️‍♂️" },
      { cmd: "/setlook", desc: "Set Dikshaa look/avatar", emoji: "💄" },
      { cmd: "/sanskari", desc: "Sanskari mode ON/OFF", emoji: "🙏" },
      { cmd: "/officemode", desc: "Office Mode for work groups", emoji: "💼" },
      { cmd: "/weeklyawards", desc: "Weekly Group Awards", emoji: "🏆" },
      { cmd: "/moodmeter", desc: "Family Mood Meter", emoji: "😊" },
      { cmd: "/reminder", desc: "Birthday & Anniversary Reminder", emoji: "🎂" },
      { cmd: "/calendar", desc: "Next festival date", emoji: "🗓️" },
      { cmd: "/mausam", desc: "Send weather/season style line", emoji: "🌤️" },
      { cmd: "/meme", desc: "Random text meme", emoji: "😂" }
    ]
  },
  {
    title: "Admin Controls",
    icon: "👑",
    accent: "var(--purple)",
    commands: [
      { cmd: "/on", desc: "Enable bot", emoji: "✅" },
      { cmd: "/off", desc: "Disable bot", emoji: "⛔" },
      { cmd: "/ban", desc: "Vote hard mute", emoji: "🔨" },
      { cmd: "/unban", desc: "Remove hard mute vote", emoji: "🕊️" },
      { cmd: "/mute", desc: "Temporary mute", emoji: "🔇" },
      { cmd: "/cooldown", desc: "Set cooldown timer", emoji: "⏱️" },
      { cmd: "/city", desc: "Set city for weather/festival", emoji: "🏙️" },
      { cmd: "/mode", desc: "Set group mode", emoji: "🎛️" },
      { cmd: "/onlyadmin", desc: "Only-admin mode ON/OFF", emoji: "🛡️" }
    ]
  },
  {
    title: "Trigger & Moderation",
    icon: "🧩",
    accent: "var(--emerald)",
    commands: [
      { cmd: "/addtrigger", desc: "Enable custom trigger", emoji: "➕" },
      { cmd: "/removetrigger", desc: "Disable custom trigger", emoji: "➖" },
      { cmd: "/blockword", desc: "Add blocked word", emoji: "🚫" },
      { cmd: "/test", desc: "Test festival output", emoji: "🧪" },
      { cmd: "/stats", desc: "Group stats", emoji: "📊" }
    ]
  },
  {
    title: "Festival / Weather / Calendar",
    icon: "⛅",
    accent: "var(--sky)",
    commands: [
      { cmd: "/calendarapi", desc: "Next holiday/festival API", emoji: "🌐" },
      { cmd: "/festival", desc: "Festival auto wish ON/OFF", emoji: "🪔" },
      { cmd: "/autocity", desc: "Auto-detect city", emoji: "📍" },
      { cmd: "/rashi", desc: "Horoscope/funny rashi line", emoji: "🔮" }
    ]
  },
  {
    title: "Fun / Utility",
    icon: "🎮",
    accent: "var(--pink)",
    commands: [
      { cmd: "/bolo", desc: "Make Dikshaa send a line", emoji: "🗣️" },
      { cmd: "/poll", desc: "Send poll to group", emoji: "🗳️" },
      { cmd: "/translate", desc: "Offline funny translate helper", emoji: "🌍" },
      { cmd: "/preset", desc: "Apply group preset", emoji: "🎚️" },
      { cmd: "/rating", desc: "Set group rating", emoji: "⭐" },
      { cmd: "/clone", desc: "Set persona name", emoji: "👥" },
      { cmd: "/export", desc: "Export recent stats", emoji: "📦" }
    ]
  },
  {
    title: "Basic",
    icon: "🏠",
    accent: "var(--teal)",
    commands: [
      { cmd: "/start", desc: "Open menu", emoji: "🏠" },
      { cmd: "/help", desc: "Show full help list", emoji: "📘" },
      { cmd: "/language", desc: "Change reply language", emoji: "🈯" },
      { cmd: "/groups", desc: "List verified groups", emoji: "👨‍👩‍👧‍👦" },
      { cmd: "/getid", desc: "Get saved IDs", emoji: "🆔" },
      { cmd: "/addme", desc: "Add/setup bot guide", emoji: "➕" }
    ]
  }
];

const commandGuides = {
  "/weeklyawards": "Shows the weekly group award preview first. Nothing is posted to the group until admin approves in bot DM.",
  "/moodmeter": "Shows today's family mood preview first. Send-to-group stays admin approved.",
  "/reminder": "Birthday and anniversary reminders use safe DD + MM and HH + MM fields. The bot menu will save and manage reminders.",
  "/officemode": "Controls Office Mode and Office + Fun Mode. Office lines run 09:00-17:00 only.",
  "/sanskari": "Turns Sanskari Mode ON/OFF. GF/BF pool stays blocked when Sanskari is ON.",
  "/setlook": "Opens group selection and lets admin choose Dikshaa's look/avatar.",
  "/spyreport": "Opens group selection and gives private activity/chugli report preview.",
  "/on": "Enables Dikshaa in the selected group.",
  "/off": "Disables Dikshaa in the selected group.",
  "/mute": "Opens mute duration buttons for the selected group.",
  "/cooldown": "Opens cooldown duration buttons for the selected group.",
  "/city": "Lets admin set city for weather and festival context.",
  "/stats": "Shows selected group status, mode, city, sent count, triggers, and cooldown.",
  "/festival": "Toggles festival auto-wish ON/OFF for the selected group.",
  "/addme": "Shows setup instructions for adding Dikshaa to a group/channel and making it admin."
};

function applyTheme(theme) {
  const isDark = theme === "dark";
  htmlRoot.classList.toggle("dark", isDark);
  themeText.textContent = isDark ? "Dark" : "Light";
  document.querySelector('meta[name="theme-color"]').setAttribute("content", isDark ? "#07101f" : "#eef3f9");
}

function initTheme() {
  const savedTheme = localStorage.getItem("dikshaa-theme");
  // Light Mode is now default. Dark Mode stays available from the toggle.
  applyTheme(savedTheme || "light");
}

function toggleTheme() {
  const nextTheme = htmlRoot.classList.contains("dark") ? "light" : "dark";
  localStorage.setItem("dikshaa-theme", nextTheme);
  applyTheme(nextTheme);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove("show");
  }, 2100);
}

function telegramWebApp() {
  return window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
}

function sendCommand(command) {
  const payload = JSON.stringify({
    type: "dikshaa_command",
    command,
    sentAt: new Date().toISOString()
  });

  const tg = telegramWebApp();
  if (tg && typeof tg.sendData === "function") {
    tg.sendData(payload);
    showToast(`${command} sent to Dikshaa`);
    return;
  }

  showToast(`${command} selected`);
}

function addRipple(event, button) {
  const rect = button.getBoundingClientRect();
  const ripple = document.createElement("span");
  ripple.className = "ripple";
  ripple.style.left = `${event.clientX - rect.left}px`;
  ripple.style.top = `${event.clientY - rect.top}px`;
  button.appendChild(ripple);
  ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
}

function buildInnerAction(label, emoji, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "inner-action";
  button.innerHTML = `<span>${emoji}</span><strong>${label}</strong>`;
  button.addEventListener("click", onClick);
  return button;
}

function renderReminderMiniForm(container) {
  const form = document.createElement("div");
  form.className = "mini-form-card";
  form.innerHTML = `
    <h3>🎂 Quick reminder format</h3>
    <p>Mobile friendly fields. User enters only numbers; app/backend can build DD-MM and HH:MM.</p>
    <div class="split-fields">
      <label>DD<input type="text" inputmode="numeric" maxlength="2" placeholder="12"></label>
      <label>MM<input type="text" inputmode="numeric" maxlength="2" placeholder="08"></label>
    </div>
    <div class="split-fields">
      <label>HH<input type="text" inputmode="numeric" maxlength="2" placeholder="09"></label>
      <label>MM<input type="text" inputmode="numeric" maxlength="2" placeholder="30"></label>
    </div>
    <label class="full-field">Year optional<input type="text" inputmode="numeric" maxlength="4" placeholder="2026"></label>
  `;
  container.appendChild(form);
}

function openCommandDetail(command) {
  detailPanel.innerHTML = "";
  detailPanel.classList.remove("is-hidden");
  detailPanel.style.setProperty("--accent", command.accent || "var(--gold)");

  const card = document.createElement("article");
  card.className = "detail-card";

  const guide = commandGuides[command.cmd] || "This card opens the same protected DM flow that already works in the bot. If you are not a verified admin, Dikshaa will keep admin actions locked.";

  card.innerHTML = `
    <div class="detail-header">
      <span class="detail-emoji">${command.emoji}</span>
      <div>
        <p>Mini App Control</p>
        <h2>${command.cmd}</h2>
        <span>${command.desc}</span>
      </div>
    </div>
    <p class="detail-copy">${guide}</p>
    <div class="inner-card-grid"></div>
  `;

  const grid = card.querySelector(".inner-card-grid");
  grid.appendChild(buildInnerAction("Run command", "🚀", () => sendCommand(command.cmd)));
  grid.appendChild(buildInnerAction("Back", "⬅️", closeCommandDetail));

  if (command.cmd === "/reminder") {
    renderReminderMiniForm(card);
  }

  detailPanel.appendChild(card);
  detailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeCommandDetail() {
  detailPanel.classList.add("is-hidden");
  detailPanel.innerHTML = "";
}

function buildCommandButton(command, accent) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "command-btn";
  button.dataset.command = command.cmd;

  const emoji = document.createElement("span");
  emoji.className = "command-emoji";
  emoji.textContent = command.emoji;

  const arrow = document.createElement("span");
  arrow.className = "corner-arrow";
  arrow.textContent = "›";

  const name = document.createElement("span");
  name.className = "command-name";
  name.textContent = command.cmd;

  const desc = document.createElement("span");
  desc.className = "command-desc";
  desc.textContent = command.desc;

  button.append(emoji, arrow, name, desc);

  button.addEventListener("pointerdown", (event) => {
    button.classList.add("is-pressing");
    addRipple(event, button);
  });

  button.addEventListener("pointerup", () => {
    setTimeout(() => button.classList.remove("is-pressing"), 160);
  });

  button.addEventListener("pointercancel", () => button.classList.remove("is-pressing"));
  button.addEventListener("pointerleave", () => button.classList.remove("is-pressing"));
  button.addEventListener("click", () => openCommandDetail({ ...command, accent }));

  return button;
}

function renderAdminPanel() {
  adminPanel.innerHTML = `
    <div class="panel-card wide-card">
      <div>
        <span class="panel-kicker">Current Group</span>
        <strong>Verified in Bot DM</strong>
        <p>Use below buttons to control the bot and use features. Dikshaa will open the same private admin flow with group selection.</p>
      </div>
      <button type="button" class="panel-pill" id="groupsQuickBtn">My Groups</button>
    </div>
  `;

  const groupsQuickBtn = document.getElementById("groupsQuickBtn");
  groupsQuickBtn.addEventListener("click", () => sendCommand("/groups"));
}

function renderCommands() {
  const fragment = document.createDocumentFragment();

  commandSections.forEach((section) => {
    const article = document.createElement("article");
    article.className = "category";
    article.style.setProperty("--accent", section.accent);

    const title = document.createElement("h2");
    title.className = "category-title";

    const icon = document.createElement("span");
    icon.textContent = section.icon;

    const titleText = document.createTextNode(section.title);
    title.append(icon, titleText);

    const grid = document.createElement("div");
    grid.className = "button-grid";

    section.commands.forEach((command) => {
      grid.appendChild(buildCommandButton(command, section.accent));
    });

    article.append(title, grid);
    fragment.appendChild(article);
  });

  commandRoot.appendChild(fragment);
}

function initTelegram() {
  const tg = telegramWebApp();
  if (!tg) {
    return;
  }

  tg.ready();
  tg.expand();
  tg.MainButton.hide();
}

themeBtn.addEventListener("click", toggleTheme);

initTheme();
renderAdminPanel();
renderCommands();
initTelegram();
