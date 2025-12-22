// 导入所有机器组件
import ConveyerBelt from '../components/simulation/ConveyerBelt.vue';
import RefineryFurnace from '../components/simulation/RefineryFurnace.vue';
import Crusher from '../components/simulation/Crusher.vue';
import AccessoryMachine from '../components/simulation/AccessoryMachine.vue';
import ShapingMachine from '../components/simulation/ShapingMachine.vue';
import SeedHarvester from '../components/simulation/SeedHarvester.vue';
import Planter from '../components/simulation/Planter.vue';
import EquipmentComponentMachine from '../components/simulation/EquipmentComponentMachine.vue';
import FillingMachine from '../components/simulation/FillingMachine.vue';
import PackagingMachine from '../components/simulation/PackagingMachine.vue';
import Grinder from '../components/simulation/Grinder.vue';
import ProtocolStorageBox from '../components/simulation/ProtocolStorageBox.vue';
import WarehouseDepositPort from '../components/simulation/WarehouseDepositPort.vue';
import WarehouseWithdrawalPort from '../components/simulation/WarehouseWithdrawalPort.vue';

// 组件映射表：key 对应机器唯一标识（与之前的 gs_id 前缀一致），value 是组件对象
export const machineComponentMap = {
  conveyerbelt: ConveyerBelt,
  refineryFurnace: RefineryFurnace,
  crusher: Crusher,
  accessoryMachine: AccessoryMachine,
  shapingMachine: ShapingMachine,
  seedHarvester: SeedHarvester,
  planter: Planter,
  equipmentComponentMachine: EquipmentComponentMachine,
  fillingMachine: FillingMachine,
  packagingMachine: PackagingMachine,
  grinder: Grinder,
  protocolStorageBox: ProtocolStorageBox,
  warehouseDepositPort: WarehouseDepositPort,
  warehouseWithdrawalPort: WarehouseWithdrawalPort,
};

export const machineDataFileMap = {
  refineryFurnace: 'furnance_1',
  crusher: 'grinder_1',
  accessoryMachine: 'cmpt_mc_1',
  shapingMachine: 'shaper_1',
  seedHarvester: 'seedcol_1',
  planter: 'planter_1',
  equipmentComponentMachine: 'winder_1',
  fillingMachine: 'filling_pd_mc_1',
  packagingMachine: 'tools_asm_mc_1',
  grinder: 'thickener_1',
  // —— jinlong 专属 —— | 这里还没有做组件，后续直接生成
  dismantlerMachine: 'dismantler_1',
  reactionPool: 'mix_pool_1',
  waterPump: 'pump_1',
  xiraniteFurnace: 'xiranite_oven_1',
}

export const machineNameMap = {
  conveyerbelt: '传送带',
  refineryFurnace: '精炼炉',
  crusher: '粉碎机',
  accessoryMachine: '配件机',
  shapingMachine: '塑型机',
  seedHarvester: '采种机',
  planter: '种植机',
  equipmentComponentMachine: '装备原件机',
  fillingMachine: '罐装机',
  packagingMachine: '封装机',
  grinder: '研磨机',
  protocolStorageBox: '存储箱',
  warehouseDepositPort: '仓库存货口',
  warehouseWithdrawalPort: '仓库取货口',
  // —— jinlong 专属 —— | 这里还没有做组件，后续直接生成
  dismantlerMachine: '拆解机',
  reactionPool: '反应池',
  waterPump: '水泵',
  xiraniteFurnace: '天有洪炉',
};

// 反向映射：中文名称 → 英文 key（方便根据中文查英文）
export const machineKeyByCN = Object.fromEntries(
  Object.entries(machineNameMap).map(([key, name]) => [name, key])
);

