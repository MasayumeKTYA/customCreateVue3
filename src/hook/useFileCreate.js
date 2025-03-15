import fs from "node:fs/promises";
import path from "path";

const useFileCreate = () => {
  const createMain = async (root, val) => {
    console.log(val);

    try {
      // 验证并规范化路径
      let fullPath = validateAndNormalizePath(root, val);
      const dirPath = path.dirname(fullPath);

      // 确保目录存在
      await ensureDirectoryExists(dirPath);
      //判断文件是否存在
      const isNew = await isNewFile(fullPath);
      if (isNew) {
        const newFile = path.parse(fullPath);
        fullPath = path.resolve(
          newFile.dir,
          ` ${newFile.name} copy${newFile.ext}`
        );
      }
      // 写入文件
      await writeFile(fullPath);

      console.log("\x1b[32m创建成功\x1b[0m");
    } catch (error) {
      console.error("\x1b[31m创建失败:", error.message, "\x1b[0m");
    }
  };
  /**
   * 验证并规范化路径
   * @param {string} cwd 当前工作目录
   * @param {string} relativePath 用户输入的相对路径
   * @returns {string} 规范化后的完整路径
   */
  function validateAndNormalizePath(cwd, relativePath) {
    const resolvedPath = path.resolve(cwd, relativePath);

    if (!resolvedPath.startsWith(cwd)) {
      throw new Error("非法路径，无法超出当前工作目录");
    }
    return resolvedPath;
  }

  /**
   * 确保目录存在
   * @param {string} dirPath 目标目录路径
   */
  async function ensureDirectoryExists(dirPath) {
    try {
      await fs.mkdir(dirPath, { recursive: true });
    } catch (error) {
      if (error.code !== "EEXIST") {
        throw error; // 如果不是目录已存在的错误，则抛出异常
      }
    }
  }

  /**
   * 写入文件
   * @param {string} fullPath 文件完整路径
   */
  async function writeFile(fullPath) {
    const fileContent = `<script setup lang="ts"></script>
<template>
    <div></div>
</template>
<style scoped lang="scss"></style>`;
    await fs.writeFile(fullPath, fileContent, "utf-8");
  }
  async function isNewFile(fullPath) {
    try {
      await fs.access(fullPath, fs.constants.R_OK | fs.constants.W_OK);
      return true;
    } catch (error) {
      return false;
    }
  }
  return { createMain };
};

export default useFileCreate;
