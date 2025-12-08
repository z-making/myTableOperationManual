<template>
  <div class="home-container">
    <!-- 头部横幅 -->
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title"><span class="gradient-text">myTable</span> 组件使用手册</h1>
        <p class="hero-subtitle">基于 Element Plus 封装的高级表格组件，让表格开发更简单、更高效</p>
        <div class="hero-actions">
          <el-button type="primary" size="large" @click="goToQuickStart">
            <el-icon class="mr-5"><Reading /></el-icon>
            快速开始
          </el-button>
          <el-button size="large" @click="goToExample">
            <el-icon class="mr-5"><Document /></el-icon>
            查看示例
          </el-button>
        </div>
      </div>
    </div>

    <!-- 特性展示 -->
    <div class="features-section">
      <h2 class="section-title">核心特性</h2>
      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.title">
          <div class="feature-icon" :style="{ background: feature.color }">
            <component :is="feature.icon" :style="{ fontSize: '28px', color: '#fff' }" />
          </div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
        </div>
      </div>
    </div>

    <!-- 快速导航 -->
    <div class="navigation-section">
      <h2 class="section-title">开始使用</h2>
      <div class="nav-grid">
        <div
          class="nav-card"
          v-for="nav in navigations"
          :key="nav.title"
          @click="router.push(nav.path)"
        >
          <div class="nav-icon">
            <component :is="nav.icon" :style="{ fontSize: '32px', color: nav.color }" />
          </div>
          <div class="nav-info">
            <h3 class="nav-title">{{ nav.title }}</h3>
            <p class="nav-desc">{{ nav.desc }}</p>
          </div>
          <el-icon class="nav-arrow"><ArrowRight /></el-icon>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <div class="footer-section">
      <div class="footer-content">
        <p class="footer-text">💡 提示：本系统已全局注册 myTable 组件，可在任何页面直接使用</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  Reading,
  Document,
  Box,
  Tools,
  Connection,
  Cpu,
  Picture,
  Star,
  Compass,
  Grid,
  Setting,
  Flag,
  ArrowRight,
} from '@element-plus/icons-vue'

const router = useRouter()

// 特性列表
const features = [
  {
    icon: Box,
    title: '开箱即用',
    desc: '已全局注册，无需重复引入，直接在任何组件中使用',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    icon: Tools,
    title: '灵活配置',
    desc: '支持多种列类型：插槽、图片、标签、输入框、下拉框等',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    icon: Connection,
    title: '双向绑定',
    desc: '分页参数自动同步，无需手动处理状态更新',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    icon: Cpu,
    title: '智能排序',
    desc: '内置智能排序算法，自动识别数字、字符串、中文等',
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
  {
    icon: Picture,
    title: '样式定制',
    desc: '支持条件行高亮、自定义表头样式、固定列等',
    color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  },
  {
    icon: Star,
    title: '响应式',
    desc: '自适应不同屏幕尺寸，完美支持移动端和桌面端',
    color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  },
]

// 导航列表
const navigations = [
  {
    icon: Compass,
    title: '快速开始',
    desc: '了解 myTable 组件的基本概念和快速上手指南',
    path: '/course',
    color: '#409eff',
  },
  {
    icon: Grid,
    title: '基础用法',
    desc: '学习各种列类型的配置方法和常用功能',
    path: '/course/basic',
    color: '#67c23a',
  },
  {
    icon: Setting,
    title: '进阶功能',
    desc: '探索高级特性，实现复杂的业务需求',
    path: '/course/advanced',
    color: '#e6a23c',
  },
  {
    icon: Document,
    title: 'API 文档',
    desc: '查看完整的 API 参考和类型定义',
    path: '/course/api',
    color: '#909399',
  },
  {
    icon: Flag,
    title: '完整示例',
    desc: '查看实际应用案例，快速复制代码',
    path: '/example',
    color: '#f56c6c',
  },
]

// 跳转到快速开始
const goToQuickStart = () => {
  router.push('/course')
}

// 跳转到示例
const goToExample = () => {
  router.push('/example')
}
</script>

<style scoped lang="scss">
.home-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f5f7fa 0%, #ffffff 100%);
}

// 头部横幅
.hero-section {
  padding: 80px 40px 60px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -5%;
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(120deg, #fff 0%, #a8edea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;

  .el-button {
    padding: 14px 32px;
    font-size: 16px;
    border-radius: 8px;
  }
}

.mr-5 {
  margin-right: 5px;
}

// 特性展示
.features-section {
  padding: 60px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 50px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    border-radius: 2px;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.feature-card {
  padding: 30px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
}

.feature-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
}

.feature-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

// 快速导航
.navigation-section {
  padding: 60px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 20px;
}

.nav-card {
  display: flex;
  align-items: center;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateX(5px);
    border-color: #667eea;
    box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
  }
}

.nav-icon {
  flex-shrink: 0;
  margin-right: 20px;
}

.nav-info {
  flex: 1;
}

.nav-title {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.nav-desc {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.nav-arrow {
  flex-shrink: 0;
  font-size: 20px;
  color: #999;
  transition: all 0.3s ease;

  .nav-card:hover & {
    color: #667eea;
    transform: translateX(5px);
  }
}

// 底部信息
.footer-section {
  padding: 40px;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
}

// 响应式
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .features-grid,
  .nav-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 24px;
  }
}
</style>
