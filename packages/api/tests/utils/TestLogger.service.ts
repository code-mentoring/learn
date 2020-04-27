/* eslint-disable no-unused-vars */
import { Logger } from '@nestjs/common';

/**
 * Disable logging for tests
 */
export class TestLogger extends Logger {
  error() { /* Disable errors */ }

  log() { /* Disable logging */ }
}
