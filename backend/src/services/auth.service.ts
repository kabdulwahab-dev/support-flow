import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository.js";
import { AppError } from "../utils/app-error.js";
import type { LoginInput, RegisterInput } from "../validators/auth.validator.js";
import { Prisma } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error("JWT_SECRET must be configured securely");
}

export const authService = {
    async login(input: LoginInput) {
        const email = input.email.toLowerCase();

        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError(401, "Invalid email or password");
        }

        const passwordMatches = await bcrypt.compare(
            input.password,
            user.passwordHash,
        );

        if (!passwordMatches) {
            throw new AppError(401, "Invalid email or password");
        }

        const token = jwt.sign(
            { sub: user.id },
            JWT_SECRET,
            { expiresIn: "15m", algorithm: "HS256" },
        );

        return {
            user: {
                id: user.id,
                email: user.email,
            },
            token,
        };
    },
    async register(input: RegisterInput) {
        const email = input.email.toLowerCase();
        const user = await userRepository.findByEmail(email);

        if (user) {
            throw new AppError(409, "User already exists with this email");
        }

        const passwordHash = await bcrypt.hash(input.password, 10);

        try {
            const newUser = await userRepository.create({
                email,
                passwordHash,
                country: input?.country,
            })

            return {
                user: {
                    id: newUser.id,
                    email: newUser.email,
                },
            };
        }
        catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2002" &&
                Array.isArray(error.meta?.target) &&
                error.meta.target.includes("email")
            ) {
                throw new AppError(409, "User already exists with this email");
            }

            throw error;
        }
    }

};