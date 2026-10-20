import { useEffect, useRef, useState } from 'react';
import { loadYouTubeApi, shortsUrl } from './youtube';

// The rates YouTube's player accepts; the demo's speed slider snaps to the nearest one.
const RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const nearestRate = (speed) => RATES.reduce((best, r) => (Math.abs(r - speed) < Math.abs(best - speed) ? r : best), 1);

/**
 * A YouTube Short shown beside the robot, driven by the demo's own controls:
 * Play and Pause, Speed, and Reset (any change to `resetKey` rewinds it).
 */
export default function ReferenceVideo({ videoId, title, credit, playing, speed, resetKey }) {
  const mountRef = useRef(null);
  const playerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const latest = useRef({ playing, speed });
  latest.current = { playing, speed };

  // One player per mount. YouTube replaces the node it is given, so it gets a child
  // that React never renders into.
  useEffect(() => {
    let cancelled = false;
    const host = mountRef.current;
    const target = document.createElement('div');
    host.appendChild(target);
    loadYouTubeApi().then((YT) => {
      if (cancelled) return;
      playerRef.current = new YT.Player(target, {
        host: 'https://www.youtube-nocookie.com',
        videoId,
        playerVars: { playsinline: 1, rel: 0, controls: 1, loop: 1, playlist: videoId, mute: 1 },
        events: {
          onReady: (e) => {
            if (cancelled) return;
            e.target.mute();
            e.target.setPlaybackRate(nearestRate(latest.current.speed));
            if (latest.current.playing) e.target.playVideo();
            setReady(true);
          },
          onError: () => { if (!cancelled) setFailed(true); },
        },
      });
    }).catch(() => { if (!cancelled) setFailed(true); });
    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
      host.replaceChildren();
    };
    // The player is created once; changes to the clip go through cueVideoById below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Swap the clip when the choreography changes; the first one was loaded with the player.
  const cued = useRef(videoId);
  useEffect(() => {
    const player = playerRef.current;
    if (!ready || !player || cued.current === videoId) return;
    cued.current = videoId;
    player.cueVideoById({ videoId });
  }, [ready, videoId]);

  useEffect(() => {
    const player = playerRef.current;
    if (!ready || !player) return;
    if (playing) {
      player.mute();
      player.playVideo();
    } else {
      player.pauseVideo();
    }
  }, [ready, playing]);

  useEffect(() => {
    if (ready) playerRef.current?.setPlaybackRate(nearestRate(speed));
  }, [ready, speed]);

  // Rewind on Reset, but not when the player first becomes ready: a Play pressed while it
  // was still loading has to stand.
  const rewound = useRef(null);
  useEffect(() => {
    const player = playerRef.current;
    if (!ready || !player) return;
    if (rewound.current === null || rewound.current === resetKey) {
      rewound.current = resetKey;
      return;
    }
    rewound.current = resetKey;
    player.seekTo(0, true);
    player.pauseVideo();
  }, [ready, resetKey]);

  return (
    <figure className="fk-ref">
      <div className="fk-ref-frame">
        <div ref={mountRef} className="fk-ref-player" hidden={failed} />
        {failed && (
          <a className="fk-ref-fallback" href={shortsUrl(videoId)} target="_blank" rel="noreferrer">
            Watch the reference on YouTube
          </a>
        )}
      </div>
      <figcaption>
        Reference: <a href={shortsUrl(videoId)} target="_blank" rel="noreferrer">{title}</a>, {credit} on YouTube
      </figcaption>
    </figure>
  );
}
