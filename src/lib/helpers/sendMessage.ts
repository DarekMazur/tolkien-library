export const sendMessage = (recipient: string) => {
  const subject = encodeURIComponent('Message from Tolkienalia');
  const body = encodeURIComponent('Your message...');

  return `mailto:${recipient}?subject=${subject}&body=${body}`;
};
