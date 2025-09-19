// 代码生成时间: 2025-09-19 16:48:47
  import { onMount, onDestroy } from 'svelte';
  import ResizeObserver from 'resize-observer-polyfill';

  // 组件的属性，包含目标尺寸和图片数组
  export let targetWidth: number;
  export let targetHeight: number;
  export let images: string[];

  // 存储转换后的图片URL数组
  let resizedImages: string[] = [];

  // 组件挂载时执行的操作
  onMount(() => {
    resizedImages = images.map(image => resizeImage(image, targetWidth, targetHeight));
    // 组件销毁时清理工作
    onDestroy(() => {
      // 这里可以添加清理代码
    });
  });

  // 图片尺寸调整函数
  function resizeImage(imageSrc: string, width: number, height: number): string {
    try {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = width;
        canvas.height = height;

        // 计算缩放比例
        const scale = Math.min(width / img.naturalWidth, height / img.naturalHeight);
        const scaledWidth = img.naturalWidth * scale;
        const scaledHeight = img.naturalHeight * scale;

        // 调整画布尺寸并绘制图片
        ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);
        return canvas.toDataURL();
      };
      img.onerror = () => {
        throw new Error('Image load failed');
      };
      return '';
    } catch (error) {
      console.error('Resize image error:', error);
      return '';
    }
  }
</script>

<!-- 组件模板 -->
<div class="image-resizer">
  {#each resizedImages as image}
    <img src="{image}" alt="Resized Image" />
  {/each}
</div>