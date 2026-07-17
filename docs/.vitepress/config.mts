import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Java Profiling Visualizer',
  description:
    'A profiling and visualization pipeline for analyzing Java performance within a version and across versions — treemaps, Sankey diagrams and differential streamgraphs built from async-profiler JFR execution traces.',
  lang: 'en-US',
  lastUpdated: true,
  cleanUrls: true,
  base: '/',

  head: [
    ['meta', { name: 'theme-color', content: '#e8590c' }]
  ],

  themeConfig: {

    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Single version visuals', link: '/profile/overview' },
      { text: 'Across versions comparison', link: '/differential/overview' },
      { text: 'Methodology', link: '/methodology/temporal-weighting' },
      //{ text: 'Case study', link: '/case-studies/gson' }
    ],

    socialLinks: [
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Repository</title><path d="M23.955 13.587l-1.342-4.135-2.664-8.189c-.135-.423-.73-.423-.867 0L16.418 9.45H7.582L4.919 1.263C4.783.84 4.185.84 4.05 1.264L1.386 9.45.044 13.587c-.121.375.014.789.331 1.023L12 23.054l11.625-8.443c.318-.235.453-.647.33-1.024"/></svg>'
        },
        link: 'https://gitlab.univ-lille.fr/malak.touat.etu/java-profiling-visualizer',
        ariaLabel: 'Project repository'
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Introduction', link: '/guide/introduction' },
            { text: 'Getting Started', link: '/guide/getting-started' }
          ]
        }
      ],
      '/profile/': [
        {
          text: 'Single version visuals',
          items: [
            { text: 'Overview', link: '/profile/overview' },
            { text: 'Parsing JFR Recordings', link: '/profile/jfr-parsing' },
            { text: 'Treemap Visualization', link: '/profile/treemap' },
            { text: 'Sankey Diagram', link: '/profile/sankey' }
          ]
        }
      ],
      '/differential/': [
        {
          text: 'Across versions comparison',
          items: [
            { text: 'Overview', link: '/differential/overview' },
            { text: 'Similarity-based Flexible Tree Matching', link: '/differential/sftm' },
            { text: 'Streamgraph Visualization', link: '/differential/streamgraph' }
          ]
        }
      ],
      '/methodology/': [
        {
          text: 'Methodology',
          items: [
            { text: 'Temporal Weighting', link: '/methodology/temporal-weighting' },
            { text: 'Profiling Modes', link: '/methodology/profiling-modes' },
            { text: 'Scope & Limitations', link: '/methodology/scope' }
          ]
        }
      ],
     /* '/case-studies/': [
        {
          text: 'Case studies',
          items: [
            { text: 'Gson', link: '/case-studies/gson' }
          ]
        }
      ]*/
    },

    outline: { level: [2, 3], label: 'On this page' },

    search: { provider: 'local' },

  },

  markdown: {
    math: true,
    theme: { light: 'github-light', dark: 'github-dark' }
  }
})
