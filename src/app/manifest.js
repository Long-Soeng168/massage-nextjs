export default function manifest() {
  return {
    display: "standalone",
    lang: "en-US",
    name: "Helejance",
    short_name: "Helejance",
    theme_color: "#0d578c",
    background_color: "#ffffff",
    start_url: "/",
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
