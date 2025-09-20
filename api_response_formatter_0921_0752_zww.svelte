// 代码生成时间: 2025-09-21 07:52:40
        "use strict";
        // API Response Formatter component
        svelte.internal.component('svelte-api-response-formatter', (options) => {
            let apiResponse = ''; // Holds the API response
            let formattedResponse = ''; // Holds the formatted API response
            let errorMessage = ''; // Holds any error message

            // Function to format the API response
            const formatResponse = () => {
                try {
                    // Attempt to parse the API response as JSON
                    const parsedResponse = JSON.parse(apiResponse);
                    // Format the response in a human-readable format
                    formattedResponse = JSON.stringify(parsedResponse, null, 2);
                    errorMessage = ''; // Clear any error message on successful parsing
                } catch (error) {
                    // Handle parsing errors
                    formattedResponse = '';
                    errorMessage = `Error parsing response: ${error.message}`;
                }
            };

            // Function to update the API response
            const updateApiResponse = (event) => {
                apiResponse = event.target.value;
                formatResponse(); // Format the response when it's updated
            };

            // Return the component configuration
            return {
                oncreate() {
                    // Initialize the component
                },
                ondestroy() {
                    // Clean up any resources when the component is destroyed
                },
                data: {
                    apiResponse,
                    formattedResponse,
                    errorMessage,
                    updateApiResponse,
                    formatResponse
                },
                root: options => {
                    options.fragment`
                        <div class="api-response-formatter">
                            <textarea on:input={updateApiResponse} placeholder="Enter API response here..." autofocus></textarea>
                            <button on:click={formatResponse} disabled=${!apiResponse}>Format Response</button>
                            <pre>${formattedResponse || errorMessage}</pre>
                        </div>
                    `;
                }
            };
        });
    </script>
    <svelte-api-response-formatter></svelte-api-response-formatter>
</body>
</html>