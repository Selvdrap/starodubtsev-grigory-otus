const http = require("http");

const options = {
  hostname: "127.0.0.1",
  port: 8080,
  path: "/",
  method: "POST",
  headers: {
    "Content-Type": "text/plain"
  }
};

function run() {
  const args = process.argv.slice(2);
  if (args.length < 1 || isNaN(args[0])) {
    console.warn("You must specify number of requests as the first argument");
    return;
  }

  const n = parseInt(args[0]);
  const nums = [...new Array(n)].map(() => {
    return Math.floor(Math.random() * (n + 1));
  });

  if (args[1] === "async") {
    Promise.all(nums.map(n => makeRequest(options, `${n}`))).then(values =>
      console.log(values.join("\n"))
    );
  } else {
    nums.reduce((acc, current) => {
      return acc
        .then(() => makeRequest(options, `${current}`))
        .then(console.log);
    }, Promise.resolve());
  }
}

function makeRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      if (res.statusCode !== 200) {
        reject(new Error(`status code: ${res.statusCode}`));
      }

      let body = [];
      res.on("data", chunk => {
        body.push(chunk);
      });
      res.on("end", () => {
        try {
          body = Buffer.concat(body).toString();
        } catch (e) {
          reject(e);
        }
        resolve(body);
      });
    });

    req.on("error", err => reject(err));

    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

run();
