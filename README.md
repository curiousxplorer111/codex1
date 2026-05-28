# Tiny Storybook Generator

Tiny Storybook Generator is a tiny browser project that turns a topic into a soft, pastel, three-page storybook layout. It is template-based, runs entirely in the browser, and does not use AI or external packages.

## What this project does

- Provides a text input for any story topic.
- Generates a storybook with a cover page plus three story pages:
  1. `Meet the tiny guides`
  2. `The little problem`
  3. `What we learned`
- Displays cute emoji illustration areas, rounded paper-like page cards, and watercolor-inspired colors using CSS only.
- Includes Previous and Next buttons, a page counter, and a `Download story as JSON` button.
- Keeps the active story in JavaScript as a JSON-like object.

## How to open it

No installation is required.

1. Download or clone this folder.
2. Open `index.html` in any modern web browser.
3. Type a topic, such as `rainbows` or `Ghrelin and Leptin`.
4. Select `Create Storybook`.

Because the project has no build step, you can also edit the files and refresh the browser to see changes.

## Story JSON structure

The generated storybook is stored in JavaScript with this shape:

```json
{
  "title": "The Tiny Story of Your Topic",
  "topic": "Your Topic",
  "createdAt": "2026-05-28T00:00:00.000Z",
  "pages": [
    {
      "type": "cover",
      "heading": "The Tiny Story of Your Topic",
      "subheading": "Cover page",
      "text": "Introductory story text.",
      "illustration": "📖"
    }
  ]
}
```

Each page object contains:

- `type`: A short page category, such as `cover` or `page`.
- `heading`: The large title shown on the page card.
- `subheading`: The small label above the heading.
- `text`: The paragraph shown on the page.
- `illustration`: An emoji used inside the CSS illustration area.

See `sample_story.json` for a complete sample story about `Ghrelin and Leptin`.

## How to customize the page templates

Open `script.js` and edit the `makeStorybook(topic)` function. The page templates live inside the `pages` array returned by that function.

Ideas for customization:

- Change the guide characters from `Pip, Poppy, and Pebble` to your own names.
- Rewrite the page text strings to fit a different age group.
- Add new page fields, such as `vocabularyWord` or `discussionQuestion`.
- Change the emoji in each `illustration` value.
- Update `pageColors` or `pageEmoji` to alter the visual mood.

For visual changes, edit `style.css`. The watercolor feeling comes from layered gradients, pastel color variables, rounded cards, soft shadows, and a CSS-only paper texture overlay.

## Future ideas

- AI-generated story text
- image generation
- PDF export
- EPUB export
- audio narration
- `.estory` export

## Dependencies

Tiny Storybook Generator has no external dependencies, no package manager, and no build step. It uses only HTML, CSS, and built-in JavaScript.
