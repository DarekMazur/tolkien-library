import { it } from 'vitest';
import { sendMessage } from '../sendMessage.ts';

describe('sendMessage', () => {
  it('should return a valid mailto link for a valid email address', () => {
    const recipient = 'test@example.com';
    const result = sendMessage(recipient);
    expect(result).toBe(
      'mailto:test@example.com?subject=Message%20from%20Tolkienalia&body=Your%20message...',
    );
  });

  it('should correctly encode special characters in the email address', () => {
    const recipient = 'first.last+name@example.com';
    const result = sendMessage(recipient);
    expect(result.startsWith('mailto:first.last+name@example.com')).toBe(true);
  });

  it('should handle an empty email address', () => {
    const recipient = '';
    const result = sendMessage(recipient);
    expect(result).toBe('mailto:?subject=Message%20from%20Tolkienalia&body=Your%20message...');
  });

  it('should encode the subject and content correctly', () => {
    const recipient = 'test@example.com';
    const result = sendMessage(recipient);
    expect(result).toContain('subject=Message%20from%20Tolkienalia');
    expect(result).toContain('body=Your%20message...');
  });

  it('should work for an email address with capital letters', () => {
    const recipient = 'TEST@EXAMPLE.COM';
    const result = sendMessage(recipient);
    expect(result).toBe(
      'mailto:TEST@EXAMPLE.COM?subject=Message%20from%20Tolkienalia&body=Your%20message...',
    );
  });
});
