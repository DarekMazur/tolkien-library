import { useMemo } from 'react';
import { useMe } from '@/hooks/useMe';
import { IUser, TPublications } from '@/lib/types';
import { formatDate } from '@/lib/helpers/formatDate';
import { getLatest } from '@/lib/helpers/getLatest';
import { isBook, isTranslator, isPublisher } from '@/lib/helpers/publicationsTypeGuard';
import { createSlug } from '@/lib/helpers/createSlug';

export const useNewestItemData = (type: 'user' | 'entry', content?: IUser | TPublications) => {
  const { user, isLoading } = useMe();

  const itemData = useMemo(() => {
    if (type === 'user' && content) {
      const userContent = content as IUser;
      const isCurrentUser = userContent.id === user?.id;
      return {
        displayText: `${userContent.userName} (${isCurrentUser ? 'you' : formatDate(userContent.createdAt)})`,
        link: null,
      };
    }

    if (type === 'entry' && content) {
      const entryContent = content as TPublications;
      const latestTitle = getLatest(entryContent);

      if (!latestTitle) {
        return { displayText: 'No entries', link: null };
      }

      const hasLink =
        isBook(entryContent) || isTranslator(entryContent) || isPublisher(entryContent);

      if (hasLink) {
        const linkType = isBook(entryContent)
          ? 'books'
          : isTranslator(entryContent)
            ? 'translator'
            : 'publisher';

        return {
          displayText: `${latestTitle} (${formatDate(entryContent.createdAt)})`,
          link: `/library/${linkType}/${createSlug(latestTitle)}`,
        };
      }

      return {
        displayText: `${latestTitle} (${formatDate((entryContent as TPublications).createdAt)})`,
        link: null,
      };
    }

    return {
      displayText: type === 'user' ? 'No users' : 'No entries',
      link: null,
    };
  }, [type, content, user]);

  return { itemData, isLoading };
};
