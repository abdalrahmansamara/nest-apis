import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { ApiService } from './api.service';

@Module({
  imports: [HttpModule],
  providers: [ApiService],
  exports: [ApiService], // Export to use in other modules
})
export class ApiModule {}
