import { GridStack, GridStackEngine } from "gridstack";
import { defineStore } from "pinia";
import { markRaw } from "vue";

export const useRootStore = defineStore("sheng-root-store", {
  state: () => ({
    isBeltConnecting: false, //是否处于传送带连接状态
    gridWidgets: {}, //用于所有模拟控件的存储
    rootGrid: null, //存储根gridstack对象
    rootGridEngine: null, //gridstack引擎
    gridEl: null, //存储根元素对象
    numColumn: 32, //列个数
    gridOptions: {
      cellHeight: null, //单元格的高度 = 父控件宽度 / 列个数 | 保持正方体
      minRow: 12, //行个数
      allowNewRow: true, //可向下扩充行
      float: true, //可以随意摆放
      //可以拖入
      acceptWidgets: function (el) {
        return true;
      },
    },
  }),

  actions: {
    initGrid(target_el) {
      this.gridEl = markRaw(target_el);
      this.gridOptions.cellHeight = target_el.clientWidth / this.numColumn;
      this.rootGrid = markRaw(GridStack.init(this.gridOptions, target_el));
      this.rootGrid.column(this.numColumn);
    },

    //此方法目前没有算scroll量后续还需要修改
    isCellEmpty(event) {
      let clientX = event.clientX;
      clientX -= 26; //offset
      let clientY = event.clientY;
      clientY -= 80; //offset
      let { x, y } = this.rootGrid.getCellFromPixel({
        left: clientX,
        top: clientY,
      });
      console.log(x, y);
      return this.rootGrid.isAreaEmpty(x, y, 1, 1);
    },
    //取消连接
    cancelBeltConnect() {
      this.isBeltConnecting = false;
      this.rootGrid.enableMove(true);
      //连接关系清空
    },
    //开始连接
    //记录第一个节点位置，作为下一个节点的铺垫
    startBeltConnect() {
      this.isBeltConnecting = true;
      this.rootGrid.enableMove(false);
    },
    //完成连接
    //根据inner与outter和specific节点来进行判断
    compeleteBeltConnect() {
      this.isBeltConnecting = false;
      this.rootGrid.enableMove(true);
    },

    handleBeltNode(event) {
      //传送带连接
      if (this.isBeltConnecting) {
        //当前单元格为空就生成新的节点，途中的传送带一起生成
        //根据上一个节点进行连接
        if (this.isCellEmpty(event)) {
          //传送带生成
        }
      }
      return;
    },
  },
});
