import NextAuthGuard from '@/lib/middleware/authGuard';
import { ApiExceptionHandler, BodyValidation } from '@/lib/middleware/zodApiValidator';
import RequestModel from '@/models/request.model';
import { isValidObjectId } from 'mongoose';
import {
  BadRequestException,
  Catch,
  createHandler,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Response,
  UseMiddleware,
} from 'next-api-decorators';
import { z } from 'zod';
import { ConnectDB } from '../auth/lib/connectdb';

const requestSchema = z.object({
  payerName: z.string(),
  payerEmail: z.string(),
  requestAs: z.string(),
  fiatCurrency: z.string(),
  cryptoChain: z.string(),
  walletAddress: z.string(),
  dueDate: z.string(),
  description: z.string(),
  amount: z.coerce.number(),
});
var schema = requestSchema._type;

@Catch(ApiExceptionHandler)
// @NextAuthGuard()
@UseMiddleware(ConnectDB)
class RequestHandler {
  @Post()
  @HttpCode(201)
  public async createRequest(
    @BodyValidation(requestSchema) body: typeof schema
  ) {
    console.log('connected function');
    const newRequest = new RequestModel(body);
    const entity = await newRequest.save();
    //TODO:send email
    return { success: true, entity };
  }

  @Get('/:id')
  public async getRequest(@Param('id') id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException('Invalid object id');
    }
    const entity = await RequestModel.findById(id);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return { success: true, entity };
  }
}

export default createHandler(RequestHandler);
