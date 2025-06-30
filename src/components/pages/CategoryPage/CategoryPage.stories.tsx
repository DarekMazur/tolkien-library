import type { Meta, StoryObj } from '@storybook/react';
import CategoryPage from './CategoryPage';
import { ICategoryProps } from '@/lib/types';

// Mock data based on Tolkien's literary works
const mockLordOfTheRings: ICategoryProps = {
  id: '1',
  title: 'The Lord of the Rings',
  slug: 'lord-of-the-rings',
  pages: [
    {
      id: 'fellowship',
      title: 'The Fellowship of the Ring',
      slug: 'fellowship-of-the-ring',
      content: '',
    },
    {
      id: 'two-towers',
      title: 'The Two Towers',
      slug: 'two-towers',
      content: '',
    },
    {
      id: 'return-king',
      title: 'The Return of the King',
      slug: 'return-of-the-king',
      content: '',
    },
  ],
};

const mockSilmarillion: ICategoryProps = {
  id: '2',
  title: 'The Silmarillion',
  slug: 'silmarillion',
  pages: [
    {
      id: 'ainulindale',
      title: 'Ainulindalë: The Music of the Ainur',
      slug: 'ainulindale',
      content: '',
    },
    {
      id: 'valaquenta',
      title: 'Valaquenta: Account of the Valar',
      slug: 'valaquenta',
      content: '',
    },
    {
      id: 'quenta-silmarillion',
      title: 'Quenta Silmarillion: The History of the Silmarils',
      slug: 'quenta-silmarillion',
      content: '',
    },
    {
      id: 'akallabeth',
      title: 'Akallabêth: The Downfall of Númenor',
      slug: 'akallabeth',
      content: '',
    },
    {
      id: 'rings-of-power',
      title: 'Of the Rings of Power and the Third Age',
      slug: 'rings-of-power',
      content: '',
    },
  ],
};

const mockEmptyCategory: ICategoryProps = {
  id: '3',
  title: 'Unfinished Tales of Númenor and Middle-earth',
  slug: 'unfinished-tales',
  pages: [],
};

const mockChildrensStories: ICategoryProps = {
  id: '4',
  title: 'Stories for Children',
  slug: 'stories-for-children',
  pages: [
    {
      id: 'hobbit',
      title: 'The Hobbit, or There and Back Again',
      slug: 'hobbit',
      content: '',
    },
    {
      id: 'roverandom',
      title: 'Roverandom',
      slug: 'roverandom',
      content: '',
    },
    {
      id: 'mr-bliss',
      title: 'Mr. Bliss',
      slug: 'mr-bliss',
      content: '',
    },
    {
      id: 'father-christmas',
      title: 'Letters from Father Christmas',
      slug: 'father-christmas-letters',
      content: '',
    },
  ],
};

const mockHistoryOfMiddleEarth: ICategoryProps = {
  id: '5',
  title: 'The History of Middle-earth',
  slug: 'history-of-middle-earth',
  pages: Array.from({ length: 12 }, (_, index) => {
    const titles = [
      'The Book of Lost Tales, Part One',
      'The Book of Lost Tales, Part Two',
      'The Lays of Beleriand',
      'The Shaping of Middle-earth',
      'The Lost Road and Other Writings',
      'The Return of the Shadow',
      'The Treason of Isengard',
      'The War of the Ring',
      'Sauron Defeated',
      "Morgoth's Ring",
      'The War of the Jewels',
      'The Peoples of Middle-earth',
    ];
    return {
      id: `history-vol-${index + 1}`,
      title: `Volume ${index + 1}: ${titles[index]}`,
      slug: `volume-${index + 1}`,
      content: '',
    };
  }),
};

const mockLaterWorks: ICategoryProps = {
  id: '6',
  title: 'Later and Posthumous Works',
  slug: 'later-works',
  pages: [
    {
      id: 'children-of-hurin',
      title: 'The Children of Húrin',
      slug: 'children-of-hurin',
      content: '',
    },
    {
      id: 'beren-luthien',
      title: 'Beren and Lúthien',
      slug: 'beren-luthien',
      content: '',
    },
    {
      id: 'fall-of-gondolin',
      title: 'The Fall of Gondolin',
      slug: 'fall-of-gondolin',
      content: '',
    },
    {
      id: 'fall-of-numenor',
      title: 'The Fall of Númenor',
      slug: 'fall-of-numenor',
      content: '',
    },
    {
      id: 'nature-of-middle-earth',
      title: 'The Nature of Middle-earth',
      slug: 'nature-of-middle-earth',
      content: '',
    },
  ],
};

const meta: Meta<typeof CategoryPage> = {
  title: 'Pages/CategoryPage',
  component: CategoryPage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'CategoryPage component displays Tolkien literary work categories with navigation links to individual books and stories. Showcases the comprehensive bibliography of J.R.R. Tolkien using Material-UI Typography components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    category: {
      description:
        'Tolkien literary category containing title, slug and pages array with books/stories',
      control: { type: 'object' },
      table: {
        type: {
          summary: 'ICategoryProps',
          detail:
            '{ id: string; title: string; slug: string; pages?: Array<{ id: string; title: string; slug: string }> }',
        },
        category: 'Props',
      },
    },
  },
} satisfies Meta<typeof CategoryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LordOfTheRings: Story = {
  args: {
    category: mockLordOfTheRings,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The Lord of the Rings trilogy - Tolkien's masterpiece epic fantasy work displayed as a category with three volumes.",
      },
    },
  },
};

export const Silmarillion: Story = {
  args: {
    category: mockSilmarillion,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The Silmarillion with its five main sections - the foundational mythology of Middle-earth and its creation stories.',
      },
    },
  },
};

export const EmptyCategory: Story = {
  args: {
    category: mockEmptyCategory,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Unfinished Tales category with no available pages - demonstrates graceful handling of empty content.',
      },
    },
  },
};

export const UndefinedPages: Story = {
  args: {
    category: {
      id: '7',
      title: 'The Adventures of Tom Bombadil',
      slug: 'tom-bombadil',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Tom Bombadil poetry collection when pages property is undefined - shows robust error handling.',
      },
    },
  },
};

export const ChildrensStories: Story = {
  args: {
    category: mockChildrensStories,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tolkien's stories written for children, including The Hobbit and other beloved tales like Roverandom and Father Christmas letters.",
      },
    },
  },
};

export const SingleWork: Story = {
  args: {
    category: {
      id: '8',
      title: 'Smith of Wootton Major',
      slug: 'smith-of-wootton-major',
      pages: [
        {
          id: 'smith-story',
          title: 'Smith of Wootton Major',
          slug: 'smith-story',
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Single novella category - Smith of Wootton Major, one of Tolkien's later fairy tales.",
      },
    },
  },
};

export const ElvishTitles: Story = {
  args: {
    category: {
      id: '9',
      title: 'Tales of the Elder Days',
      slug: 'elder-days',
      pages: [
        {
          id: 'narn-i-chin-hurin',
          title: 'Narn i Chîn Húrin: The Tale of the Children of Húrin',
          slug: 'narn-i-chin-hurin',
        },
        {
          id: 'lay-of-leithian',
          title: 'The Lay of Leithian: Release from Bondage',
          slug: 'lay-of-leithian',
        },
        {
          id: 'tuor-fall-gondolin',
          title: 'Of Tuor and the Fall of Gondolin',
          slug: 'tuor-fall-gondolin',
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Category featuring Elvish titles and special characters commonly found in Tolkien's legendarium.",
      },
    },
  },
};

export const HistoryOfMiddleEarth: Story = {
  args: {
    category: mockHistoryOfMiddleEarth,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The complete 12-volume History of Middle-earth series compiled by Christopher Tolkien - demonstrates layout with extensive content lists.',
      },
    },
  },
};

export const LaterWorks: Story = {
  args: {
    category: mockLaterWorks,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Later and posthumous publications of Tolkien's works, including the three Great Tales and recent scholarly editions.",
      },
    },
  },
};

export const Interactive: Story = {
  args: {
    category: {
      id: 'interactive',
      title: 'Farmer Giles of Ham',
      slug: 'farmer-giles',
      pages: [
        {
          id: 'farmer-giles-story',
          title: 'Farmer Giles of Ham',
          slug: 'farmer-giles-story',
        },
        {
          id: 'leaf-by-niggle',
          title: 'Leaf by Niggle',
          slug: 'leaf-by-niggle',
        },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example featuring some of Tolkien's shorter works - customize through Storybook controls to explore different configurations.",
      },
    },
  },
};
