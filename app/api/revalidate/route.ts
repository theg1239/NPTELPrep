import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, tag, secret } = body;

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: 'Invalid secret' },
        { status: 401 }
      );
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json(
        { revalidated: true, message: `Revalidated path: ${path}` },
        { status: 200 }
      );
    }

    if (tag) {
      revalidateTag(tag, 'max');
      return NextResponse.json(
        { revalidated: true, message: `Revalidated tag: ${tag}` },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Missing path or tag parameter' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Error revalidating', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
