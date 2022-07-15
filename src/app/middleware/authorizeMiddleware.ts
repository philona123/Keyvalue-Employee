import express from "express";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import RequestWithUser from "../util/rest/request";
import jsonwebtoken, { JsonWebTokenError } from "jsonwebtoken";
import APP_CONSTANTS from "../constants";


const authorize = (permittedRoles?: string[]) => {
  return async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const token = getTokenFromRequestHeader(req);
    //   console.log(jsonwebtoken.decode(token));
      jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
      const data:any=jsonwebtoken.decode(token);
      if(!permittedRoles.includes(data['custom:role']))
        { throw new UserNotAuthorizedException(); }
      return next();
    } catch (error) {
      return next(new UserNotAuthorizedException());
    }
  };
};

const getTokenFromRequestHeader = (req: RequestWithUser) => {
  const tokenWithBearerHeader = req.header(
    `${APP_CONSTANTS.authorizationHeader}`
  );

  if (tokenWithBearerHeader) {
    return tokenWithBearerHeader.replace(`${APP_CONSTANTS.bearer} `, "");
  }
  return "";
};

export default authorize;