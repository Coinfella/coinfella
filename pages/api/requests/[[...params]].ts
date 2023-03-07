import NextAuthGuard from '@/lib/middleware/authGuard';
import {
  ApiExceptionHandler,
  BodyValidation,
} from '@/lib/middleware/zodApiValidator';
import RequestModel from '@/models/request.model';
import mongoose, { isValidObjectId } from 'mongoose';
import {
  BadRequestException,
  Catch,
  createHandler,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Req,
  Response,
  UseMiddleware,
} from 'next-api-decorators';
import { z } from 'zod';
import { ConnectDB } from '@/lib/connectdb';
import { type NextApiRequest } from 'next';
import UserModel from '@/models/user.model';

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
@UseMiddleware(ConnectDB)
class RequestHandler {
  @NextAuthGuard()
  @Post()
  @HttpCode(201)
  public async createRequest(
    @BodyValidation(requestSchema) body: typeof schema,
    @Req() req: NextApiRequest
  ) {
    const newRequest = new RequestModel(body);
    newRequest.user = new mongoose.Types.ObjectId(req!.user!.id);
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

    const user = await UserModel.findById(entity.user);

    return {
      success: true,
      entity: {
        ...entity.toJSON(),
        requester: { user: user?.name ?? '', email: user?.email ?? '' },
      },
    };
  }
}

export default createHandler(RequestHandler);
