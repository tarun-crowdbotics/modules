// This file is used for translating RN template placeholders with
// cookiecutter placeholders. Serves as a map between the two.
export default {
  rn: {
    // Placeholder name that will be replaced in package.json, index.json, android/, ios/ for a project name.
    placeholderName: 'ProjectName',

    // Placeholder title that will be replaced in values.xml and Info.plist with title provided by the user.
    // We default this value to 'Hello App Display Name', which is default placeholder in react-native template.
    titlePlaceholder: 'Hello App Display Name',
  },
  cookie: {
    projectNameIdentifier: "ProjectNameIdentifier",
    projectOwnerEmail: "ProjectOwnerEmail",
    projectSSHKeyFingerPrint: "ProjectSSHKeyFingerPrint"
  }
};
