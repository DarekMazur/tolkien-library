import {
  IBookProps,
  IFanzinProps,
  IFanEditionsProps,
  IPublicationProps,
  IPublisherProps,
  ITranslatorProps,
} from '@/lib/types';

export function isBook(item: unknown): item is IBookProps {
  return typeof item === 'object' && item !== null && 'polishTitle' in item;
}

export function isTranslator(item: unknown): item is ITranslatorProps {
  return typeof item === 'object' && item !== null && 'firstName' in item && 'lastName' in item;
}

export function isPublication(item: unknown): item is IPublicationProps {
  return (
    typeof item === 'object' &&
    item !== null &&
    'author' in item &&
    'description' in item &&
    'type' in item
  );
}

export function isFanzin(item: unknown): item is IFanzinProps {
  return (
    typeof item === 'object' &&
    item !== null &&
    'startDate' in item &&
    'lastIssueDate' in item &&
    'numbers' in item
  );
}

export function isFanEdition(item: unknown): item is IFanEditionsProps {
  return (
    typeof item === 'object' &&
    item !== null &&
    'title' in item &&
    !('startDate' in item) &&
    !('isbn' in item) &&
    !('version' in item)
  );
}

export function isPublisher(item: unknown): item is IPublisherProps {
  return (
    typeof item === 'object' &&
    item !== null &&
    'title' in item &&
    'description' in item &&
    !('firstName' in item) &&
    !('lastName' in item)
  );
}
