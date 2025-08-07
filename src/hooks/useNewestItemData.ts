import { useMemo } from 'react';
import { useMe } from '@/hooks/useMe';
import { IUser, TPublications } from '@/lib/types';
import { formatDate } from '@/lib/helpers/formatDate';
import { getLatest } from '@/lib/helpers/getLatest';
import { isBook, isTranslator, isPublisher } from '@/lib/helpers/publicationsTypeGuard';
import { createSlug } from '@/lib/helpers/createSlug';

/**
 * Custom React hook for generating display text and optional link for the newest item data based on
 * user or entry type content.
 *
 * @param {'user' | 'entry'} type - The type of content being processed, either 'user' or 'entry'.
 * @param {IUser | TPublications} [content] - The content object to derive information from. It can be either a user or publication entry.
 *
 * @returns {{
 *   itemData: {
 *     displayText: string, // Formatted text for display (e.g., username with creation date or latest entry title)
 *     link: string | null // URL link to the related resource or null if none applicable
 *   },
 *   isLoading: boolean // Loading state indicating if user data is still being fetched
 * }}
 *
 * @remarks
 * - When the type is 'user', the hook formats the display text with the username plus either 'you' if it's the current user or the user's creation date.
 * - When the type is 'entry', it determines the latest publication title and generates a link to the appropriate resource (book, translator, or publisher) if applicable.
 * - If no relevant content is provided, appropriate fallback display text ('No users' or 'No entries') is returned.
 */

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
