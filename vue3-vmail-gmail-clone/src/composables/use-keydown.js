import { onBeforeUnmount } from "vue";

let useKeydown = keyCombo => {
  let onKeydown = event => {
    let kc = keyCombo.find(kc => kc.key == event.key);
    if (kc) {
      kc.fn();
    }
  };

  window.addEventListener("keydown", onKeydown);
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", onKeydown);
  });
};

export default useKeydown;