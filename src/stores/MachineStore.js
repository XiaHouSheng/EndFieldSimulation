import { defineStore } from "pinia";
import { useRootStore } from "./SimStore";

//test pr new branch
export const useMachineStore = defineStore("sheng-machine-store", {
  state: () => ({
    rootStore: useRootStore(),
  }),

  actions: {
    //test
    test() {},
    //Dialog关闭回调
    handleDialogClose() {
      this.rootStore.isRecipeChoose = false;
      this.rootStore.rootGrid.enableMove(true);
    },
    //右键删除机器
    handleRightClick(event, gs_id) {
      event.preventDefault();
      event.stopPropagation();
      this.rootStore.rootGrid.removeWidget(
        this.rootStore.gridWidgets[gs_id]["element"]
      );
      delete this.rootStore.gridWidgets[gs_id];
    },
    //进出口事件
    handleBeltConnect(event, which, gs_id) {
      event.stopPropagation();
      return;
      if (!this.rootStore.isBeltConnecting) {
        //inner outter specific
        this.rootStore.startBeltConnect(event, which, gs_id);
      } else {
        this.rootStore.compeleteBeltConnect();
      }
    },
  },
});
