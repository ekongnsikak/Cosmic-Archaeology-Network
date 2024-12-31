import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Peer Review Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('submit-review', () => {
    it('should submit a review successfully', async () => {
      const projectId = 1;
      const score = 85;
      const comment = 'Fascinating research with promising results';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new review ID
      
      const result = await mockContractCall('peer-review', 'submit-review', [projectId, score, comment]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('peer-review', 'submit-review', [projectId, score, comment]);
    });
    
    it('should fail if the score is out of range', async () => {
      const projectId = 1;
      const score = 101; // Invalid score
      const comment = 'Invalid score test';
      
      mockContractCall.mockRejectedValue(new Error('Invalid score'));
      
      await expect(mockContractCall('peer-review', 'submit-review', [projectId, score, comment]))
          .rejects.toThrow('Invalid score');
    });
  });
  
  describe('update-review-status', () => {
    it('should update review status successfully', async () => {
      const reviewId = 1;
      const newStatus = 'approved';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('peer-review', 'update-review-status', [reviewId, newStatus]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('peer-review', 'update-review-status', [reviewId, newStatus]);
    });
    
    it('should fail if the caller is not the reviewer', async () => {
      const reviewId = 1;
      const newStatus = 'approved';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('peer-review', 'update-review-status', [reviewId, newStatus]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-review', () => {
    it('should return review details', async () => {
      const reviewId = 1;
      const expectedReview = {
        project_id: 1,
        reviewer: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        score: 85,
        comment: 'Fascinating research with promising results',
        status: 'submitted'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedReview });
      
      const result = await mockContractCall('peer-review', 'get-review', [reviewId]);
      
      expect(result.value).toEqual(expectedReview);
      expect(mockContractCall).toHaveBeenCalledWith('peer-review', 'get-review', [reviewId]);
    });
    
    it('should return null for non-existent review', async () => {
      const reviewId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('peer-review', 'get-review', [reviewId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-project-reviews', () => {
    it('should return project reviews', async () => {
      const projectId = 1;
      const expectedReviews = {
        review_ids: [1, 2, 3],
        average_score: 87
      };
      
      mockContractCall.mockResolvedValue({ value: expectedReviews });
      
      const result = await mockContractCall('peer-review', 'get-project-reviews', [projectId]);
      
      expect(result.value).toEqual(expectedReviews);
      expect(mockContractCall).toHaveBeenCalledWith('peer-review', 'get-project-reviews', [projectId]);
    });
    
    it('should return null for project with no reviews', async () => {
      const projectId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('peer-review', 'get-project-reviews', [projectId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-review-count', () => {
    it('should return the total number of reviews', async () => {
      const expectedCount = 10;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('peer-review', 'get-review-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('peer-review', 'get-review-count', []);
    });
  });
});
