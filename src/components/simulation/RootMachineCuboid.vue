<script setup>
import { ref } from "vue";
import { useRootStore } from "../../stores/SimStore";
// 新增导入 MachineStore 并实例化
import { useMachineStore } from "../../stores/MachineStore";
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
  rootStore.gridWidgetsRotate[props.gs_id] = index;
  if (index % 2 == 0) {
    rootStore.rootGrid.update(rootStore.gridWidgets[props.gs_id], {
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
    rootStore.rootGrid.update(rootStore.gridWidgets[props.gs_id], {
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

</script>

<template>
  <div
    class="max-height-width display-flex"
    style="justify-content: space-between; flex-direction: column; background-color: white;"
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
      {{ props.el_name }}
    </div>

    <div
      ref="childContOuter"
      class="display-flex justify-content-center line-outter flex-direation-col"
      style="height: 15px"
    ></div>
  </div>
</template>

<style scoped>
.line-inner {
  background-color: #8bc34a;
  background-size: calc(100% / v-bind(widthEl)) calc(100% / v-bind(heightEl));
  background-image: linear-gradient(to right, #fff 1px, transparent 1px),
    linear-gradient(to bottom, #fff 1px, transparent 1px);
}

.line-outter {
  background-color: #e51c23;
  background-size: calc(100% / v-bind(widthEl)) calc(100% / v-bind(heightEl));
  background-image: linear-gradient(to right, #fff 1px, transparent 1px),
    linear-gradient(to bottom, #fff 1px, transparent 1px);
}
</style>
