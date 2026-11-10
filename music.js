(() => {
  const audio = document.getElementById('birthday-audio');
  const button = document.getElementById('music');
  const status = document.getElementById('music-status');
  let wantsMusic = true;
  let pending = false;
  audio.volume = 0.6;
  const update = () => {
    button.textContent = audio.paused ? '播放音樂' : '暫停音樂';
    button.setAttribute('aria-pressed', String(!audio.paused));
    if (!audio.paused) status.textContent = '';
  };
  const play = async () => {
    if (pending || !wantsMusic) return;
    pending = true;
    try { await audio.play(); }
    catch (error) {
      if (wantsMusic) status.textContent = error.name === 'NotAllowedError'
        ? '輕觸播放音樂，讓祝福陪伴妳' : '音樂暫未載入，請點一下重試';
    } finally { pending = false; update(); }
  };
  button.addEventListener('click', () => {
    if (audio.paused) { wantsMusic = true; play(); }
    else { wantsMusic = false; audio.pause(); status.textContent = ''; }
  });
  document.getElementById('scene').addEventListener('pointerdown', () => {
    if (wantsMusic && audio.paused) play();
  });
  audio.addEventListener('playing', update);
  audio.addEventListener('pause', update);
  audio.addEventListener('error', () => {
    status.textContent = '音樂暫未載入，請重新整理再試'; update();
  });
  play();
})();
