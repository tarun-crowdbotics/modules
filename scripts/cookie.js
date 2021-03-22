import path from "path";
import { clean, remove, write, rename } from "./utils.js";
import config from "../template/cookie.config.js";
// https://github.com/react-native-community/cli/blob/22a3c2558c2e03cc61f088807d2b09d1567c07ca/packages/cli/src/commands/init/editTemplate.ts#L77
import edit from "../node_modules/@react-native-community/cli/build/commands/init/editTemplate.js";
const replace = edit.changePlaceholderInTemplate;
import ncp from "ncp";
ncp.limit = 16;

// cookie command accepts ouput and input directories, both are optional
const COOKIECUTTER_DIRECTORY = process.argv.slice(2)[0] || path.join("dist", "beta");
const INPUT_DIRECTORY = process.argv.slice(2)[1] || path.join("template", "beta");
const target = path.join(process.cwd(), COOKIECUTTER_DIRECTORY);
const source = path.join(process.cwd(), INPUT_DIRECTORY);

// cookiecutter.json content
const COOKIECUTTER_JSON = {
  "project_name": "",
  "project_slug": "{{cookiecutter.project_name|lower|replace(' ', '')|replace('-', '_')}}",
  "project_dash_slug": "{{cookiecutter.project_slug|replace('_', '-')}}",
  "owner_email": "",
  "ssh_key_fingerprint": ""
};

const callback = (err) => {
  if (err) {
    return console.error(err);
  }
  // Change to the target directory first because replace uses process.cwd()
  process.chdir(target);

  replace({
    projectName: "{{cookiecutter.project_slug}}",
    projectTitle: "{{cookiecutter.project_slug}}",
    placeholderName: config.rn.placeholderName,
    placeholderTitle: config.rn.titlePlaceholder
  });

  replace({
    projectName: "{{cookiecutter.project_dash_slug}}",
    projectTitle: "{{cookiecutter.project_dash_slug}}",
    placeholderName: config.rn.placeholderName.toLowerCase(),
    placeholderTitle: config.rn.titlePlaceholder.toLowerCase()
  });

  replace({
    projectName: "{{cookiecutter.project_dash_slug}}",
    projectTitle: "{{cookiecutter.project_dash_slug}}",
    placeholderName: config.cookie.projectNameIdentifier,
    placeholderTitle: config.rn.titlePlaceholder
  });

  replace({
    projectName: "{{cookiecutter.project_owner_email}}",
    projectTitle: "{{cookiecutter.project_dash_slug}}",
    placeholderName: config.cookie.projectOwnerEmail,
    placeholderTitle: config.rn.titlePlaceholder
  });

  replace({
    projectName: "{{cookiecutter.ssh_key_fingerprint}}",
    projectTitle: "{{cookiecutter.project_dash_slug}}",
    placeholderName: config.cookie.projectSSHKeyFingerPrint,
    placeholderTitle: config.rn.titlePlaceholder
  });

  const cwd = process.cwd()
  remove(path.join(cwd, "package.json"));
  remove(path.join(cwd, "script.js"));
  remove(path.join(cwd, "template.config.js"));
  write(path.join(cwd, "cookiecutter.json"), JSON.stringify(COOKIECUTTER_JSON));
  rename(path.join(cwd, "source"), path.join(cwd, "{{cookiecutter.project_slug}}"));
}

clean({ target: COOKIECUTTER_DIRECTORY });
ncp(source, target, err => callback(err));
