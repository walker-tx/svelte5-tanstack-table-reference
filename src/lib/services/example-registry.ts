type ExampleRegistryItem = {
  id: string;
  title: string;
  pathname: string;
  githubPath: string;
  links?: { title: string; href: string }[];
};

const registry: ExampleRegistryItem[] = [
  {
    id: 'basic',
    title: 'Basic Table',
    pathname: '/examples/basic',
    githubPath: 'src/routes/examples/basic',
    links: [
      {
        title: 'Data Guide',
        href: 'https://tanstack.com/table/latest/docs/guide/data'
      },
      {
        title: 'Column Defs Guide',
        href: 'https://tanstack.com/table/latest/docs/guide/column-defs'
      }
    ]
  },
  {
    id: 'grid-view',
    title: 'Grid View',
    pathname: '/examples/grid-view',
    githubPath: 'src/routes/examples/grid-view',
    links: []
  },
  {
    id: 'rendering-snippets',
    title: 'Rendering Snippets',
    pathname: '/examples/rendering-snippets',
    githubPath: 'src/routes/examples/rendering-snippets',
    links: [
      {
        title: 'Column Defs Guide',
        href: 'https://tanstack.com/table/latest/docs/guide/column-defs'
      },
      {
        title: 'Cells Guide',
        href: 'https://tanstack.com/table/latest/docs/guide/cells'
      }
    ]
  },
  {
    id: 'rendering-components',
    title: 'Rendering Components',
    pathname: '/examples/rendering-components',
    githubPath: 'src/routes/examples/rendering-components',
    links: [
      {
        title: 'Column Defs Guide',
        href: 'https://tanstack.com/table/latest/docs/guide/column-defs'
      },
      {
        title: 'Cells Guide',
        href: 'https://tanstack.com/table/latest/docs/guide/cells'
      }
    ]
  },
  {
    id: 'reactive-data',
    title: 'Reactive Data',
    pathname: '/examples/reactive-data',
    githubPath: 'src/routes/examples/reactive-data',
    links: [
      {
        title: 'Stable References (Data Guide)',
        href: 'https://tanstack.com/table/latest/docs/guide/data#give-data-a-stable-reference'
      }
    ]
  },
  {
    id: 'row-selection',
    title: 'Row Selection',
    pathname: '/examples/row-selection',
    githubPath: 'src/routes/examples/row-selection',
    links: [
      {
        title: 'Row Selection API Reference',
        href: 'https://tanstack.com/table/latest/docs/api/features/row-selection'
      }
    ]
  }
];

export default registry;
