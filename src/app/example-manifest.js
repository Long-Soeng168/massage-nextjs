export default function manifest() {
  return {
    orientation: "any",
    display: "standalone",
    dir: "auto",
    lang: "en-US",
    name: "Scholar Library",
    short_name: "Scholar",
    start_url: "/",
    theme_color: "#0d578c",
    background_color: "#ffffff",
    icons: [
      {
        purpose: "maskable",
        sizes: "512x512",
        src: "icon512_maskable.png",
        type: "image/png",
      },
      {
        purpose: "any",
        sizes: "512x512",
        src: "icon512_rounded.png",
        type: "image/png",
      },
    ],
  };
}
