---
title: "PaperFit"
date: "2026-06-15"
tags: ["LaTeX", "Agent", "Layout"]
summary: "面向科学文档的 vision-in-the-loop 视觉排版优化系统，将能编译的 LaTeX 论文转化为可出版的版面。"
---

PaperFit 是一个基于多模态证据链驱动的排版优化系统，围绕“渲染页图 -> 诊断缺陷 -> 受约束修复 -> 逐轮视觉验收”的闭环，让 Agent 能处理真实 LaTeX 论文中的浮动体、溢出、空间利用、模板迁移和排版一致性问题。

我主要负责系统架构与实现，包括源码、日志、PDF 和页图的多源证据融合，A-E 类视觉排版缺陷分类，受约束修复策略，以及 gatekeeper 驱动的多轮验证闭环。
