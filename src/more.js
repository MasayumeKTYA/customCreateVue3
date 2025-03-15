import useFileCreate from "./hook/useFileCreate.js";
const moreAction = async (root, list) => {
  const { createMain } = useFileCreate();
  console.log(root, list);
  for (let index = 0; index < list.length; index++) {
    list[index] += ".vue";
    createMain(root, list[index]);
  }
};

export default moreAction;
