import { useEffect, useState } from "react";

export const useScriptLoader = (src, globalProp) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector(`script[src="${src}"]`);

    if (existingScript) {
      if (!globalProp || window[globalProp]) {
        setLoaded(true);
        return;
      }

      const onScriptLoad = () => setLoaded(true);
      existingScript.addEventListener("load", onScriptLoad);
      return () => existingScript.removeEventListener("load", onScriptLoad);
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => setLoaded(true);
    document.body.appendChild(script);

    return () => { };
  }, [src, globalProp]);

  return loaded;
};
