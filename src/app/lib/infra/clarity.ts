import { Env } from '@/app/constants/env';
import Clarity from '@microsoft/clarity';

export class AppClarity {
  static initiate() {
    if (!Env.isProduction) return;
    Clarity.init(Env.clarityProjectId);
  }

  static setTag(key: string, value: string) {
    Clarity.setTag(key, value);
  }
}
