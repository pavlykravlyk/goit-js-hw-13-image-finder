import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { alert, notice, info, success, error } from '@pnotify/core';

export default class NotificationPnotify {
  constructor() {}

  empty() {
    notice({
      text: 'Input field must not be empty',
      hide: true,
      delay: 3000,
    });
  }
}
