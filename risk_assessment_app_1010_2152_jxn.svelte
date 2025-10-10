// 代码生成时间: 2025-10-10 21:52:41
  import { onMount, createEventDispatcher } from 'svelte';
\
  
\
  // Define the event dispatcher for component communication
\
  const dispatch = createEventDispatcher();
\
  
\
  // Define the risk assessment model
\
  interface RiskAssessmentModel {
\
    riskLevel: number;
\
    riskScore: number;
\
    comments?: string;
\
  }
\
  
\
  // Risk levels definitions
\
  const riskLevels = [
\
    { value: 0, label: 'Very Low' },
\
    { value: 1, label: 'Low' },
\
    { value: 2, label: 'Moderate' },
\
    { value: 3, label: 'High' },
\
    { value: 4, label: 'Very High' }
\
  ];
\
  
\
  // State for the current risk assessment
\
  let riskAssessment: RiskAssessmentModel = { riskLevel: 0, riskScore: 0 };
\
  
\
  // Function to calculate risk score based on user input
\
  function calculateRiskScore(riskLevel: number): number {
\
    switch (riskLevel) {
\
      case 0: return 0;
\
      case 1: return 20;
\
      case 2: return 40;
\
      case 3: return 60;
\
      case 4: return 80;
\
      default: throw new Error('Invalid risk level');
\
    }
\
  }
\
  
\
  // On mount, initialize risk assessment
\
  onMount(() => {
\
    dispatch('initializeRiskAssessment', { riskLevel: 0, riskScore: calculateRiskScore(0) });
\
  });
\
  
\
  // Event handler for risk level changes
\
  function handleRiskLevelChange(event: Event) {
\
    const target = event.target as HTMLSelectElement;
\
    const newRiskLevel = parseInt(target.value);
\
    
\
    if (!isNaN(newRiskLevel)) {
\
      riskAssessment = {
\
        ...riskAssessment,
\
        riskLevel: newRiskLevel,
\
        riskScore: calculateRiskScore(newRiskLevel)
\
      };
\
      dispatch('riskLevelChanged', { riskLevel: newRiskLevel, riskScore: calculateRiskScore(newRiskLevel) });
\
    } else {
\
      console.error('Risk level value is invalid');
\
    }
\
  }
\
</script>
\

\
<!-- UI for the risk assessment system -->
\
<main>
\
  <h1>Risk Assessment System</h1>
\
  <section>
\
    <label for="riskLevel">Risk Level:</label>
\
    <select id="riskLevel" bind:value={riskAssessment.riskLevel} on:change={handleRiskLevelChange}>
\
      {#each riskLevels as level}
\
        <option value={level.value}>{level.label}</option>
\
      {/each}
\
    </select>
\
  </section>
\
  
\
  <section>
\
    <p>Risk Score: {riskAssessment.riskScore}</p>
\
  </section>
\
  
\
  <section>
\
    <label for="comments">Additional Comments:</label>
\
    <textarea id="comments" bind:value={riskAssessment.comments}></textarea>
\
  </section>
\
  
\
  <button on:click={() => dispatch('submitRiskAssessment', riskAssessment)}>Submit Assessment</button>
\
</main>