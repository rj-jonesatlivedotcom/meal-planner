import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.122"],

  async redirects() {
    return [
      {
        source: "/recipes/D011",
        destination: "/recipes/d011-creamy-chicken-mushroom-rice",
        permanent: true,
      },
      {
        source: "/recipes/D012",
        destination: "/recipes/turkey-sweetcorn-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D013",
        destination: "/recipes/lemon-cod-pasta-peppers",
        permanent: true,
      },
      {
        source: "/recipes/D014",
        destination: "/recipes/chicken-sweetcorn-rice-bowl",
        permanent: true,
      },
      {
        source: "/recipes/D015",
        destination: "/recipes/turkey-rice-roasted-peppers",
        permanent: true,
      },
      {
        source: "/recipes/D016",
        destination: "/recipes/pork-apple-rice-bowl",
        permanent: true,
      },
      {
        source: "/recipes/D017",
        destination: "/recipes/creamy-chicken-cabbage-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D018",
        destination: "/recipes/cod-sweetcorn-rice",
        permanent: true,
      },
      {
        source: "/recipes/D019",
        destination: "/recipes/egg-vegetable-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D020",
        destination: "/recipes/chicken-apple-couscous-style-rice",
        permanent: true,
      },
      {
        source: "/recipes/D021",
        destination: "/recipes/chicken-herb-sweetcorn-rice",
        permanent: true,
      },
      {
        source: "/recipes/D022",
        destination: "/recipes/beef-pepper-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D023",
        destination: "/recipes/herb-cod-potatoes-cabbage",
        permanent: true,
      },
      {
        source: "/recipes/D024",
        destination: "/recipes/creamy-cheese-egg-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D025",
        destination: "/recipes/pork-apple-cabbage",
        permanent: true,
      },
      {
        source: "/recipes/D026",
        destination: "/recipes/creamy-chicken-pepper-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D027",
        destination: "/recipes/cod-sweetcorn-herb-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D028",
        destination: "/recipes/egg-cabbage-sweetcorn-rice",
        permanent: true,
      },
      {
        source: "/recipes/D029",
        destination: "/recipes/pork-pepper-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D030",
        destination: "/recipes/d030-pork-apple-cabbage-skillet",
        permanent: true,
      },
      {
        source: "/recipes/D031",
        destination: "/recipes/lemon-chicken-herb-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D032",
        destination: "/recipes/cod-pepper-lemon-rice",
        permanent: true,
      },
      {
        source: "/recipes/D033",
        destination: "/recipes/beef-cabbage-rice",
        permanent: true,
      },
      {
        source: "/recipes/D034",
        destination: "/recipes/cheesy-egg-vegetable-rice",
        permanent: true,
      },
      {
        source: "/recipes/D035",
        destination: "/recipes/chicken-cabbage-herb-rice",
        permanent: true,
      },
      {
        source: "/recipes/D036",
        destination: "/recipes/cod-cabbage-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D037",
        destination: "/recipes/pepper-beef-rice",
        permanent: true,
      },
      {
        source: "/recipes/D038",
        destination: "/recipes/pork-apple-herb-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D039",
        destination: "/recipes/egg-cauliflower-herb-pasta",
        permanent: true,
      },
      {
        source: "/recipes/D040",
        destination: "/recipes/d040-cod-sweetcorn-potato-bake",
        permanent: true,
      },
    ];
  },

  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
};

export default nextConfig;
