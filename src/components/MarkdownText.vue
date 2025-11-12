<template>
  <div class="markdown-renderer" v-html="renderedHtml" />
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

// 接收 Markdown 文本
const props = defineProps({
  content: { type: String, default: '' }
});

// 简易解析函数
const parseMarkdown = (text: string) => {
  let html = text;

  // 1. 解析标题（允许前导空格）
  html = html.replace(/^\s*(#{1,6})\s+(.*)$/gm, (match, level, title) => {
    return `<h${level.length}>${title}</h${level.length}>`;
  });

  // 2. 解析无序列表（允许前导空格）
  // 先匹配列表块（每行以 - 开头，允许前导空格）
  html = html.replace(/(^\s*- .+?)(?=\n\s*[^-]|$)/gms, '<ul>\n$1\n</ul>');
  // 再替换列表项
  html = html.replace(/^\s*- (.*)$/gm, '<li>$1</li>');

  // 3. 解析粗体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 4. 解析斜体
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 5. 最后解析换行（避免干扰块级标签）
  html = html.replace(/\n/g, '<br>');
  console.log(html, 'html');
  return html;
};

// 渲染后的 HTML
const renderedHtml = computed(() => parseMarkdown(props.content));
</script>

<style scoped>
.markdown-renderer {
  padding: 20px;
}
h1 { color: #333; border-bottom: 1px solid #eee; padding-bottom: 8px; }
h2 { color: #444; }
strong { font-weight: bold; }
em { font-style: italic; }
ul { padding-left: 20px; }
li { margin: 4px 0; }
</style>