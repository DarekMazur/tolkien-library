import type { Meta, StoryObj } from '@storybook/react';
import BoardStats from '@/components/molecules/BoardStats/BoardStats';
import {
  EPublicationType,
  IBookProps,
  IFanEditionsProps,
  IFanzinProps,
  IPublicationProps,
  IUser,
  TPublications,
} from '@/lib/types';
import { faker } from '@faker-js/faker';

const meta = {
  title: 'Components/Molecules/BoardStats',
  component: BoardStats,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The BoardStats component displays the latest user and the latest publication entry.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    latestUser: {
      description: 'Latest registered user to view',
      control: 'object',
    },
    latestEntry: {
      description: 'Latest publication entry to display',
      control: 'object',
    },
  },
} satisfies Meta<typeof BoardStats>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockUser: IUser = {
  id: '1',
  avatar: 'https://example.com/avatar.png',
  email: 'bilbo.baggins@shire.me',
  emailVerified: true,
  userName: 'bilbo_baggins',
  createdAt: new Date('2023-01-15T10:30:00Z'),
  isBanned: false,
  role: {
    id: 'user',
    roleName: 'User',
    roleShorthand: 'user',
    createdAt: new Date(faker.date.past()),
  },
};

const mockBook: IBookProps = {
  id: '1',
  originalTitle: 'The Hobbit',
  polishTitle: 'Hobbit, czyli tam i z powrotem',
  author: 'J.R.R. Tolkien',
  translator: {
    id: 'mariaskibniewska',
    firstName: 'Maria',
    lastName: 'Skibniewska',
    description:
      'Polska tłumaczka, głównie anglojęzycznej i francuskojęzycznej literatury pięknej.',
    createdAt: new Date(faker.date.past()),
  },
  publisher: {
    id: 'rebis',
    title: 'Rebis',
    description: 'Wydawnictwo założone w sierpniu 1990 w Poznaniu.',
    createdAt: new Date(faker.date.past()),
  },
  year: 2020,
  publicationNumber: 5,
  cover: 'Miękka',
  series: 'Middle-earth',
  isbn: '9781234567897',
  createdAt: new Date(faker.date.past()),
};

const mockPublication: IPublicationProps = {
  id: '2',
  title: 'Inklingowie : C. S. Lewis, J. R. R. Tolkien, Charles Williams i ich przyjaciele',
  type: EPublicationType.PARTIAL,
  author: 'Humphrey Carpenter',
  publisher: {
    id: 'zysk',
    title: 'Zysk i S-ka',
    description: 'Wydawnictwo z siedzibą w Poznaniu przy ulicy Wielkiej na Starym Mieście.',
    createdAt: new Date(faker.date.past()),
  },
  issn: '83-7150-663-5',
  year: '1999',
  description: 'Fascynująca historia przyjaźni między wielkimi pisarzami XX wieku.',
  createdAt: new Date(faker.date.past()),
};

const mockFanzin: IFanzinProps = {
  id: '3',
  title: 'Aiglos',
  version: 'Papier',
  publisher: {
    id: 'stskf',
    title: 'Sekcja Tolkienowska Śląskiego Klubu Fantastyki',
    description: 'Organizacja miłośników twórczości J.R.R. Tolkiena.',
    createdAt: new Date(faker.date.past()),
  },
  numbers: '26',
  startDate: new Date('2004-01-01'),
  lastIssueDate: new Date('2024-12-01'),
  createdAt: new Date(faker.date.past()),
};

const mockFanEdition: IFanEditionsProps = {
  id: '4',
  cover: 'https://example.com/cover.jpg',
  title: 'Syn Gondoru (wyd I)',
  year: 2006,
  description: 'fanfick Katarzyny Chmiel-Gugulskiej',
  isMumakil: true,
  createdAt: new Date(faker.date.past()),
};

const mockUserWithLongName: IUser = {
  ...mockUser,
  id: '2',
  userName: 'frodo_baggins_of_bag_end_hobbiton_shire_middle_earth',
  email: 'frodo.baggins.very.long.email.address@bag-end.hobbiton.shire.middle-earth.me',
};

export const Default: Story = {
  args: {
    latestUser: mockUser,
    latestEntry: mockBook as TPublications,
  },
};

export const WithPublication: Story = {
  args: {
    latestUser: mockUser,
    latestEntry: mockPublication,
  },
};

export const WithFanzin: Story = {
  args: {
    latestUser: mockUser,
    latestEntry: mockFanzin as TPublications,
  },
};

export const WithFanEdition: Story = {
  args: {
    latestUser: mockUser,
    latestEntry: mockFanEdition as TPublications,
  },
};

export const WithLongContent: Story = {
  args: {
    latestUser: mockUserWithLongName,
    latestEntry: {
      ...mockPublication,
      title:
        'A very long publication title that may not fit in a single line and will require appropriate text formatting in the component',
      author: 'A very long author name, which may also cause display problems',
      description:
        'A very long description of the publication, which contains a lot of details and information that may be problematic when displayed in the limited space of the component.',
    },
  },
};

export const WithoutUser: Story = {
  args: {
    latestEntry: mockPublication,
  },
};

export const WithoutEntry: Story = {
  args: {
    latestUser: mockUser,
  },
};

export const Empty: Story = {
  args: {},
};

export const WithEPubPublication: Story = {
  args: {
    latestUser: mockUser,
    latestEntry: {
      ...mockPublication,
      type: EPublicationType.EPUB,
      title: 'Cyfrowa publikacja o Tolkienu',
      description: 'Publikacja dostępna wyłącznie w formie elektronicznej.',
    },
  },
};

export const WithIncludingPublication: Story = {
  args: {
    latestUser: mockUser,
    latestEntry: {
      ...mockPublication,
      type: EPublicationType.INCLUDING,
      title: 'Antologia zawierająca teksty o Tolkienie',
      description: 'Zbiór tekstów różnych autorów dotyczących twórczości Tolkiena.',
    },
  },
};

export const WithBannedUser: Story = {
  args: {
    latestUser: {
      ...mockUser,
      isBanned: true,
      userName: 'banned_user',
    },
    latestEntry: mockBook as TPublications,
  },
};

export const WithUnverifiedUser: Story = {
  args: {
    latestUser: {
      ...mockUser,
      emailVerified: false,
      userName: 'unverified_user',
    },
    latestEntry: mockPublication,
  },
};
