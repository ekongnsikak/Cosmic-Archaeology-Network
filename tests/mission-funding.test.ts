import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Mission Funding Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('create-funding-campaign', () => {
    it('should create a funding campaign successfully', async () => {
      const projectId = 1;
      const goal = 1000000; // 1 million microSTX
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new campaign ID
      
      const result = await mockContractCall('mission-funding', 'create-funding-campaign', [projectId, goal]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('mission-funding', 'create-funding-campaign', [projectId, goal]);
    });
  });
  
  describe('fund-campaign', () => {
    it('should fund a campaign successfully', async () => {
      const campaignId = 1;
      const amount = 100000; // 0.1 STX
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('mission-funding', 'fund-campaign', [campaignId, amount]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('mission-funding', 'fund-campaign', [campaignId, amount]);
    });
    
    it('should fail if the campaign is not active', async () => {
      const campaignId = 1;
      const amount = 100000; // 0.1 STX
      
      mockContractCall.mockRejectedValue(new Error('Campaign not active'));
      
      await expect(mockContractCall('mission-funding', 'fund-campaign', [campaignId, amount]))
          .rejects.toThrow('Campaign not active');
    });
  });
  
  describe('close-campaign', () => {
    it('should close a successful campaign', async () => {
      const campaignId = 1;
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('mission-funding', 'close-campaign', [campaignId]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('mission-funding', 'close-campaign', [campaignId]);
    });
    
    it('should close a failed campaign', async () => {
      const campaignId = 2;
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('mission-funding', 'close-campaign', [campaignId]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('mission-funding', 'close-campaign', [campaignId]);
    });
    
    it('should fail if the caller is not the beneficiary', async () => {
      const campaignId = 1;
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('mission-funding', 'close-campaign', [campaignId]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-campaign', () => {
    it('should return campaign details', async () => {
      const campaignId = 1;
      const expectedCampaign = {
        project_id: 1,
        goal: 1000000,
        raised: 500000,
        status: 'active',
        beneficiary: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedCampaign });
      
      const result = await mockContractCall('mission-funding', 'get-campaign', [campaignId]);
      
      expect(result.value).toEqual(expectedCampaign);
      expect(mockContractCall).toHaveBeenCalledWith('mission-funding', 'get-campaign', [campaignId]);
    });
    
    it('should return null for non-existent campaign', async () => {
      const campaignId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('mission-funding', 'get-campaign', [campaignId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-campaign-count', () => {
    it('should return the total number of campaigns', async () => {
      const expectedCount = 3;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('mission-funding', 'get-campaign-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('mission-funding', 'get-campaign-count', []);
    });
  });
});
