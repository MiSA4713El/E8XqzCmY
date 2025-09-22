// 代码生成时间: 2025-09-23 00:54:38
        // TimerScheduler.svelte component
        svelte.register_component("TimerScheduler", class TimerScheduler extends svelte.Component {
            oncreate() {
                this.timers = [];
            }

            // Schedule a new task
            addTask(task) {
                if (!task || typeof task.run !== 'function') {
                    throw new Error("Invalid task provided. Task must be an object with a run method.");
                }

                const timerId = setInterval(() => {
                    try {
                        task.run();
                    } catch (error) {
                        console.error("Error running task: ", error);
                        clearInterval(timerId);
                        this.removeTimer(timerId);
                    }
                }, task.interval || 1000);

                this.timers.push(timerId);
            }

            // Remove a scheduled task by timerId
            removeTimer(timerId) {
                const index = this.timers.indexOf(timerId);
                if (index > -1) {
                    clearInterval(timerId);
                    this.timers.splice(index, 1);
                }
            }

            // Clear all scheduled tasks
            clearAll() {
                this.timers.forEach(timerId => clearInterval(timerId));
                this.timers = [];
            }

            // Component destructor to clear timers on dismount
            ondestroy() {
                this.clearAll();
            }
        });
    </script>
    
    <TimerScheduler bind:this={scheduler}>
        <button on:click="addTask">Add Task</button>
        <button on:click="clearAll">Clear All</button>
    </TimerScheduler>

    <script>
        // Example usage of TimerScheduler component
        function setupScheduler() {
            const scheduler = new TimerScheduler({ target: document.body });

            // Add a task that runs every 2 seconds
            scheduler.addTask({
                run: () => {
                    console.log("Task ran at: ", new Date().toLocaleTimeString());
                },
                interval: 2000
            });
        }

        // Initialize the scheduler when the DOM is ready
        document.addEventListener('DOMContentLoaded', setupScheduler);
    </script>
</body>
</html>