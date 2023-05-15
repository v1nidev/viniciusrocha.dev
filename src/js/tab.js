const tabs = document.querySelector(".tabs");
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(event) {
  const { id } = event.currentTarget;
  const tabPanel = tabPanels.find(
    (panel) => panel.getAttribute("aria-labelledby") === id
  );

  // hide all tab panels
  tabPanels.forEach((panel) => {
    panel.hidden = true;
  });
  // mark all tabs as unselected
  tabButtons.forEach((tab) => {
    // tab.ariaSelected = false;
    tab.setAttribute("aria-selected", false);
  });

  event.currentTarget.setAttribute("aria-selected", true);
  tabPanel.hidden = false;
  event.currentTarget.scrollIntoView({
    behavior: 'smooth',
    inline: 'center',
    block: 'nearest'
  })
}

export function watchTabs() {
  tabButtons.forEach((button) =>
    button.addEventListener("click", handleTabClick)
  );
}
