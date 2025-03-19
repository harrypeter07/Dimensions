// app/api/process-text/route.ts
import { NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const filePath = body.filePath;
        const absoluteFilePath = path.join(process.cwd(), filePath);

        const text = await fs.readFile(absoluteFilePath, 'utf-8');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).fileContent = text;

        return NextResponse.json({ message: 'Text processed successfully' });
    } catch (error) {
        console.error('Error processing text:', error);
        return NextResponse.json({ error: 'Failed to process text' }, { status: 500 });
    }
}