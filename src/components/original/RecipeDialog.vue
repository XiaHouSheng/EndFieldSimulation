<script setup>
import RecipeItem from "./RecipeItem.vue";
import { machineDataFileMap, machineNameMap } from "../../utils/MachineMap";
import { RecipeData } from "../../utils/DataMap";
import { useRootStore } from "../../stores/SimStore";
import { computed } from "vue";
const props = defineProps({
  gs_id: {
    type: String,
    default: "refineryFurnace_123_123",
  },
});
const rootStore = useRootStore();
const chooseRecipe = computed(() => rootStore.gridWidgets[props.gs_id].recipe);

const machineId = props.gs_id.split("_")[0];
const machineFileId = machineDataFileMap[machineId];
const recipes = Object.values(RecipeData[machineFileId]);

function handleRecipeSelect(targetId) {
  rootStore.gridWidgets[props.gs_id].recipe = targetId;
  
}
</script>

<template>
  <div class="display-flex flex-direation-col">
    <div class="display-flex flex-direation-col sheng-recipe-header">
      <h1>{{ machineNameMap[machineId] }} 当前配方</h1>
      <RecipeItem
        :gs_id="props.gs_id"
        :target-id="chooseRecipe"
        :show-btn="false"
      ></RecipeItem>
    </div>
    <h1>{{ machineNameMap[machineId] }} 可选配方</h1>
    <div class="sheng-recipe-grid">
      <RecipeItem
        v-for="value of recipes"
        :gs_id="props.gs_id"
        :target-id="value.id"
        @handle-recipe-select="handleRecipeSelect"
      ></RecipeItem>
    </div>
  </div>
</template>

<style scoped>
.sheng-recipe-grid {
  overflow: auto;
  display: grid;
  margin-top: 8px;
  grid-template-columns: repeat(2, 1fr);
  max-height: 300px;
}
.sheng-recipe-header {
  gap: 8px;
}
h1 {
  margin: 0;
  text-align: left;
}
</style>
