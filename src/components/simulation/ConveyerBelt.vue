<script setup>

const props = defineProps({
    "gs_id": {
        required: true,
        type: String
    }
})
const emits = defineEmits(["delete"])
const handleDelete = () => {
    emits("delete",props.gs_id)
}

</script>

<template>
  <div class="max-height-width position-relative">
    <el-button class="sim-delete-btn" @click="handleDelete" type="danger" circle></el-button>
  </div>
</template>

<style scoped></style>
