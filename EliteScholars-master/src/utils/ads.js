import { SHOW_POPOVER_AD, POPOVER_AD_SCRIPT, POPOVER_AD_URL } from './constants';

// ============================================================================
// POPOVER AD FUNCTIONS
// ============================================================================

let popoverScriptLoaded = false;

export function loadPopoverAd() {
  if (!SHOW_POPOVER_AD) return;
  if (popoverScriptLoaded) return;
  
  const script = document.createElement('script');
  script.src = POPOVER_AD_SCRIPT;
  script.async = true;
  script.onload = () => console.log("Popover ad script loaded");
  script.onerror = () => console.error("Failed to load popover ad script");
  document.body.appendChild(script);
  popoverScriptLoaded = true;
}

export function triggerPopoverAd() {
  if (!SHOW_POPOVER_AD) return false;
  
  console.log("Triggering popover ad...");
  
  try {
    const popunder = window.open(POPOVER_AD_URL, '_blank');
    if (popunder && !popunder.closed) {
      console.log("Popunder opened successfully");
      return true;
    }
  } catch (e) {
    console.log("Direct popunder failed:", e);
  }
  
  try {
    const anchor = document.createElement('a');
    anchor.href = POPOVER_AD_URL;
    anchor.target = '_blank';
    anchor.rel = 'noopener noreferrer';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    console.log("Click event dispatched");
  } catch (e) {
    console.log("Click event method failed:", e);
  }
  
  const script = document.createElement('script');
  script.src = POPOVER_AD_SCRIPT;
  script.async = true;
  document.body.appendChild(script);
  
  return true;
}
