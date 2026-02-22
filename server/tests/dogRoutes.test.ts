import { describe, expect, test, vi } from "vitest";
import request from "supertest";
import express from "express";
import dogRoutes from "../routes/dogRoutes";
import * as dogController from "../controllers/dogController";

vi.mock("../controllers/dogController");

const app = express();
app.use(express.json());
app.use('/api/dogs', dogRoutes);

describe('dogRoutes', () => {
  // TEST 4
  test('GET /api/dogs/random returns 200 and dog image', async () => {
    const mockImageUrl = "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg";
    
    vi.mocked(dogController.getDogImage).mockImplementation(
      async (_req: any, res: any) => {
        res.json({
          success: true,
          data: {
            imageUrl: mockImageUrl,
            status: "success"
          }
        });
      }
    );

    const response = await request(app)
      .get('/api/dogs/random')
      .expect(200);

    expect(response.status).toBe(200)
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe(mockImageUrl);
  });
  // TEST 5
  test('GET /api/dogs/random returns 500 when service fails', async () => {
    const errorMessage = "Failed to fetch dog image: Network error";

    vi.mocked(dogController.getDogImage).mockImplementation(
      async (_req: any, res: any) => {
        res.status(500).json({
          success: false,
          error: errorMessage
        });
      }
    );

    const response = await request(app)
      .get('/api/dogs/random')
      .expect(500);

    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(errorMessage);
  });
});