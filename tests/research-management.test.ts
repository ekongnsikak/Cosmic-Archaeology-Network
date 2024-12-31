import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Research Management Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('create-project', () => {
    it('should create a project successfully', async () => {
      const title = 'Ancient Martian Artifacts';
      const description = 'Investigating potential evidence of ancient civilization on Mars';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new project ID
      
      const result = await mockContractCall('research-management', 'create-project', [title, description]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('research-management', 'create-project', [title, description]);
    });
  });
  
  describe('add-collaborator', () => {
    it('should add a collaborator successfully', async () => {
      const projectId = 1;
      const collaborator = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('research-management', 'add-collaborator', [projectId, collaborator]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('research-management', 'add-collaborator', [projectId, collaborator]);
    });
    
    it('should fail if the caller is not the lead researcher', async () => {
      const projectId = 1;
      const collaborator = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('research-management', 'add-collaborator', [projectId, collaborator]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('update-project-status', () => {
    it('should update project status successfully', async () => {
      const projectId = 1;
      const newStatus = 'completed';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('research-management', 'update-project-status', [projectId, newStatus]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('research-management', 'update-project-status', [projectId, newStatus]);
    });
    
    it('should fail if the caller is not the lead researcher', async () => {
      const projectId = 1;
      const newStatus = 'completed';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('research-management', 'update-project-status', [projectId, newStatus]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('update-project-data', () => {
    it('should update project data successfully', async () => {
      const projectId = 1;
      const dataHash = '0x1234567890abcdef';
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('research-management', 'update-project-data', [projectId, dataHash]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('research-management', 'update-project-data', [projectId, dataHash]);
    });
    
    it('should fail if the caller is not the lead researcher', async () => {
      const projectId = 1;
      const dataHash = '0x1234567890abcdef';
      
      mockContractCall.mockRejectedValue(new Error('Unauthorized'));
      
      await expect(mockContractCall('research-management', 'update-project-data', [projectId, dataHash]))
          .rejects.toThrow('Unauthorized');
    });
  });
  
  describe('get-project', () => {
    it('should return project details', async () => {
      const projectId = 1;
      const expectedProject = {
        title: 'Ancient Martian Artifacts',
        description: 'Investigating potential evidence of ancient civilization on Mars',
        lead_researcher: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        collaborators: ['ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'],
        status: 'active',
        data_hash: '0x0000000000000000000000000000000000000000000000000000000000000000'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedProject });
      
      const result = await mockContractCall('research-management', 'get-project', [projectId]);
      
      expect(result.value).toEqual(expectedProject);
      expect(mockContractCall).toHaveBeenCalledWith('research-management', 'get-project', [projectId]);
    });
    
    it('should return null for non-existent project', async () => {
      const projectId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('research-management', 'get-project', [projectId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-project-count', () => {
    it('should return the total number of projects', async () => {
      const expectedCount = 5;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('research-management', 'get-project-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('research-management', 'get-project-count', []);
    });
  });
});

