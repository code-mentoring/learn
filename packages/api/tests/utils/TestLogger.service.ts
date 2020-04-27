/* eslint-disable no-unused-vars */
import { Logger } from '@nestjs/common';

export class TestLogger extends Logger {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(message: string, trace: string) {
    // Only shows error message
    super.error(message, null);
  }
}
