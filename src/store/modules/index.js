// Register all Vuex module by a camelCase version of their filename.
import camelCase from 'lodash/camelCase';

// Get all the files
const requireModule = require.context(
  // Search for files in the current directory
  '.',
  // Search for files in subdirectories
  true,
  // Exclude index.js file as well as any file that has
  // 'actions', 'mutations', or 'getters' in their name.
  // Also, include only files which ends with .js
  /^(?!.*(actions|mutations|getters|index)).*\.js$/
);

const modules = {};

requireModule.keys().forEach(fileName => {
  // Ignore unit test files
  if (/\.unit\.js$/.test(fileName)) return;
  // Remove the file extension and convert to camelcase
  modules[camelCase(fileName.split('/')[1].replace(/(\.\/|\.js)/g, ''))] = {
    namespaced: true,
    ...requireModule(fileName).default
  };
});

export default modules;
