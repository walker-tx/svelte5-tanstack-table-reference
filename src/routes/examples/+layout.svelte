<script lang="ts">
    import 'highlight.js/styles/github.css';
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';

    type Props = {
        data: LayoutData;
        children: Snippet;
    };

    let { children, data }: Props = $props();
    const { exampleData, repo_url } = data;
</script>

<nav>
    <div>
        <a href="/">Home</a>
    </div>
    <div>
        <a href={repo_url} target="_blank">GitHub Repo</a>
    </div>
</nav>

<header>
    <h1>{exampleData.title}</h1>
    <a href="{repo_url}/tree/main/{exampleData.githubPath}">Link to GitHub</a>
</header>

{@render children()}

<style>
    header {
        margin-bottom: 2rem;
    }

    nav {
        padding: 1rem 0;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
    }
</style>
