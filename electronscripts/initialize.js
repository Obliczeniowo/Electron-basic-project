const fs = require("fs");

class InitialData {
  windowHeight = 600;
  windowWidth = 800;
}

class InitializeApp {
  initialData = new InitialData();
  path = "../initialize.json";

  constructor() {
    if (fs.existsSync(this.path)) {
      try {
        this.initialData = JSON.parse(fs.readFileSync(this.path));
        console.log(this.initialData);
      } catch {

      }
    }
  }

  save() {
    fs.writeFileSync(this.path, JSON.stringify(this.initialData));
    console.log(this.initialData);
  }
}

module.exports.InitializeApp = InitializeApp;
module.exports.InitialData = InitialData;
