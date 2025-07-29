import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@/lib/providers/renderWithProviders';
import PublisherPage from './PublisherPage';
import * as reactRouter from 'react-router';
import { usePublisherData } from '@/hooks/usePublisherData';
import { IBookProps, IPublisherProps } from '@/lib/types';
import { useNavigate } from 'react-router';

vi.mock('react-router', () => ({
  useParams: vi.fn(),
  useNavigate: vi.fn(),
}));

vi.mock('@/hooks/usePublisherData');

const mockNavigate = vi.fn();
const mockUsePublisherData = vi.mocked(usePublisherData);
const mockUseParams = vi.mocked(reactRouter.useParams);
const mockUseNavigate = vi.mocked(useNavigate);

describe('PublisherPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseParams.mockReturnValue({ slug: 'test-publisher-slug' });
    mockUseNavigate.mockReturnValue(mockNavigate);
  });

  describe('when publisher data is successfully loaded', () => {
    const mockPublisherData: {
      entity: IPublisherProps | null;
      books: IBookProps[] | null;
      isLoading: boolean;
      hasError: boolean;
      errorMessage: string | null;
    } = {
      entity: {
        id: '1',
        title: 'Test Publisher',
        description: 'A test publisher description',
      },
      books: [
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
      ],
      isLoading: false,
      hasError: false,
      errorMessage: null,
    };

    beforeEach(() => {
      mockUsePublisherData.mockReturnValue(mockPublisherData);
    });

    it('should render publisher information correctly', async () => {
      renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Test Publisher')).toBeInTheDocument();
        expect(screen.getByText('Publisher')).toBeInTheDocument();
        expect(screen.getByText('A test publisher description')).toBeInTheDocument();
      });
    });

    it('should display publications section with correct title', async () => {
      renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Publications:')).toBeInTheDocument();
      });
    });

    it('should render list of books', async () => {
      renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Hobbit, czyli tam i z powrotem')).toBeInTheDocument();
        expect(screen.getByText('Władca Pierścieni')).toBeInTheDocument();
      });
    });

    it('should navigate to book page when book is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Hobbit, czyli tam i z powrotem')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Hobbit, czyli tam i z powrotem'));

      expect(mockNavigate).toHaveBeenCalledWith('/library/books/hobbit-czyli-tam-i-z-powrotem');
    });

    it('should call usePublisherData with correct slug parameter', () => {
      renderWithProviders(<PublisherPage />);

      expect(mockUsePublisherData).toHaveBeenCalledWith('test-publisher-slug');
    });

    it('should match snapshot with publisher data', async () => {
      const { container } = renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Test Publisher')).toBeInTheDocument();
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('when no publications are available', () => {
    const mockEmptyData: {
      entity: IPublisherProps | null;
      books: IBookProps[] | null;
      isLoading: boolean;
      hasError: boolean;
      errorMessage: string | null;
    } = {
      entity: {
        id: '1',
        title: 'Publisher Without Books',
        description: 'Publisher with no publications',
      },
      books: [],
      isLoading: false,
      hasError: false,
      errorMessage: null,
    };

    beforeEach(() => {
      mockUsePublisherData.mockReturnValue(mockEmptyData);
    });

    it('should display empty message when no publications found', async () => {
      renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('No publications found')).toBeInTheDocument();
      });
    });

    it('should match snapshot with empty publications', async () => {
      const { container } = renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Publisher Without Books')).toBeInTheDocument();
      });

      expect(container).toMatchSnapshot();
    });
  });

  describe('when data is loading', () => {
    const mockLoadingData: {
      entity: IPublisherProps | null;
      books: IBookProps[] | null;
      isLoading: boolean;
      hasError: boolean;
      errorMessage: string | null;
    } = {
      entity: null,
      books: [],
      isLoading: true,
      hasError: false,
      errorMessage: null,
    };

    beforeEach(() => {
      mockUsePublisherData.mockReturnValue(mockLoadingData);
    });

    it('should handle loading state properly', () => {
      renderWithProviders(<PublisherPage />);

      expect(mockUsePublisherData).toHaveBeenCalledWith('test-publisher-slug');
    });

    it('should match snapshot during loading', () => {
      const { container } = renderWithProviders(<PublisherPage />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('when there is an error', () => {
    const mockErrorData: {
      entity: IPublisherProps | null;
      books: IBookProps[] | null;
      isLoading: boolean;
      hasError: boolean;
      errorMessage: string | null;
    } = {
      entity: null,
      books: [],
      isLoading: false,
      hasError: true,
      errorMessage: 'Failed to fetch publisher data',
    };

    beforeEach(() => {
      mockUsePublisherData.mockReturnValue(mockErrorData);
    });

    it('should handle error state properly', () => {
      renderWithProviders(<PublisherPage />);

      expect(mockUsePublisherData).toHaveBeenCalledWith('test-publisher-slug');
    });

    it('should match snapshot during error state', () => {
      const { container } = renderWithProviders(<PublisherPage />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('when slug parameter is missing', () => {
    beforeEach(() => {
      mockUseParams.mockReturnValue({});
      mockUsePublisherData.mockReturnValue({
        entity: null,
        books: [],
        isLoading: false,
        hasError: false,
        errorMessage: null,
      });
    });

    it('should call usePublisherData with undefined slug', () => {
      renderWithProviders(<PublisherPage />);

      expect(mockUsePublisherData).toHaveBeenCalledWith(undefined);
    });

    it('should match snapshot with missing slug', () => {
      const { container } = renderWithProviders(<PublisherPage />);

      expect(container).toMatchSnapshot();
    });
  });

  describe('navigation functionality', () => {
    const mockPublisherWithSpecialChars: {
      entity: IPublisherProps | null;
      books: IBookProps[] | null;
      isLoading: boolean;
      hasError: boolean;
      errorMessage: string | null;
    } = {
      entity: {
        id: '1',
        title: 'Special Publisher',
        description: 'Publisher with special characters in book titles',
      },
      books: [
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
          originalTitle: 'Book with "Quotes" & Symbols!',
          polishTitle: 'Książka z "Cytatem" & Symbolami!',
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
      ],
      isLoading: false,
      hasError: false,
      errorMessage: null,
    };

    beforeEach(() => {
      mockUsePublisherData.mockReturnValue(mockPublisherWithSpecialChars);
    });

    it('should handle navigation with special characters in book titles', async () => {
      const user = userEvent.setup();
      renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Niedokończone opowieści')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Niedokończone opowieści'));

      expect(mockNavigate).toHaveBeenCalledWith('/library/books/niedokonczone-opowiesci');
    });

    it('should handle navigation with quotes and symbols in book titles', async () => {
      const user = userEvent.setup();
      renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Książka z "Cytatem" & Symbolami!')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Książka z "Cytatem" & Symbolami!'));

      expect(mockNavigate).toHaveBeenCalledWith('/library/books/ksiazka-z-cytatem-and-symbolami');
    });
  });

  describe('component props and integration', () => {
    const mockCompleteData: {
      entity: IPublisherProps | null;
      books: IBookProps[] | null;
      isLoading: boolean;
      hasError: boolean;
      errorMessage: string | null;
    } = {
      entity: {
        id: '1',
        title: 'Complete Publisher',
        description: 'Complete publisher with all data',
      },
      books: [
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
      ],
      isLoading: false,
      hasError: false,
      errorMessage: null,
    };

    beforeEach(() => {
      mockUsePublisherData.mockReturnValue(mockCompleteData);
    });

    it('should pass correct props to PersonInfo component', async () => {
      renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Complete Publisher')).toBeInTheDocument();
        expect(screen.getByText('Publisher')).toBeInTheDocument();
        expect(screen.getByText('Complete publisher with all data')).toBeInTheDocument();
      });
    });

    it('should pass correct props to ItemList component', async () => {
      renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Publications:')).toBeInTheDocument();
        expect(screen.getByText('Hobbit, czyli tam i z powrotem')).toBeInTheDocument();
      });
    });

    it('should match snapshot with complete data', async () => {
      const { container } = renderWithProviders(<PublisherPage />);

      await waitFor(() => {
        expect(screen.getByText('Complete Publisher')).toBeInTheDocument();
      });

      expect(container).toMatchSnapshot();
    });
  });
});
