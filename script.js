const form = document.querySelector("#generator-form");
const topicInput = document.querySelector("#topic-input");
const pageCard = document.querySelector("#page-card");
const pageArt = document.querySelector("#page-art");
const pageKicker = document.querySelector("#page-kicker");
const pageTitle = document.querySelector("#page-title");
const pageText = document.querySelector("#page-text");
const previousButton = document.querySelector("#previous-page");
const nextButton = document.querySelector("#next-page");
const pageCounter = document.querySelector("#page-counter");
const downloadButton = document.querySelector("#download-json");

let currentStorybook = null;
let currentPageIndex = 0;

const pageColors = ["#fff0d7", "#e8f7ff", "#f1e8ff", "#e4f8e9"];
const pageEmoji = ["📖", "🧚‍♀️", "🌿", "⭐"];

function cleanTopic(topic) {
  return topic.trim().replace(/\s+/g, " ") || "kindness";
}

function makeStorybook(topic) {
  const safeTopic = cleanTopic(topic);
  const lowerTopic = safeTopic.toLowerCase();

  return {
    title: `The Tiny Story of ${safeTopic}`,
    topic: safeTopic,
    createdAt: new Date().toISOString(),
    pages: [
      {
        type: "cover",
        heading: `The Tiny Story of ${safeTopic}`,
        subheading: "Cover page",
        text: `Open this little book to explore ${lowerTopic} with soft steps, bright questions, and friendly wonder.`,
        illustration: "📖"
      },
      {
        type: "page",
        heading: "Meet the tiny guides",
        subheading: "Page 1",
        text: `Pip, Poppy, and Pebble are tiny guides who love learning. Today, they pack a magnifying glass and set out to understand ${lowerTopic}.`,
        illustration: "🧚‍♀️"
      },
      {
        type: "page",
        heading: "The little problem",
        subheading: "Page 2",
        text: `The guides find a puzzle: ${safeTopic} can feel big and confusing at first. They break it into small clues, ask what each clue means, and draw a simple map.`,
        illustration: "🌿"
      },
      {
        type: "page",
        heading: "What we learned",
        subheading: "Page 3",
        text: `By the end, the guides learn that ${lowerTopic} is easier when we look slowly, use examples, and share the idea in our own words.`,
        illustration: "⭐"
      }
    ]
  };
}

function renderPage() {
  if (!currentStorybook) {
    previousButton.disabled = true;
    nextButton.disabled = true;
    downloadButton.disabled = true;
    return;
  }

  const page = currentStorybook.pages[currentPageIndex];
  pageKicker.textContent = page.subheading;
  pageTitle.textContent = page.heading;
  pageText.textContent = page.text;
  pageArt.textContent = page.illustration || pageEmoji[currentPageIndex];
  pageCard.style.setProperty("--page-color", pageColors[currentPageIndex % pageColors.length]);

  pageCounter.textContent = `Page ${currentPageIndex + 1} of ${currentStorybook.pages.length}`;
  previousButton.disabled = currentPageIndex === 0;
  nextButton.disabled = currentPageIndex === currentStorybook.pages.length - 1;
  downloadButton.disabled = false;
}

function downloadStory() {
  if (!currentStorybook) {
    return;
  }

  const storyBlob = new Blob([JSON.stringify(currentStorybook, null, 2)], {
    type: "application/json"
  });
  const storyUrl = URL.createObjectURL(storyBlob);
  const downloadLink = document.createElement("a");

  downloadLink.href = storyUrl;
  downloadLink.download = `${currentStorybook.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-storybook.json`;
  downloadLink.click();
  URL.revokeObjectURL(storyUrl);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  currentStorybook = makeStorybook(topicInput.value);
  currentPageIndex = 0;
  renderPage();
});

previousButton.addEventListener("click", () => {
  if (currentStorybook && currentPageIndex > 0) {
    currentPageIndex -= 1;
    renderPage();
  }
});

nextButton.addEventListener("click", () => {
  if (currentStorybook && currentPageIndex < currentStorybook.pages.length - 1) {
    currentPageIndex += 1;
    renderPage();
  }
});

downloadButton.addEventListener("click", downloadStory);

renderPage();
