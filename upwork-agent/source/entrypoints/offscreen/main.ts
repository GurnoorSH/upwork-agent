browser.runtime.onMessage.addListener((message: unknown) => {
  if (
    typeof message !== "object" ||
    message === null ||
    (message as { type?: string }).type !== "PLAY_SOUND"
  ) {
    return;
  }

  const volume = Number((message as { volume?: number }).volume ?? 100);
  const audio = new Audio(browser.runtime.getURL("/sound.mp3"));
  audio.volume = Math.max(0, Math.min(1, volume / 100));
  void audio.play();
});
