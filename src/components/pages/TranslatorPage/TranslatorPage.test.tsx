import { vi, Mock } from 'vitest';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import TranslatorPage from './TranslatorPage';
import { useParams } from 'react-router';
import { useTranslatorData } from '@/hooks/useTranslatorData';

vi.mock('react-router', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));
vi.mock('@/hooks/useTranslatorData', () => ({
  useTranslatorData: vi.fn(),
}));

describe('TranslatorPage', () => {
  it('should render Loader while loading state is true', () => {
    (useParams as Mock).mockReturnValue({ slug: 'kowalski' });
    (useTranslatorData as Mock).mockReturnValue({
      translator: null,
      books: [],
      isLoading: true,
      hasError: false,
      errorMessage: '',
    });

    const { container } = renderWithProviders(<TranslatorPage />);

    expect(container).toMatchSnapshot();
  });

  it('should render error message when hasError is true', () => {
    (useParams as Mock).mockReturnValue({ slug: 'nowak' });
    (useTranslatorData as Mock).mockReturnValue({
      translator: null,
      books: [],
      isLoading: false,
      hasError: true,
      errorMessage: 'Some error occurred',
    });

    const { getByText, container } = renderWithProviders(<TranslatorPage />);

    expect(getByText('Some error occurred')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it('should render default not found message when translator is null and no custom errorMessage', () => {
    (useParams as Mock).mockReturnValue({ slug: 'unknown' });
    (useTranslatorData as Mock).mockReturnValue({
      translator: null,
      books: [],
      isLoading: false,
      hasError: false,
      errorMessage: '',
    });

    const { getByText, container } = renderWithProviders(<TranslatorPage />);

    expect(getByText('Translator not found')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it('should render TranslatorInfo and TranslatedBooksList when data is loaded', () => {
    const mockTranslator = {
      id: '1',
      firstName: 'Maria',
      lastName: 'Skibniewska',
      description:
        'Polska tłumaczka, głównie anglojęzycznej i francuskojęzycznej literatury pięknej. Pierwszą książką J.R.R. Tolkiena, którą Skibniewska przetłumaczyła był Hobbit, wydany po polsku w 1960 przez Wydawnictwo Iskry[31]. Natomiast umowę na przekład Władcy Pierścieni podpisała z „Czytelnikiem” już w 1958. Nie ma żadnych świadectw z przebiegu jej pracy. Wiadomo tylko, że w czerwcu 1959 napisała list do wydawnictwa Allen & Unwin, z pytaniami o wskazówki pomocne przy tłumaczeniu, który przekazano Tolkienowi. Ten obiecał szybką odpowiedź, jednak ze względu na problemy rodzinne, przez dłuższy czas jej nie udzielił. Dopiero po ponagleniach ze strony „Czytelnika” przekazał kilka ogólnych wskazówek, które zawarł w liście do Allen & Unwin, by przesłano je Skibniewskiej. Nie ma śladów żadnej bezpośredniej korespondencji między pisarzem a polską tłumaczką, być może jednak jej list, który przekazano Tolkienowi, znajduje się w spuściźnie po nim w Bodleian Library.',
    };
    const mockBooks = [
      {
        id: '1',
        originalTitle: 'The Hobbit',
        polishTitle: 'Hobbit, czyli tam i z powrotem',
        author: 'J.R.R. Tolkien',
        translator: mockTranslator,
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
        translator: mockTranslator,
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
    ];
    (useParams as Mock).mockReturnValue({ slug: 'kowalski' });
    (useTranslatorData as Mock).mockReturnValue({
      translator: mockTranslator,
      books: mockBooks,
      isLoading: false,
      hasError: false,
      errorMessage: '',
    });

    const { getByText, container } = renderWithProviders(<TranslatorPage />);

    expect(getByText('Maria Skibniewska')).toBeDefined();
    expect(getByText('Hobbit, czyli tam i z powrotem')).toBeDefined();
    expect(getByText('Władca Pierścieni')).toBeDefined();
    expect(container).toMatchSnapshot();
  });
});
