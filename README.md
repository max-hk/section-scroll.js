# section-scroll.js

Lightweight one page section scroll plugin in vanilla JS

## Demo

[https://maxloh.github.io/section-scroll.js/demo.html](https://maxloh.github.io/section-scroll.js/demo.html)

## Installation

There are two ways to install `section-scroll.js`

### Download from GitHub

Download [section-scroll.min.js](dist/section-scroll.min.js) and [section-scroll.min.js.map](dist/section-scroll.min.js.map) (optional), place them into your project

### NPM

- Run `npm install section-scroll.js` in your project folder

- Package `sectionScroll` and your scripts with JavaScript bundler like webpack

## Setup

### HTML

- For any JavaScript file using `sectionScroll`, add `type="module"` to their script tag
  
  ```html
  <script type="module" src="app.js"></script>
  ```

- All sections should be placed inside a wrapper element, which should only contain section elements
  
  ```HTML
  <div>
      <section>Section A</section>
      <section>Section B</section>
      <section>Section C</section>
      <section>Section D</section>
  </div>
  ```

### JavaScript

- Import `sectionScroll`
  
  ```javascript
  import sectionScroll from 'relative/path/to/section-scroll.min.js';
  ```

- Initialize `sectionScroll` after `DOMContentLoaded` event fired
  
  ```javascript
  addEventListener('DOMContentLoaded', () => {
      sectionScroll(document.getElementsByTagName('section'), options);
  });
  ```

## API

**`section-scroll.js` is still a beta project. Expect behavior to change in the future**

```javascript
sectionScroll( sectionList:NodeList|HTMLCollection [, options:object ] );
```

### Options

```javascript
let options = {
    before: (origin, destination) => { ... },
    after: (origin, destination) => { ... }
}
```

| Option                                    | Description                                                                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `before( origin:Node, destination:Node )` | Function to call before scrolling started and on page load<br/>On page load, both `origin` and `destination` would be the section window located        |
| `after( origin:Node, destination:Node )`  | Function to call right after scrolling completed and on page load<br/>On page load, both `origin` and `destination` would be the section window located |
