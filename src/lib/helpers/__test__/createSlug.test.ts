import { describe, it, expect } from 'vitest';
import { createSlug } from '../createSlug';

describe('createSlug', () => {
  describe('basic functionality', () => {
    it('should create a slug from simple text', () => {
      const result = createSlug('Hello World');
      expect(result).toBe('hello-world');
    });

    it('should replace spaces with dashes', () => {
      const result = createSlug('To jest test');
      expect(result).toBe('to-jest-test');
    });

    it('should convert text to lowercase', () => {
      const result = createSlug('CAPITAL LETTERS');
      expect(result).toBe('capital-letters');
    });
  });

  describe('support for special characters', () => {
    it('should remove the special characters defined in the remove option', () => {
      const result = createSlug('Test*+~.()!"!:@ string');
      expect(result).toBe('test-string');
    });

    it('should remove each of the special characters separately', () => {
      expect(createSlug('test*string')).toBe('teststring');
      expect(createSlug('test+string')).toBe('teststring');
      expect(createSlug('test~string')).toBe('teststring');
      expect(createSlug('test.string')).toBe('teststring');
      expect(createSlug('test(string)')).toBe('teststring');
      expect(createSlug("test'string")).toBe('teststring');
      expect(createSlug('test"string')).toBe('teststring');
      expect(createSlug('test!string')).toBe('teststring');
      expect(createSlug('test:string')).toBe('teststring');
      expect(createSlug('test@string')).toBe('teststring');
    });

    it('should retain the allowed special characters', () => {
      const result = createSlug('test-string_with&other#chars');
      expect(result).toBe('test-stringwithandotherchars');
    });
  });

  describe('support for Polish characters', () => {
    it('should transliterate Polish characters correctly', () => {
      const result = createSlug('Zażółć gęślą jaźń');
      expect(result).toBe('zazolc-gesla-jazn');
    });

    it('should handle a mix test with Polish characters', () => {
      const result = createSlug('Test ąćęłńóśźż noPolish');
      expect(result).toBe('test-acelnoszz-nopolish');
    });

    it('should handle Polish characters in different cases', () => {
      expect(createSlug('ĄĆĘŁŃÓŚŹŻ')).toBe('acelnoszz');
      expect(createSlug('ąćęłńóśźż')).toBe('acelnoszz');
    });
  });

  describe('trim', () => {
    it('should remove hyphens from the beginning and end', () => {
      const result = createSlug('  -test string-  ');
      expect(result).toBe('test-string');
    });

    it('should handle multiple hyphens at the beginning and end of the', () => {
      const result = createSlug('---test---string---');
      expect(result).toBe('test-string');
    });
  });

  describe('edge cases', () => {
    it('should handle the empty string', () => {
      const result = createSlug('');
      expect(result).toBe('');
    });

    it('should handle a string consisting only of spaces', () => {
      const result = createSlug('   ');
      expect(result).toBe('');
    });

    it('should handle a string consisting only of special characters', () => {
      const result = createSlug('*+~.()!"!:@');
      expect(result).toBe('');
    });

    it('should handle a very long string', () => {
      const longString = 'a'.repeat(1000) + ' test';
      const result = createSlug(longString);
      expect(result).toBe('a'.repeat(1000) + '-test');
    });

    it('should handle strings with multiple spaces', () => {
      const result = createSlug('test    multiple    spaces');
      expect(result).toBe('test-multiple-spaces');
    });

    it('should handle strings with mixed whitespace characters', () => {
      const result = createSlug('test\t\n\r  mixed\t\nwhitespace');
      expect(result).toBe('test-mixed-whitespace');
    });
    it('should handle strings with comma', () => {
      const result = createSlug('test, string with comma');
      expect(result).toBe('test-string-with-comma');
    });
  });

  describe('type preservation', () => {
    it('should always return the string', () => {
      const result = createSlug('test');
      expect(typeof result).toBe('string');
    });

    it('should return a string even for empty input', () => {
      const result = createSlug('');
      expect(typeof result).toBe('string');
      expect(result).toBe('');
    });
  });

  describe('examples of actual use', () => {
    it('should create a slug from the article title', () => {
      const result = createSlug('Dlaczego nie poleciano do Mordoru na Orłach?');
      expect(result).toBe('dlaczego-nie-poleciano-do-mordoru-na-orlach');
    });

    it('should handle the title with quotes and apostrophes', () => {
      const result = createSlug('Czy "Śródziemie" istnieje?');
      expect(result).toBe('czy-srodziemie-istnieje');
    });

    it('should create a slug from the product name', () => {
      const result = createSlug('Bractwo Pierścienia (2022) - Zysk i S-ka');
      expect(result).toBe('bractwo-pierscienia-2022-zysk-i-s-ka');
    });
  });

  describe('performance tests', () => {
    it('should work efficiently for medium text size', () => {
      const mediumText =
        'This is a medium length text that can be used as an article title or some description';
      const startTime = performance.now();
      const result = createSlug(mediumText);
      const endTime = performance.now();

      expect(result).toBe(
        'this-is-a-medium-length-text-that-can-be-used-as-an-article-title-or-some-description',
      );
      expect(endTime - startTime).toBeLessThan(10);
    });
  });
});
