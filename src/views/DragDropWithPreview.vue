<template>
  <div class="file-upload">
    <div
      class="drop-area"
      @dragover.prevent="store.handleDragOver"
      @drop.prevent="store.handleDrop"
      @dragleave="store.handleDragLeave"
    >
      <p v-if="!store.isDragging">Drag and drop files here</p>
      <p v-if="store.isDragging">Release to upload</p>
      <input type="file" ref="fileInput" style="display: none" @change="store.handleFileSelect" />
    </div>
    <div v-if="store.file" class="file-info">
      <p>File Name: {{ store.file.name }}</p>
      <p>File Size: {{ store.formatSize(store.file.size) }}</p>
      <img
        v-if="store.isImage"
        :src="store.imagePreview"
        alt="Image Preview"
        class="preview-image"
      />
    </div>
    <div v-if="store.uploading" class="progress-bar">
      <div :style="{ width: store.progress + '%' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDragDropStore } from '@/stores/DragDropStore'
const store = useDragDropStore()
</script>

<style scoped>
.file-upload {
  text-align: center;
  padding: 20px;
}

.drop-area {
  border: 2px dashed #ccc;
  padding: 20px;
  cursor: pointer;
}

.progress-bar {
  margin-top: 20px;
  height: 20px;
  background-color: #f0f0f0;
  position: relative;
}

.progress-bar div {
  height: 100%;
  background-color: #4caf50;
  width: 0;
  transition: width 0.3s ease-in-out;
}

.file-info {
  margin-top: 20px;
}

.preview-image {
  max-width: 100%;
  margin-top: 10px;
}
</style>
