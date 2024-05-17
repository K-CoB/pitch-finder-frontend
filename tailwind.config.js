/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx, ts}"],
  theme: {
    extend: {
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        white: "#ffffff",
        black: "#000000",
        "dark-gray": "#525252",
        blue: {
          base: "#6979F8", // 기본 버튼 색상
          highlight: "#3647A7", // 클릭 시 버튼 색상
          pitch: "#A1A1FF", // 음성 듣기 및 포기하기
          "bar-1": "#D7D6FF", // 목표 음정 바
          "bar-2": "#A1C1FF", // 현재 음정 바,결과 음역대 범위 바
          result: "#E1E1FA",
        },
      },
    },
  },
  plugins: [],
};
