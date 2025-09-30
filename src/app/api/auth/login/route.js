import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        // const user = await authenticateUser(email, password);

        return NextResponse.json({  
            success: true,
            user : {
                email: "test@gmail.com",
                password: "123456"
            }
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 401 }
        );
    }
}