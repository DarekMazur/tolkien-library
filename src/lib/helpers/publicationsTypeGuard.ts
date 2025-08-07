import {
  IBookProps,
  IFanzinProps,
  IFanEditionsProps,
  IPublicationProps,
  IPublisherProps,
  ITranslatorProps,
} from '@/lib/types';

/**
 * Type guard to check if an item is a Book.
 * @param item - The item to check.
 * @returns True if item has a 'polishTitle' property and matches IBookProps.
 */
export const isBook = (item: unknown): item is IBookProps => {
  return Boolean(item && typeof item === 'object' && 'polishTitle' in item);
};

/**
 * Type guard to check if an item is a Translator.
 * @param item - The item to check.
 * @returns True if item has 'firstName' and 'lastName' properties and matches ITranslatorProps.
 */
export const isTranslator = (item: unknown): item is ITranslatorProps => {
  return Boolean(item && typeof item === 'object' && 'firstName' in item && 'lastName' in item);
};

/**
 * Type guard to check if an item is a Publication.
 * @param item - The item to check.
 * @returns True if item has 'author', 'description', and 'type' properties and matches IPublicationProps.
 */
export const isPublication = (item: unknown): item is IPublicationProps => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'author' in item &&
    'description' in item &&
    'type' in item
  );
};

/**
 * Type guard to check if an item is a Fanzin.
 * @param item - The item to check.
 * @returns True if item has 'startDate', 'lastIssueDate', and 'numbers' properties and matches IFanzinProps.
 */
export const isFanzin = (item: unknown): item is IFanzinProps => {
  return (
    typeof item === 'object' &&
    item !== null &&
    'startDate' in item &&
    'lastIssueDate' in item &&
    'numbers' in item
  );
};

/**
 * Type guard to check if an item is a Fan Edition.
 * @param item - The item to check.
 * @returns True if item has 'title' property but does not have 'startDate', 'isbn', or 'version' properties, matches IFanEditionsProps.
 */
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

/**
 * Type guard to check if an item is a Publisher.
 * @param item - The item to check.
 * @returns True if item has 'title' and 'description' properties but not 'firstName' or 'lastName', matches IPublisherProps.
 */
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
