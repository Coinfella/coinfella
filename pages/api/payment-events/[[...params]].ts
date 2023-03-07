import { ApiExceptionHandler } from '@/lib/middleware/zodApiValidator';
import {
  Body,
  Catch,
  createHandler,
  HttpCode,
  Post,
} from 'next-api-decorators';

@Catch(ApiExceptionHandler)
class PaymentEventHandler {
  @Post('/payment-status-update')
  @HttpCode(200)
  public async paymentStatusUpdate(@Body() body: any) {
    console.log("body", body);

    return;
  }
}

export default createHandler(PaymentEventHandler);
