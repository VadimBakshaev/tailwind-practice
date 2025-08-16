import "./styles.css";
import { LoremIpsum } from "lorem-ipsum";

const asideEl = document.getElementById("aside");
const chatEl = document.getElementById("chat");
const linksEl = document.getElementById("chat-links");
const buttonEl = document.getElementById("send-message");
const messageEl = document.getElementById("write-to-chat");
const newChatEl = document.getElementById("new-chat");
let activeChat = null;

const lorem = new LoremIpsum({});

messageEl.addEventListener("input", (e) => {
  if (e.target.innerText.trim() === "") e.target.innerHTML = "";
});
messageEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    buttonEl.click();
  }
});

document.getElementById("aside-toggle").addEventListener("click", () => {
  asideEl.classList.toggle("hidden");
});

newChatEl.addEventListener("click", () => {
  const id = chats.length + 1;
  chatEl.innerHTML = "";
  chats.unshift({
    id: id,
    name: "Новый чат " + id,
    history: [],
  });
  activeChat = id;
  chatLinks();
  setActive();
  renderChat();
});

buttonEl.addEventListener("click", () => {
  if (activeChat === null) newChatEl.click();
  const text = messageEl.innerText.trim();
  if (!text) return;
  const chat = chats.find((chat) => chat.id === activeChat);
  if (chat.history.length === 0) {
    chatEl.innerHTML = "";
    chat.name = text;
    linksEl.querySelector("li:first-child a").innerText = text;
  }
  chat.history.push({ from: "user", text: text });
  messageEl.innerText = "";
  addMessage(text);
  const response = lorem.generateParagraphs(Math.floor(Math.random() * 5 + 1));
  chat.history.push({ from: "bot", text: response });
  addMessage(response, "bot", true);
});

const chats = [
  {
    id: 0,
    name: "Что такое Tailwind?",
    history: [
      {
        from: "user",
        text: "Что такое Tailwind?",
      },
      {
        from: "bot",
        text: `Tailwind CSS — это утилитарный CSS-фреймворк, который позволяет быстро создавать
          адаптивный и
          современный интерфейс, используя готовые CSS-классы прямо в HTML-разметке.
          <br><br>
          В отличие от традиционных фреймворков вроде Bootstrap, где есть готовые компоненты (кнопки, модальные окна и
          т.п.), Tailwind делает упор на микро-классы, каждый из которых отвечает за одно конкретное CSS-свойство
          (например, отступ, цвет, размер текста и т.д.).
          <br><br>
          Tailwind особенно популярен среди фронтенд-разработчиков, которые используют React, Vue, Next.js и другие
          современные фреймворки.`,
      },
      {
        from: "user",
        text: "Какие популярные сайты сделаны на tailwind? Перечисли простым списком.",
      },
      {
        from: "bot",
        text: `Вот список популярных сайтов и сервисов, использующих Tailwind CSS:
          <ul class="list-disc pl-5">
            <li>GitHub Copilot Docs</li>
            <li>Vercel (и их дашборд)</li>
            <li>Tailwind UI (официальная библиотека компонентов)</li>
            <li>Laravel (оф. сайт фреймворка)</li>
            <li>Statamic (CMS на Laravel)</li>
            <li>Plausible Analytics</li>
            <li>Linear (система управления задачами)</li>
            <li>Tailscan (инспектор Tailwind-классов в браузере)</li>
            <li>Transistor.fm (подкаст-хостинг)</li>
            <li>Refactoring UI (сайт одноимённой книги от авторов Tailwind)</li>
          </ul>
          <br>
          Эти сайты варьируются от документации и панелей управления до SaaS-продуктов и маркетинговых лендингов —
          Tailwind гибко подходит под любой тип интерфейса.`,
      },
    ],
  },
  {
    id: 1,
    name: "Как создаются сайты?",
    history: [
      {
        from: "user",
        text: "Как создаются сайты?",
      },
      {
        from: "bot",
        text: "Сайты создаются с помощью HTML, CSS и JavaScript.",
      },
    ],
  },
  {
    id: 2,
    name: "Расскажи что такое фронтенд разработка?",
    history: [
      {
        from: "user",
        text: "Расскажи что такое фронтенд разработка?",
      },
      {
        from: "bot",
        text: "Фронтенд - это часть сайта, которую видит и с которой взаимодействует пользователь.",
      },
    ],
  },
  {
    id: 3,
    name: "Для чего нужен дизайнер сайтов?",
    history: [
      {
        from: "user",
        text: "Для чего нужен дизайнер сайтов?",
      },
      {
        from: "bot",
        text: "Дизайнер сайтов отвечает за внешний вид, UX и визуальное восприятие интерфейса.",
      },
    ],
  },
];

function renderChat(chatId) {
  chatEl.innerHTML = "";
  const chat = chats.find((chat) => chat.id === chatId);
  if (!chat || chat.history.length === 0) {
    const emptyChat = document.createElement("div");
    emptyChat.innerText = "Готов ответить на все ваши вопросы!";
    emptyChat.className =
      "flex items-center justify-center h-full text-center text-base font-bold";
    chatEl.appendChild(emptyChat);
  } else {
    chat.history.forEach((element) => {
      addMessage(element.text, element.from);
    });
    chatEl.scrollTop = chatEl.scrollHeight;
  }
}

function addMessage(text, from = "user", typingEffect = false) {
  const wrapper = document.createElement("article");
  wrapper.className =
    from === "user"
      ? "self-end max-w-[70%] px-4 py-3 rounded-3xl bg-(--chat-user-color)"
      : "mt-5 pb-9";
  if (typingEffect) {
    typeText(wrapper, text);
  } else {
    wrapper.innerHTML = text;
  }
  chatEl.appendChild(wrapper);
}

function typeText(element, text) {
  let index = 0;
  element.innerHTML = "";
  const interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text[index];
      index++;
      chatEl.scrollTop = chatEl.scrollHeight;
    } else {
      clearInterval(interval);
    }
  }, 5);
}

function chatLinks() {
  linksEl.innerHTML = "";
  chats.forEach((chat) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#!";
    a.className =
      "block p-3 rounded-lg truncate leading-none hover:bg-neutral-700";
    a.innerText = chat.name;
    a.addEventListener("click", (e) => {
      activeChat = chat.id;
      setActive(e.target);
      renderChat(chat.id);
    });
    li.appendChild(a);
    linksEl.appendChild(li);
  });
}

function setActive(element) {
  if (!element) {
    element = linksEl.querySelector("li:first-child a");
    //element = linksEl.children[0].children[0];
  }
  linksEl.childNodes.forEach((li) => {
    li.children[0].classList.remove("bg-neutral-700");
  });
  element.classList.add("bg-neutral-700");
}

chatLinks();
renderChat();
