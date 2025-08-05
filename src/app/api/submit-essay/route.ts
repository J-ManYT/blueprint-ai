// src/app/api/submit-essay/route.ts
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { essay, prompt } = await request.json();

    // Validate input
    if (!essay || !prompt) {
      return NextResponse.json(
        { error: 'Essay and prompt are required' },
        { status: 400 }
      );
    }

    if (essay.length < 50) {
      return NextResponse.json(
        { error: 'Essay must be at least 50 characters long' },
        { status: 400 }
      );
    }

    // Create the feedback prompt
    const feedbackPrompt = `You are an expert college admissions counselor and essay reviewer. Please provide detailed, constructive feedback on this college essay.

ESSAY PROMPT: ${prompt}

STUDENT'S ESSAY: ${essay}

Please provide feedback in the following structured format:

**OVERALL IMPRESSION** (2-3 sentences)
Brief summary of the essay's strengths and main areas for improvement.

**CONTENT & STORYTELLING** (3-4 bullet points)
- [Specific feedback about the story, experiences shared, and personal insights]
- [Comments on how well the essay answers the prompt]
- [Suggestions for stronger narrative elements]

**STRUCTURE & FLOW** (2-3 bullet points)  
- [Feedback on essay organization and transitions]
- [Comments on introduction and conclusion effectiveness]

**WRITING STYLE** (2-3 bullet points)
- [Feedback on voice, tone, and word choice] 
- [Suggestions for clearer or more engaging language]

**SPECIFIC SUGGESTIONS** (3-5 actionable items)
1. [Concrete suggestion for improvement]
2. [Another specific recommendation]
3. [Additional actionable advice]

**STRENGTH TO HIGHLIGHT**
[One key strength to emphasize and build upon]

**FINAL THOUGHTS**
[Encouraging closing remarks with next steps]

Keep feedback constructive, specific, and encouraging. Focus on helping the student improve while maintaining their authentic voice.`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert college admissions counselor providing helpful, constructive essay feedback to high school students.',
        },
        {
          role: 'user',
          content: feedbackPrompt,
        },
      ],
      max_tokens: 800,
      temperature: 0.7,
    });

    const feedback = completion.choices[0]?.message?.content;

    if (!feedback) {
      throw new Error('No feedback generated');
    }

    // Return the feedback
    return NextResponse.json({
      feedback,
      wordCount: essay.trim().split(/\s+/).length,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error generating essay feedback:', error);
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'API configuration error. Please try again later.' },
          { status: 500 }
        );
      }
      
      if (error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'Service temporarily unavailable. Please try again later.' },
          { status: 503 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate feedback. Please try again.' },
      { status: 500 }
    );
  }
}