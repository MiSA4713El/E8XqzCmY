// 代码生成时间: 2025-09-24 09:18:08
    // 导入Svelte的onMount生命周期函数
    import { onMount } from 'svelte';

    // 定义组件的props和状态
    export let inputJson;
    let formattedJson = '';
    let error = null;

    // 将JSON字符串转换为格式化的JSON字符串
    function formatJson(jsonString) {
        try {
            const parsedJson = JSON.parse(jsonString);
            return JSON.stringify(parsedJson, null, 2);
        } catch (e) {
            error = e.message;
            return '';
        }
    }

    // 组件挂载时执行的函数
    onMount(() => {
        // 如果提供了输入JSON，则立即格式化
        if (inputJson) {
            formattedJson = formatJson(inputJson);
        }
    });
</script>

<!-- 显示错误信息 -->
{#if error}
    <p style="color: red;">{error}</p>
{/if}

<!-- 输入区域 -->
<textarea bind:value={inputJson} on:input={(event) => formattedJson = formatJson(event.target.value)} rows="10" cols="50"></textarea>

<!-- 输出区域 -->
<textarea value={formattedJson} rows="10" cols="50" readonly></textarea>