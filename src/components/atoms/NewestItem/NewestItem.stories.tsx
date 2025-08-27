import type { Meta, StoryObj } from '@storybook/react';
import NewestItem from './NewestItem';
import { EPublicationType } from '@/lib/types';

const meta: Meta<typeof NewestItem> = {
  title: 'Components/Atoms/NewestItem',
  component: NewestItem,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A component that displays the latest item of a specific type (user or entry). The hook uses user data from useMe and formats the display based on the content type.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['user', 'entry'],
      description: 'Specifies whether to display the latest user or entry',
    },
    content: {
      control: 'object',
      description:
        'Optional content data (IUser or TPublications) used by the hook to generate displayText and link',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockUserContent = {
  id: 'bilbo-baggins-123',
  userName: 'BilboBaggins',
  email: 'bilbo.baggins@shire.me',
  emailVerified: true,
  avatar: 'https://example.com/avatar.jpg',
  createdAt: new Date('2024-01-15T10:30:00Z'),
  isBanned: false,
  role: {
    id: 'user',
    name: 'User',
  },
};

const mockCurrentUserContent = {
  id: 'current-user-456',
  userName: 'CurrentUser',
  email: 'current@example.com',
  emailVerified: true,
  avatar: 'https://example.com/current-avatar.jpg',
  createdAt: new Date('2024-02-20T14:15:00Z'),
  isBanned: false,
  role: {
    id: 'user',
    name: 'User',
  },
};

const mockBookContent = {
  id: '1',
  originalTitle: 'The Hobbit',
  polishTitle: 'Hobbit, czyli tam i z powrotem',
  author: 'J.R.R. Tolkien',
  createdAt: new Date('2024-03-10T09:20:00Z'),
  translator: {
    id: 'mariaskibniewska',
    firstName: 'Maria',
    lastName: 'Skibniewska',
  },
  publisher: {
    title: 'Rebis',
    id: 'rebis',
  },
  year: 2020,
  cover: 'Miękka',
  isbn: '9781234567897',
};

const mockTranslatorContent = {
  id: 'mariaskibniewska',
  firstName: 'Maria',
  lastName: 'Skibniewska',
  createdAt: new Date('2024-01-05T16:45:00Z'),
  description: 'Polska tłumaczka literatury pięknej.',
};

const mockPublisherContent = {
  id: 'rebis',
  title: 'Rebis',
  createdAt: new Date('2024-02-28T11:10:00Z'),
  description: 'Wydawnictwo założone w 1990 roku w Poznaniu.',
};

const mockPublicationContent = {
  id: '2',
  title: 'Inklingowie : C. S. Lewis, J. R. R. Tolkien, Charles Williams i ich przyjaciele',
  type: EPublicationType.PARTIAL,
  author: 'Humphrey Carpenter',
  createdAt: new Date('2024-04-12T13:30:00Z'),
  publisher: {
    title: 'Zysk i S-ka',
    id: 'zysk',
  },
  issn: '83-7150-663-5',
  year: '1999',
};

export const NewestUserNoContent: Story = {
  args: {
    type: 'user',
  },
};

export const NewestUserWithContent: Story = {
  args: {
    type: 'user',
    content: mockUserContent,
  },
};

export const NewestCurrentUser: Story = {
  args: {
    type: 'user',
    content: mockCurrentUserContent,
  },
  parameters: {
    docs: {
      description: {
        story:
          'When the ID content corresponds to the current user from useMe, “(you)” is displayed instead of the creation date.',
      },
    },
  },
};

export const NewestEntryNoContent: Story = {
  args: {
    type: 'entry',
  },
};

export const NewestBookEntry: Story = {
  args: {
    type: 'entry',
    content: mockBookContent,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The book generates a link to /library/books/[slug] based on the latest title returned by getLatest().',
      },
    },
  },
};

export const NewestTranslatorEntry: Story = {
  args: {
    type: 'entry',
    content: mockTranslatorContent,
  },
  parameters: {
    docs: {
      description: {
        story:
          'The translator generates a link to /library/translator/[slug] based on the first and last name.',
      },
    },
  },
};

export const NewestPublisherEntry: Story = {
  args: {
    type: 'entry',
    content: mockPublisherContent,
  },
  parameters: {
    docs: {
      description: {
        story: 'The publisher generates a link to /library/publisher/[slug] based on the title.',
      },
    },
  },
};

export const NewestPublicationEntry: Story = {
  args: {
    type: 'entry',
    content: mockPublicationContent,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Publications that are not books, translators, or publishers display only text without a link.',
      },
    },
  },
};

export const EpubPublicationEntry: Story = {
  args: {
    type: 'entry',
    content: {
      id: '3',
      title: 'Anthropos? PODRÓŻ DO ŹRÓDŁA',
      type: EPublicationType.EPUB,
      author: 'Rafał Kowalski',
      createdAt: new Date('2024-05-15T08:45:00Z'),
      publisher: {
        title: 'Wydział Filologiczny, Uniwersytet Śląski',
        id: 'us-katowice',
      },
      issn: '1730-9549',
      year: '26/2017',
      description: '(artykuł) Wyprawa do źródła magii w Śródziemiu',
    },
  },
};

export const EntryWithNoLatestTitle: Story = {
  args: {
    type: 'entry',
    content: {
      id: '4',
      createdAt: new Date('2024-06-01T12:00:00Z'),
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'When getLatest() returns null or an empty string, “No entries” is displayed.',
      },
    },
  },
};
