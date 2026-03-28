import {NextFunction,Request,Response,RequestHandler} from 'express';

type AsyncRequestHandler=(
  req:Request,
  res:Response,
  next:NextFunction
)=>Promise<unknown>;



// import { NextFunction, Request, RequestHandler, Response } from 'express';

// type AsyncRequestHandler = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => Promise<unknown>;

// export const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => {
//   return (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch(next);
//   };
// };

export const asyncHandler=(fn:AsyncRequestHandler):RequestHandler=>{
  return(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
  }
};
