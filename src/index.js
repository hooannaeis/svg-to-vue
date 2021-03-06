#!/usr/bin/env node
const fs = require("fs");

const svgRegex = new RegExp("<svg.+?>(.*?)<\/svg>", "mis")
const replaceKey = "{{svg-content}}"
const scaffold = `<template><g>${replaceKey}</g></template>`

let specificFileToRead = false;
if (process.argv[2]) {
  specificFileToRead = process.argv[2]
}

console.log("############### starting to convert files ###############")
if (specificFileToRead) {
  console.log(`converting: ${specificFileToRead}`)
  createVueFile(specificFileToRead)
} else {
  const files = fs.readdirSync(process.cwd())
  files.forEach(file => {
    if (file.endsWith(".svg")) {
      console.log(`converting: ${file}`)
      createVueFile(file)
    }
  })
}
console.log("############### done converting files ###############")

function createVueFile(filePath) {
  const fileString = getFileString(filePath);
  const match = fileString.match(svgRegex)
  if (match.length && match[1]) {
    const svgContent = match[1]
    const vueFileContent = scaffold.replace(replaceKey, svgContent);
    const vueFilePath = getVueFilePath(filePath);
    writeVueFile(vueFilePath, vueFileContent)
  } else {
    console.log(`--> file has no svg content`)
  }
}

function getVueFilePath(filePath) {
  const splitPath = filePath.split("\\")
  const fileName = splitPath[splitPath.length - 1]
  const vueFilename = makeCamelCase(fileName.split(".")[0]) + ".vue"

  if (splitPath.length === 1) {
    return vueFilename
  }
  return [splitPath.slice(0, -1), vueFilename].join("\\")
}

function makeCamelCase(inputString) {
  const split = inputString.split("-");
  let camelCase = ""
  for (let i = 0; i < split.length; i++) {
    const word = split[i];
    camelCase += word[0].toUpperCase() + word.slice(1)
  }
  return camelCase;
}

function getFileString(filePath) {
  try {
    console.error(`trying to read file: ${filePath}`)
    const fileBuffer = fs.readFileSync(filePath);

    const fileString = fileBuffer.toString()
    return fileString;
  } catch (e) {
    console.error(`cannot read file: ${filePath}`)
  }

}

function writeVueFile(filePath, fileContent) {
  try {
    fs.writeFileSync(filePath, fileContent)
  } catch (e) {
    console.error(`cannot write file: ${filePath}`)
  }

}