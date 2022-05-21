const { default: axios } = require("axios");
const http = require("http");
const fetch = require("node-fetch");

(async () => {
  try {
    axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
    const response = await axios(
      "https://www.foody.vn/__get/Place/HomeListPlace?t=1653069616708&page=1&lat=10.823099&lon=106.629664&count=12&districtId=&cateId=&cuisineId=&isReputation=&type=1"
    );
    const data = response.data;
    console.log(data);
  } catch (s) {
    console.log(s);
  }
})();

// const hostname = "127.0.0.1";
// const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World");
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
