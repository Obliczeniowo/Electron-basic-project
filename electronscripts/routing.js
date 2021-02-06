const electron = require("electron");

class RouteItem {
  path = "";
  viewClass;
  viewFile = "";
  children = new Array();

  constructor(
    path = "",
    viewClass = null,
    viewFile = "",
    children = new Array()
  ) {
    this.path = path;
    this.viewClass = viewClass;
    this.viewFile = viewFile;
    this.children = children;
  }

  changePath(path = new Array()) {
    let pathCopy = [...path];

    if (path.length) {
      const pathItem = pathCopy.shift();
      if (pathItem === this.path) {
        if (pathCopy.length) {
          if (this.children.length) {
            for (let i = 0; i < this.children.length; i++) {
              const returned = this.children[i].changePath(pathCopy);
              if (returned) {
                return returned;
              }
            }
            return false;
          }
          return false;
        }
        return this;
      }
      return false;
    }
  }
}

class Routing {
  routes = new Array();
  wnd;

  constructor(wnd, routes = new Array()) {
    this.routes = routes;
    this.wnd = wnd;
  }

  changeRoute(path = "") {
    const tablePath = path.split("/");

    for (let i = 0; i < this.routes.length; i++) {
      const returned = this.routes[i].changePath(tablePath);
      if (returned) {
          this.wnd.loadFile(returned.viewFile);
          return returned;
      }
    }
    return null;
  }
}

module.exports.RouteItem = RouteItem
module.exports.Routing = Routing