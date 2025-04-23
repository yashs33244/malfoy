import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_EMAIL, sendCalendlyNotification, verifyCalendlySignature } from '@/lib/calendly';

/**
 * API route that handles Calendly webhook events for schedule confirmations
 */
export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);

    // Verify the webhook signature if in production
    if (process.env.NODE_ENV === 'production') {
      const signature = req.headers.get('Calendly-Webhook-Signature');
      if (signature) {
        const isValid = verifyCalendlySignature(signature, rawBody);
        if (!isValid) {
          return NextResponse.json(
            { error: 'Invalid signature' },
            { status: 401 }
          );
        }
      }
    }

    // Handle event created
    if (payload.event === 'invitee.created') {
      const { event, invitee, event_type, scheduled_event } = payload;
      
      // Extract details
      const name = invitee.name;
      const email = invitee.email;
      const eventName = event_type.name;
      const startTime = scheduled_event.start_time;
      const endTime = scheduled_event.end_time;
      const cancelUrl = invitee.cancel_url;
      const rescheduleUrl = invitee.reschedule_url;
      
      // Send notification to admin email
      await sendCalendlyNotification({
        name,
        email,
        eventName,
        startTime,
        endTime,
        cancelUrl,
        rescheduleUrl
      });
      
      return NextResponse.json({ 
        success: true,
        message: 'Webhook received and processed successfully' 
      });
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Webhook received but no action taken' 
    });
  } catch (error) {
    console.error('Calendly webhook error:', error);
    return NextResponse.json(
      { error: 'Something went wrong processing the webhook' },
      { status: 500 }
    );
  }
} 