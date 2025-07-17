import { Meta, StoryObj } from '@storybook/react';
import FanZonePage from './FanZonePage';

const meta: Meta<typeof FanZonePage> = {
  title: 'Pages/FanZonePage',
  component: FanZonePage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'FanZone page includes header, separator and list of links.',
      },
    },
  },
};

export default meta;

type FanZoneStory = StoryObj<typeof FanZonePage>;

export const Default: FanZoneStory = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic view of the FanZone page with default links.',
      },
    },
  },
};
