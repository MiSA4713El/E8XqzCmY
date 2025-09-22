// 代码生成时间: 2025-09-22 14:59:49
// sorting_algorithm_svelte.js
// This Svelte component demonstrates a sorting algorithm.

import { onMount } from 'svelte';

// Simple Bubble Sort function
function bubbleSort(arr) {
  if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('Input must be a non-empty array.');
  }

  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        // Swap elements
        let temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return arr;
}

// Svelte component
export default function() {
  // State to hold the array to be sorted
  let arrayToSort = [64, 34, 25, 12, 22, 11, 90];
  // State to hold the sorted array
  let sortedArray = [];

  // Function to handle sorting
  function sortArray() {
    try {
      sortedArray = bubbleSort([...arrayToSort]);
    } catch (error) {
      console.error(error.message);
    }
  }

  onMount(() => {
    sortArray();
  });

  return {
    arrayToSort,
    sortedArray,
    sortArray,
  };
}
