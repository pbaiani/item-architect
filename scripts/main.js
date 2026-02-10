import { ItemArchitectApp } from "./forger-app.js";

Hooks.on("renderItemDirectory", (app, html) => {
    if (!game.user.isGM) return;

    // Use querySelector because v13 passes raw HTMLElement, not jQuery
    const header = html.querySelector(".header-actions");
    if (!header) return;

    // Prevent duplicate buttons
    if (header.querySelector(".ia-launch-btn")) return;

    const architectBtn = document.createElement("button");
    architectBtn.type = "button";
    architectBtn.classList.add("ia-launch-btn");
    architectBtn.style.flex = "0"; 
    architectBtn.style.whiteSpace = "nowrap";
    architectBtn.style.marginLeft = "4px";
    // Using hammer for items, but keeping the compass style if you prefer
    architectBtn.innerHTML = `<i class="fas fa-hammer"></i> Architect`;

    architectBtn.addEventListener("click", (ev) => {
        ev.preventDefault();
        new ItemArchitectApp().render(true);
    });

    header.appendChild(architectBtn);
});