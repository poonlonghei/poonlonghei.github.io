---
layout: post
title: Typewriter effects with JavaScript
image: "https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/typewriter-animation-text.gif"
date: 2025-07-22
category: JavaScript, CSS
author: Chavez Poon
---

Have you ever seen a typewriter effect on a website? It’s a cool way to display text that looks like it’s being typed out in real-time. This effect can be achieved using JavaScript, and it’s a great way to add some interactivity to your website.

To create a typewriter effect, you can use the setInterval() method in JavaScript. This method allows you to execute a function at specified intervals, which is perfect for simulating the typing effect.

Here’s a simple example of how to create a typewriter effect using JavaScript:

```
const text = "Hello, world!"; // The text to be typed const speed = 100; // The speed of typing in milliseconds let index = 0; // The current index of the text const typewriter = document.getElementById("typewriter"); // The element to display the text const interval = setInterval(() => { if (index < text.length) { typewriter.innerHTML += text.charAt(index); // Add the next character to the element index++; // Move to the next character } else { clearInterval(interval); // Stop the interval when the text is fully typed } }, speed);
```

In this example, we define the text to be typed and the speed of typing in milliseconds. We then create a variable to keep track of the current index of the text and select the element where the text will be displayed. The setInterval() method is used to execute a function that adds the next character of the text to the element at the specified speed. When the text is fully typed, the interval is cleared to stop the typing effect.

You can also customize the typewriter effect by adding some CSS styles to the element. For example, you can add a blinking cursor effect by using the following CSS:

```
#typewriter::after { content: "|"; // The cursor character animation: blink 1s infinite; // The blinking animation } @keyframes blink { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }
```

This CSS adds a blinking cursor effect to the element by using the ::after pseudo-element and the animation property. The cursor character is set to "|", and the animation is defined using the @keyframes rule to create a blinking effect.

Overall, the typewriter effect is a fun and engaging way to display text on your website. It can be used to grab the user’s attention and make your content more interactive. With just a few lines of JavaScript and CSS, you can create a typewriter effect that will impress your visitors and enhance their experience on your website.
