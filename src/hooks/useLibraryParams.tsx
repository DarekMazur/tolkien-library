import { useLocation, useParams } from 'react-router';
import { EPublicationType } from '@/lib/types';

export const useLibraryParams = () => {
  const { type, slug } = useParams<{ type: string; slug?: string }>();
  const location = useLocation();

  console.log(location.search.slice(1));

  const isValidType =
    type && Object.values(EPublicationType).includes(type.slice(0, -1) as EPublicationType);

  return {
    type: isValidType ? (type.slice(0, -1) as EPublicationType) : null,
    slug: slug || null,
    search: location.search.slice(1) || null,
    isValid: isValidType,
  };
};
