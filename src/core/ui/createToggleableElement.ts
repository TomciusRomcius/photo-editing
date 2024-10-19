export function createEffectSection(
  parent: HTMLDivElement,
  effectName: string,
  effectId: string,
  content: string
) {
  const elString = `
    <div class="effect-ui" id="${effectId}">
      <button class="effect-toggler">
        ${effectName}
      </button>
        
      <div class="toggle-area hidden">
        ${content}
      </div>
    </div>
    
  `;

  const parser = new DOMParser();
  const element = parser.parseFromString(elString, "text/html");
  if (!element.body.firstChild) {
    throw new Error("Element.body.firstChild not defined");
  }
  parent.appendChild(element.body.firstChild);
  const button = document.querySelector(`#${effectId} > button`);

  button?.addEventListener("click", () => {
    const toggleArea = document.querySelector(`#${effectId} > .toggle-area`);
    if (!toggleArea) return;
    if (toggleArea.classList.contains("hidden")) {
      toggleArea.classList.remove("hidden");
    } else toggleArea.classList.add("hidden");
  });
}
