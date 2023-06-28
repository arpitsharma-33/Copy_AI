const editorButton = document.getElementById("editorButton");
const editorButtonText = document.getElementById("editorButtonText");
const chatContainer = document.querySelector(".chat-container");
const editor = document.querySelector(".editor");
const chatBox = document.querySelector(".chatbox");
const chatboxNavDate = document.querySelector(".chatbox-nav-date");
const clearChatButton = document.querySelector(".chatbox-nav-clearbtn");
const newProjectButton = document.querySelector(".chatbox-nav-newbtn");
const chatContent = document.querySelector(".chat-content");
const dropdownButton = document.getElementById("dropdown-button");
const linksList = document.querySelector(".links-list");
const searchInput = document.querySelector(".search-input");
const sendButton = document.getElementById("sendButton");
const boldButton = document.getElementById("boldButton");
const italicButton = document.getElementById("italicButton");
const underlineButton = document.getElementById("underlineButton");
const editorInput = document.getElementById("editor-input");
const firstListItem = document.querySelector(".links-list li:first-child");
const countWords = document.querySelector(".bottom-bar .count-words");
const countCharacters = document.querySelector(".bottom-bar .count-characters");
let editorVisible = false;
let editorOpen = false;

const screenWidth = window.innerWidth;

editorButton.addEventListener("click", () => {
  if (editorVisible) {
    chatContainer.classList.remove("expand-editor");
    chatContainer.classList.add("compress-editor");
    editorOpen = true;
    editorVisible = false;
    editorButtonText.textContent = "Editor";
  } else {
    chatContainer.classList.add("expand-editor");
    chatContainer.classList.remove("compress-editor");
    editorButtonText.textContent = "Close";
    editorVisible = true;
  }
});

function updateSearchInputWidth() {
  const parentWidth = chatBox.offsetWidth;
  const availableWidth = parentWidth - 60;

  searchInput.style.width = `${availableWidth}px`;
  searchInput.style.left = `calc(50% - ${availableWidth / 2}px)`;
  // searchInput.style.marginLeft = "-100px";
}

function updateSearchInputWidth450() {
  const parentWidth = chatBox.offsetWidth;
  const availableWidth = parentWidth - 40;

  searchInput.style.width = `${availableWidth}px`;
  searchInput.style.left = `calc(50% - ${availableWidth / 2}px)`;
  // searchInput.style.marginLeft = "-100px";
}
if (screenWidth <= 700) {
  updateSearchInputWidth();
  window.addEventListener("resize", updateSearchInputWidth);
}

if (screenWidth <= 450) {
  updateSearchInputWidth();
  window.addEventListener("resize", updateSearchInputWidth450);
}

// ChatBox Date

function formateDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
function updateDate() {
  const currentDate = new Date();
  const formattedDate = formateDate(currentDate);
  chatboxNavDate.textContent = formattedDate + ` Untitled`;
}
updateDate();

// Textarea height

function adjustTextareaHeight(textarea) {
  if (screenWidth > 450) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    if (textarea.scrollHeight >= 400) {
      textarea.style.height = "400px";
      textarea.style.overflowY = "scroll";
      textarea.style.paddingBottom = "45px";
      textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight + 45;
    } else {
      textarea.style.paddingBottom = "45px";
      textarea.style.overflowY = "hidden";
    }
  } else {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
    if (textarea.scrollHeight >= 200) {
      textarea.style.height = "200px";
      textarea.style.overflowY = "scroll";
      textarea.style.paddingBottom = "30px";
      textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight + 30;
    } else {
      textarea.style.paddingBottom = "30px";
      textarea.style.overflowY = "hidden";
    }
  }
}

// Editor Options Bar

boldButton.addEventListener("click", function () {
  editorInput.classList.toggle("bold-text");
  boldButton.classList.toggle("bold-icon");
});

italicButton.addEventListener("click", function () {
  editorInput.classList.toggle("italic-text");
  italicButton.classList.toggle("italic-icon");
});

underlineButton.addEventListener("click", function () {
  editorInput.classList.toggle("underline-text");
  underlineButton.classList.toggle("underline-icon");
});

editorInput.addEventListener("input", function () {
  const isBold = editorInput.classList.contains("bold-text");
  const isUnderline = editorInput.classList.contains("underline-text");

  boldButton.classList.toggle("bold-icon", isBold);
  underlineButton.classList.toggle("underline-icon", isUnderline);
});

function toggleFormatting(tag) {
  var textarea = document.getElementById("editor-input");
  var currentFontSize = window.getComputedStyle(textarea).fontSize;

  switch (tag) {
    case "h1":
      if (currentFontSize === "24px") {
        textarea.style.fontSize = "15px";
        textarea.style.fontWeight = "400";
        document.getElementById("h1-btn").classList.remove("active");
      } else {
        textarea.style.fontSize = "24px";
        textarea.style.fontWeight = "bold";
        document.getElementById("h1-btn").classList.add("active");
      }
      break;
    case "h2":
      if (currentFontSize === "20px") {
        textarea.style.fontSize = "15px";
        textarea.style.fontWeight = "400";
        document.getElementById("h2-btn").classList.remove("active");
      } else {
        textarea.style.fontSize = "20px";
        textarea.style.fontWeight = "600";
        document.getElementById("h2-btn").classList.add("active");
      }
      break;
    case "h3":
      if (currentFontSize === "16px") {
        textarea.style.fontSize = "15px";
        textarea.style.fontWeight = "400";
        document.getElementById("h3-btn").classList.remove("active");
      } else {
        textarea.style.fontSize = "16px";
        textarea.style.fontWeight = "600";
        document.getElementById("h3-btn").classList.add("active");
      }
      break;
    default:
      textarea.style.fontSize = "15px";
      textarea.style.fontWeight = "400";
      document.getElementById("h1-button").classList.remove("active");
      document.getElementById("h2-button").classList.remove("active");
      document.getElementById("h3-button").classList.remove("active");
      textarea.classList.toggle(
        "bold-text",
        boldButton.classList.contains("bold-icon")
      );
  }
}

// firstListItem.addEventListener('click', function() {
//   const editorInput = document.getElementById("editor-input");
//   const lines = editorInput.value.split('\n');
//   const updatedLines = lines.map(line => {
//     if (line.trim() === '') {
//       return `• ${line}`;
//     }
//     return line;
//   }).join('\n');
//   editorInput.value = updatedLines.join('\n');
// });

editorInput.addEventListener("input", function () {
  const text = this.value;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCount = text.length;

  countWords.textContent = `${wordCount} Words `;
  countCharacters.textContent = `${charCount} Characters`;
});

// Dropdown Button

function toggleLinksList() {
  linksList.style.display =
    linksList.style.display === "block" ? "none" : "block";
}

function hideLinksList(event) {
  if (
    !dropdownButton.contains(event.target) &&
    !linksList.contains(event.target)
  ) {
    linksList.style.display = "none";
  }
}

dropdownButton.addEventListener("click", toggleLinksList);
document.addEventListener("click", hideLinksList);

// keydown

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "+") {
    event.preventDefault();
  }
});

// Chatbox Textarea

const chatboxTextarea = document.getElementById("chatboxTextarea");

chatboxTextarea.addEventListener("input", function () {
  const text = this.value;
  if (text.trim() !== "") {
    sendButton.style.backgroundColor = "#023e8a";
    sendButton.style.color = "#ffffff";
  } else {
    sendButton.style.backgroundColor = "#dbeff3";
    sendButton.style.color = "#2a41e8";
  }
});
const message = [];
clearChatButton.addEventListener("click", function () {
  const screenWidth = window.innerWidth;
  chatContent.innerHTML = "";
  message.length = 0;
  chatContent.style.paddingTop = "0";
  chatContent.style.height = "100%";

  if (screenWidth <= 700) {
    chatContent.style.width = "100%";
    chatContent.style.paddingLeft = "0";
    chatContent.style.paddingRight = "0";
  }

  if (screenWidth <= 450) {
    chatContent.style.marginTop = "0";
    chatContent.style.height = "calc(100% - 50px)";
  }

  chatContent.innerHTML = `
  <div class="chat-content">
  <div class="chat-head">
    <h3 class="chat-head-title">Welcome to <span style="color: #2a3edad8;">Chat by AI</span></h3>
    <p class="chat-head-summary">Get started by writing a task and Chat can do the rest. Not sure where to start? Check out the Prompt Library for inspiration.</p>
  </div>                   
  <div class="prompts">
  <div class="demo">
    <div class="logo">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-grey-600"
      >
        <g clip-path="url(#clip0_3437_12539)">
          <path
            d="M1 1H13"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.5"
          ></path>
          <path
            d="M1 5H3"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.5"
          ></path>
          <path
            d="M13 13L15 15"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <circle
            cx="10"
            cy="10"
            r="4"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></circle>
        </g>
        <defs>
          <clipPath id="clip0_3437_12539">
            <rect width="16" height="16" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="demo-text">
      <div class="demo-text-head">
        <h3>Real Time Search</h3>
      </div>
      <p>"Summarize the latest news on generative AI"</p>
      <p>
        "Write a personalized email to [insert Linkedin profile URL]"
      </p>
    </div>
  </div>
  <div class="demo">
    <div class="logo">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-grey-600"
      >
        <g clip-path="url(#clip0_3456_12804)">
          <path
            d="M11 2L14 5L6 13L2 14L3 10L11 2Z"
            stroke="currentColor"
            stroke-width="2"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            d="M0.58866 3.69448C-0.148389 3.32595 -0.148389 2.27415 0.58866 1.90562L1.3174 1.54125C1.41416 1.49287 1.49263 1.41441 1.54101 1.31764L1.90538 0.588904C2.2739 -0.148144 3.32571 -0.148145 3.69423 0.588904L4.0586 1.31764C4.10698 1.41441 4.18545 1.49287 4.28221 1.54125L5.01095 1.90562C5.748 2.27415 5.748 3.32595 5.01095 3.69448L4.28221 4.05885C4.18545 4.10723 4.10698 4.18569 4.0586 4.28245L3.69423 5.01119C3.32571 5.74824 2.2739 5.74824 1.90538 5.01119L1.54101 4.28245C1.49263 4.18569 1.41416 4.10723 1.3174 4.05885L0.58866 3.69448Z"
            fill="currentColor"
            opacity=".5"
          ></path>
          <path
            d="M10.9891 14.0944C10.252 13.7259 10.252 12.674 10.9891 12.3055L11.7178 11.9412C11.8146 11.8928 11.893 11.8143 11.9414 11.7175L12.3058 10.9888C12.6743 10.2518 13.7261 10.2518 14.0946 10.9888L14.459 11.7175C14.5074 11.8143 14.5858 11.8928 14.6826 11.9412L15.4113 12.3055C16.1484 12.674 16.1484 13.7259 15.4113 14.0944L14.6826 14.4587C14.5858 14.5071 14.5074 14.5856 14.459 14.6824L14.0946 15.4111C13.7261 16.1481 12.6743 16.1481 12.3058 15.4111L11.9414 14.6824C11.893 14.5856 11.8146 14.5071 11.7178 14.4587L10.9891 14.0944Z"
            fill="currentColor"
            opacity=".5"
          ></path>
        </g>
        <defs>
          <clipPath id="clip0_3456_12804">
            <rect width="16" height="16" fill="white"></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
    <div class="demo-text">
      <div class="demo-text-head">
        <h3>Long Form Content</h3>
      </div>
      <p>"Create a blog post about search engine optimization"</p>
      <p>"Write a press release about www.copy.ai"</p>
    </div>
  </div>
  <div class="demo">
    <div class="logo">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 text-grey-600"
      >
        <path
          d="M2 3C2 1.89543 2.89543 1 4 1H10.1716C10.702 1 11.2107 1.21071 11.5858 1.58579L13.4142 3.41421C13.7893 3.78929 14 4.29799 14 4.82843V13C14 14.1046 13.1046 15 12 15H4C2.89543 15 2 14.1046 2 13V3Z"
          stroke="currentColor"
          stroke-width="2"
        ></path>
        <path
          d="M6 10H9"
          stroke="currentColor"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity=".5"
        ></path>
        <path
          d="M10 6H6"
          stroke="currentColor"
          stroke-width="2"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity=".5"
        ></path>
      </svg>
    </div>
    <div class="demo-text">
      <div class="demo-text-head">
        <h3>Brainstorm Ideas</h3>
      </div>
      <p>"Generate 10 Instagram captions for fashion week"</p>
      <p>
        "Write a product description for a bicycle in the style of
        Hemingway"
      </p>
    </div>
  </div>
  </div>
</div>
  `;

  clearChatButton.style.display = "none";
  if (screenWidth <= 700) {
    chatContent.style.paddingLeft = "20px";
    chatContent.style.paddingRight = "20px";
  }
  if (screenWidth <= 450) {
    // Not of any use
    chatContent.style.paddingLeft = "5px";
    chatContent.style.paddingRight = "5px";
    chatContent.style.height = "calc(100% - 50px)";
  }
  chatContent.style.height = "100%";
  chatContent.style.minwidth = "100%";
  chatContent.style.overflowY = "auto";
  chatContent.style.paddingBottom = "10px";
  chatContent.style.marginTop = "0";
  chatContent.style.zIndex = "1";
  chatboxTextarea.style.zIndex = "99";
  sendButton.style.backgroundColor = "#dbeff3";
  sendButton.style.color = "#2a41e8";

  updateChatContentWidth();
});

sendButton.addEventListener("click", function () {
  const messageText = chatboxTextarea.value.trim();
  const screenWidth = window.innerWidth;

  if (messageText !== "") {
    const messageElement = createMessageElement(messageText);
    message.push(messageElement);
    chatboxTextarea.value = "";

    renderChatContent();
    setTimeout(function () {
      const outputElement = createOutputElement(
        "Hello! how you doing? How can i assist you today :-) "
      );

      const messageIndex = message.indexOf(messageElement);
      message.splice(messageIndex + 1, 0, outputElement);
      renderChatContent();
      // chatContent.appendChild(outputElement);
    }, 2000);

    if (screenWidth <= 700) {
      chatContent.style.paddingLeft = "20px";
      chatContent.style.paddingRight = "20px";
    }
    if (screenWidth <= 450) {
      chatContent.style.paddingLeft = "4px";
      chatContent.style.paddingRight = "4px";
      chatContent.style.height = "calc(100% - 150px)";
    }
    clearChatButton.style.display = "block";
    chatboxTextarea.style.height = "auto";
  }

  updateChatContentWidth();
});

function renderChatContent() {
  chatContent.innerHTML = "";

  message.forEach((msg) => {
    chatContent.appendChild(msg);
  });

  chatContent.scrollTop = chatContent.scrollHeight;
}

function createOutputElement(op) {
  const outputAvatar = document.createElement("div");
  outputAvatar.classList.add("outputAvatar");
  outputAvatar.innerHTML = `<i class="icon-brand-cuttlefish"><i/>`;

  const outputElement = document.createElement("div");
  outputElement.classList.add("outputElement");

  const outputContent = document.createElement("div");
  outputContent.classList.add("outputContent");

  const output = document.createElement("div");
  output.classList.add("optext");
  output.textContent = op;

  const optionsElement = document.createElement("div");

  const likeIcon = document.createElement("div");
  const disLikeIcon = document.createElement("div");

  likeIcon.innerHTML = `<i class="icon-material-outline-thumb-up"></i>`;
  likeIcon.addEventListener("click", () => {
    const isActive = likeIcon.classList.contains("active-ld");
    likeIcon.classList.toggle("active-ld", !isActive);
    disLikeIcon.classList.remove("active-ld");
  });

  disLikeIcon.innerHTML = `<i class="icon-material-outline-thumb-down"></i>`;
  disLikeIcon.addEventListener("click", () => {
    const isActive = disLikeIcon.classList.contains("active-ld");
    disLikeIcon.classList.toggle("active-ld", !isActive);
    likeIcon.classList.remove("active-ld");
  });

  const copyIcon = document.createElement("div");
  copyIcon.classList.add("outputCopy");
  copyIcon.innerHTML = `<i class="icon-feather-copy"></i> Copy`;
  copyIcon.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    textarea.value = op;
    textarea.style.cssText = "position: fixed; top: -9999px; opacity: 0;";

    document.body.appendChild(textarea);

    navigator.clipboard
      .writeText(op)
      .then(() => {
        document.body.removeChild(textarea);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  });

  const moveIcon = document.createElement("div");
  moveIcon.classList.add("outputMove");
  moveIcon.innerHTML = `<i class="icon-feather-log-out"></i> Add to Editor`;
  moveIcon.addEventListener("click", () => {
    moveOptextToEditorTextarea(op);
    if (!editorVisible) {
      chatContainer.classList.add("expand-editor");
      chatContainer.classList.remove("compress-editor");
      editorButtonText.textContent = "Close";
      editorVisible = true;
    }
  });

  const likeDislike = document.createElement("div");
  likeDislike.classList.add("like-dislike");
  likeDislike.appendChild(likeIcon);
  likeDislike.appendChild(disLikeIcon);

  const copyAdd = document.createElement("div");
  copyAdd.classList.add("copy-add");
  copyAdd.appendChild(copyIcon);
  copyAdd.appendChild(moveIcon);

  optionsElement.classList.add("output-options");
  optionsElement.appendChild(likeDislike);
  optionsElement.appendChild(copyAdd);

  outputContent.appendChild(output);
  outputContent.appendChild(optionsElement);

  outputElement.appendChild(outputAvatar);
  outputElement.appendChild(outputContent);

  return outputElement;
}

function moveOptextToEditorTextarea(optext) {
  editorInput.value = optext;
}

function createMessageElement(text) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message");

  const chatIconElement = document.createElement("div");
  chatIconElement.classList.add("icon");
  chatIconElement.innerHTML = `<i class="icon-feather-aperture"></i>`;

  const messageContentElement = document.createElement("div");
  messageContentElement.classList.add("message-content");

  const messageTextElement = document.createElement("div");
  messageTextElement.classList.add("message-text");
  messageTextElement.textContent = text;

  const copyButton = document.createElement("button");
  copyButton.classList.add("copy-button");
  copyButton.innerHTML = `<i class="icon-material-outline-file-copy"></i>`;
  copyButton.addEventListener("click", () => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.cssText = "position: fixed; top: -9999px; opacity: 0;";

    document.body.appendChild(textarea);

    navigator.clipboard
      .writeText(text)
      .then(() => {
        document.body.removeChild(textarea);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  });

  messageContentElement.appendChild(chatIconElement);
  messageContentElement.appendChild(messageTextElement);

  messageElement.appendChild(messageContentElement);
  messageElement.appendChild(copyButton);

  chatContent.style.height = "calc(100%  - 210px )";
  chatContent.style.marginTop = "20px";
  chatContent.style.width = "calc(100% - 20px)";
  chatContent.style.overflowY = "auto";
  chatContent.style.paddingBottom = "40px";
  chatContent.style.display = "block";
  chatContent.style.zIndex = "1";
  chatboxTextarea.style.zIndex = "99";

  sendButton.style.backgroundColor = "#dbeff3";
  sendButton.style.color = "#2a41e8";

  if (
    !clearChatButton.style.display ||
    clearChatButton.style.display === "none"
  ) {
    chatContent.style.paddingTop = "0";
    chatContent.style.marginTop = "0";
  }

  return messageElement;
}

function updateChatContentWidth() {
  const editorContainer = document.getElementById("editor");
  const editorComputedStyle = window.getComputedStyle(editorContainer);
  const editorDisplay = editorComputedStyle.getPropertyValue("display");

  if (editorDisplay === "none") {
    chatContent.style.width = "calc(100% - 280px)";
  } else {
    chatContent.style.width = "calc(100% - 20px)";
  }
}

// function adjustTextareaHeight(textarea) {
//   textarea.style.height = "auto";
//   textarea.style.height = textarea.scrollHeight + "px";
// }
