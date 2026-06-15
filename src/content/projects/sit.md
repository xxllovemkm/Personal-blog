---
title: "Sit"
date: "2026-06-15"
tags: ["AI Agent", "Git", "Skill", "Tooling"]
summary: "面向 AI Agent Skill 的 Git 原生语义安全层，为 prompt、schema、golden test 与脚本变更提供结构化风险信号。"
---

Sit 在 Git 之上叠加语义层，用于管理 AI Agent Skill 包的变更风险。它关注的不只是文件行差异，而是 prompt、schema、golden test 和脚本的行为影响。

核心能力包括语义 diff、自动 review、风险评级、版本门禁、PR summary 生成和 CI 集成，并提供 CLI、Python SDK、MCP server、tool-use schema 导出与 VSCode 扩展等多种接口。
