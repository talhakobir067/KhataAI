import { NextResponse } from "next/server";
import { store } from "@/lib/store";

export async function GET() {
  try {
    const questions = store.getQuestions();
    return NextResponse.json({
      success: true,
      questions,
      totalCount: questions.length,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if bulk insert
    if (body.questions && Array.isArray(body.questions)) {
      const added = body.questions.map((q: any) => store.addQuestion(q));
      return NextResponse.json({
        success: true,
        questions: added,
        count: added.length,
      });
    }

    const newQuestion = store.addQuestion(body);
    return NextResponse.json({
      success: true,
      question: newQuestion,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}
