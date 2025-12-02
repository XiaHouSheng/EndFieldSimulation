<script setup>
import { ref } from "vue";
import { useRootStore } from "../../stores/SimStore";

//后续可以脚本批量生成，根据inner与outer的数量
const rootStore = useRootStore();
const props = defineProps({
  gs_id: {
    required: true,
    type: String,
  },
});
//机器设置接口
const handleOpenDialog = () => {};
//右键删除机器
const handleRightClick = (event) => {
  event.preventDefault();
  if (rootStore.isBeltConnecting) {
    rootStore.cancelBeltConnect()
    return;
  }
  rootStore.rootGrid.removeWidget(rootStore.gridWidgets[props.gs_id]);
  delete rootStore.gridWidgets[props.gs_id];
};
//进出口事件
const handleBeltConnect = (event) => {
  event.stopPropagation();
  if (!rootStore.isBeltConnecting) {
    rootStore.startBeltConnect()
  }else{
    rootStore.compeleteBeltConnect()
  }
};
</script>

<template>
  <div
    class="max-height-width display-flex flex-direation-col"
    style="justify-content: space-between"
    @contextmenu="handleRightClick"
  >
    <div
      class="display-flex flex-direation-row justify-content-center"
      style="height: 30%"
    >
      <el-button
        @click="handleBeltConnect"
        class="sim-inner-btn"
        round
      ></el-button>
      <el-button class="sim-inner-btn" round></el-button>
      <el-button class="sim-inner-btn" round></el-button>
    </div>
    <div class="display-flex flex-direation-row justify-content-center">
      <el-button round @click="handleOpenDialog">传送带</el-button>
    </div>
    <div
      class="display-flex flex-direation-row justify-content-center"
      style="height: 30%"
    >
      <el-button class="sim-outer-btn" round></el-button>
      <el-button class="sim-outer-btn" round></el-button>
      <el-button class="sim-outer-btn" round></el-button>
    </div>
  </div>
</template>

<style scoped></style>
