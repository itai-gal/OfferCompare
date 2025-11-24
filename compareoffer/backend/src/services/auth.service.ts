type RegisterInput = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
};

type LoginInput = {
    email: string;
    password: string;
};

// This is just a temporary fake user object.
// Later we will use MongoDB and real JWT.
const fakeUser = {
    id: "1234567890",
    firstName: "Demo",
    lastName: "User",
    email: "demo@compareoffer.com",
    role: "user",
};

export const register = async (data: RegisterInput) => {
    // Later:
    // 1. Validate data
    // 2. Check if user exists
    // 3. Hash password
    // 4. Save to database
    // 5. Create JWT token

    return {
        message: "User registered successfully (mock)",
        user: {
            ...fakeUser,
            firstName: data.firstName || fakeUser.firstName,
            lastName: data.lastName || fakeUser.lastName,
            email: data.email,
        },
        token: "fake-jwt-token-for-register",
    };
};

export const login = async (data: LoginInput) => {
    // Later:
    // 1. Find user by email
    // 2. Compare passwords
    // 3. Create JWT token

    if (!data.email || !data.password) {
        const error = new Error("Invalid email or password");
        (error as any).status = 400;
        throw error;
    }

    return {
        message: "User logged in successfully (mock)",
        user: fakeUser,
        token: "fake-jwt-token-for-login",
    };
};

export const getCurrentUser = async () => {
    // Later:
    // 1. Read JWT token from headers
    // 2. Verify token
    // 3. Load user from database

    return {
        user: fakeUser,
    };
};
