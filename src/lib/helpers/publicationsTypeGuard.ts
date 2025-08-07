import {
  IBookProps,
  IFanzinProps,
  IFanEditionsProps,
  IPublicationProps,
  IPublisherProps,
  ITranslatorProps,
} from '@/lib/types';

export const isBook = (item: unknown): item is IBookProps => {
  return Boolean(item && typeof item === 'object' && 'polishTitle' in item);
};

export const isTranslator = (item: unknown): item is ITranslatorProps => {
  return Boolean(item && typeof item === 'object' && 'firstName' in item && 'lastName' in item);
};

export const isPublication = (item: unknown): item is IPublicationProps => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'author' in item &&
    'description' in item &&
    'type' in item
  );
};

export const isFanzin = (item: unknown): item is IFanzinProps => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'startDate' in item &&
    'lastIssueDate' in item &&
    'numbers' in item
  );
};

export const isFanEdition = (item: unknown): item is IFanEditionsProps => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'title' in item &&
    !('startDate' in item) &&
    !('isbn' in item) &&
    !('version' in item)
  );
};

export const isPublisher = (item: unknown): item is IPublisherProps => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'title' in item &&
    'description' in item &&
    !('firstName' in item) &&
    !('lastName' in item)
  );
};
