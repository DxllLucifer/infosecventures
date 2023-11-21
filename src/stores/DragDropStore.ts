import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDragDropStore = defineStore('store', () => {

const isDragging = ref(false);
const file = ref<File | null>(null);
const uploading = ref(false);
const progress = ref(0);
const fileInput = ref<HTMLInputElement | null>(null);

const handleDragOver = () => {
  isDragging.value = true;
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  if(event.dataTransfer)
  handleFiles(event.dataTransfer.files);
};

const handleFileSelect = () => {
  const input = fileInput.value;
  if (input) {
    if(input.files)
    handleFiles(input.files);
    input.value = '';
  }
};

const handleFiles = (files: FileList) => {
  if (files.length > 0) {
    file.value = files[0];
    uploadFile();
  }
};

const uploadFile = () => {
  uploading.value = true;

  // Simulate file upload
  const interval = setInterval(() => {
    if (progress.value < 100) {
      progress.value += 10;
    } else {
      clearInterval(interval);
      uploading.value = false;
      progress.value = 0;
      file.value = null;
    }
  }, 500);
};

const formatSize = (size: number) => {
  const kbSize = size / 1024;
  if (kbSize < 1024) {
    return kbSize.toFixed(2) + ' KB';
  } else {
    const mbSize = kbSize / 1024;
    return mbSize.toFixed(2) + ' MB';
  }
};

const isImage = computed(() => {
  return file.value ? file.value.type.startsWith('image') : false;
});

const imagePreview = computed(() => {
    if(file.value)
  return isImage.value ? URL.createObjectURL(file.value) : '';
});

  return { isDragging, file, uploading,isImage,imagePreview,progress, handleDragOver, handleDragLeave, handleDrop, handleFileSelect, uploadFile, formatSize }
})
