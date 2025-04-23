import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // The authorization response is handled in the frontend
    // This endpoint is just for the redirect URI requirement
    // Close the popup window or redirect to the main app
    return new NextResponse(
      `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Authentication Complete</title>
          <script>
            window.onload = function() {
              // Close this popup if it's a popup
              if (window.opener) {
                window.close();
              } else {
                // Redirect to home if it's not a popup
                window.location.href = '/';
              }
            }
          </script>
        </head>
        <body>
          <p>Authentication completed. You can close this window.</p>
        </body>
      </html>
      `,
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    console.error('Apple callback error:', error);
    return NextResponse.json(
      { error: 'Something went wrong during the Apple authentication callback' },
      { status: 500 }
    );
  }
} 