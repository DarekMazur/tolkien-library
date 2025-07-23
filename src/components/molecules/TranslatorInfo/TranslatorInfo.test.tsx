import TranslatorInfo from './TranslatorInfo';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { ITranslatorProps } from '@/lib/types';

describe('TranslatorInfo Component', () => {
  const baseProps: { translator: ITranslatorProps } = {
    translator: {
      id: 't1',
      firstName: 'Jane',
      lastName: 'Doe',
      description: 'Lorem ipsum',
    },
  };

  it('should render full name and role label correctly', () => {
    const { getByRole, container } = renderWithProviders(
      <TranslatorInfo translator={baseProps.translator} />,
    );

    const heading = getByRole('heading', { level: 1 });
    expect(heading.textContent).toBe('Jane Doe');

    const subtitle = getByRole('heading', { level: 2 });
    expect(subtitle.textContent).toBe('Translator');
    expect(subtitle).toHaveStyle({ color: 'rgb(29, 38, 59)' });

    expect(container).toMatchSnapshot();
  });

  it('should render description and divider when description prop is provided', () => {
    const propsWithDesc = {
      translator: {
        id: '2t',
        firstName: 'John',
        lastName: 'Smith',
        description: 'John is an experienced translator from German.',
      },
    };

    const { getByText, container } = renderWithProviders(
      <TranslatorInfo translator={propsWithDesc.translator} />,
    );

    const divider = container.querySelector('hr');
    expect(divider).not.toBeNull();
    expect(divider).toHaveStyle({ marginTop: '32px', marginBottom: '32px' });

    const descNode = getByText(propsWithDesc.translator.description);
    expect(descNode.tagName).toBe('P');

    expect(container).toMatchSnapshot();
  });
});
