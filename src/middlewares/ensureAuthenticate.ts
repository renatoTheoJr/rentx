import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "@modules/accounts/repositories/implementations/UsersRepository";

import { AppError } from "../errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    // Bearer <Token> -> Header
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            "3cb7b8e35705e0762f06c57a21cfc961"
        ) as IPayload;
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);
        if (!user) {
            throw new AppError("User does not exists!", 401);
        }
        request.user = {
            id: user_id,
        };
        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }
}
