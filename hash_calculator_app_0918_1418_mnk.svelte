// 代码生成时间: 2025-09-18 14:18:26
// Hash Calculator App using Svelte framework
// This app allows users to calculate hash values for input strings.

<script lang="javascript">
  import { onMount, onDestroy } from 'svelte';
  import CryptoJS from 'crypto-js';

  // State to store the input string and the calculated hash
  let inputString = '';
  let hashValue = '';

  // Function to calculate the hash value
  function calculateHash() {
    try {
      // Using CryptoJS to calculate SHA256 hash
      hashValue = CryptoJS.SHA256(inputString).toString();
    } catch (error) {
      console.error('Error calculating hash:', error);
      hashValue = 'Error calculating hash.';
    }
  }

  // On component mount, clear the hash value
  onMount(() => {
    hashValue = '';
  });

  // On component destroy, clean up any resources if necessary
  onDestroy(() => {
    // No resources to clean up in this simple example
  });

  // Function to update the input string
  function updateInput(event) {
    inputString = event.target.value;
  }
</script>

<!-- Input field for user to enter the string to be hashed -->
<input type="text" placeholder="Enter string..." on:input={updateInput} />

<!-- Button to trigger hash calculation -->
<button on:click={calculateHash}>Calculate Hash</button>

<!-- Display the calculated hash or error message -->
<div>{hashValue}</div>