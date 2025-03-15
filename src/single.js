import useFileCreate from "./hook/useFileCreate.js";
const { createMain } = useFileCreate();

const singleAction = (root, path) => {
  path += ".vue";
  createMain(root, path);
};
export default singleAction;
