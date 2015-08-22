System.config({
  "baseURL": "/",
  "transpiler": "traceur",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "components/jquery": "github:components/jquery@2.1.4",
    "ember": "github:components/ember@1.13.7",
    "jquery": "github:components/jquery@2.1.4",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "twbs/bootstrap": "github:twbs/bootstrap@3.3.4",
    "github:components/ember@1.13.7": {
      "handlebars.js": "github:components/handlebars.js@1.3.0",
      "jquery": "github:components/jquery@2.1.4"
    },
    "github:twbs/bootstrap@3.3.4": {
      "jquery": "github:components/jquery@2.1.4"
    }
  }
});

