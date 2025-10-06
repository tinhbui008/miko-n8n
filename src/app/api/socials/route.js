import { NextResponse } from 'next/server';

export async function GET(request) {
    try {

        return NextResponse.json({
            data: 'List Socials',
            success: true,
        }, { status: 200 });

    } catch (error) {
        console.error('Get socials error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to get socials'
            },
            { status: 500 }
        );
    }
}


export async function POST(request) {
    try {

        return NextResponse.json({
            data: 'Create Social',
            success: true,
        }, { status: 200 });

    } catch (error) {
        console.error('Create social error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Failed to get socials'
            },
            { status: 500 }
        );
    }
}
