import { MOCK_ANALYTICS } from '../mock-data';
import { AnalyticsOverview } from '../types';

export const analyticsService = {
  async getOverview(): Promise<AnalyticsOverview> {
    return Promise.resolve({ ...MOCK_ANALYTICS });
  },
};
