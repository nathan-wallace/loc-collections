<script lang="ts">
  import { onMount } from 'svelte';
  export let src!: string;
  export let alt = '';
  let scale = 1;
  let x = 0, y = 0;
  let dragging = false;
  let lastX = 0, lastY = 0;
  let el: HTMLDivElement;
  function applyTransform() {
    el.style.setProperty('--tx', `${x}px`);
    el.style.setProperty('--ty', `${y}px`);
    el.style.setProperty('--s', `${scale}`);
  }
  function onWheel(e: WheelEvent) {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.1 : 0.9;
    const prev = scale;
    scale = Math.min(8, Math.max(1, scale * delta));
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    x = cx - (cx * scale) / prev + x;
    y = cy - (cy * scale) / prev + y;
    applyTransform();
  }
  function onPointerDown(e: PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    dragging = true; lastX = e.clientX; lastY = e.clientY;
  }
  function onPointerMove(e: PointerEvent) {
    if (!dragging) return;
    const dx = e.clientX - lastX; const dy = e.clientY - lastY;
    x += dx; y += dy; lastX = e.clientX; lastY = e.clientY; applyTransform();
  }
  function onPointerUp() { dragging = false; }
  function onDblClick() { scale = scale === 1 ? 2 : 1; x = y = 0; applyTransform(); }
  onMount(() => applyTransform());
</script>
<div bind:this={el} class="relative h-[calc(100vh-4rem)] bg-black"
  on:wheel|passive={onWheel} on:dblclick={onDblClick}
  on:pointerdown={onPointerDown} on:pointermove={onPointerMove}
  on:pointerup={onPointerUp} on:pointercancel={onPointerUp}>
  <img src={src} alt={alt}
    class="select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    style="transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(var(--s)); transform-origin: center;"/>
</div>
<p class="p-2 text-center text-neutral-300 text-sm">Double‑click to toggle zoom. Scroll to zoom. Drag to pan. Esc to close.</p>
