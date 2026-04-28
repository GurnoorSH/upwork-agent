export async function showBasicNotification(title: string, message: string) {
  return browser.notifications.create({
    type: "basic",
    iconUrl: browser.runtime.getURL("/icon/128.png"),
    title,
    message
  });
}
