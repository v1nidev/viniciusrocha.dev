import { debounce } from "./utils";

const tabs = document.querySelector(".tabs");
const tabButtons = Array.from(tabs.querySelectorAll('[role="tab"]'));
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));
const container = document.getElementById("tabpanelContainer");

function changeAriaSelected(tabButton) {
  // mark all tabs as unselected
  tabButtons.forEach((tab) => {
    tab.setAttribute("aria-selected", false);
  });
  tabButton.setAttribute("aria-selected", true);
}

function checkIfContainerIsScrollable() {
  return (
    window.getComputedStyle(container).getPropertyValue("overflow-x") ===
    "scroll"
  );
}

function handleTabClick(event) {
  const { id } = event.currentTarget;
  const tabPanel = tabPanels.find(
    (panel) => panel.getAttribute("aria-labelledby") === id
  );

  changeAriaSelected(event.currentTarget);

  if (checkIfContainerIsScrollable()) {
    container.scrollLeft = tabPanel.offsetLeft;

    return;
  }

  // hide all tab panels
  tabPanels.forEach((panel) => {
    panel.hidden = true;
  });
  tabPanel.hidden = false;
}

function handleContainerScroll() {
  const scrollLeft = container.scrollLeft;

  for (let i = 0; i < tabPanels.length; i++) {
    const panel = tabPanels[i];
    const panelOffsetLeft = panel.offsetLeft;
    const panelWidth = panel.offsetWidth;

    if (
      scrollLeft >= panelOffsetLeft &&
      scrollLeft < panelOffsetLeft + panelWidth
    ) {
      const tabButton = tabButtons.find(
        (button) => button.id === panel.getAttribute("aria-labelledby")
      );

      changeAriaSelected(tabButton);
      tabButton.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });

      break;
    }
  }
}

const debouncedScrollHandler = debounce(handleContainerScroll, 150);

export function watchTabs() {
  tabButtons.forEach((button) =>
    button.addEventListener("click", handleTabClick)
  );

  if (checkIfContainerIsScrollable()) {
    container.scrollLeft = container.scrollWidth;
  }
  container.addEventListener("scroll", debouncedScrollHandler);
}
