import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import ItemList from './ItemList';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import { ReactElement } from 'react';

const customRender = (ui: ReactElement) => renderWithProviders(ui);

describe('ItemList component', () => {
  it('renders the list with items and matches snapshot', () => {
    const items = [
      {
        id: '1',
        originalTitle: 'The Hobbit',
        polishTitle: 'Hobbit, czyli tam i z powrotem',
        author: 'J.R.R. Tolkien',
        translator: {
          id: 'mariaskibniewska',
          firstName: 'Maria',
          lastName: 'Skibniewska',
          description:
            'Polska tłumaczka, głównie anglojęzycznej i francuskojęzycznej literatury pięknej. Pierwszą książką J.R.R. Tolkiena, którą Skibniewska przetłumaczyła był Hobbit, wydany po polsku w 1960 przez Wydawnictwo Iskry[31]. Natomiast umowę na przekład Władcy Pierścieni podpisała z „Czytelnikiem” już w 1958. Nie ma żadnych świadectw z przebiegu jej pracy. Wiadomo tylko, że w czerwcu 1959 napisała list do wydawnictwa Allen & Unwin, z pytaniami o wskazówki pomocne przy tłumaczeniu, który przekazano Tolkienowi. Ten obiecał szybką odpowiedź, jednak ze względu na problemy rodzinne, przez dłuższy czas jej nie udzielił. Dopiero po ponagleniach ze strony „Czytelnika” przekazał kilka ogólnych wskazówek, które zawarł w liście do Allen & Unwin, by przesłano je Skibniewskiej. Nie ma śladów żadnej bezpośredniej korespondencji między pisarzem a polską tłumaczką, być może jednak jej list, który przekazano Tolkienowi, znajduje się w spuściźnie po nim w Bodleian Library.',
        },
        publisher: {
          title: 'Rebis',
          id: 'rebis',
          description: '',
        },
        year: 2020,
        publicationNumber: 5,
        cover: 'Miękka',
        series: 'Middle-earth',
        isbn: '9781234567897',
      },
      {
        id: '2',
        originalTitle: 'The Lord of the Rings',
        polishTitle: 'Władca Pierścieni',
        author: 'J.R.R. Tolkien',
        translator: {
          id: 'mariaskibniewska',
          firstName: 'Maria',
          lastName: 'Skibniewska',
          description:
            'Polska tłumaczka, głównie anglojęzycznej i francuskojęzycznej literatury pięknej. Pierwszą książką J.R.R. Tolkiena, którą Skibniewska przetłumaczyła był Hobbit, wydany po polsku w 1960 przez Wydawnictwo Iskry[31]. Natomiast umowę na przekład Władcy Pierścieni podpisała z „Czytelnikiem” już w 1958. Nie ma żadnych świadectw z przebiegu jej pracy. Wiadomo tylko, że w czerwcu 1959 napisała list do wydawnictwa Allen & Unwin, z pytaniami o wskazówki pomocne przy tłumaczeniu, który przekazano Tolkienowi. Ten obiecał szybką odpowiedź, jednak ze względu na problemy rodzinne, przez dłuższy czas jej nie udzielił. Dopiero po ponagleniach ze strony „Czytelnika” przekazał kilka ogólnych wskazówek, które zawarł w liście do Allen & Unwin, by przesłano je Skibniewskiej. Nie ma śladów żadnej bezpośredniej korespondencji między pisarzem a polską tłumaczką, być może jednak jej list, który przekazano Tolkienowi, znajduje się w spuściźnie po nim w Bodleian Library.',
        },
        publisher: {
          title: 'Rebis',
          id: 'rebis',
          description: '',
        },
        year: 2019,
        publicationNumber: 3,
        cover: 'Twarda',
        series: 'Middle-earth',
        isbn: '9781234567890',
      },
      {
        id: '3',
        originalTitle: 'Unfinished Tales',
        polishTitle: 'Niedokończone opowieści',
        author: 'J.R.R. Tolkien',
        translator: {
          id: 'mariaskibniewska',
          firstName: 'Maria',
          lastName: 'Skibniewska',
          description:
            'Polska tłumaczka, głównie anglojęzycznej i francuskojęzycznej literatury pięknej. Pierwszą książką J.R.R. Tolkiena, którą Skibniewska przetłumaczyła był Hobbit, wydany po polsku w 1960 przez Wydawnictwo Iskry[31]. Natomiast umowę na przekład Władcy Pierścieni podpisała z „Czytelnikiem” już w 1958. Nie ma żadnych świadectw z przebiegu jej pracy. Wiadomo tylko, że w czerwcu 1959 napisała list do wydawnictwa Allen & Unwin, z pytaniami o wskazówki pomocne przy tłumaczeniu, który przekazano Tolkienowi. Ten obiecał szybką odpowiedź, jednak ze względu na problemy rodzinne, przez dłuższy czas jej nie udzielił. Dopiero po ponagleniach ze strony „Czytelnika” przekazał kilka ogólnych wskazówek, które zawarł w liście do Allen & Unwin, by przesłano je Skibniewskiej. Nie ma śladów żadnej bezpośredniej korespondencji między pisarzem a polską tłumaczką, być może jednak jej list, który przekazano Tolkienowi, znajduje się w spuściźnie po nim w Bodleian Library.',
        },
        publisher: {
          title: 'Rebis',
          id: 'rebis',
          description: '',
        },
        year: 2021,
        publicationNumber: 2,
        cover: 'Miękka',
        series: null,
        isbn: '123INVALID',
      },
      {
        id: '4',
        originalTitle: 'The Silmarillion',
        polishTitle: 'Silmarillion',
        author: 'J.R.R. Tolkien',
        translator: {
          firstName: 'Joanna',
          lastName: 'Kokot',
          id: 'joannakokot',
          description: '',
        },
        publisher: {
          title: 'Amber',
          id: 'amber',
          description: '',
        },
        year: 2022,
        publicationNumber: 1,
        cover: 'Twarda',
        series: 'Middle-earth',
        isbn: '9780123456789',
      },
      {
        id: '5',
        originalTitle: 'The Children of Húrin',
        polishTitle: 'Dzieci Húrina',
        author: 'J.R.R. Tolkien',
        translator: {
          firstName: 'Joanna',
          lastName: 'Kokot',
          id: 'joannakokot',
          description: '',
        },
        publisher: {
          title: 'Amber',
          id: 'amber',
          description: '',
        },
        year: 2018,
        publicationNumber: 7,
        cover: 'Miękka',
        series: 'Middle-earth',
        isbn: '9780987654321',
      },
    ];

    const { container } = customRender(
      <ItemList items={items} getPrimaryText={(i) => i.polishTitle} />,
    );

    items.forEach((item) => expect(screen.getByText(item.polishTitle)).toBeInTheDocument());
    expect(container).toMatchSnapshot();
  });

  it('displays the empty message when items is null', () => {
    customRender(<ItemList items={null} getPrimaryText={(i) => i as never} />);

    expect(screen.getByText('No items found')).toBeVisible();
  });

  it('displays the empty message when items array is empty', () => {
    customRender(<ItemList items={[]} getPrimaryText={(i: string) => i} />);

    expect(screen.getByText('No items found')).toBeVisible();
  });

  it('calls onClickItem callback with correct item', async () => {
    const items = [
      { id: 1, name: 'Alpha' },
      { id: 2, name: 'Beta' },
    ];
    const handleClick = vi.fn();
    const user = userEvent.setup();

    customRender(
      <ItemList items={items} getPrimaryText={(i) => i.name} onClickItem={handleClick} />,
    );

    await user.click(screen.getByRole('button', { name: 'Beta' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(items[1]);
  });

  it('applies expected sx styles to List element', () => {
    const items = [
      {
        id: '1',
        originalTitle: 'The Hobbit',
        polishTitle: 'Hobbit, czyli tam i z powrotem',
        author: 'J.R.R. Tolkien',
        translator: {
          id: 'mariaskibniewska',
          firstName: 'Maria',
          lastName: 'Skibniewska',
          description:
            'Polska tłumaczka, głównie anglojęzycznej i francuskojęzycznej literatury pięknej. Pierwszą książką J.R.R. Tolkiena, którą Skibniewska przetłumaczyła był Hobbit, wydany po polsku w 1960 przez Wydawnictwo Iskry[31]. Natomiast umowę na przekład Władcy Pierścieni podpisała z „Czytelnikiem” już w 1958. Nie ma żadnych świadectw z przebiegu jej pracy. Wiadomo tylko, że w czerwcu 1959 napisała list do wydawnictwa Allen & Unwin, z pytaniami o wskazówki pomocne przy tłumaczeniu, który przekazano Tolkienowi. Ten obiecał szybką odpowiedź, jednak ze względu na problemy rodzinne, przez dłuższy czas jej nie udzielił. Dopiero po ponagleniach ze strony „Czytelnika” przekazał kilka ogólnych wskazówek, które zawarł w liście do Allen & Unwin, by przesłano je Skibniewskiej. Nie ma śladów żadnej bezpośredniej korespondencji między pisarzem a polską tłumaczką, być może jednak jej list, który przekazano Tolkienowi, znajduje się w spuściźnie po nim w Bodleian Library.',
        },
        publisher: {
          title: 'Rebis',
          id: 'rebis',
          description: '',
        },
        year: 2020,
        publicationNumber: 5,
        cover: 'Miękka',
        series: 'Middle-earth',
        isbn: '9781234567897',
      },
    ];
    const { container } = customRender(
      <ItemList items={items} getPrimaryText={(i) => i.polishTitle} />,
    );

    const list = container.querySelector('ul');
    expect(list).toHaveStyle({ width: 'fit-content' });
  });
});
