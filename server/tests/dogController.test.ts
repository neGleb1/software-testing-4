import { describe, expect, test, vi } from "vitest";
import { getDogImage } from "../controllers/dogController";
import { getRandomDogImage } from "../services/dogService";

vi.mock("../services/dogService");

const createMockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnThis();
  res.json = vi.fn();
  return res;
};

describe('dogController.getDogImage', () => {
  // TEST 3
  test('Returns success true and mocked JSON', async () => {
    const mockDogData = {
      imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };

    const req: any = {};
    const res = createMockResponse();
    
    vi.mocked(getRandomDogImage).mockResolvedValue(mockDogData);

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockDogData
    });
  });
});