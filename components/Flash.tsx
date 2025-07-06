// Flash.tsx
import { showMessage } from 'react-native-flash-message';

type FlashType = 'default' | 'info' | 'success' | 'danger' | 'warning';

/**
 * Show a flash message with just color and message.
 * @param message - Main message text
 * @param backgroundColor - Background color of the message
 * @param type - Optional: Type of the message (success, danger, etc.)
 */
export const showFlash = (
  message: string,
  backgroundColor: string,
  type: FlashType = 'default'
) => {
  showMessage({
    message,
    type,
    backgroundColor,
    color: '#841584',
    duration: 3000,
  });
};
