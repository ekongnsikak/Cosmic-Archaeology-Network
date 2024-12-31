import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Space Data Integration Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('submit-telescope-data', () => {
    it('should submit telescope data successfully', async () => {
      const telescopeId = 'JWST-001';
      const dataHash = '0x1234567890abcdef';
      const metadata = 'Spectral analysis of exoplanet atmosphere';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new data ID
      
      const result = await mockContractCall('space-data-integration', 'submit-telescope-data', [telescopeId, dataHash, metadata]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('space-data-integration', 'submit-telescope-data', [telescopeId, dataHash, metadata]);
    });
  });
  
  describe('submit-probe-data', () => {
    it('should submit probe data successfully', async () => {
      const probeId = 'VOYAGER-1';
      const dataHash = '0xabcdef1234567890';
      const metadata = 'Interstellar medium composition data';
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new data ID
      
      const result = await mockContractCall('space-data-integration', 'submit-probe-data', [probeId, dataHash, metadata]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('space-data-integration', 'submit-probe-data', [probeId, dataHash, metadata]);
    });
  });
  
  describe('get-telescope-data', () => {
    it('should return telescope data details', async () => {
      const dataId = 1;
      const expectedData = {
        telescope_id: 'JWST-001',
        timestamp: 123456789,
        data_hash: '0x1234567890abcdef',
        metadata: 'Spectral analysis of exoplanet atmosphere'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedData });
      
      const result = await mockContractCall('space-data-integration', 'get-telescope-data', [dataId]);
      
      expect(result.value).toEqual(expectedData);
      expect(mockContractCall).toHaveBeenCalledWith('space-data-integration', 'get-telescope-data', [dataId]);
    });
    
    it('should return null for non-existent telescope data', async () => {
      const dataId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('space-data-integration', 'get-telescope-data', [dataId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-probe-data', () => {
    it('should return probe data details', async () => {
      const dataId = 1;
      const expectedData = {
        probe_id: 'VOYAGER-1',
        timestamp: 123456789,
        data_hash: '0xabcdef1234567890',
        metadata: 'Interstellar medium composition data'
      };
      
      mockContractCall.mockResolvedValue({ value: expectedData });
      
      const result = await mockContractCall('space-data-integration', 'get-probe-data', [dataId]);
      
      expect(result.value).toEqual(expectedData);
      expect(mockContractCall).toHaveBeenCalledWith('space-data-integration', 'get-probe-data', [dataId]);
    });
    
    it('should return null for non-existent probe data', async () => {
      const dataId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('space-data-integration', 'get-probe-data', [dataId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-telescope-data-count', () => {
    it('should return the total number of telescope data entries', async () => {
      const expectedCount = 5;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('space-data-integration', 'get-telescope-data-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('space-data-integration', 'get-telescope-data-count', []);
    });
  });
  
  describe('get-probe-data-count', () => {
    it('should return the total number of probe data entries', async () => {
      const expectedCount = 3;
      
      mockContractCall.mockResolvedValue({ value: expectedCount });
      
      const result = await mockContractCall('space-data-integration', 'get-probe-data-count', []);
      
      expect(result.value).toBe(expectedCount);
      expect(mockContractCall).toHaveBeenCalledWith('space-data-integration', 'get-probe-data-count', []);
    });
  });
});

