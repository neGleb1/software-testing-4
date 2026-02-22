import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService'
describe('test 1', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  // TEST 1
  it('should return 200 and dog image data', async () => {
    const mockApiResponse = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };
    
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockApiResponse
    } as Response)

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockApiResponse.message);
    expect(result.status).toBe('success');
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  // TEST 2
  it('should throw error and status 500', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      status: 500
    } as Response);

    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );
    
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});