<script lang="ts">
    import { PUBLIC_GITHUB_REPO_URL } from '$env/static/public';
    import type { Snippet } from 'svelte';
    import type { LayoutData } from './$types';
    import highlightStyle from 'svelte-highlight/styles/github';

    type Props = {
        data: LayoutData;
        children: Snippet;
    };

    let { children, data }: Props = $props();
    const { exampleData } = data;
</script>

<svelte:head>
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html highlightStyle}
</svelte:head>

<nav>
    <div>
        <a href="/">Home</a>
    </div>
    <div>
        <a href={PUBLIC_GITHUB_REPO_URL} target="_blank">GitHub Repo</a>
    </div>
</nav>

<header>
    <h1>{exampleData.title}</h1>
    <a href="{PUBLIC_GITHUB_REPO_URL}/tree/main/{exampleData.githubPath}">Link to GitHub</a>
</header>

<hr />

{@render children()}

<style>
    header {
        margin-bottom: 2rem;
    }

    nav {
        padding: 1rem 0px;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
    }
</style>
