import { Meta, StoryObj } from '@storybook/react';
import EntityPage from './EntityPage';
import { handlers as globalHandlers } from '../../../../../.storybook/mswHandlers.ts';
import ItemList from '@/components/molecules/ItemList/ItemList.tsx';
import { IBookProps } from '@/lib/types';
import PersonInfo from '@/components/molecules/PersonInfo/PersonInfo.tsx';
import { useTranslatorData } from '@/hooks/useTranslatorData.ts';

const meta: Meta<typeof EntityPage> = {
  title: 'Pages/EntityPage',
  component: EntityPage,
  parameters: {
    msw: {
      handlers: globalHandlers,
    },
    layout: 'padded',
  },
};

export default meta;

type Story = StoryObj<typeof EntityPage>;

export const Default: Story = {
  render: () => {
    return (
      <EntityPage
        useData={() => useTranslatorData('maria-skibniewska')}
        InfoComponent={({ entity }) => (
          <PersonInfo
            fullName={`${entity.firstName} ${entity.lastName}`}
            roleLabel="Translator"
            description={entity.description}
          />
        )}
        ItemsComponent={({ items }) => (
          <ItemList<IBookProps>
            items={items || []}
            emptyMessage="No publications found"
            getPrimaryText={(b) => b.polishTitle}
            onClickItem={() => {}}
          />
        )}
        itemsSectionTitle="Publications:"
      />
    );
  },
};

export const EmptyList: Story = {
  render: () => {
    return (
      <EntityPage
        useData={() => useTranslatorData('maria-skibniewska')}
        InfoComponent={({ entity }) => (
          <PersonInfo
            fullName={`${entity.firstName} ${entity.lastName}`}
            roleLabel="Translator"
            description={entity.description}
          />
        )}
        ItemsComponent={() => (
          <ItemList<IBookProps>
            items={[]}
            emptyMessage="No publications found"
            getPrimaryText={(b) => b.polishTitle}
            onClickItem={() => {}}
          />
        )}
        itemsSectionTitle="Publications:"
      />
    );
  },
};
