<template>
  <el-row :gutter="6" class="container">
    <el-col :span="4">
      <div class="sheng-cont-list sidebar sheng-test-border">
        <!--data-gs-widget后续直接生成，目前便于测试先这么整-->
        <!--data-gs-widget也可以用于传递参数，如inner与outer数量等-->
        <div
          v-for="value in 1"
          data-gs-widget='{"w":3, "h":3, "noResize":true, "id":"conveyerbelt"}'
          class="sheng-cont-item sidebar-item sheng-test-border display-flex flex-direation-row"
        >
          <div class="grid-stack-content"></div>
          <el-text class="list-span">传送带</el-text>
        </div>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="sheng-cont-grid">
        <div @click="rootStore.handleBeltNode" ref="targetGrid" id="grid-stack" class="grid-stack"></div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import {
  h,
  ref,
  onMounted,
  nextTick,
  createVNode,
  render,
  getCurrentInstance,
} from "vue";
import { GridStack } from "gridstack";
import ConveyerBelt from "../components/simulation/ConveyerBelt.vue";
import "gridstack/dist/gridstack.min.css";
import { useRootStore } from "../stores/SimStore";

const { appContext } = getCurrentInstance();
const rootStore = useRootStore();

onMounted(async () => {
  await nextTick();
  //初始化
  const targetGridEl = document.querySelector("#grid-stack");
  rootStore.initGrid(targetGridEl);
  //自定义克隆函数，用于拖拽添加
  const selfClone = (element) => {
    //拷贝待加入的cell
    let cloneNode = element.cloneNode(true);
    cloneNode.replaceChildren();
    //唯一id分配
    const gs_id = JSON.parse(cloneNode.attributes.getNamedItem("data-gs-widget").nodeValue).id + `-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    //cell元素存储，用于删除与定位
    rootStore.gridWidgets[gs_id] = cloneNode;
    //vue组件映射 | 这个函数计划并入组件作为参数
    const vnode = createVNode(ConveyerBelt, {
      gs_id: gs_id,
    });
    vnode.appContext = appContext;
    render(vnode, cloneNode);
    return cloneNode;
  };
  //拖拽设置
  GridStack.setupDragIn(".sidebar-item", { helper: selfClone });
});
</script>

<style scoped>
.sheng-cont-grid {
  overflow-y: scroll;
  max-height: 100%;
  height: var(--sheng-self-simulation-list-height);
}
.sheng-test-border {
  border: 1px dashed #409eff;
  box-sizing: border-box;
  border-radius: 4px;
}
.sheng-cont-list {
  overflow-y: scroll;
  overflow-y: hidden;
  max-height: 100%;
  height: var(--sheng-self-simulation-list-height);
  padding: 0 3px 0 3px;
}
.sheng-cont-item {
  min-height: 60px;
  margin: 0 0 6px 0;
}
:deep(.grid-stack-item) {
  text-align: center;
  background: #fff;
  border: 1px dashed #409eff;
  border-radius: 4px;
  box-sizing: border-box; /* 确保尺寸不会被边框影响 */
}
</style>
