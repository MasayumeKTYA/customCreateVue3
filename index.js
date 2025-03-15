#!/usr/bin/env node
import { program } from "commander";
import singleAction from "./src/single.js";
import moreAction from "./src/more.js";
import fs from "node:fs/promises";
import path from "path";
// 初始化命令行工具
program.name("cv").description("一个创建vue3的工具").version("1.0.0");

const cwd = process.cwd();
const settingPath = path.resolve(cwd, "cvSetting.json");
let settingObject;
try {
  const res = await fs.readFile(settingPath, "utf-8");
  settingObject = JSON.parse(res);
} catch (error) {
  if (error.code === "ENOENT") {
    settingObject = {
      more: [],
      base: "",
    };
  } else if (error instanceof SyntaxError) {
    console.error("配置文件格式错误");
    console.log("\x1b[31m配置文件格式错误\x1b[0m");
    process.exit(1);
  } else {
    console.error("读取配置文件时发生未知错误:", error.message);
    process.exit(1);
  }
}

// 单条配置
program.arguments("<path>").action((paths) => {
  const sumPath = path.resolve(cwd, settingObject.base);
  singleAction(sumPath, paths);
});

//多条配置
program.command("all").action(() => {
  const sumPath = path.resolve(cwd, settingObject.base);
  moreAction(sumPath, settingObject.more);
});
// 解析参数
program.parse();
