import { calculate } from "./modules/calculate.js";
import { copyToClipBoard } from "./modules/copyToClipBoard.js";
import { themeSwitcher } from "./modules/themeSwitcher.js";
import {
    handleButtonPress,
    handleClearButton,
    handleTyping,
} from "./modules/keyHandlers.js";

document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", handleButtonPress);
});

document.getElementById("clear").addEventListener("click", handleClearButton);
document.getElementById("input").addEventListener("keydown", handleTyping);
document.getElementById("equal").addEventListener("click", calculate);
document.getElementById("copyToClipboard").addEventListener("click", copyToClipBoard);
document.getElementById("themeSwitcher").addEventListener("click", themeSwitcher);
