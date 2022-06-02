import { faker } from "@faker-js/faker/locale/en";
import moment from "moment";

import adjectives from "./adjectives.json";

const puncts = [".", "?", "!"];
const thes = ["a", "the", "one"];
const thes2 = [...thes, ...["another", "the same"]];
const verbs = [
  "liked",
  "hated",
  "loved",
  "jumped over",
  "laughed with",
  "painted",
  "bought",
  "hired",
  "went on a walk with",
  "ran away from",
];
const symbols = ["!", "?", "@", "$", "%", "#"];

let sentence = "";

const ucFirst = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const getRandomArrayValue = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const randomInt = (min = 0, max = 1) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const coin = () => {
  return Math.random() >= 0.5;
};

const getSentence = () => {
  let connector = document.querySelector<HTMLInputElement>(
    "input[name='connector']:checked"
  ).value;

  const appDiv: HTMLElement = document.querySelector("#sentence");
  const dateRoll = coin();
  const datePosRoll = coin();
  let the = getRandomArrayValue(thes);
  let adj1 = getRandomArrayValue(adjectives);
  let thing1 = coin() ? faker.vehicle.vehicle() : faker.animal.type();
  let verb = getRandomArrayValue(verbs);
  let the2 = getRandomArrayValue(thes2);
  let adj2 = getRandomArrayValue(adjectives);
  let thing2 = coin() ? faker.vehicle.vehicle() : faker.animal.type();
  let punct = getRandomArrayValue(puncts);
  let sym = getRandomArrayValue(symbols).repeat(randomInt(2, 4));
  let date = moment(faker.date.past(5)).fromNow();

  if (/[aeiou]/gi.test(thing1.substring(0, 1)) && the === "A") {
    the = "An";
  }
  if (/[aeiou]/gi.test(thing2.substring(0, 1)) && the2 === "A") {
    the2 = "An";
  }

  sentence = [
    `${ucFirst(dateRoll && datePosRoll ? `${date}${connector}${the}` : the)}`,
    adj1,
    thing1,
    verb,
    the2,
    adj2,
    thing2,
    dateRoll && !datePosRoll ? `${date}${punct}${sym}` : `${punct}${sym}`,
  ].join(connector);

  if (connector !== " ") {
    sentence = sentence.replace(/\s/gi, connector);
  }

  appDiv.innerHTML = `${sentence}`;
};
const copy = (str) => {
  var el = document.createElement("textarea");
  el.value = str;
  // Set non-editable to avoid focus and move outside of view
  el.setAttribute("readonly", "");
  el.setAttribute("style", "position: absolute; left: -9999px");
  document.body.appendChild(el);
  // Select text inside element
  el.select();
  // Copy text to clipboard. No there is no alternative to execCommand
  const success = document.execCommand("copy");

  if (success) {
    const msg: HTMLElement = document.querySelector("#copyStatus");
    msg.innerText = "copied successfully!";
    setTimeout(() => (msg.innerText = ""), 1000);
  }
  // Remove temporary element
  document.body.removeChild(el);
};

getSentence();
document
  .querySelector("#generate")
  .addEventListener("click", () => getSentence());
document.querySelector("#copy").addEventListener("click", () => copy(sentence));
