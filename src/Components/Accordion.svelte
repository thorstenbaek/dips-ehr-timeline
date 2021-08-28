<script>
    import { slide } from "svelte/transition";
    export let title;
    let showContent = true;
    
    const showCollapse = () => {
        showContent = !showContent;
    }
</script>

<div class="accordion">
    <div class="header" on:click={() => showCollapse()}>            
        {#if showContent}
            <span class="material-icons button">expand_less</span>
        {:else}
            <span class="material-icons button">expand_more</span>
        {/if}
        <b>{title}</b>
    </div>
    {#if showContent}
        <div class="content" transition:slide>
            <slot/>
        </div>    
    {/if}
</div>

<style>
    .accordion {
      margin: 4px;
      background-color: transparent;
    }
    .header {
      padding: 4px;
      left: 25px;
      transition: 200ms ease-in-out;
      
    }
    .content { 
        position: relative;
        padding: 0 0 0 28px;              
    }
    .button {                
        width: 16px;
        vertical-align: text-bottom;        
        padding: 0 4px 0 0;        
        cursor: pointer;
    }
    
</style>