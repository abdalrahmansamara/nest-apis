import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../auth';

interface AvailabilityPayload {
  id: number;
  quantity: number;
}

interface AvailabilityResponse extends AvailabilityPayload {
  is_available: boolean;
  new_quantity: number;
}

@Injectable()
export class ApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
    private readonly auth: AuthService,
  ) {}

  async checkProductAvailability(payload: AvailabilityPayload[]): Promise<AvailabilityResponse[]> {
    const serverToken = this.auth.generateServerToken();
    const headers = {
      Authorization: `Bearer ${serverToken}`,
    };
    const response = await firstValueFrom(
      this.httpService.post(`${this.config.get('orderServiceBaseUrl')}/products/check-availability`, payload, { headers }),
    );
    return <AvailabilityResponse[]>response.data;
  }

  async updateProductsAvailability(payload: AvailabilityPayload[]): Promise<{ message: string }> {
    const serverToken = this.auth.generateServerToken();
    const headers = {
      Authorization: `Bearer ${serverToken}`,
    };
    const response = await firstValueFrom(
      this.httpService.put(`${this.config.get('orderServiceBaseUrl')}/products/stock`, payload, { headers }),
    );
    return <{ message: string }>response.data;
  }
}
