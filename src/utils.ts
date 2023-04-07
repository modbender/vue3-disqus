export const getEmitName = (str: string) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace("on-", "");

export const draf = (cb: any) =>
  requestAnimationFrame(() => requestAnimationFrame(cb));

export function insertScript(src: string, id: string, parentElement: any) {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.id = id;
  parentElement.appendChild(script);
  return script;
}

export function removeScript(id: string, parentElement: any) {
  const script = document.getElementById(id);
  if (script) parentElement.removeChild(script);
}
