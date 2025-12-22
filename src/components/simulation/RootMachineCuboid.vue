<script setup>
import { computed, ref } from "vue";
import { useRootStore } from "../../stores/SimStore";
import { useMachineStore } from "../../stores/MachineStore";
import { machineNameMap } from "../../utils/MachineMap";
import { iconStyle } from "../../utils/DataMap";
import RecipeList from "../original/RecipeDialog.vue";
const rootStore = useRootStore();
const machineStore = useMachineStore();
const props = defineProps({
  gs_id: {
    required: true,
    type: String,
  },
  el_name: {
    type: String,
  },
  el_size: {
    required: true,
    type: Object,
  },
});

let index = 0;
let defaultWidth = props.el_size.w;
const widthEl = ref(defaultWidth);
const heightEl = ref(1);
const baseContFlex = ref(null);
const childContInner = ref(null);
const childContOuter = ref(null);

//0->default 1->change 2->default 3->change
const rotateGridEl = (index) => {
  rootStore.gridWidgets[props.gs_id]["rotate"] = index;
  if (index % 2 == 0) {
    rootStore.rootGrid.update(rootStore.gridWidgets[props.gs_id]["element"], {
      w: props.el_size.h,
      h: props.el_size.w,
    });
    if (index == 0) {
      baseContFlex.value.style["flex-direction"] = "row-reverse";
    } else {
      baseContFlex.value.style["flex-direction"] = "row";
    }
    heightEl.value = defaultWidth;
    widthEl.value = 1;
    childContInner.value.style["width"] = "15px";
    childContInner.value.style["height"] = "auto";
    childContOuter.value.style["width"] = "15px";
    childContOuter.value.style["height"] = "auto";
  } else {
    rootStore.rootGrid.update(rootStore.gridWidgets[props.gs_id]["element"], {
      w: props.el_size.w,
      h: props.el_size.h,
    });
    if (index == 1) {
      baseContFlex.value.style["flex-direction"] = "column-reverse";
    } else {
      baseContFlex.value.style["flex-direction"] = "column";
    }
    heightEl.value = 1;
    widthEl.value = defaultWidth;
    childContInner.value.style["height"] = "15px";
    childContInner.value.style["width"] = "auto";
    childContOuter.value.style["height"] = "15px";
    childContOuter.value.style["width"] = "auto";
  }
};
const hadnleRotate = () => {
  rotateGridEl(index);
  index = index >= 3 ? 0 : index + 1;
};
//配方配置对话框
const targetItemId = computed(() => rootStore.gridWidgets[props.gs_id].recipe);
const dialogVisible = ref(false);
const handleDialog = (event) => {
  event.stopPropagation();
  dialogVisible.value = true;
  rootStore.isRecipeChoose = true;
};

</script>

<template>
  <el-dialog v-model="dialogVisible" width="50%" @close="machineStore.handleDialogClose">
    <div style="height: 60%">
      <RecipeList :gs_id="props.gs_id"></RecipeList>
    </div>
  </el-dialog>

  <div
    class="max-height-width display-flex"
    style="
      justify-content: space-between;
      flex-direction: column;
      background-color: white;
    "
    ref="baseContFlex"
    @contextmenu="machineStore.handleRightClick($event, props.gs_id)"
    @click="hadnleRotate"
  >
    <div
      ref="childContInner"
      class="display-flex justify-content-center line-inner flex-direation-row"
      style="height: 15px"
    ></div>

    <div
      class="display-flex justify-content-center flex-grow-1 flex-direation-col"
    >
      {{ machineNameMap[props.el_name] }}
      <div class="display-flex flex-direation-row justify-content-center">
        <div
          class="recipe-icon"
          @click="handleDialog"
          :style="targetItemId ? iconStyle(targetItemId, 35) : {}"
        ></div>
      </div>
    </div>

    <div
      ref="childContOuter"
      class="display-flex justify-content-center line-outter flex-direation-col"
      style="height: 15px"
    ></div>
  </div>
</template>

<style scoped>
.recipe-icon {
  width: 35px;
  height: 35px;
  background-repeat: no-repeat;
  background-size: 420px auto;
  border-radius: 4px;
  border: 1px solid gray;
}
.line-inner {
  background-color: #949494;
  background-size: calc(100% / v-bind(widthEl)) calc(100% / v-bind(heightEl));
  background-image: linear-gradient(to right, #fff 1px, transparent 1px),
    linear-gradient(to bottom, #fff 1px, transparent 1px);
}

.line-outter {
  background-color: #ffe289;
  background-size: calc(100% / v-bind(widthEl)) calc(100% / v-bind(heightEl));
  background-image: linear-gradient(to right, #fff 1px, transparent 1px),
    linear-gradient(to bottom, #fff 1px, transparent 1px);
}
</style>
