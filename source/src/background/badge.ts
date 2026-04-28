export async function setDisabledBadge() {
  await browser.action.setBadgeText({ text: "OFF" });
  await browser.action.setBadgeBackgroundColor({ color: "#6b7280" });
}

export async function setUnseenJobsBadge(unseenCount: number) {
  await browser.action.setBadgeText({ text: unseenCount > 0 ? String(unseenCount) : "" });
  await browser.action.setBadgeBackgroundColor({ color: "#14a800" });
}
